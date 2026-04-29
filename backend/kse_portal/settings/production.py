from .base import *
import os

DEBUG = True  # Temporarily True for demo diagnostics

ALLOWED_HOSTS = ['*']

# DigitalOcean App Platform injects DATABASE_URL when a dev database is attached.
# Fall back to scanning all env vars for any postgres:// URL as a safety net.
db_url = os.environ.get('DATABASE_URL', '')

if not db_url:
    for key, value in os.environ.items():
        if isinstance(value, str) and value.startswith(('postgres://', 'postgresql://')):
            db_url = value
            break

if db_url:
    DATABASES = {
        'default': environ.Env.db_url_config(db_url)
    }
else:
    # Last resort — run migrate on this at build time so collectstatic works
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': '/tmp/db.sqlite3',
        }
    }
