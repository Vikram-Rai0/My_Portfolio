import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import {
  OG_DESCRIPTION,
  SITE_DESCRIPTION,
  SITE_TITLE,
  siteUrl,
} from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Vikram Rai",
  authors: [{ name: "Vikram Rai" }],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "Vikram Rai",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/portrait.jpg",
        width: 2187,
        height: 2916,
        alt: "Portrait of Vikram Rai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: ["/portrait.jpg"],
  },
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
};

// Runs before first paint: applies the saved or system theme so there is no flash.
const themeScript = `(function () {
  try {
    var theme = null;
    try { theme = localStorage.getItem("portfolio-theme"); } catch (e) {}
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#111714" : "#ffffff");
  } catch (e) {}
})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
