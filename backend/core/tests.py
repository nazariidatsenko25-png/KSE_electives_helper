from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from core.models import User, Course, Enrollment, Review, Wishlist


class ReviewAPITests(TestCase):
    """Tests for POST /api/reviews/"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@kse.org.ua',
            password='testpass123',
            first_name='Test',
            last_name='Student',
        )
        self.course = Course.objects.create(
            code='CS101',
            title='Вступ до програмування',
            description='Основи програмування.',
            ects_credits=6,
            trimester='Осінь 2025',
            instructor='Проф. Тест',
        )
        # Create a completed enrollment so this user can review
        self.enrollment = Enrollment.objects.create(
            user=self.user,
            course=self.course,
            is_completed=True,
        )
        self.client.force_authenticate(user=self.user)

    def test_create_review_success(self):
        """User with completed enrollment can submit a review."""
        data = {
            'course': self.course.id,
            'rating_quality': 5,
            'rating_difficulty': 3,
            'rating_workload': 4,
            'comment': 'Чудовий курс!',
        }
        response = self.client.post('/api/reviews/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 1)
        review = Review.objects.first()
        self.assertEqual(review.user, self.user)
        self.assertEqual(review.course, self.course)
        self.assertEqual(review.rating_quality, 5)

    def test_create_review_no_enrollment(self):
        """User without completed enrollment is rejected."""
        other_course = Course.objects.create(
            code='ECON101',
            title='Мікроекономіка',
            description='Основи економіки.',
            ects_credits=6,
            trimester='Осінь 2025',
            instructor='Проф. Екон',
        )
        data = {
            'course': other_course.id,
            'rating_quality': 4,
            'rating_difficulty': 2,
            'rating_workload': 3,
            'comment': 'Не можу оцінити.',
        }
        response = self.client.post('/api/reviews/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Review.objects.count(), 0)

    def test_create_review_unauthenticated(self):
        """Unauthenticated user is rejected."""
        self.client.force_authenticate(user=None)
        data = {
            'course': self.course.id,
            'rating_quality': 3,
            'rating_difficulty': 3,
            'rating_workload': 3,
            'comment': '',
        }
        response = self.client.post('/api/reviews/', data, format='json')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])


class WishlistAPITests(TestCase):
    """Tests for GET/POST /api/wishlist/ and DELETE /api/wishlist/<id>/"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@kse.org.ua',
            password='testpass123',
        )
        self.course = Course.objects.create(
            code='CS401',
            title='Штучний інтелект',
            description='ШІ курс.',
            ects_credits=6,
            trimester='Весна 2027',
            instructor='Проф. ШІ',
        )
        self.client.force_authenticate(user=self.user)

    def test_wishlist_add_and_list(self):
        """Add a course to wishlist, then verify it appears in the list."""
        # Add
        response = self.client.post('/api/wishlist/', {'course': self.course.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # List
        response = self.client.get('/api/wishlist/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['course'], self.course.id)

    def test_wishlist_duplicate(self):
        """Adding the same course twice returns 400."""
        self.client.post('/api/wishlist/', {'course': self.course.id}, format='json')
        response = self.client.post('/api/wishlist/', {'course': self.course.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Wishlist.objects.count(), 1)

    def test_wishlist_remove(self):
        """Removing a wishlisted course returns 204 and removes it."""
        Wishlist.objects.create(user=self.user, course=self.course)
        response = self.client.delete(f'/api/wishlist/{self.course.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Wishlist.objects.count(), 0)

    def test_wishlist_remove_not_found(self):
        """Removing a course not in wishlist returns 404."""
        response = self.client.delete(f'/api/wishlist/{self.course.id}/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_wishlist_unauthenticated(self):
        """Unauthenticated user is rejected."""
        self.client.force_authenticate(user=None)
        response = self.client.get('/api/wishlist/')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])
