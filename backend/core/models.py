from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email

class Course(models.Model):
    title = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    syllabus = models.TextField(blank=True)
    ects_credits = models.IntegerField()
    trimester = models.CharField(max_length=50)
    instructor = models.CharField(max_length=255)
    # Temporary fallback to JSONField since PostgreSQL isn't available
    embedding = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.code} - {self.title}"

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    is_completed = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('user', 'course')
        
    def __str__(self):
        return f"{self.user.email} -> {self.course.code}"

class Review(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviews')
    comment = models.TextField()
    rating_difficulty = models.IntegerField() # 1-5
    rating_quality = models.IntegerField() # 1-5
    rating_workload = models.IntegerField() # 1-5
    # Temporary fallback to JSONField since PostgreSQL isn't available
    embedding = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return f"Review for {self.course.code}"
