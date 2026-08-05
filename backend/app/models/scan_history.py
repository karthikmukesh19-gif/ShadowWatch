from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.database import Base


class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String, nullable=False)

    prediction = Column(String, nullable=False)

    confidence = Column(Float, nullable=False)

    risk = Column(String, nullable=False)

    explanation = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)