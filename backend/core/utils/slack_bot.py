import os
import logging
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

logger = logging.getLogger(__name__)

# In a real application, initialize with the SLACK_BOT_TOKEN from environment
slack_token = os.environ.get("SLACK_BOT_TOKEN", "dummy-token-for-testing")
client = WebClient(token=slack_token)

def send_slack_dm_by_email(email: str, message: str) -> bool:
    """
    Finds a Slack user by their email address and sends them a Direct Message.
    Requires 'users:read.email' and 'chat:write' scopes on the Slack bot.
    """
    try:
        # Step 1: Look up the user by email
        response = client.users_lookupByEmail(email=email)
        user_id = response["user"]["id"]
        
        # Step 2: Send the message to that user ID
        result = client.chat_postMessage(
            channel=user_id,
            text=message
        )
        logger.info(f"Successfully sent Slack message to {email}")
        return True
        
    except SlackApiError as e:
        logger.error(f"Error sending Slack message to {email}: {e.response['error']}")
        # Often occurs if the bot doesn't have permissions or the email isn't in Slack
        return False
    except Exception as e:
        logger.error(f"Unexpected error sending Slack DM: {str(e)}")
        return False

# Example usage (commented out for prod):
# send_slack_dm_by_email("student@kse.org.ua", "Reminder: You have a coursework deadline tomorrow!")
