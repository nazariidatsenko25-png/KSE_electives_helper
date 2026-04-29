from .base import *
import os
import logging

logger = logging.getLogger(__name__)

DEBUG = True  # Temporarily True for demo diagnostics

ALLOWED_HOSTS = ['*']

# DigitalOcean App Platform injects DATABASE_URL when a dev database is bound.
db_url = os.environ.get('DATABASE_URL', '')

# If the ${db.DATABASE_URL} reference didn't resolve, it might be literal or empty
if db_url and db_url.startswith(('postgres://', 'postgresql://')):
    import environ as _environ
    try:
        DATABASES = {
            'default': _environ.Env.db_url_config(db_url)
        }
        logger.info(f"Connected to PostgreSQL: {db_url[:30]}...")
    except Exception as exc:
        logger.error(f"Failed to parse DATABASE_URL: {exc}")
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': '/tmp/db.sqlite3',
            }
        }
else:
    logger.warning(f"DATABASE_URL is not a postgres URL: '{db_url[:50] if db_url else 'EMPTY'}'")
    # Try scanning all env vars for any postgres URL
    found = False
    for key, value in os.environ.items():
        if isinstance(value, str) and value.startswith(('postgres://', 'postgresql://')):
            import environ as _environ
            DATABASES = {
                'default': _environ.Env.db_url_config(value)
            }
            logger.info(f"Found PostgreSQL in env var {key}")
            found = True
            break

    if not found:
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': '/tmp/db.sqlite3',
            }
        }
