from datetime import datetime

from app.repositories.notification_repository import NotificationRepository


class NotificationService:

    @staticmethod
    def get_notifications():
        return NotificationRepository.get_all()

    @staticmethod
    def create_notification(notification):

        notification["timestamp"] = datetime.utcnow().isoformat()
        notification["read"] = False

        NotificationRepository.create(notification)

        return {
            "message": "Notification created successfully"
        }

    @staticmethod
    def mark_all_read():

        NotificationRepository.mark_read()

        return {
            "message": "All notifications marked as read"
        }
