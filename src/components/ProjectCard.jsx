"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getVisual } from "./visuals";
import { linkProps } from "@/lib/links";

const SLIDE_MS = 2000;

const CARD_SHADOW =
  "shadow-[0_14px_36px_-22px_rgba(20,21,26,0.35)] hover:shadow-[0_22px_48px_-24px_rgba(20,21,26,0.45)] dark:shadow-[0_14px_36px_-22px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_22px_48px_-24px_rgba(0,0,0,0.9)]";

const MEDIA_SHADOW =
  "shadow-[0_10px_24px_-14px_rgba(20,21,26,0.4)] dark:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.85)]";

const BUTTON_SHADOW =
  "shadow-[0_8px_18px_-10px_rgba(20,21,26,0.5)] hover:shadow-[0_12px_22px_-12px_rgba(20,21,26,0.55)] dark:shadow-none dark:hover:shadow-none";

// Both sections animate flex-grow, so 3:7 becomes 7:3 without layout jumps.
const SECTION_TRANSITION =
  "min-h-0 transition-[flex-grow] duration-[650ms] ease-[cubic-bezier(0.22,0.8,0.3,1)]";

/**
 * Top section: crossfading screenshots (auto-advance every 2s while on
 * screen, unaffected by hover, paused for reduced motion). Falls back to the
 * project illustration when no images are available.
 */
function ProjectMedia({ project, Visual, expanded, handlers }) {
  const sectionRef = useRef(null);
  const [failed, setFailed] = useState(() => new Set());
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  const images = (project.images ?? []).filter((src) => !failed.has(src));
  const current = images.length ? index % images.length : 0;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (images.length < 2 || !inView || reduceMotion) return undefined;

    const timer = window.setTimeout(
      () => setIndex((value) => (value + 1) % images.length),
      SLIDE_MS
    );

    return () => window.clearTimeout(timer);
  }, [current, images.length, inView, reduceMotion]);

  return (
    <div
      ref={sectionRef}
      {...handlers}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${project.title} screenshots`}
      className={`relative z-10 overflow-hidden rounded-t-2xl border-b border-line bg-paper-mist ${MEDIA_SHADOW} ${SECTION_TRANSITION} ${
        expanded ? "flex-[7_1_0%]" : "flex-[3_1_0%]"
      }`}
    >
      {images.length > 0 ? (
        images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${project.title} screenshot ${i + 1} of ${images.length}`}
            aria-hidden={i !== current}
            fill
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 88vw"
            loading={i === 0 ? "eager" : "lazy"}
            onError={() => setFailed((previous) => new Set(previous).add(src))}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))
      ) : (
        <div className="absolute inset-0 p-5">
          <Visual />
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-line bg-paper/85 px-2.5 py-1.5 shadow-sm backdrop-blur">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === current}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-4 bg-forest"
                  : "w-1.5 bg-ink-muted/40 hover:bg-ink-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project }) {
  const Visual = getVisual(project.visual);
  const [expanded, setExpanded] = useState(false);
  const pointerType = useRef("mouse");

  // Mouse hover expands the image; touch users tap the image to toggle.
  const mediaHandlers = {
    onPointerDown: (event) => {
      pointerType.current = event.pointerType;
    },
    onPointerEnter: (event) => {
      if (event.pointerType === "mouse") setExpanded(true);
    },
    onPointerLeave: (event) => {
      if (event.pointerType === "mouse") setExpanded(false);
    },
    onClick: (event) => {
      if (pointerType.current !== "mouse" && !event.target.closest("button")) {
        setExpanded((value) => !value);
      }
    },
    onFocus: (event) => {
      if (event.target.matches(":focus-visible")) setExpanded(true);
    },
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
    },
  };

  return (
    <article
      className={`relative flex h-[540px] flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-shadow duration-300 sm:h-[460px] ${CARD_SHADOW}`}
    >
      <ProjectMedia
        project={project}
        Visual={Visual}
        expanded={expanded}
        handlers={mediaHandlers}
      />

      <div
        className={`relative overflow-hidden ${SECTION_TRANSITION} ${
          expanded ? "flex-[3_1_0%]" : "flex-[7_1_0%]"
        }`}
      >
        <div className="flex h-full flex-col p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">
                  {project.index} / {project.year}
                </p>
                {project.status && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/30 bg-forest-light/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-forest">
                    <span
                      className="h-1 w-1 rounded-full bg-forest"
                      aria-hidden="true"
                    />
                    {project.status}
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-ink">
                {project.title}
              </h3>
            </div>

            <Link
              href={`/projects/${project.id}`}
              aria-label={`Learn more about ${project.title}`}
              className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-paper transition-all duration-300 hover:-translate-y-0.5 ${BUTTON_SHADOW}`}
            >
              Learn More
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-ink-soft">
            {project.description}
          </p>

          <ul className="mt-4 flex max-h-[56px] flex-wrap gap-1.5 overflow-hidden">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-paper-mist px-2.5 py-0.5 font-mono text-[10px] text-ink-soft"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-4 pt-4 font-mono text-[11px] uppercase tracking-wide">
            <a
              href={project.githubHref}
              {...linkProps(project.githubHref)}
              aria-label={`${project.title} source code on GitHub`}
              className="text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              GitHub ↗
            </a>
            {project.liveHref && (
              <a
                href={project.liveHref}
                {...linkProps(project.liveHref)}
                aria-label={`View ${project.title} live`}
                className="text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>

        {/* Soft fade where details are clipped while the image is expanded */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-paper to-transparent transition-opacity duration-500 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    </article>
  );
}