import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

/** Fades and lifts content in once it scrolls into view. */
export default function Reveal({ children, className = "", delayMs = 0 }) {
  const ref = useFadeInOnScroll();

  return (
    <div
      ref={ref}
      className={`fade-in-section ${className}`}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}