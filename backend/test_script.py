import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kse_portal.settings.development')
django.setup()

from core.models import User
from core.services.moodle_sync import sync_student_data
from core.serializers import UserProfileSerializer

# Create a test user
user, created = User.objects.get_or_create(
    email="teststudent@kse.org.ua", 
    defaults={"first_name": "Test", "last_name": "Student"}
)
if created:
    user.set_password("password")
    user.save()

# Trigger sync manually for testing
print("Triggering sync...")
sync_student_data(user)

# Print out user profile 
user.refresh_from_db()
print(f"User: {user.email}, Major: {user.major}, Year: {user.current_year}")

print("Serializer Data:", UserProfileSerializer(user).data)
