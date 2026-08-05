from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.threats import router as threat_router
from app.routes.auth import router as auth_router
from app.routes import audit_logs
from app.routes import notifications
from app.routes import dashboard
from app.routes.ai_scanner import router as ai_scanner_router
from app.routes import scan_history

app = FastAPI(
    title="ShadowWatch API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://shadow-watch-hzqa.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(threat_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(audit_logs.router)
app.include_router(notifications.router)
app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])
app.include_router(ai_scanner_router, prefix="/api")
app.include_router(scan_history.router)