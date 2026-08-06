from bson import ObjectId

from app.database import notification_collection


class NotificationRepository:

    @staticmethod
    def get_all():

        notifications = list(
            notification_collection.find()
            .sort("timestamp", -1)
        )

        for notification in notifications:
            notification["_id"] = str(notification["_id"])

        return notifications

    @staticmethod
    def create(notification):

        return notification_collection.insert_one(notification)

    @staticmethod
    def mark_as_read(notification_id):

        return notification_collection.update_one(
            {"_id": notification_id},
            {
                "$set": {
                    "read": True
                }
            }
        )

    @staticmethod
    def clear_all():

        return notification_collection.delete_many({})

    @staticmethod
    def delete(notification_id):

        return notification_collection.delete_one(
            {"_id": notification_id}
        )
