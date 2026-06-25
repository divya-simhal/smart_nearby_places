"use client";

import { Mood, MOOD_OPTIONS } from "@/types";

interface Props {
  selected: Mood | null;
  onSelect: (mood: Mood) => void;
  disabled?: boolean;
}

export default function MoodSelector({ selected, onSelect, disabled }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {MOOD_OPTIONS.map((opt) => {
        const isActive = selected === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
            className={[
              "group flex flex-col items-start gap-2 rounded-xl border px-4 py-4 text-left transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
              isActive
                ? "border-amber-400 bg-graphite-800"
                : "border-graphite-700 bg-graphite-900 hover:border-graphite-700/80 hover:bg-graphite-800",
              disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
            ].join(" ")}
          >
            <span
              className={[
                "font-display text-lg",
                isActive ? "text-amber-400" : "text-bone",
              ].join(" ")}
            >
              {opt.label}
            </span>
            <span className="text-sm text-mute">{opt.blurb}</span>
            <span className="mt-1 font-mono text-[11px] text-graphite-700 group-hover:text-mute">
              {opt.rule}
            </span>
          </button>
        );
      })}
    </div>
  );
}
