from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.recommend import router as recommend_router
from app.api.geoapify_test import router as debug_router

app = FastAPI(
    title="Smart Nearby Places API",
    description=(
        "Mood-based nearby places recommender. "
        "Recommendations are produced by a transparent, rule-based "
        "scoring engine (distance + amenities) - no ML/AI models involved."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend_router)
app.include_router(debug_router)


@app.get("/health")
def health():
    return {"status": "ok"}
