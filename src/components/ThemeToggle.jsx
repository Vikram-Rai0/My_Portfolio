"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";
const THEME_COLORS = { light: "#ffffff", dark: "#111714" };

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
}

/**
 * The initial theme is applied by an inline script in <head> before first
 * paint (see layout.js), so there is no flash. This button only toggles it.
 * Icons are swapped with CSS (`dark:` variants), so server and client markup
 * always match.
 */
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    // Follow the system theme until the visitor manually chooses one.
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemTheme = (event) => {
      if (readStoredTheme()) return;
      const next = event.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };

    mediaQuery.addEventListener("change", handleSystemTheme);
    return () => mediaQuery.removeEventListener("change", handleSystemTheme);
  }, []);

  const toggleTheme = () => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Smooth colour change only while toggling.
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 350);

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode): theme still applies for this visit */
    }

    applyTheme(next);
    setTheme(next);
  };

  const label = theme
    ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
    : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-paper-sage ${className}`}
      aria-label={label}
      title={label}
    >
      {/* Sun: shown in dark mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="hidden h-5 w-5 dark:block"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
      {/* Moon: shown in light mode */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5 dark:hidden"
        aria-hidden="true"
      >
        <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
      </svg>
    </button>
  );
}
