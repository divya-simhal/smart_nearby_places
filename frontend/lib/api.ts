import { Mood, RecommendationResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchRecommendations(
  mood: Mood,
  latitude: number,
  longitude: number,
  radius = 5000
): Promise<RecommendationResponse> {
  const res = await fetch(`${API_URL}/api/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood, latitude, longitude, radius }),
  });

  if (!res.ok) {
    throw new Error(`Backend returned ${res.status}`);
  }

  return res.json();
}
