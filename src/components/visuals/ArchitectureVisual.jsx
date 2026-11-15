const NODES = [
  { title: "React", note: "UI", accent: false },
  { title: "Express API", note: "Auth, roles", accent: true },
  { title: "MySQL", note: "Data", accent: false },
];

export default function ArchitectureVisual() {
  return (
    <div
      className="flex h-full items-center justify-center"
      role="img"
      aria-label="Diagram: React frontend calls an Express REST API, which uses a MySQL database"
    >
      <div className="flex w-full items-center" aria-hidden="true">
        {NODES.map((node, i) => (
          <div key={node.title} className="flex flex-1 items-center">
            <div
              className={`flex-1 rounded-lg border px-2 py-3 text-center ${
                node.accent
                  ? "border-forest/40 bg-forest-light/50"
                  : "border-line bg-paper-mist"
              }`}
            >
              <p className="font-mono text-[12px] font-medium text-ink">
                {node.title}
              </p>
              <p className="text-[10px] text-ink-muted">{node.note}</p>
            </div>
            {i < NODES.length - 1 && <div className="h-px w-4 bg-line" />}
          </div>
        ))}
      </div>
    </div>
  );
}