import { aboutIntro, mindsetPillars } from "@/data/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-paper-sage py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="eyebrow mb-3">— About</p>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                More than just writing code.
              </h2>
            </div>

            <div>
              {aboutIntro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mb-5 text-[15px] leading-relaxed text-ink-soft last:mb-0"
                >
                  {paragraph}
                </p>
              ))}

              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {aboutIntro.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[11px] uppercase tracking-widest2 text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          <h3 className="eyebrow mb-8 mt-16">— Engineering Mindset</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mindsetPillars.map((pillar) => (
              <div
                key={pillar.index}
                className="rounded-xl border border-line bg-paper p-6 transition-colors hover:border-forest/40"
              >
                <span className="font-mono text-[11px] text-ink-muted">
                  {pillar.index}
                </span>
                <h4 className="mt-4 text-base font-semibold text-ink">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
