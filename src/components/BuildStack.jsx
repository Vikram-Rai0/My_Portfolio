
import { buildStack } from "../data/content";
import Reveal from "./Reveal";

import {
  Code2,
  Server,
  Database,
  Wrench,
  Layers,
} from "lucide-react";

const technologyInfo = {
  React: {
    logo: "react/react-original.svg",
    description: "Building reusable and interactive user interfaces.",
  },
  Vite: {
    logo: "vitejs/vitejs-original.svg",
    description: "Fast frontend development and build tooling.",
  },
  "Tailwind CSS": {
    logo: "tailwindcss/tailwindcss-original.svg",
    description: "Creating responsive interfaces with utility classes.",
  },
  "TanStack Query": {
    logo: null,
    description: "Managing server state, fetching and caching data.",
  },
  "Framer Motion": {
    logo: null,
    description: "Creating smooth animations and interactions.",
  },
  "Node.js": {
    logo: "nodejs/nodejs-original.svg",
    description: "Running JavaScript applications on the server.",
  },
  "Express.js": {
    logo: "express/express-original.svg",
    description: "Building APIs and backend applications.",
  },
  "Socket.IO": {
    logo: "socketio/socketio-original.svg",
    description: "Enabling real-time, bidirectional communication.",
  },
  Zod: {
    logo: null,
    description: "Validating and managing application data schemas.",
  },
  "web-push": {
    logo: null,
    description: "Sending browser push notifications.",
  },
  MySQL: {
    logo: "mysql/mysql-original.svg",
    description: "Storing and querying relational data.",
  },
  Redis: {
    logo: "redis/redis-original.svg",
    description: "Fast in-memory data storage and caching.",
  },
  Cloudinary: {
    logo: "cloudinary/cloudinary-original.svg",
    description: "Managing and delivering images and media.",
  },
  "Git & GitHub": {
    logo: "github/github-original.svg",
    description: "Version control and collaborative development.",
  },
  Vercel: {
    logo: "vercel/vercel-original.svg",
    description: "Deploying and hosting web applications.",
  },
  Railway: {
    logo: null,
    description: "Deploying and managing application infrastructure.",
  },
  Postman: {
    logo: "postman/postman-original.svg",
    description: "Testing and debugging API requests.",
  },
  "vite-plugin-pwa": {
    logo: null,
    description: "Adding installable and offline-ready web app features.",
  },
};

const groupIcons = {
  frontend: Code2,
  backend: Server,
  data: Database,
  tools: Wrench,
};

function getGroupIcon(label) {
  const normalized = label.toLowerCase();

  if (normalized.includes("frontend")) return groupIcons.frontend;
  if (normalized.includes("backend")) return groupIcons.backend;
  if (normalized.includes("data")) return groupIcons.data;
  if (normalized.includes("tool")) return groupIcons.tools;

  return Layers;
}

function TechnologyCard({ item }) {
  const info = technologyInfo[item.name];

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-line bg-paper p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-md hover:shadow-ink/5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-paper-sage p-2.5">
        {info?.logo ? (
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${info.logo}`}
            alt={`${item.name} logo`}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-sm font-bold text-forest">
            {item.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-ink">
          {item.name}
        </h4>

        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          {info?.description || "Used in modern web application development."}
        </p>
      </div>
    </li>
  );
}

export default function BuildStack() {
  return (
    <section id="stack" className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">— Technology Stack</p>

          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Tools I work with
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-ink-muted">
            Technologies and tools I use to develop, maintain,
            and deploy modern web applications.
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {buildStack.map((group) => {
              const Icon = getGroupIcon(group.label);

              return (
                <article
                  key={group.label}
                  className="rounded-2xl border border-line bg-paper-sage/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg hover:shadow-ink/5"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 text-forest">
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    <h3 className="text-sm font-semibold text-ink">
                      {group.label}
                    </h3>
                  </div>

                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <TechnologyCard
                        key={item.name}
                        item={item}
                      />
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
