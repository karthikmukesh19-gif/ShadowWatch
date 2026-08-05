from datetime import datetime

from app.ai.predictor import predict_url
from app.database import (
    audit_logs_collection,
    notification_collection,
    scan_history_collection,
)


class AIService:

    @staticmethod
    def scan_url(url: str, user):

        result = predict_url(url)

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

        return result