from .base import *
import os

DEBUG = env.bool('DEBUG', default=True)

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases
#
# DigitalOcean App Platform may inject the database URL under a
# component-specific name (e.g. db-DATABASE_URL).  Scan all env vars
# as a fallback so it always connects to PostgreSQL when available.
db_url = os.environ.get('DATABASE_URL', '')

if not db_url:
    for key, value in os.environ.items():
        if isinstance(value, str) and value.startswith(('postgres://', 'postgresql://')):
            db_url = value
            break

if db_url:
    import environ as _environ
    DATABASES = {
        'default': _environ.Env.db_url_config(db_url)
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
