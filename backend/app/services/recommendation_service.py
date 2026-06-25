from app.models.recommendation import Recommendation


def save_recommendation(
    db,
    search_id,
    place_name,
    address,
    category,
    distance_km,
    score,
    open_now
):

    recommendation = Recommendation(
        search_id=search_id,
        place_name=place_name,
        address=address,
        category=category,
        distance_km=distance_km,
        score=score,
        open_now=open_now
    )

    db.add(recommendation)

    db.commit()

    db.refresh(recommendation)

    return recommendation