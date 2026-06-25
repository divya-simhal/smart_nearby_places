from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    ForeignKey
)

from app.db.database import Base


class Recommendation(Base):

    __tablename__ = "recommendations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    search_id = Column(Integer)

    place_name = Column(String)

    address = Column(String)

    category = Column(String)

    distance_km = Column(Float)

    score = Column(Float)

    open_now = Column(Boolean)