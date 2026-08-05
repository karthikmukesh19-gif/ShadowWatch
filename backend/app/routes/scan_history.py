from fastapi import APIRouter, Depends

from app.database import scan_history_collection
from app.dependencies import verify_token

router = APIRouter(prefix="/api", tags=["Scan History"])


@router.get("/scan-history")
def get_scan_history(user=Depends(verify_token)):
    history = list(
        scan_history_collection.find(
            {"user": user["sub"]},
            {"_id": 0}
        ).sort("timestamp", -1)
    )

    return history