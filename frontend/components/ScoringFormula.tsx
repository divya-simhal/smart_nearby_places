export default function ScoringFormula() {
  return (
    <div className="rounded-lg border border-graphite-700 bg-graphite-900 px-4 py-3">
      <p className="font-display text-sm text-bone">How ranking works</p>
      <p className="mt-1 text-xs leading-relaxed text-mute">
        No model, no black box — every score is this formula, run on live
        Geoapify data:
      </p>
      <pre className="mt-2 overflow-x-auto rounded bg-graphite-950 px-3 py-2 font-mono text-[11px] text-amber-400">
        score = 100 − (distance_m ÷ 100) + 20 (if wifi) + 10 (if outdoor seating)
      </pre>
    </div>
  );
}
