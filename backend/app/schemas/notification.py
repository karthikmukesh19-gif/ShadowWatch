from pydantic import BaseModel


class NotificationCreate(BaseModel):
    title: str
    severity: str