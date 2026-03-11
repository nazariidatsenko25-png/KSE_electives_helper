from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Course, Enrollment, Review, Wishlist

class CustomUserAdmin(UserAdmin):
    ordering = ('email',)
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    # Remove username from fieldsets
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'instructor', 'trimester', 'ects_credits')
    search_fields = ('code', 'title', 'instructor')
    list_filter = ('trimester',)

class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'is_completed')
    list_filter = ('is_completed', 'course__trimester')
    search_fields = ('user__email', 'course__code')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('course', 'user', 'rating_difficulty', 'rating_quality', 'rating_workload')
    list_filter = ('rating_difficulty', 'rating_quality', 'rating_workload')
    search_fields = ('course__code', 'user__email', 'comment')

class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'added_at')
    list_filter = ('added_at',)
    search_fields = ('user__email', 'course__code')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Enrollment, EnrollmentAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Wishlist, WishlistAdmin)
