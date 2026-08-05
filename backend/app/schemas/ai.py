from pydantic import BaseModel, HttpUrl


class ScanURLRequest(BaseModel):
    url: HttpUrl


class ScanURLResponse(BaseModel):
    url: str
    prediction: str
    confidence: float
    risk: str
    explanation: str