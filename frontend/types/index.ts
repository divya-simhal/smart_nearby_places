export type Mood = "work" | "date" | "quick_bite" | "budget";

export interface MoodOption {
  id: Mood;
  label: string;
  blurb: string;
  rule: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "work",
    label: "Work",
    blurb: "Quiet cafés, good for a laptop session",
    rule: "category → catering.cafe",
  },
  {
    id: "date",
    label: "Date",
    blurb: "Sit-down restaurants worth dressing up for",
    rule: "category → catering.restaurant",
  },
  {
    id: "quick_bite",
    label: "Quick bite",
    blurb: "Fast food and cafés, in and out",
    rule: "category → catering.fast_food, catering.cafe",
  },
  {
    id: "budget",
    label: "Budget",
    blurb: "Cheap eats near you",
    rule: "category → catering.fast_food",
  },
];

export interface PlaceResult {
  id: number;
  name: string;
  address: string;
  category: string;
  distance_km: number;
  score: number;
  lat: number | null;
  lng: number | null;
}

export interface RecommendationResponse {
  search_id: number;
  mood: Mood;
  total_results: number;
  results: PlaceResult[];
}
