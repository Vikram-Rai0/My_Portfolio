import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Page not found — Vikram Rai",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <ThemeToggle className="absolute right-6 top-6" />
      <p className="eyebrow">404</p>
      <h1 className="text-3xl font-extrabold text-ink">Page not found</h1>
      <p className="max-w-sm text-[15px] text-ink-soft">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wide text-paper transition-transform hover:-translate-y-0.5"
      >
        Back home
      </Link>
    </div>
  );
}
