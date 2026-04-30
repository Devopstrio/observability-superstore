from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, metrics, logs, traces, events, correlations, alerts, dashboard
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
api_router.include_router(logs.router, prefix="/logs", tags=["logs"])
api_router.include_router(traces.router, prefix="/traces", tags=["traces"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(correlations.router, prefix="/correlations", tags=["correlations"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
