from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    @staticmethod
    def get_dashboard():

        total = DashboardRepository.total_threats()

        critical = DashboardRepository.critical()
        high = DashboardRepository.high()
        medium = DashboardRepository.medium()
        low = DashboardRepository.low()

        if total == 0:
            risk_score = 0
        else:
            risk_score = round(
                (
                    (critical * 4)
                    + (high * 3)
                    + (medium * 2)
                    + low
                )
                /
                (total * 4)
                * 100
            )

        return {

            "totalThreats": total,

            "activeAlerts":
            DashboardRepository.active_alerts(),

            "blockedAttacks":
            DashboardRepository.blocked_attacks(),

            "riskScore":
            risk_score,

            "users":
            DashboardRepository.total_users(),

            "totalScans":
            DashboardRepository.total_scans(),

            "safeScans":
            DashboardRepository.safe_scans(),

            "phishingScans":
            DashboardRepository.phishing_scans(),

            "severity": {

                "Critical": critical,

                "High": high,

                "Medium": medium,

                "Low": low,
            },
        }