from .base import *

DEBUG = True

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['kse-portal.example.com'])

DATABASES = {
    'default': env.db('DATABASE_URL', default='sqlite:////tmp/db.sqlite3')
}
