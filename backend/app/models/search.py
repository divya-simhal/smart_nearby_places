from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from datetime import datetime

from app.db.database import Base


class Search(Base):

    __tablename__ = "searches"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    mood = Column(String)

    budget = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    radius = Column(Integer)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )