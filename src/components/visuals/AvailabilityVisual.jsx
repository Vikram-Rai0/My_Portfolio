const SLOTS = [
  ["6:00", "booked"],
  ["7:00", "available"],
  ["8:00", "available"],
  ["9:00", "pending"],
  ["10:00", "booked"],
  ["11:00", "available"],
  ["12:00", "available"],
  ["13:00", "booked"],
];

const STYLES = {
  available: "border-forest/40 bg-forest-light/50 text-forest",
  booked: "border-line bg-line/50 text-ink-muted",
  pending: "border-dashed border-forest bg-paper text-forest",
};

const LABELS = {
  available: "Available",
  booked: "Booked",
  pending: "Pending (15 min hold)",
};

export default function AvailabilityVisual() {
  return (
    <div
      className="flex h-full flex-col justify-center"
      role="img"
      aria-label="Illustration of a booking grid with available, booked and pending time slots"
    >
      <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
        {SLOTS.map(([time, status]) => (
          <div
            key={time}
            className={`rounded-md border py-1.5 text-center font-mono text-[11px] ${STYLES[status]}`}
          >
            {time}
          </div>
        ))}
      </div>

      <ul
        className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-ink-muted"
        aria-hidden="true"
      >
        {Object.entries(LABELS).map(([status, label]) => (
          <li key={status} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-[3px] border ${STYLES[status]}`} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}