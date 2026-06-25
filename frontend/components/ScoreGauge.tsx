interface Props {
  score: number;
  size?: number;
}

/**
 * Renders the rule-based score (0-120ish, typically capped visually at 100)
 * as a radial gauge. This is deliberately literal: the score is a real
 * number coming out of a simple, inspectable formula - not a model's
 * confidence - so showing it as a precise readout (not a vague "great match"
 * label) matches the project's "transparent rules" positioning.
 */
export default function ScoreGauge({ score, size = 44 }: Props) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          className="text-graphite-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-amber-400 transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[11px] text-bone">
        {Math.round(score)}
      </span>
    </div>
  );
}
