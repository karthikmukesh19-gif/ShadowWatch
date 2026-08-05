from fastapi import APIRouter, Depends

from app.dependencies import verify_token
from app.services.dashboard_service import DashboardService

router = APIRouter()


@router.get(
    "/dashboard",
    tags=["Dashboard"]
)
def get_dashboard(
    user=Depends(verify_token)
):
    """
    Get live dashboard statistics.
    """

    return DashboardService.get_dashboard()