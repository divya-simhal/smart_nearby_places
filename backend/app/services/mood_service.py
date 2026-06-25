from app.core.mood_mapping import MOOD_MAPPING
from app.services.geoapify_service import get_places


def calculate_score(place: dict) -> float:
    """
    Simple, transparent rule-based ranking score.
    No machine learning - just weighted heuristics:
      - closer places score higher
      - amenities (wifi, outdoor seating) add a fixed bonus
    """
    score = 100.0

    properties = place.get("properties", {})

    distance = properties.get("distance", 9999)
    score -= distance / 100

    facilities = properties.get("facilities", {})

    if facilities.get("internet_access"):
        score += 20

    if facilities.get("outdoor_seating"):
        score += 10

    return round(score, 2)


async def recommend_by_mood(
    mood: str,
    lat: float,
    lon: float,
    radius: int = 5000,
):
    categories = MOOD_MAPPING.get(mood, ["catering.cafe"])
    category = ",".join(categories)

    data = await get_places(
        lat=lat,
        lon=lon,
        category=category,
        radius=radius,
    )

    places = data.get("features", [])

    for place in places:
        place["properties"]["score"] = calculate_score(place)

    places.sort(key=lambda p: p["properties"]["score"], reverse=True)

    return places[:10]
