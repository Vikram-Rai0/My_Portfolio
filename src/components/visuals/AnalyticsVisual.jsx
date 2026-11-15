const BARS = [40, 65, 50, 80, 60, 90, 70];

export default function AnalyticsVisual() {
  return (
    <div
      className="flex h-full items-end"
      role="img"
      aria-label="Decorative bar chart"
    >
      <div className="flex h-24 w-full items-end gap-2" aria-hidden="true">
        {BARS.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-forest/60"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}