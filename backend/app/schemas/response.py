from pydantic import BaseModel


class PlaceResponse(BaseModel):
    name: str
    address: str
    category: str
    distance: float
    score: float