import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../data/content";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

function ArrowButton({ direction, disabled, onClick }) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous project" : "Next project"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-[0_8px_18px_-10px_rgba(20,21,26,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/50 hover:text-forest hover:shadow-[0_14px_26px_-12px_rgba(20,21,26,0.45)] active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:border-line disabled:hover:text-ink dark:shadow-[0_8px_18px_-10px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_14px_26px_-12px_rgba(0,0,0,0.9)]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d={isPrev ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

// Left edge of a card relative to the scrollable content, minus track padding.
function getCardLeft(track, card) {
  const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  return card.offsetLeft - track.offsetLeft - paddingLeft;
}

export default function SelectedWork() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Track which card is closest to the left edge while scrolling.
  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children);
    let closest = 0;
    let smallest = Infinity;

    cards.forEach((card, i) => {
      const distance = Math.abs(getCardLeft(track, card) - track.scrollLeft);
      if (distance < smallest) {
        smallest = distance;
        closest = i;
      }
    });

    // At the far right the last card may not reach the left edge.
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    setActive(atEnd ? cards.length - 1 : closest);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("resize", updateActive);
    return () => window.removeEventListener("resize", updateActive);
  }, [updateActive]);

  const goTo = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!card) return;

    track.scrollTo({ left: getCardLeft(track, card), behavior: "smooth" });
  };

  const total = String(projects.length).padStart(2, "0");

  return (
    <section id="work" className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">— Selected Work</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Selected Work
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-ink-soft">
                Full-stack projects, and the engineering problems behind them.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-4 sm:flex">
              <p
                className="font-mono text-[12px] tabular-nums text-ink-muted"
                aria-live="polite"
              >
                {String(active + 1).padStart(2, "0")} / {total}
              </p>
              <div className="flex items-center gap-3">
                <ArrowButton
                  direction="prev"
                  disabled={active === 0}
                  onClick={() => goTo(active - 1)}
                />
                <ArrowButton
                  direction="next"
                  disabled={active === projects.length - 1}
                  onClick={() => goTo(active + 1)}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={100}>
          {/* Padding leaves room for card shadows. */}
          <div
            ref={trackRef}
            onScroll={updateActive}
            role="region"
            aria-label="Projects, scroll horizontally"
            tabIndex={0}
            className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 items-start gap-6 overflow-x-auto scroll-smooth px-4 pb-10 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-[88%] shrink-0 snap-start sm:w-[420px] lg:w-[480px]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center gap-2"
            role="group"
            aria-label="Choose project"
          >
            {projects.map((project, i) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${project.title}`}
                aria-current={active === i}
                className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-forest" : "w-1.5 bg-line hover:bg-ink-muted"
                  }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}