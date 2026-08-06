from datetime import datetime

from app.repositories.audit_repository import AuditRepository


class AuditService:

    @staticmethod
    def get_logs():
        return AuditRepository.get_all()

    @staticmethod
    def create_log(log):

        log["timestamp"] = datetime.utcnow().isoformat()

        AuditRepository.create(log)

        return {
            "message": "Audit log created successfully"
        }
