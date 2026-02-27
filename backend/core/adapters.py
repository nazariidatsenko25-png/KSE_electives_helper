from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.core.exceptions import PermissionDenied

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        # Retrieve the user's email address from the social account
        email = sociallogin.account.extra_data.get('email', '')
        
        # Check if the email ends with the allowed domains
        allowed_domains = ['@kse.org.ua', '@kse.today']
        if not any(email.endswith(domain) for domain in allowed_domains):
            # If not allowed, deny the signup/login process
            raise PermissionDenied("Only KSE corporate emails (@kse.org.ua, @kse.today) are allowed to access this portal.")
            
        return super().is_open_for_signup(request, sociallogin)
