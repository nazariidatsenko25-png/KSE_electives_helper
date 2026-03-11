from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Course, Enrollment, Review, Wishlist
from .serializers import (
    UserProfileSerializer,
    CourseSerializer,
    EnrollmentSerializer,
    ReviewSerializer,
    WishlistSerializer,
)

class UserProfileView(generics.RetrieveAPIView):
    """
    GET /api/user/profile
    Returns Name, Major, Current Year, and total ECTS credits.
    """
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserTranscriptView(generics.ListAPIView):
    """
    GET /api/user/transcript
    Returns the list of Enrollment objects where is_completed=True.
    """
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user, is_completed=True).select_related('course')

class CourseCatalogView(generics.ListAPIView):
    """
    GET /api/courses/catalog
    Returns available electives (all courses not yet completed by the user).
    """
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        completed_course_ids = Enrollment.objects.filter(
            user=self.request.user,
            is_completed=True
        ).values_list('course_id', flat=True)
        return Course.objects.exclude(id__in=completed_course_ids)

class CoursePermissionView(APIView):
    """
    GET /api/courses/<id>/permissions
    Returns whether the current user is allowed to leave a review 
    (i.e. if they have is_completed=True in their enrollments for this course).
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, format=None):
        course = get_object_or_404(Course, pk=pk)
        has_completed = Enrollment.objects.filter(
            user=request.user,
            course=course,
            is_completed=True
        ).exists()
        
        return Response({
            'course_id': course.id,
            'can_review': has_completed
        })

# ────────────────────────────────────────────────
# NEW: Course Review Submission
# ────────────────────────────────────────────────

class ReviewCreateView(generics.CreateAPIView):
    """
    POST /api/reviews/
    Creates a new anonymized course review.
    Validates that the authenticated user has completed the course.
    Moderates the review content before saving (cookbook pattern).
    """
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course = serializer.validated_data['course']
        user = self.request.user

        # Verify the student actually completed this course
        has_completed = Enrollment.objects.filter(
            user=user,
            course=course,
            is_completed=True
        ).exists()

        if not has_completed:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied(
                'Ви не можете оцінити курс, який ще не завершили.'
            )

        # ── Content moderation (cookbook pattern) ──
        comment = serializer.validated_data.get('comment', '')
        if comment:
            from .moderation import moderate_review
            is_allowed, reason = moderate_review(comment)
            if not is_allowed:
                from rest_framework.exceptions import ValidationError
                raise ValidationError({
                    'comment': f'Ваш відгук не пройшов перевірку: {reason}'
                })

        serializer.save(user=user)

# ────────────────────────────────────────────────
# NEW: Wishlist (Catalog "Додати до списку")
# ────────────────────────────────────────────────

class WishlistListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/wishlist/  — list all wishlisted courses for the user
    POST /api/wishlist/  — add a course to the wishlist { "course": <id> }
    """
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user).select_related('course')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        # Check for duplicate before saving
        course_id = request.data.get('course')
        if Wishlist.objects.filter(user=request.user, course_id=course_id).exists():
            return Response(
                {'detail': 'Цей курс вже у вашому списку бажань.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().create(request, *args, **kwargs)

class WishlistRemoveView(APIView):
    """
    DELETE /api/wishlist/<course_id>/
    Removes a course from the user's wishlist.
    """
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, course_id, format=None):
        deleted_count, _ = Wishlist.objects.filter(
            user=request.user,
            course_id=course_id,
        ).delete()

        if deleted_count == 0:
            return Response(
                {'detail': 'Курс не знайдено у вашому списку бажань.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(status=status.HTTP_204_NO_CONTENT)
