from fastapi import APIRouter, Depends
from app.dependencies import verify_token
from app.database import audit_logs_collection
from datetime import datetime

router = APIRouter(
    prefix="/api/audit-logs",
    tags=["Audit Logs"]
)


@router.get("/")
async def get_audit_logs(user=Depends(verify_token)):
    logs = list(audit_logs_collection.find({}, {"_id": 0}))
    return logs


@router.post("/")
async def create_audit_log(log: dict, user=Depends(verify_token)):
    log["timestamp"] = datetime.utcnow().isoformat()

    audit_logs_collection.insert_one(log)

    return {"message": "Audit log created successfully"}