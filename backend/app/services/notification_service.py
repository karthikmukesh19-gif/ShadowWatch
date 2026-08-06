from datetime import datetime
from bson import ObjectId

from app.repositories.notification_repository import NotificationRepository


class NotificationService:

    @staticmethod
    def get_notifications():
        return NotificationRepository.get_all()

    @staticmethod
    def create_notification(notification):

        notification["read"] = False
        notification["timestamp"] = datetime.utcnow().isoformat()

        result = NotificationRepository.create(notification)

        return {
            "message": "Notification created successfully",
            "id": str(result.inserted_id)
        }

    @staticmethod
    def mark_as_read(notification_id):

        NotificationRepository.mark_as_read(
            ObjectId(notification_id)
        )

        return {
            "message": "Notification marked as read"
        }

    @staticmethod
    def clear_notifications():

        NotificationRepository.clear_all()

        return {
            "message": "All notifications cleared"
        }

    @staticmethod
    def delete_notification(notification_id):

        result = NotificationRepository.delete(
            ObjectId(notification_id)
        )

        if result.deleted_count == 0:
            return {
                "message": "Notification not found"
            }

        return {
            "message": "Notification deleted successfully"
        }
