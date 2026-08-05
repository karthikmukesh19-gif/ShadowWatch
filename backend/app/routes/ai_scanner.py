from fastapi import APIRouter, Depends

from app.dependencies import verify_token
from app.schemas.ai import (
    ScanURLRequest,
    ScanURLResponse,
)
from app.services.ai_service import AIService

router = APIRouter()


@router.post(
    "/scan-url",
    response_model=ScanURLResponse
)
def scan_url(
    data: ScanURLRequest,
    user=Depends(verify_token)
):

    return AIService.scan_url(
        str(data.url),
        user
    )