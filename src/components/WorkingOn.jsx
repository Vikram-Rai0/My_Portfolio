import { currentlyWorking } from "@/data/content";
import Reveal from "./Reveal";

function Column({ label, items, dashed = false }) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{label}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.title}
            className={`rounded-xl border bg-paper p-5 ${
              dashed ? "border-dashed border-forest/40" : "border-line"
            }`}
          >
            <p className="text-base font-semibold text-ink">{item.title}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WorkingOn() {
  return (
    <section id="now" className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">— Now</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            What I’m working on
          </h2>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <Column label="Building" items={currentlyWorking.building} />
            <Column label="Learning" items={currentlyWorking.learning} dashed />
          </div>
        </Reveal>
      </div>
    </section>
  );
}