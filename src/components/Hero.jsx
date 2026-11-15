import { hero } from "../data/content";
import profileImage from "../assets/Profile.jpg";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-paper-sage to-paper"
    >
      <div className="container-page grid grid-cols-1 gap-12 pb-20 pt-16 md:grid-cols-2 md:gap-8 md:pb-28 md:pt-24">
        <div className="animate-fadeUp">
          <p className="eyebrow mb-6">{hero.eyebrow}</p>

          <h1 className="text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            {hero.headingLines.map((line, i) => (
              <span
                key={line}
                className={`block ${i >= 2 ? "text-ink-muted" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {hero.paragraph}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hero.ctas.map((cta, i) => (
              <a
                key={cta.href}
                href={cta.href}
                className={
                  i === 0
                    ? "rounded-full bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5"
                    : "rounded-full border border-line px-6 py-3 font-mono text-[12px] uppercase tracking-wide text-ink-soft transition-colors hover:border-ink hover:text-ink"
                }
              >
                {cta.label}
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-forest animate-dotPulse"
              aria-hidden="true"
            />
            <span className="eyebrow text-forest">{hero.availability}</span>
          </div>
        </div>

        {/* Decorative portrait composition */}
        <div className="relative order-first flex h-[280px] items-center justify-center md:order-none md:h-auto">
          <span
            className="absolute right-6 top-2 hidden h-40 w-40 rotate-6 rounded-3xl bg-paper-mist ring-1 ring-line md:block"
            aria-hidden="true"
          />
          <span
            className="absolute right-24 top-16 hidden h-32 w-32 -rotate-6 rounded-3xl bg-forest-light/60 md:block"
            aria-hidden="true"
          />

          <span
            className="absolute left-[18%] top-[10%] h-2 w-2 rounded-full bg-forest/70 md:left-[8%] md:top-[6%]"
            aria-hidden="true"
          />
          <span
            className="absolute right-[10%] top-[30%] h-2 w-2 rounded-full bg-forest/50"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-[18%] left-[30%] h-1.5 w-1.5 rounded-full bg-forest/40"
            aria-hidden="true"
          />

          <figure className="relative z-10 w-[220px] rounded-2xl border border-line bg-paper p-2 shadow-[0_20px_45px_-25px_rgba(20,21,26,0.35)] sm:w-[260px]">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-ink">
              <img
                src={profileImage}
                alt={hero.avatarAlt}
                width="260"
                height="325"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="flex items-center gap-2 px-1 pb-1 pt-3">
              <span
                className="h-1.5 w-1.5 rounded-full bg-forest"
                aria-hidden="true"
              />
              <span className="eyebrow">{hero.avatarCaption}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
