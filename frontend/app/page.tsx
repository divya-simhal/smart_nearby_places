"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, LocateFixed } from "lucide-react";

import MoodSelector from "@/components/MoodSelector";
import ResultCard from "@/components/ResultCard";
import ScoringFormula from "@/components/ScoringFormula";
import { fetchRecommendations } from "@/lib/api";
import { Mood, PlaceResult } from "@/types";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-mute">
      Loading map…
    </div>
  ),
});

type Status = "idle" | "locating" | "loading" | "error" | "done";

export default function Home() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  function handleMoodSelect(selected: Mood) {
    setMood(selected);
    setError(null);
    setStatus("locating");

    if (!navigator.geolocation) {
      setStatus("error");
      setError("Geolocation isn't supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords({ lat, lng });
        setStatus("loading");

        try {
          const data = await fetchRecommendations(selected, lat, lng);
          setResults(data.results);
          setStatus("done");
        } catch (err) {
          setStatus("error");
          setError("Couldn't reach the recommendations API. Is the backend running?");
        }
      },
      () => {
        setStatus("error");
        setError("Location access was denied - allow it to get nearby results.");
      }
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8 lg:px-16">
      <header className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-400">
          Rule-based · No ML/AI
        </p>
        <h1 className="mt-2 font-display text-3xl text-bone sm:text-4xl">
          Find your next stop, picked by clear rules — not a black box.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Pick a mood. We map it to a Geoapify place category, fetch what&apos;s
          actually nearby, and rank it with a formula you can read below.
        </p>

        <div className="mt-6">
          <MoodSelector
            selected={mood}
            onSelect={handleMoodSelect}
            disabled={status === "locating" || status === "loading"}
          />
        </div>

        {(status === "locating" || status === "loading") && (
          <p className="mt-4 flex items-center gap-2 text-sm text-mute">
            <Loader2 size={14} className="animate-spin" />
            {status === "locating" ? "Getting your location…" : "Fetching nearby places…"}
          </p>
        )}

        {status === "error" && error && (
          <p className="mt-4 flex items-center gap-2 text-sm text-amber-400">
            <LocateFixed size={14} />
            {error}
          </p>
        )}
      </header>

      {status === "done" && coords && (
        <section className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-2">
            <p className="text-xs text-mute">{results.length} results, ranked highest score first</p>
            <div className="space-y-2">
              {results.map((place, idx) => (
                <ResultCard
                  key={place.id}
                  place={place}
                  rank={idx + 1}
                  active={hoveredId === place.id}
                  onHover={setHoveredId}
                />
              ))}
            </div>
            <ScoringFormula />
          </div>

          <div className="h-[420px] overflow-hidden rounded-lg border border-graphite-700 lg:h-auto lg:min-h-[480px]">
            <MapView
              userLat={coords.lat}
              userLng={coords.lng}
              places={results}
              hoveredId={hoveredId}
            />
          </div>
        </section>
      )}
    </main>
  );
}
