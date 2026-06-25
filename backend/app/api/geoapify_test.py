from fastapi import APIRouter

from app.services.geoapify_service import get_places

router = APIRouter(prefix="/api/debug", tags=["debug"])


@router.get("/geoapify-ping")
async def geoapify_ping():
    """Quick connectivity check against the Geoapify API. Dev use only."""
    data = await get_places(lat=23.2599, lon=77.4126, category="catering.cafe")

    return {"count": len(data.get("features", []))}
