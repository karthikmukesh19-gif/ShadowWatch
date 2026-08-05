from datetime import datetime

from fastapi import APIRouter, Depends

from app.ai.predictor import predict_url
from app.dependencies import verify_token
from app.database import (
    audit_logs_collection,
    notification_collection,
    scan_history_collection,
)

router = APIRouter()


@router.post("/scan-url")
def scan_url(data: dict, user=Depends(verify_token)):
    url = data.get("url", "").strip()

    result = predict_url(url)

    print("AI Result:", result)

    scan_history_collection.insert_one({
        "url": url,
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "risk": result["risk"],
        "explanation": result["explanation"],
        "user": user["sub"],
        "timestamp": datetime.utcnow().isoformat()
    })

    audit_logs_collection.insert_one({
        "user": user["sub"],
        "action": "AI Scan",
        "details": f"Scanned URL: {url}",
        "status": result["prediction"],
        "timestamp": datetime.utcnow().isoformat()
    })

    if result["prediction"] == "Phishing":
        notification_collection.insert_one({
            "title": "⚠️ Phishing URL Detected",
            "severity": "High",
            "timestamp": datetime.utcnow().isoformat(),
            "read": False
        })

    print("Scan saved successfully")

    return result