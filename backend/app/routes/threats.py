from fastapi import APIRouter, Depends

from app.dependencies import verify_token
from app.schemas.threat import ThreatCreate, ThreatUpdate
from app.schemas.common import MessageResponse
from app.services.threat_service import ThreatService

router = APIRouter()


@router.get("/threats")
def get_threats(user=Depends(verify_token)):
    return ThreatService.get_all()


@router.post(
    "/threats",
    response_model=MessageResponse
)
def add_threat(
    threat: ThreatCreate,
    user=Depends(verify_token)
):
    return ThreatService.add(
        threat,
        user
    )


@router.put(
    "/threats/{threat_id}",
    response_model=MessageResponse
)
def update_threat(
    threat_id: int,
    updated_data: ThreatUpdate,
    user=Depends(verify_token)
):
    return ThreatService.update(
        threat_id,
        updated_data
    )


@router.delete(
    "/threats/{threat_id}",
    response_model=MessageResponse
)
def delete_threat(
    threat_id: int,
    user=Depends(verify_token)
):
    return ThreatService.delete(
        threat_id
    )