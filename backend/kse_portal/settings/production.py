from .base import *

DEBUG = False

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['kse-portal.example.com'])

DATABASES = {
    'default': env.db('DATABASE_URL')
}
