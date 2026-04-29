from .base import *

DEBUG = True

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['kse-portal.example.com'])

import os

# Auto-discover DigitalOcean database URL if not explicitly mapped
db_url = env('DATABASE_URL', default=None)
if not db_url:
    for key, value in os.environ.items():
        if key.endswith('_DATABASE_URL') or (isinstance(value, str) and value.startswith('postgres')):
            db_url = value
            break

if not db_url:
    db_url = 'sqlite:////tmp/db.sqlite3'

DATABASES = {
    'default': environ.Env.db_url_config(db_url)
}
