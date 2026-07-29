from fastapi import APIRouter, HTTPException

from datetime import datetime

from app.auth import verify_password, create_access_token
from app.models.user import LoginRequest, TokenResponse
from app.database import (
    user_collection,
    audit_logs_collection,
    notification_collection,
)


router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(user: LoginRequest):

    print("Received Username:", user.username)

    db_user = user_collection.find_one({"username": user.username})

    print("DB User:", db_user)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    result = verify_password(user.password, db_user["password"])

    print("Verify Result:", result)

    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        {
            "sub": db_user["username"],
            "role": db_user["role"]
        }
    )

    # Audit Log
    audit_logs_collection.insert_one({
        "user": db_user["username"],
        "action": "Login",
        "details": "User logged into ShadowWatch",
        "status": "Success",
        "timestamp": datetime.utcnow().isoformat()
    })

    # Notification
    notification_collection.insert_one({
        "title": "User Login",
        "severity": "Low",
        "timestamp": datetime.utcnow().isoformat(),
        "read": False
    })

    print("✅ Notification inserted")

    return {
        "access_token": token,
        "token_type": "bearer"
    }