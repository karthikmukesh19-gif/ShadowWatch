from fastapi import APIRouter
from app.database import (
    threat_collection,
    notification_collection
)

router = APIRouter()


@router.get("/dashboard")
def get_dashboard():

    total_threats = threat_collection.count_documents({})

    active_alerts = notification_collection.count_documents({
        "status": "active"
    })

    blocked_attacks = threat_collection.count_documents({
        "status": "blocked"
    })

    critical = threat_collection.count_documents({
        "severity": "Critical"
    })

    high = threat_collection.count_documents({
        "severity": "High"
    })

    medium = threat_collection.count_documents({
        "severity": "Medium"
    })

    low = threat_collection.count_documents({
        "severity": "Low"
    })

    if total_threats == 0:
        risk_score = 0
    else:
        risk_score = round(((critical * 4) + (high * 3) + (medium * 2) + low) / (total_threats * 4) * 100)

    return {
        "totalThreats": total_threats,
        "activeAlerts": active_alerts,
        "blockedAttacks": blocked_attacks,
        "riskScore": risk_score,
        "severity": {
            "Critical": critical,
            "High": high,
            "Medium": medium,
            "Low": low
        }
    }