import { useState } from "react";
import { skillExtras, skillsNote } from "../data/content";
import { techCategories, techStack } from "../data/techStack";
import { techIcons } from "../data/techIcons";
import ProgressBar from "./ProgressBar";
import Reveal from "./Reveal";

const FILTERS = ["All", ...techCategories];

function TechIcon({ name, icon }) {
  const data = techIcons[icon];

  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-paper-mist"
      aria-hidden="true"
    >
      {data ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current text-[color:var(--brand)] dark:text-[color:var(--brand-dark)]"
          style={{ "--brand": data.hex, "--brand-dark": data.darkHex }}
        >
          <path d={data.path} />
        </svg>
      ) : (
        <span className="font-mono text-sm text-ink-muted">
          {name.charAt(0)}
        </span>
      )}
    </span>
  );
}

function ChipColumn({ title, items, dashed = false }) {
  if (!items?.length) return null;

  return (
    <div>
      <h3 className="eyebrow mb-3">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={
              dashed
                ? "rounded-full border border-dashed border-forest/50 px-3 py-1 font-mono text-[11px] text-forest"
                : "rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-soft"
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TechStack() {
  const [filter, setFilter] = useState("All");

  const items = (
    filter === "All"
      ? techStack
      : techStack.filter((tech) => tech.category === filter)
  )
    .slice()
    .sort((a, b) => b.level - a.level);

  const hasExtras =
    skillExtras.familiar?.length > 0 || skillExtras.learning?.length > 0;

  return (
    <section id="skills" className="bg-paper-sage py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">— Skills & Stack</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Everything I build with
          </h2>
          <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-ink-muted">
            {skillsNote}
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div
            className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter technologies by category"
          >
            {FILTERS.map((name) => {
              const active = filter === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFilter(name)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[12px] transition-colors ${
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <p className="sr-only" aria-live="polite">
            {items.length} technologies shown
          </p>

          <ul
            key={filter}
            className="mt-6 grid animate-fadeUp grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((tech) => (
              <li
                key={tech.name}
                className="rounded-xl border border-line bg-paper p-4"
              >
                <div className="flex items-center gap-3">
                  <TechIcon name={tech.name} icon={tech.icon} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="truncate text-[14px] font-medium text-ink">
                        {tech.name}
                      </p>
                      {tech.version && (
                        <span className="shrink-0 rounded border border-line px-1 font-mono text-[10px] text-ink-muted">
                          v{tech.version}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[12px] text-ink-muted">
                      {tech.note}
                    </p>
                  </div>

                  <span className="font-mono text-[12px] text-ink-soft">
                    {tech.level}%
                  </span>
                </div>

                <div className="mt-3">
                  <ProgressBar value={tech.level} />
                </div>
              </li>
            ))}
          </ul>

          {filter === "All" && hasExtras && (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <ChipColumn
                title="Also familiar with"
                items={skillExtras.familiar}
              />
              <ChipColumn
                title="Currently learning"
                items={skillExtras.learning}
                dashed
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}