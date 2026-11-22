import Link from "next/link";
import { siteMeta } from "@/data/content";
import Footer from "../Footer";
import ThemeToggle from "../ThemeToggle";

/** Shared shell for project pages: sticky header with back link, theme toggle and footer. */
export default function ProjectLayout({ children }) {
  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-2.5 font-mono text-[13px] text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-ink-soft transition-colors hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to projects
          </Link>

          <Link
            href="/"
            className="hidden font-mono text-[13px] font-medium uppercase tracking-widest2 text-ink sm:block"
          >
            {siteMeta.name}
          </Link>

          <ThemeToggle />
        </div>
      </header>

      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
