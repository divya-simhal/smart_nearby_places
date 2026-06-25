from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.recommendation import Recommendation
from app.schemas.request import RecommendationRequest
from app.services.search_service import create_search
from app.services.mood_service import recommend_by_mood
from app.services.recommendation_service import save_recommendation

router = APIRouter(prefix="/api", tags=["recommendations"])


@router.post("/recommendations")
async def get_recommendations(
    request: RecommendationRequest,
    db: Session = Depends(get_db),
):
    """
    Main endpoint used by the frontend.
    1. Logs the search (mood + location) for history/analytics.
    2. Calls Geoapify via the rule-based mood -> category mapping.
    3. Scores and ranks results, persists them, returns the top 10.
    """
    search = create_search(
        db=db,
        mood=request.mood,
        latitude=request.latitude,
        longitude=request.longitude,
        radius=request.radius,
    )

    places = await recommend_by_mood(
        mood=request.mood,
        lat=request.latitude,
        lon=request.longitude,
        radius=request.radius,
    )

    results = []

    for place in places:
        props = place.get("properties", {})

        recommendation = save_recommendation(
            db=db,
            search_id=search.id,
            place_name=props.get("name", "Unknown"),
            address=props.get("formatted", ""),
            category=props.get("categories", ["unknown"])[0],
            distance_km=round(props.get("distance", 0) / 1000, 2),
            score=props.get("score", 0),
            open_now=True,
        )

        results.append(
            {
                "id": recommendation.id,
                "name": recommendation.place_name,
                "address": recommendation.address,
                "category": recommendation.category,
                "distance_km": recommendation.distance_km,
                "score": recommendation.score,
                "lat": place.get("geometry", {}).get("coordinates", [None, None])[1],
                "lng": place.get("geometry", {}).get("coordinates", [None, None])[0],
            }
        )

    return {
        "search_id": search.id,
        "mood": request.mood,
        "total_results": len(results),
        "results": results,
    }


@router.get("/recommendations/history")
def get_history(db: Session = Depends(get_db)):
    return (
        db.query(Recommendation)
        .order_by(Recommendation.id.desc())
        .limit(50)
        .all()
    )
