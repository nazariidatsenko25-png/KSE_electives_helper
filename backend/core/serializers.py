from rest_framework import serializers
from .models import User, Course, Enrollment, Review, Wishlist

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'code', 'description', 'ects_credits', 'trimester', 'instructor']

class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'is_completed', 'grade']

class UserProfileSerializer(serializers.ModelSerializer):
    total_credits = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'major', 'current_year', 'total_credits']
        
    def get_total_credits(self, obj):
        # Calculate total ECTS from completed enrollments
        enrollments = obj.enrollments.filter(is_completed=True)
        return sum(enrollment.course.ects_credits for enrollment in enrollments)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'course', 'user', 'comment', 'rating_difficulty', 'rating_quality', 'rating_workload', 'created_at']
        read_only_fields = ['user', 'created_at']

class WishlistSerializer(serializers.ModelSerializer):
    course_detail = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'course', 'course_detail', 'added_at']
        read_only_fields = ['added_at']
