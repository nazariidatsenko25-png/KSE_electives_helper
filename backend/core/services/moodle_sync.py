from core.models import User, Course, Enrollment

def sync_student_data(user: User):
    """
    Mock Moodle Web Services API sync.
    In a real scenario, this fetches the "Course completion report"
    for the student's ID and updates their major/current year.
    For now, it populates dummy data so the Dashboard works.
    """
    # 1. Mock setting user profile details
    if not user.major:
        user.major = "Software Engineering"
        user.current_year = 3
        user.save()

    # 2. Mock fetching the course completion report
    # Ensure there are some courses in the DB to mock enrollments
    if not Course.objects.exists():
        course1 = Course.objects.create(
            title="Introduction to Programming",
            code="CS101",
            description="Basic programming concepts in Python",
            ects_credits=6,
            trimester="Fall 2024",
            instructor="Prof. Smith"
        )
        course2 = Course.objects.create(
            title="Data Structures and Algorithms",
            code="CS201",
            description="Intermediate structures and algorithmic analysis",
            ects_credits=6,
            trimester="Spring 2025",
            instructor="Prof. Johnson"
        )
        course_elective = Course.objects.create(
            title="Advanced Machine Learning",
            code="CS401",
            description="Deep learning and advanced topics",
            ects_credits=6,
            trimester="Fall 2025",
            instructor="Prof. AI"
        )
    
    # 3. Mock assigning completed courses
    # Grab the first two courses to mark as completed
    courses_to_complete = Course.objects.all()[:2]
    for course in courses_to_complete:
        enrollment, created = Enrollment.objects.get_or_create(
            user=user,
            course=course,
            defaults={'is_completed': True}
        )
        # Ensure it's marked as completed if it already existed but wasn't
        if not enrollment.is_completed:
            enrollment.is_completed = True
            enrollment.save()
