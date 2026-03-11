"""
Content moderation utility for user-generated text.

Follows the Claude Cookbook `building_moderation_filter.ipynb` pattern:
  - LLM classifies text as ALLOW / BLOCK
  - Chain-of-thought reasoning for edge cases
  - Returns (is_allowed: bool, reason: str)
"""

import logging

from django.conf import settings
from groq import Groq

logger = logging.getLogger(__name__)

MODERATION_PROMPT = """You are a content moderation expert for an academic student portal at Kyiv School of Economics.
Your task is to classify user-generated course evaluation text.

BLOCK CATEGORY:
- Hate speech, personal attacks, or threats directed at professors or students
- Explicit or vulgar language that goes beyond mild frustration
- Spam, advertisements, or off-topic promotional content
- Content that could be considered harassment or bullying
- Sharing of personal/private information about staff or students

ALLOW CATEGORY:
- Honest criticism of course content, workload, or teaching methods (even if negative)
- Constructive feedback with suggestions for improvement
- Descriptions of personal learning experiences
- Mild frustration or informal language when discussing course challenges
- Comparisons between courses or teaching styles

First, inside <thinking> tags, analyze any potentially concerning aspects of the review and consider whether they are serious enough to block.
Then classify as ALLOW or BLOCK inside <output> tags. If BLOCK, include a brief reason after the word BLOCK in the format: BLOCK: reason

<review>{review_text}</review>"""


def moderate_review(review_text: str) -> tuple[bool, str]:
    """
    Moderate review text using LLM classification.

    Returns:
        (is_allowed, reason) — True if review passes, False if blocked.
    """
    api_key = getattr(settings, 'GROQ_API_KEY', None)
    if not api_key:
        # If no API key, allow by default (fail-open)
        logger.warning('GROQ_API_KEY not set — skipping moderation')
        return True, ''

    try:
        client = Groq(api_key=api_key)
        completion = client.chat.completions.create(
            messages=[
                {'role': 'user', 'content': MODERATION_PROMPT.format(review_text=review_text)},
            ],
            model='llama-3.1-8b-instant',
            max_tokens=300,
        )
        response = completion.choices[0].message.content or ''

        # Extract classification from <output> tags
        if '<output>' in response:
            output = response.split('<output>')[1].split('</output>')[0].strip()
        else:
            output = response.strip().split('\n')[-1].strip()

        if output.upper().startswith('BLOCK'):
            reason = output.split(':', 1)[1].strip() if ':' in output else 'Вміст порушує правила спільноти.'
            return False, reason

        return True, ''

    except Exception as exc:
        logger.exception('Moderation check failed: %s', exc)
        # Fail-open: allow the review if moderation service is down
        return True, ''
