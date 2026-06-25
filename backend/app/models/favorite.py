from sqlalchemy import (
    Column,
    Integer,
    String,
    Float
)

from app.db.database import Base


class Favorite(Base):

    __tablename__ = "favorites"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    place_name = Column(String)

    address = Column(String)

    category = Column(String)

    lat = Column(Float)

    lng = Column(Float)