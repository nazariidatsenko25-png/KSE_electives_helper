"""
URL configuration for kse_portal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core.views import (
    UserProfileView,
    UserTranscriptView,
    CourseCatalogView,
    CoursePermissionView,
    ReviewCreateView,
    WishlistListCreateView,
    WishlistRemoveView,
)
from core.ai_views import AiChatView

urlpatterns = [
    path('admin/', admin.site.urls),
    # allauth
    path('accounts/', include('allauth.urls')),
    
    # API endpoints (Original)
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/user/transcript/', UserTranscriptView.as_view(), name='user-transcript'),
    path('api/courses/catalog/', CourseCatalogView.as_view(), name='course-catalog'),
    path('api/courses/<int:pk>/permissions/', CoursePermissionView.as_view(), name='course-permissions'),
    path('api/reviews/', ReviewCreateView.as_view(), name='review-create'),
    path('api/wishlist/', WishlistListCreateView.as_view(), name='wishlist-list-create'),
    path('api/wishlist/<int:course_id>/', WishlistRemoveView.as_view(), name='wishlist-remove'),
    path('api/ai/chat/', AiChatView.as_view(), name='ai-chat'),
    
    # API endpoints (DigitalOcean Stripped Path Fallbacks)
    path('user/profile/', UserProfileView.as_view()),
    path('user/transcript/', UserTranscriptView.as_view()),
    path('courses/catalog/', CourseCatalogView.as_view()),
    path('courses/<int:pk>/permissions/', CoursePermissionView.as_view()),
    path('reviews/', ReviewCreateView.as_view()),
    path('wishlist/', WishlistListCreateView.as_view()),
    path('wishlist/<int:course_id>/', WishlistRemoveView.as_view()),
    path('ai/chat/', AiChatView.as_view()),
]
