
import { useEffect, useState } from "react";
import { navLinks, siteMeta } from "../data/content";
import { linkProps } from "../utils/links";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock page scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close the menu with Escape or when entering desktop view.
  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleResize = (event) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKey);
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
      <nav
        className="container-page flex h-16 items-center justify-between md:h-20"
        aria-label="Primary"
      >
        <a
          href="#top"
          onClick={handleLinkClick}
          className="font-mono text-[13px] font-medium uppercase tracking-widest2 text-ink"
        >
          {siteMeta.name}
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-5 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-[13px] text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href={siteMeta.resumeHref}
            {...linkProps(siteMeta.resumeHref)}
            className="hidden rounded-full bg-ink px-5 py-2.5 font-mono text-[13px] font-medium text-paper transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            Resume
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span
              aria-hidden="true"
              className="relative block h-3 w-4"
            >
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform ${
                  isOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-4 bg-ink transition-transform ${
                  isOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="border-t border-line bg-paper px-6 pb-8 pt-4 md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block py-3 font-mono text-sm uppercase tracking-wide text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={siteMeta.resumeHref}
          {...linkProps(siteMeta.resumeHref)}
          onClick={handleLinkClick}
          className="mt-4 block rounded-full bg-ink px-5 py-3 text-center font-mono text-[13px] font-medium text-paper transition-transform hover:-translate-y-0.5"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
