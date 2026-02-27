import random
from django.core.management.base import BaseCommand
from core.models import User, Course, Enrollment

class Command(BaseCommand):
    help = 'Simulates syncing transcripts from Moodle API'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting Moodle transcript sync simulation...'))

        # In a real scenario, we would call the Moodle REST API:
        # response = requests.get(f"{MOODLE_URL}/webservice/rest/server.php?wstoken={TOKEN}&wsfunction=core_completion_get_course_completion_status&userid={USER_ID}&courseid={COURSE_ID}&moodlewsrestformat=json")
        # data = response.json()
        
        users = User.objects.all()
        courses = Course.objects.all()
        
        if not users.exists() or not courses.exists():
            self.stdout.write(self.style.WARNING('No users or courses found to sync. Add dummy data first.'))
            return

        sync_count = 0
        for user in users:
            # We randomly select a few courses to simulate them being completed by the user
            # In real life, we would check the Moodle API response for completion status
            num_completed = random.randint(1, min(4, courses.count()))
            completed_courses = random.sample(list(courses), num_completed)
            
            for course in completed_courses:
                enrollment, created = Enrollment.objects.get_or_create(user=user, course=course)
                if not enrollment.is_completed:
                    enrollment.is_completed = True
                    enrollment.save()
                    sync_count += 1
                    self.stdout.write(f"Synced: {user.email} completed {course.code}")

        self.stdout.write(self.style.SUCCESS(f'Successfully synced {sync_count} transcript records from Moodle.'))
