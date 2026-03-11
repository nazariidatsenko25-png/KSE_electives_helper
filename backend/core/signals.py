from django.dispatch import receiver
from allauth.account.signals import user_logged_in
import logging
from core.services.moodle_sync import sync_student_data

logger = logging.getLogger(__name__)

@receiver(user_logged_in)
def trigger_moodle_sync(sender, request, user, **kwargs):
    """
    Trigger Moodle data sync (fetching completion report) after SSO login.
    """
    try:
        logger.info(f"Triggering Moodle sync for user {user.email}")
        sync_student_data(user)
    except Exception as e:
        logger.error(f"Error syncing Moodle data for {user.email}: {str(e)}")
