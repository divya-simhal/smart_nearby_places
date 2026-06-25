# Smart Nearby Places

A mood-based nearby-places recommender. Pick a mood — **work**, **date**,
**quick bite**, or **budget** — and get a ranked list of nearby places on a
live map.

> **No ML / AI models are used anywhere in this project.** Recommendations
> come from a simple, transparent rule set: a mood-to-category mapping plus a
> readable scoring formula (distance + amenities). The scoring logic is shown
> directly in the UI so the ranking is never a black box.

## How it works

1. User picks a mood → frontend maps it to a fixed list of Geoapify place
   categories (e.g. `work` → `catering.cafe`).
2. Backend calls the [Geoapify Places API](https://www.geoapify.com/places-api)
   for that category around the user's coordinates.
3. Each place is scored with one formula:

   ```
   score = 100 − (distance_m ÷ 100) + 20 (if wifi) + 10 (if outdoor seating)
   ```

4. Results are sorted by score, the search + recommendations are persisted to
   Postgres, and the top 10 are returned to the frontend.

## Tech stack

| Layer    | Tech                                                              |
| -------- | ------------------------------------------------------------------ |
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, React-Leaflet  |
| Backend  | FastAPI, SQLAlchemy, Pydantic                                    |
| Data     | PostgreSQL, Redis, Geoapify Places API                            |
| Infra    | Docker Compose (Postgres + Redis)                                  |

## Project structure

```
smart-nearby-places/
├── backend/         FastAPI service (rule-based recommendation API)
│   └── app/
│       ├── api/          route handlers
│       ├── core/         config + mood→category rules
│       ├── db/           SQLAlchemy session/engine
│       ├── models/       ORM models (Search, Recommendation, Favorite)
│       ├── schemas/      Pydantic request/response models
│       ├── services/     business logic (scoring, Geoapify client)
│       └── utils/        haversine distance helper
├── frontend/        Next.js app (mood picker, results list, map)
└── docker-compose.yml   Postgres + Redis for local dev
```

## Running locally

### 1. Infra

```bash
docker-compose up -d
```

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then add your own Geoapify API key
python init_db.py               # creates tables
uvicorn app.main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`

### 3. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

App: `http://localhost:3000`

You'll need a free API key from [geoapify.com](https://www.geoapify.com/) —
add it to `backend/.env` as `GEOAPIFY_API_KEY`.

## API

`POST /api/recommendations`

```json
{ "mood": "work", "latitude": 23.2599, "longitude": 77.4126, "radius": 5000 }
```

Returns the top 10 ranked places with name, address, category, distance, and
score.

`GET /api/recommendations/history` — last 50 saved recommendations.

## Why no ML/AI here

This project is intentionally rule-based. The goal was a recommender whose
logic a user (or an interviewer) can fully audit in one glance — every score
on screen is reproducible by hand from the formula above. It's a deliberate
contrast to "AI-powered" recommenders: same product shape, zero hidden
inference.
