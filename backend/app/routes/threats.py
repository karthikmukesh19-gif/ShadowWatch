from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime

from app.dependencies import verify_token
from app.database import (
    threat_collection,
    audit_logs_collection,
    notification_collection,
)
router = APIRouter()



@router.get("/threats")
def get_threats(user=Depends(verify_token)):
    threats = []

    for threat in threat_collection.find({}, {"_id": 0}).sort("id", 1):
        threats.append(threat)

    return threats
@router.post("/threats")
def add_threat(threat: dict, user=Depends(verify_token)):

    existing = threat_collection.find_one({"id": threat["id"]})

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Threat ID already exists"
        )

    threat_collection.insert_one(threat)

    audit_logs_collection.insert_one({
        "user": user["sub"],
        "action": "Add Threat",
        "details": f"Added threat: {threat['threat']}",
        "status": "Success",
        "timestamp": datetime.utcnow().isoformat()
    })

    notification_collection.insert_one({
        "title": f"New Threat: {threat['threat']}",
        "severity": threat["severity"],
        "timestamp": datetime.utcnow().isoformat(),
        "read": False
    })

    return {
        "message": "Threat added successfully"
    }
@router.delete("/threats/{threat_id}")
def delete_threat(threat_id: int, user=Depends(verify_token)):

    result = threat_collection.delete_one({"id": threat_id})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Threat not found"
        )

    return {
        "message": "Threat deleted successfully"
    }
@router.put("/threats/{threat_id}")
def update_threat(
    threat_id: int,
    updated_data: dict,
    user=Depends(verify_token)
):

    result = threat_collection.update_one(
        {"id": threat_id},
        {"$set": updated_data}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Threat not found"
        )

    return {
        "message": "Threat updated successfully"
    }