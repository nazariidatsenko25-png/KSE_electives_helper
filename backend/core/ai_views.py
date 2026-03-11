"""
Backend AI endpoint for SmartCourse AI advisor.

Follows Claude Cookbook best practices:
  1. API key stays server-side (never in the frontend bundle)
  2. Proper message-history format (role/content array, not flattened strings)
  3. Tool use loop (customer_service_agent.ipynb pattern)
  4. Session memory compaction (session_memory_compaction.ipynb pattern)
"""

import json
import logging

from django.conf import settings
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from groq import Groq

from .models import Course, Enrollment, Wishlist

logger = logging.getLogger(__name__)

# ──────────────────────────────────────────────────────────────────
# Token estimation (rough: 1 token ≈ 4 chars for non-Latin, 3.5 for Latin)
# ──────────────────────────────────────────────────────────────────
MAX_CONTEXT_CHARS = 20_000  # ~5k tokens — safe for Llama 3 8k context


def estimate_chars(messages: list[dict]) -> int:
    """Estimate total character count of a message list."""
    return sum(len(m.get('content', '')) for m in messages)


# ──────────────────────────────────────────────────────────────────
# Session memory compaction (cookbook: session_memory_compaction.ipynb)
# ──────────────────────────────────────────────────────────────────
def compact_history(client, messages: list[dict], system_msg: dict) -> list[dict]:
    """
    If conversation history exceeds MAX_CONTEXT_CHARS, summarize the
    older half into a single 'system' note and keep recent messages intact.
    """
    total = estimate_chars(messages)
    if total <= MAX_CONTEXT_CHARS:
        return messages  # No compaction needed

    # Split: compact the first 2/3 of messages, keep the last 1/3
    split_point = max(1, len(messages) * 2 // 3)
    old_messages = messages[:split_point]
    recent_messages = messages[split_point:]

    # Ask the LLM to summarize the old conversation
    summary_prompt = (
        "Summarize the following conversation in 2-3 sentences in Ukrainian. "
        "Focus on: what the student asked about, what courses were recommended, "
        "and any preferences expressed.\n\n"
    )
    for m in old_messages:
        role_label = "Студент" if m['role'] == 'user' else "Радник"
        summary_prompt += f"{role_label}: {m['content']}\n"

    try:
        completion = client.chat.completions.create(
            messages=[{'role': 'user', 'content': summary_prompt}],
            model='llama-3.1-8b-instant',
            max_tokens=200,
        )
        summary = completion.choices[0].message.content or ''
    except Exception:
        logger.warning('Compaction summary failed, truncating instead')
        summary = '(Попередня розмова була скорочена через обмеження контексту.)'

    # Build compacted history: system + summary + recent messages
    compacted = [
        {'role': 'user', 'content': f'[Підсумок попередньої розмови: {summary}]'},
        {'role': 'assistant', 'content': 'Зрозуміло, я пам\'ятаю контекст нашої розмови.'},
    ]
    compacted.extend(recent_messages)
    return compacted


# ──────────────────────────────────────────────────────────────────
# Tool definitions (cookbook: customer_service_agent.ipynb)
# ──────────────────────────────────────────────────────────────────
TOOL_DEFINITIONS = [
    {
        "type": "function",
        "function": {
            "name": "get_transcript",
            "description": "Retrieve the student's completed courses from the database. Returns a list of course names, codes, ECTS credits, and grades.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "check_prerequisites",
            "description": "Check if the student has completed the prerequisites for a specific course. Provide the course code to check.",
            "parameters": {
                "type": "object",
                "properties": {
                    "course_code": {
                        "type": "string",
                        "description": "The course code to check prerequisites for, e.g. 'CS401'",
                    },
                },
                "required": ["course_code"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "add_to_wishlist",
            "description": "Add a course to the student's wishlist / enrollment plan. Provide the course code.",
            "parameters": {
                "type": "object",
                "properties": {
                    "course_code": {
                        "type": "string",
                        "description": "The course code to add to the wishlist, e.g. 'CS401'",
                    },
                },
                "required": ["course_code"],
            },
        },
    },
]


# ──────────────────────────────────────────────────────────────────
# Tool execution functions
# ──────────────────────────────────────────────────────────────────
def execute_tool(tool_name: str, tool_args: dict, user) -> str:
    """Execute a tool and return the result as a string."""

    if tool_name == 'get_transcript':
        enrollments = Enrollment.objects.filter(
            user=user, is_completed=True
        ).select_related('course')
        if not enrollments.exists():
            return json.dumps({'courses': [], 'message': 'Студент ще не завершив жодного курсу.'})
        courses = [
            {
                'code': e.course.code,
                'title': e.course.title,
                'ects': e.course.ects_credits,
                'status': 'Завершено' if e.is_completed else 'В процесі',
            }
            for e in enrollments
        ]
        return json.dumps({'courses': courses, 'total_ects': sum(c['ects'] for c in courses)}, ensure_ascii=False)

    elif tool_name == 'check_prerequisites':
        course_code = tool_args.get('course_code', '')
        try:
            course = Course.objects.get(code__iexact=course_code)
        except Course.DoesNotExist:
            return json.dumps({'error': f'Курс {course_code} не знайдено в каталозі.'}, ensure_ascii=False)

        prereqs = course.prerequisites.strip() if course.prerequisites else ''
        if not prereqs:
            return json.dumps({
                'course': course.code,
                'prerequisites': 'Немає передумов',
                'eligible': True,
            }, ensure_ascii=False)

        # Check if student completed prerequisite courses
        completed_codes = set(
            Enrollment.objects.filter(user=user, is_completed=True)
            .values_list('course__code', flat=True)
        )
        prereq_codes = [p.strip() for p in prereqs.split(',')]
        missing = [p for p in prereq_codes if p.upper() not in {c.upper() for c in completed_codes}]

        return json.dumps({
            'course': course.code,
            'prerequisites': prereq_codes,
            'completed': list(completed_codes),
            'missing': missing,
            'eligible': len(missing) == 0,
        }, ensure_ascii=False)

    elif tool_name == 'add_to_wishlist':
        course_code = tool_args.get('course_code', '')
        try:
            course = Course.objects.get(code__iexact=course_code)
        except Course.DoesNotExist:
            return json.dumps({'error': f'Курс {course_code} не знайдено.'}, ensure_ascii=False)

        _, created = Wishlist.objects.get_or_create(user=user, course=course)
        if created:
            return json.dumps({
                'success': True,
                'message': f'Курс {course.title} ({course.code}) додано до списку бажань!',
            }, ensure_ascii=False)
        else:
            return json.dumps({
                'success': True,
                'message': f'Курс {course.title} вже є у списку бажань.',
            }, ensure_ascii=False)

    return json.dumps({'error': f'Unknown tool: {tool_name}'})


# ──────────────────────────────────────────────────────────────────
# System prompt
# ──────────────────────────────────────────────────────────────────
def build_system_prompt(name, year, major):
    """Build the system prompt with the full course catalog from the DB."""
    all_courses = Course.objects.all().order_by('code')
    catalog_lines = []
    for c in all_courses:
        prereqs = c.prerequisites.strip() if c.prerequisites else 'немає'
        catalog_lines.append(f'  - {c.code}: {c.title} ({c.ects_credits} ECTS, {c.trimester}, викладач: {c.instructor}, передумови: {prereqs})')
    catalog_text = '\n'.join(catalog_lines) if catalog_lines else '  (каталог порожній)'

    return f"""You are SmartCourse AI, an academic advisor for Kyiv School of Economics.
The student is {name}, a {year} year {major} major.

You have access to tools to look up the student's real data:
- get_transcript: fetch completed courses from the database
- check_prerequisites: verify if the student can enroll in a specific course
- add_to_wishlist: add a course to the student's enrollment plan

Use these tools when the student asks about their courses, prerequisites, or wants to save a recommendation.

Available courses in the KSE catalog:
{catalog_text}

IMPORTANT RULES:
- REPLY EXCLUSIVELY IN UKRAINIAN (УКРАЇНСЬКА МОВА).
- When recommending courses, ALWAYS mention the course code (e.g. CS301, ECON401, LAW201) in your response so the student can identify them.
- Give helpful, personalized advice based on the student's major and interests.
- Be warm and encouraging."""


class AiChatView(APIView):
    """
    POST /api/ai/chat/

    Accepts:
      {
        "messages": [
          {"type": "human", "text": "..."},
          {"type": "ai",    "text": "..."},
          ...
        ],
        "query": "..."
      }

    Returns:
      {
        "message": "...",
        "recommendations": [...],
        "tools_used": [...],
        "compacted": bool
      }
    """
    permission_classes = [AllowAny]  # Dev: allow mock login; for prod switch to [IsAuthenticated]
    authentication_classes = []  # Dev: bypass CSRF for mock login; for prod remove this line

    def post(self, request):
        api_key = getattr(settings, 'GROQ_API_KEY', None)
        if not api_key:
            return Response(
                {'detail': 'AI advisor not configured. GROQ_API_KEY missing.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        query = request.data.get('query', '').strip()
        incoming_messages = request.data.get('messages', [])

        if not query:
            return Response(
                {'detail': 'Query is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Use real user if authenticated, otherwise use a mock user for dev
        user = request.user
        if not user or not user.is_authenticated:
            # Fallback mock user for development (when using frontend mock login)
            user_name = 'Олена'
            user_year = '3'
            user_major = 'Програмна інженерія'
        else:
            user_name = user.first_name or user.email.split('@')[0]
            user_year = getattr(user, 'current_year', '1')
            user_major = getattr(user, 'major', 'General')

        system_instruction = build_system_prompt(
            name=user_name,
            year=user_year,
            major=user_major,
        )

        # ── Build proper message history (cookbook pattern) ──
        llm_messages = []
        for msg in incoming_messages:
            role = 'assistant' if msg.get('type') == 'ai' else 'user'
            text = msg.get('text', '')
            if text:
                llm_messages.append({'role': role, 'content': text})

        # Add the new user query
        llm_messages.append({'role': 'user', 'content': query})

        # ── Session memory compaction (cookbook pattern) ──
        client = Groq(api_key=api_key)
        was_compacted = estimate_chars(llm_messages) > MAX_CONTEXT_CHARS
        if was_compacted:
            system_msg = {'role': 'system', 'content': system_instruction}
            llm_messages = compact_history(client, llm_messages, system_msg)

        # Prepend system message
        full_messages = [{'role': 'system', 'content': system_instruction}] + llm_messages

        # ── Tool use loop (cookbook pattern) ──
        tools_used = []
        max_tool_rounds = 3  # Safety limit

        try:
            for _ in range(max_tool_rounds):
                completion = client.chat.completions.create(
                    messages=full_messages,
                    model='llama-3.1-8b-instant',
                    tools=TOOL_DEFINITIONS,
                    tool_choice='auto',
                )

                choice = completion.choices[0]

                # If no tool calls, we have our final response
                if choice.finish_reason != 'tool_calls' or not choice.message.tool_calls:
                    break

                # Process tool calls
                full_messages.append(choice.message)

                for tool_call in choice.message.tool_calls:
                    tool_name = tool_call.function.name
                    try:
                        tool_args = json.loads(tool_call.function.arguments)
                    except json.JSONDecodeError:
                        tool_args = {}

                    tool_result = execute_tool(tool_name, tool_args, user)
                    tools_used.append({
                        'tool': tool_name,
                        'args': tool_args,
                        'result_preview': tool_result[:100],
                    })

                    # Feed tool result back to the LLM
                    full_messages.append({
                        'role': 'tool',
                        'tool_call_id': tool_call.id,
                        'content': tool_result,
                    })

            # Extract final text response
            final_text = choice.message.content or 'Ось мої рекомендації.'

        except Exception as exc:
            logger.exception('Groq API error')
            return Response(
                {'detail': f'AI service error: {str(exc)}'},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        # Extract course recommendations from the AI response text
        import re
        mentioned_codes = re.findall(r'\b([A-Z]{2,4}\d{3})\b', final_text)
        recommendations = []
        if mentioned_codes:
            seen = set()
            for code in mentioned_codes:
                if code not in seen:
                    seen.add(code)
                    try:
                        c = Course.objects.get(code__iexact=code)
                        recommendations.append({
                            'code': c.code,
                            'title': c.title,
                            'credits': c.ects_credits,
                            'instructor': c.instructor or '',
                            'trimester': c.trimester or '',
                        })
                    except Course.DoesNotExist:
                        pass

        return Response({
            'message': final_text,
            'recommendations': recommendations,
            'tools_used': tools_used,
            'compacted': was_compacted,
        })
