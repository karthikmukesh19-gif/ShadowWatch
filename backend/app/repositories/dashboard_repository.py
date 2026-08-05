from app.database import (
    threat_collection,
    notification_collection,
    user_collection,
    scan_history_collection,
)


class DashboardRepository:

    @staticmethod
    def total_threats():
        return threat_collection.count_documents({})

    @staticmethod
    def active_alerts():
        return notification_collection.count_documents({
            "status": "active"
        })

    @staticmethod
    def blocked_attacks():
        return threat_collection.count_documents({
            "status": "blocked"
        })

    @staticmethod
    def critical():
        return threat_collection.count_documents({
            "severity": "Critical"
        })

    @staticmethod
    def high():
        return threat_collection.count_documents({
            "severity": "High"
        })

    @staticmethod
    def medium():
        return threat_collection.count_documents({
            "severity": "Medium"
        })

    @staticmethod
    def low():
        return threat_collection.count_documents({
            "severity": "Low"
        })

    @staticmethod
    def total_users():
        return user_collection.count_documents({})

    @staticmethod
    def total_scans():
        return scan_history_collection.count_documents({})

    @staticmethod
    def phishing_scans():
        return scan_history_collection.count_documents({
            "prediction": "Phishing"
        })

    @staticmethod
    def safe_scans():
        return scan_history_collection.count_documents({
            "prediction": "Safe"
        })