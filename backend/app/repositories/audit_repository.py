from app.database import audit_logs_collection


class AuditRepository:

    @staticmethod
    def get_all():
        return list(
            audit_logs_collection.find(
                {},
                {"_id": 0}
            ).sort("timestamp", -1)
        )

    @staticmethod
    def create(data):
        return audit_logs_collection.insert_one(data)
