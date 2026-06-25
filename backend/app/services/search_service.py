from app.models.search import Search


def create_search(
    db,
    mood,
    latitude,
    longitude,
    radius
):

    search = Search(
        mood=mood,
        latitude=latitude,
        longitude=longitude,
        radius=radius
    )

    db.add(search)
    db.commit()
    db.refresh(search)

    return search