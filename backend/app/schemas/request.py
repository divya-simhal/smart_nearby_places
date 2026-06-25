from typing import Literal

from pydantic import BaseModel, Field

Mood = Literal["work", "date", "quick_bite", "budget"]


class RecommendationRequest(BaseModel):
    mood: Mood
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    radius: int = Field(default=5000, ge=500, le=20000)
