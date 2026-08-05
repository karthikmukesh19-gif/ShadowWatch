from datetime import datetime
from fastapi import HTTPException

from app.database import (
    threat_collection,
    audit_logs_collection,
    notification_collection,
)


class ThreatService:

    @staticmethod
    def get_all():
        return list(
            threat_collection.find({}, {"_id": 0}).sort("id", 1)
        )

    @staticmethod
    def add(threat, user):

        existing = threat_collection.find_one(
            {"id": threat.id}
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Threat ID already exists"
            )

        threat_collection.insert_one(
            threat.model_dump()
        )

        audit_logs_collection.insert_one({
            "user": user["sub"],
            "action": "Add Threat",
            "details": f"Added threat: {threat.threat}",
            "status": "Success",
            "timestamp": datetime.utcnow().isoformat()
        })

        notification_collection.insert_one({
            "title": f"New Threat: {threat.threat}",
            "severity": threat.severity,
            "timestamp": datetime.utcnow().isoformat(),
            "read": False
        })

        return {
            "message": "Threat added successfully"
        }

    @staticmethod
    def update(threat_id, updated_data):

        result = threat_collection.update_one(
            {"id": threat_id},
            {
                "$set":
                updated_data.model_dump(
                    exclude_none=True
                )
            }
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Threat not found"
            )

        return {
            "message": "Threat updated successfully"
        }

    @staticmethod
    def delete(threat_id):

        result = threat_collection.delete_one(
            {"id": threat_id}
        )

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Threat not found"
            )

        return {
            "message": "Threat deleted successfully"
        }