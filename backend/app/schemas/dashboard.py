from pydantic import BaseModel


class DashboardStats(BaseModel):
    totalThreats: int
    activeAlerts: int
    resolvedThreats: int
    users: int