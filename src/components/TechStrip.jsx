
import { techMarquee } from "@/data/content";

const techLogos = {
  React: "react/react-original.svg",
  JavaScript: "javascript/javascript-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  "Express.js": "express/express-original.svg",
  MySQL: "mysql/mysql-original.svg",
  Redis: "redis/redis-original.svg",
  "REST APIs": null,
  "Socket.IO": "socketio/socketio-original.svg",
  "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
  "TanStack Query": null,
  Git: "git/git-original.svg",
  GitHub: "github/github-original.svg",
  Vercel: null,
};
const getLogoUrl = (tech) => {
  const logo = techLogos[tech];

  return logo
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${logo}`
    : null;
};

export default function TechStrip() {
  const items = [...techMarquee, ...techMarquee];

  return (
    <div className="relative overflow-hidden border-y border-line bg-paper-mist">
      {/* Left and right fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper-mist to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper-mist to-transparent md:w-28" />

      <div className="group py-5 md:py-6">
        <div className="techstrip-track flex w-max items-center gap-x-12 md:gap-x-14">
          {items.map((tech, index) => {
            const logo = getLogoUrl(tech);

            return (
              <div
                key={`${tech}-${index}`}
                className="flex shrink-0 items-center gap-3 text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-5 w-5 object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 items-center justify-center rounded border border-line font-mono text-[9px] font-semibold"
                  >
                    {tech.slice(0, 2).toUpperCase()}
                  </span>
                )}

                <span className="font-mono text-[11px] uppercase tracking-widest2">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes techstrip-marquee {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0%);
          }
        }

        .techstrip-track {
          animation: techstrip-marquee 28s linear infinite;
        }

        .group:hover .techstrip-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .techstrip-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
