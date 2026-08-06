from app.database import notification_collection


class NotificationRepository:

    @staticmethod
    def get_all():
        return list(
            notification_collection.find(
                {},
                {"_id": 0}
            ).sort("timestamp", -1)
        )

    @staticmethod
    def create(data):
        return notification_collection.insert_one(data)

    @staticmethod
    def mark_read():

        return notification_collection.update_many(
            {"read": False},
            {
                "$set": {
                    "read": True
                }
            }
        )
