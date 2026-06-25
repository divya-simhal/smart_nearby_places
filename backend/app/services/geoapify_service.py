import httpx

from app.core.config import settings


async def get_places(
    lat: float,
    lon: float,
    category: str,
    radius: int = 5000
):

    url = "https://api.geoapify.com/v2/places"

    params = {
        "categories": category,
        "filter": f"circle:{lon},{lat},{radius}",
        "bias": f"proximity:{lon},{lat}",
        "limit": 20,
        "apiKey": settings.GEOAPIFY_API_KEY
    }

    async with httpx.AsyncClient() as client:

        response = await client.get(
            url,
            params=params
        )

        response.raise_for_status()

        return response.json()