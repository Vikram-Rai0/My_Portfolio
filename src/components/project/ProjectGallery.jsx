import { useState } from "react";
import { getVisual } from "../visuals";

/** Large preview with thumbnails. Falls back to the illustration without images. */
export default function ProjectGallery({ project }) {
  const [failed, setFailed] = useState(() => new Set());
  const [active, setActive] = useState(0);

  const images = (project.images ?? []).filter((src) => !failed.has(src));
  const current = images.length ? Math.min(active, images.length - 1) : 0;
  const Visual = getVisual(project.visual);

  const markFailed = (src) =>
    setFailed((previous) => new Set(previous).add(src));

  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-paper-mist shadow-[0_18px_44px_-24px_rgba(20,21,26,0.45)] dark:shadow-[0_18px_44px_-24px_rgba(0,0,0,0.9)]">
        {images.length > 0 ? (
          images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.title} screenshot ${i + 1} of ${images.length}`}
              aria-hidden={i !== current}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              onError={() => markFailed(src)}
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="h-40 w-full max-w-md">
              <Visual />
            </div>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={i === current}
                className={`block aspect-[16/10] w-full overflow-hidden rounded-lg border transition-all ${
                  i === current
                    ? "border-forest shadow-[0_8px_16px_-10px_rgba(20,21,26,0.5)]"
                    : "border-line opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => markFailed(src)}
                  className="h-full w-full object-cover object-top"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}