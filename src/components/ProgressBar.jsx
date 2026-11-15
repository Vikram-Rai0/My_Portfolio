import { useEffect, useRef, useState } from "react";

/** Thin bar that fills to `value`% the first time it scrolls into view. */
export default function ProgressBar({ value }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-1.5 w-full overflow-hidden rounded-full bg-line"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left rounded-full bg-forest transition-transform duration-[900ms] ease-out"
        style={{ transform: `scaleX(${shown ? value / 100 : 0})` }}
      />
    </div>
  );
}