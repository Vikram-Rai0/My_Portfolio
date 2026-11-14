import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "portfolio-theme";
const THEME_COLORS = { light: "#ffffff", dark: "#111714" };

const ThemeContext = createContext(null);

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  return (
    readStoredTheme() ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const transitionTimer = useRef(0);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);

  // Follow the system theme until the visitor manually chooses one.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemTheme = (event) => {
      if (readStoredTheme()) return;
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemTheme);
    return () => mediaQuery.removeEventListener("change", handleSystemTheme);
  }, []);

  useEffect(() => () => window.clearTimeout(transitionTimer.current), []);

  const value = useMemo(() => {
    const toggleTheme = () => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      // Smooth colour change only while toggling, so normal hover
      // transitions and scrolling stay untouched.
      root.classList.add("theme-transition");
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(
        () => root.classList.remove("theme-transition"),
        350
      );

      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        /* storage unavailable (private mode): theme still applies for this visit */
      }

      setTheme(nextTheme);
    };

    return { theme, toggleTheme };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
