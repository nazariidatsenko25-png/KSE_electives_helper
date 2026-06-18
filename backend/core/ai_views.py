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
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView

class IsAuthenticatedOrDebug(BasePermission):
    """Allow unauthenticated access only when DEBUG is True for mock data testing."""
    def has_permission(self, request, view):
        if getattr(settings, 'DEBUG', False):
            return True
        return bool(request.user and request.user.is_authenticated)

from google import genai
from google.genai import types

from .models import User, Course, Enrollment, Wishlist

logger = logging.getLogger(__name__)

# ──────────────────────────────────────────────────────────────────
# Token estimation (rough: 1 token ≈ 4 chars)
# ──────────────────────────────────────────────────────────────────
MAX_CONTEXT_CHARS = 50_000  # ~12.5k tokens — very safe for Gemini's 1M context window


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
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=summary_prompt,
        )
        summary = response.text or ''
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
# Tool definitions
# ──────────────────────────────────────────────────────────────────
TOOL_DEFINITIONS = [
    types.Tool(
        function_declarations=[
            types.FunctionDeclaration(
                name="get_transcript",
                description="Retrieve the student's completed courses from the database. Returns a list of course names, codes, ECTS credits, and grades.",
                parameters=types.Schema(
                    type=types.Type.OBJECT,
                    properties={},
                ),
            ),
            types.FunctionDeclaration(
                name="check_prerequisites",
                description="Check if the student has completed the prerequisites for a specific course. Provide the course code to check.",
                parameters=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        "course_code": types.Schema(
                            type=types.Type.STRING,
                            description="The course code to check prerequisites for, e.g. 'CS401'",
                        ),
                    },
                    required=["course_code"],
                ),
            ),
            types.FunctionDeclaration(
                name="add_to_wishlist",
                description="Add a course to the student's wishlist / enrollment plan. Provide the course code.",
                parameters=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        "course_code": types.Schema(
                            type=types.Type.STRING,
                            description="The course code to add to the wishlist, e.g. 'CS401'",
                        ),
                    },
                    required=["course_code"],
                ),
            ),
        ]
    )
]


# ──────────────────────────────────────────────────────────────────
# Tool execution functions
# ──────────────────────────────────────────────────────────────────
def execute_tool(tool_name: str, tool_args: dict, user) -> str:
    """Execute a tool and return the result as a string."""
    
    # Safety check: AnonymousUser cannot be used in database filters
    if not user or not getattr(user, 'id', None):
        return json.dumps({'error': 'Користувач не авторизований або не знайдений для виконання інструментів.'}, ensure_ascii=False)

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
    permission_classes = [IsAuthenticatedOrDebug]

    def post(self, request):
        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return Response(
                    {'detail': 'AI advisor not configured. GEMINI_API_KEY missing.'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )

            query = request.data.get('query', '').strip()
            incoming_messages = request.data.get('messages', [])

            if not query:
                return Response(
                    {'detail': 'Query is required.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Use real user if authenticated, otherwise use mock identity for demo
            user = request.user
            if not user or not user.is_authenticated:
                # No DB lookup needed — execute_tool handles user=None safely
                user = None
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
                role = 'model' if msg.get('type') == 'ai' else 'user'
                text = msg.get('text', '')
                if text:
                    llm_messages.append({'role': role, 'content': text})

            # Add the new user query
            llm_messages.append({'role': 'user', 'content': query})

            # ── Session memory compaction (cookbook pattern) ──
            client = genai.Client(api_key=api_key)
            was_compacted = estimate_chars(llm_messages) > MAX_CONTEXT_CHARS
            if was_compacted:
                system_msg = {'role': 'system', 'content': system_instruction}
                llm_messages = compact_history(client, llm_messages, system_msg)

            # Convert to Gemini formats
            gemini_messages = []
            for msg in llm_messages:
                gemini_messages.append(
                    types.Content(
                        role=msg['role'],
                        parts=[types.Part.from_text(text=msg['content'])]
                    )
                )

            gemini_config = types.GenerateContentConfig(
                system_instruction=system_instruction,
                tools=TOOL_DEFINITIONS,
            )

            # ── Tool use loop ──
            tools_used = []
            max_tool_rounds = 3  # Safety limit

            try:
                for _ in range(max_tool_rounds):
                    response = client.models.generate_content(
                        model='gemini-2.5-flash',
                        contents=gemini_messages,
                        config=gemini_config,
                    )

                    # If no tool calls, we have our final response
                    if not response.function_calls:
                        final_text = response.text or 'Ось мої рекомендації.'
                        break

                    # Process tool calls
                    # 1) Add model's function_call response to history
                    gemini_messages.append(
                        response.candidates[0].content
                    )

                    # 2) Collect tool results into a new Content part
                    tool_results_parts = []
                    for tool_call in response.function_calls:
                        tool_name = tool_call.name
                        tool_args = tool_call.args if tool_call.args else {}

                        tool_result = execute_tool(tool_name, tool_args, user)
                        tools_used.append({
                            'tool': tool_name,
                            'args': tool_args,
                            'result_preview': tool_result[:100],
                        })

                        # Add result for Gemini
                        tool_results_parts.append(
                            types.Part.from_function_response(
                                name=tool_name,
                                response={"result": tool_result}
                            )
                        )

                    gemini_messages.append(
                        types.Content(
                            role="user",
                            parts=tool_results_parts
                        )
                    )
                else:
                    final_text = 'Ось мої рекомендації.' # Fallback if max rounds hit

            except Exception as exc:
                logger.exception('Gemini API error')
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
            
        except Exception as e:
            import traceback, os
            tb = traceback.format_exc()
            # Diagnostic: dump env var names and DB config
            env_names = sorted(os.environ.keys())
            db_engine = getattr(settings, 'DATABASES', {}).get('default', {}).get('ENGINE', 'UNKNOWN')
            settings_mod = os.environ.get('DJANGO_SETTINGS_MODULE', 'NOT SET')
            diag = f"\n\nDIAGNOSTIC:\nSettings: {settings_mod}\nDB Engine: {db_engine}\nDATABASE_URL: {os.environ.get('DATABASE_URL', 'NOT SET')}\nEnv vars: {', '.join(env_names)}"
            logger.exception('Uncaught Exception in AiChatView')
            return Response({'detail': f'Crash: {str(e)}{diag}\n\nTraceback:\n{tb}'}, status=500)
