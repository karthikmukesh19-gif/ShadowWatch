from pydantic import BaseModel
from typing import Optional


class ThreatCreate(BaseModel):
    id: int
    threat: str
    severity: str
    status: str


class ThreatUpdate(BaseModel):
    threat: Optional[str] = None
    severity: Optional[str] = None
    status: Optional[str] = None