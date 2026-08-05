from datetime import datetime
from fastapi import HTTPException

from app.database import (
    threat_collection,
    audit_logs_collection,
    notification_collection,
)
from app.repositories.threat_repository import ThreatRepository


class ThreatService:

    @staticmethod
    def get_all():
       return ThreatRepository.get_all()

    @staticmethod
    def add(threat, user):

        existing = ThreatRepository.find_by_id(threat.id)

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Threat ID already exists"
            )

        ThreatRepository.create(
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

        result = ThreatRepository.update(
    threat_id,
    updated_data.model_dump(
        exclude_none=True
    )
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

        result = ThreatRepository.delete(threat_id)

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Threat not found"
            )

        return {
            "message": "Threat deleted successfully"
        }