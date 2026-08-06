from fastapi import APIRouter, Depends

from app.dependencies import verify_token
from app.services.notification_service import NotificationService

router = APIRouter(
    prefix="/api/notifications",
    tags=["Notifications"]
)


@router.get("/")
async def get_notifications(
    user=Depends(verify_token)
):
    return NotificationService.get_notifications()


@router.post("/")
async def create_notification(
    notification: dict,
    user=Depends(verify_token)
):
    return NotificationService.create_notification(notification)


@router.put("/{notification_id}/read")
async def mark_as_read(
    notification_id: str,
    user=Depends(verify_token)
):
    return NotificationService.mark_as_read(notification_id)


@router.delete("/clear")
async def clear_notifications(
    user=Depends(verify_token)
):
    return NotificationService.clear_notifications()


@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: str,
    user=Depends(verify_token)
):
    return NotificationService.delete_notification(notification_id)
