from fastapi import APIRouter, Depends
from bson import ObjectId

from app.dependencies import verify_token
from app.database import notification_collection
from datetime import datetime

router = APIRouter(
    prefix="/api/notifications",
    tags=["Notifications"]
)


@router.get("/")
async def get_notifications(user=Depends(verify_token)):
    notifications = list(notification_collection.find())

    for notification in notifications:
        notification["_id"] = str(notification["_id"])

    return notifications


@router.post("/")
async def create_notification(notification: dict, user=Depends(verify_token)):
    notification["read"] = False
    notification["timestamp"] = datetime.utcnow().isoformat()

    result = notification_collection.insert_one(notification)

    return {
        "message": "Notification created successfully",
        "id": str(result.inserted_id)
    }


@router.put("/{notification_id}/read")
async def mark_as_read(notification_id: str, user=Depends(verify_token)):
    notification_collection.update_one(
        {"_id": ObjectId(notification_id)},
        {"$set": {"read": True}}
    )

    return {"message": "Notification marked as read"}


@router.delete("/clear")
async def clear_notifications(user=Depends(verify_token)):
    notification_collection.delete_many({})

    return {"message": "All notifications cleared"}
@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: str,
    user=Depends(verify_token)
):
    result = notification_collection.delete_one(
        {"_id": ObjectId(notification_id)}
    )

    if result.deleted_count == 0:
        return {
            "message": "Notification not found"
        }

    return {
        "message": "Notification deleted successfully"
    }