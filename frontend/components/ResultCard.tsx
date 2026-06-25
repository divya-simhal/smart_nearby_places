import { MapPin } from "lucide-react";

import { PlaceResult } from "@/types";
import ScoreGauge from "./ScoreGauge";

interface Props {
  place: PlaceResult;
  rank: number;
  active: boolean;
  onHover: (id: number | null) => void;
}

export default function ResultCard({ place, rank, active, onHover }: Props) {
  return (
    <div
      onMouseEnter={() => onHover(place.id)}
      onMouseLeave={() => onHover(null)}
      className={[
        "flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors",
        active
          ? "border-amber-400/60 bg-graphite-800"
          : "border-graphite-700 bg-graphite-900",
      ].join(" ")}
    >
      <span className="font-display text-sm text-graphite-700 w-5">
        {String(rank).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-base text-bone">{place.name}</p>
        <p className="flex items-center gap-1 truncate text-xs text-mute">
          <MapPin size={12} className="shrink-0" />
          {place.address || "Address not listed"}
        </p>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-mute">
          <span className="rounded bg-graphite-800 px-1.5 py-0.5 text-amber-400">
            {place.category.replace("catering.", "")}
          </span>
          <span>{place.distance_km} km away</span>
        </div>
      </div>

      <ScoreGauge score={place.score} />
    </div>
  );
}
