from app.database import threat_collection


class ThreatRepository:

    @staticmethod
    def get_all():
        return list(
            threat_collection.find({}, {"_id": 0}).sort("id", 1)
        )

    @staticmethod
    def find_by_id(threat_id: int):
        return threat_collection.find_one(
            {"id": threat_id}
        )

    @staticmethod
    def create(threat: dict):
        return threat_collection.insert_one(threat)

    @staticmethod
    def update(threat_id: int, data: dict):
        return threat_collection.update_one(
            {"id": threat_id},
            {"$set": data}
        )

    @staticmethod
    def delete(threat_id: int):
        return threat_collection.delete_one(
            {"id": threat_id}
        )