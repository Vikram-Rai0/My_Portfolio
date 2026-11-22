import Link from "next/link";

const CARD_SHADOW =
  "shadow-[0_10px_26px_-20px_rgba(20,21,26,0.35)] dark:shadow-none";

const pad = (n) => String(n).padStart(2, "0");

export function Paragraphs({ items }) {
  return (
    <div className="max-w-2xl space-y-4">
      {items.map((text) => (
        <p key={text.slice(0, 40)} className="text-[15px] leading-7 text-ink-soft">
          {text}
        </p>
      ))}
    </div>
  );
}

/** Items can be plain strings or { title, text }. */
export function NumberedList({ items }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isText = typeof item === "string";
        const key = isText ? item : item.title;

        return (
          <li key={key} className="flex gap-5 py-4">
            <span className="pt-1 font-mono text-[11px] tabular-nums text-ink-muted">
              {pad(i + 1)}
            </span>
            <div className="min-w-0">
              {isText ? (
                <p className="text-[15px] leading-relaxed text-ink-soft">{item}</p>
              ) : (
                <>
                  <p className="text-[15px] font-semibold leading-snug text-ink">
                    {item.title}
                  </p>
                  {item.text && (
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                      {item.text}
                    </p>
                  )}
                </>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function FeatureGrid({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.title}
          className={`rounded-xl border border-line bg-paper p-5 ${CARD_SHADOW}`}
        >
          <p className="text-[14px] font-semibold leading-snug text-ink">
            {item.title}
          </p>
          {item.text && (
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              {item.text}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

function TechGroup({ label, items }) {
  if (!items.length) return null;

  return (
    <div>
      <h3 className="eyebrow mb-3">{label}</h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((tech) => (
          <li
            key={tech.name}
            className="flex items-baseline justify-between gap-4 rounded-lg border border-line bg-paper px-4 py-2.5"
          >
            <span className="text-[14px] font-medium text-ink">{tech.name}</span>
            {tech.note && (
              <span className="truncate text-right text-[12px] text-ink-muted">
                {tech.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechnologyList({ core, also }) {
  return (
    <div className="space-y-8">
      <TechGroup label="Core stack" items={core} />
      <TechGroup label="Also used" items={also} />
    </div>
  );
}

export function LayerList({ layers }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {layers.map((layer) => (
        <div
          key={layer.name}
          className="grid gap-1 py-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6"
        >
          <dt className="eyebrow pt-0.5">{layer.name}</dt>
          <dd className="text-[14px] leading-relaxed text-ink-soft">
            {layer.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Short version for the project details page. */
export function ChallengeCompact({ items }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.title} className="py-5">
          <p className="text-[15px] font-semibold leading-snug text-ink">
            {item.title}
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
            {item.challenge}
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
            <span className="mr-2 font-mono text-[11px] uppercase tracking-wide text-forest">
              Solution
            </span>
            {item.resolution}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Full version for the case study page. */
export function ChallengeFull({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`rounded-xl border border-line bg-paper p-6 ${CARD_SHADOW}`}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] tabular-nums text-ink-muted">
              {pad(i + 1)}
            </span>
            <h3 className="text-[16px] font-semibold leading-snug text-ink">
              {item.title}
            </h3>
          </div>

          <div className="mt-4 grid gap-5 border-t border-line pt-4 md:grid-cols-2 md:gap-8">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest2 text-ink-muted">
                Challenge
              </p>
              <p className="text-[14px] leading-relaxed text-ink-soft">
                {item.challenge}
              </p>
            </div>
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest2 text-forest">
                Solution
              </p>
              <p className="text-[14px] leading-relaxed text-ink-soft">
                {item.resolution}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DecisionGrid({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.title}
          className={`rounded-xl border border-line bg-paper p-5 ${CARD_SHADOW}`}
        >
          <p className="text-[14px] font-semibold leading-snug text-ink">
            {item.title}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function BulletList({ items }) {
  return (
    <ul className="max-w-2xl space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
        >
          <span
            className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-forest"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export const primaryButton =
  "inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-mono text-[12px] uppercase tracking-wide text-paper shadow-[0_12px_24px_-14px_rgba(20,21,26,0.6)] transition-transform hover:-translate-y-0.5 dark:shadow-none";

export const secondaryButton =
  "inline-flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-3.5 font-mono text-[12px] uppercase tracking-wide text-ink-soft transition-colors hover:border-ink hover:text-ink";

export function CaseStudyCta({ project }) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-paper p-8 shadow-[0_18px_44px_-28px_rgba(20,21,26,0.4)] dark:shadow-none md:flex-row md:items-center md:p-10">
      <div className="max-w-xl">
        <p className="eyebrow mb-3">Case study</p>
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Want the engineering detail?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          The case study covers background, technical decisions, architecture,
          implementation, challenges and lessons learned for {project.title}.
        </p>
      </div>

      <Link href={`/projects/${project.id}/case-study`} className={primaryButton}>
        View Case Study
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

function NavCard({ label, project, to, alignRight }) {
  return (
    <Link
      href={to}
      className={`group block rounded-xl border border-line bg-paper p-5 transition-colors hover:border-forest/40 ${CARD_SHADOW} ${
        alignRight ? "sm:text-right" : ""
      }`}
    >
      <p className="eyebrow">{label}</p>
      <p className="mt-2 text-[16px] font-semibold text-ink">{project.title}</p>
      <p className="mt-1 text-[13px] text-ink-muted">
        {project.index} / {project.year}
      </p>
    </Link>
  );
}

/** Previous / next project links. `suffix` keeps users on the same page type. */
export function ProjectNav({ prev, next, suffix = "" }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
      {prev && (
        <NavCard
          label="← Previous project"
          project={prev}
          to={`/projects/${prev.id}${suffix}`}
        />
      )}
      {next && (
        <div className={prev ? "" : "sm:col-start-2"}>
          <NavCard
            label="Next project →"
            project={next}
            to={`/projects/${next.id}${suffix}`}
            alignRight
          />
        </div>
      )}
    </nav>
  );
}