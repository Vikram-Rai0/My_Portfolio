import { experience } from "../data/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">— Experience</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Experience
          </h2>
        </Reveal>

        <ol className="mt-14 border-l border-line pl-8 sm:pl-10">
          {experience.map((item, i) => (
            <li key={item.id} className="relative pb-14 last:pb-0">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full border-2 border-forest bg-paper sm:-left-[calc(2.5rem+5px)]"
                aria-hidden="true"
              />
              <Reveal delayMs={i * 80}>
                <p className="eyebrow mb-2">{item.dateRange ?? item.type}</p>
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                {item.org && (
                  <p className="mt-0.5 text-[13px] text-ink-muted">{item.org}</p>
                )}
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
