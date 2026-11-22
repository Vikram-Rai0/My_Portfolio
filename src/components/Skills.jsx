import {
  Code2,
  Server,
  Database,
  Wrench,
  Layers,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
  Check,
} from "lucide-react";

import { skillGroups, skillExtras, skillsNote } from "@/data/content";

import ProgressBar from "./ProgressBar";
import Reveal from "./Reveal";

// Devicon logo mappings
const skillLogos = {
  JavaScript: "javascript/javascript-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  React: "react/react-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
  HTML: "html5/html5-original.svg",
  CSS: "css3/css3-original.svg",

  "Node.js": "nodejs/nodejs-original.svg",
  "Express.js": "express/express-original.svg",
  "REST APIs": null,
  "Socket.IO": "socketio/socketio-original.svg",

  MySQL: "mysql/mysql-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  Redis: "redis/redis-original.svg",

  Git: "git/git-original.svg",
  GitHub: "github/github-original.svg",
  Docker: "docker/docker-original.svg",
  Postman: "postman/postman-original.svg",
  Vercel: null,
};

const groupIcons = {
  frontend: Code2,
  "front-end": Code2,
  backend: Server,
  "back-end": Server,
  database: Database,
  tools: Wrench,
  devops: Wrench,
  "other technologies": Layers,
};

function getGroupIcon(label) {
  const normalizedLabel = label.toLowerCase();

  const matchedKey = Object.keys(groupIcons).find((key) =>
    normalizedLabel.includes(key)
  );

  return groupIcons[matchedKey] || Layers;
}

function getSkillLogo(name) {
  const logo = skillLogos[name];

  if (!logo) return null;

  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${logo}`;
}

function SkillLogo({ name }) {
  const logo = getSkillLogo(name);

  if (!logo) {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper-sage font-mono text-[10px] font-semibold text-ink-muted">
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="h-7 w-7 shrink-0 object-contain"
    />
  );
}

function CardHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10 text-forest transition-colors group-hover:bg-forest group-hover:text-paper">
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-ink-muted">{subtitle}</p>}
      </div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-soft"
        >
          <Check
            size={14}
            strokeWidth={2.2}
            className="mt-[3px] shrink-0 text-forest"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ChipList({ items, dashed = false }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={
            dashed
              ? "rounded-lg border border-dashed border-forest/40 bg-forest/5 px-3 py-2 text-xs font-medium text-forest"
              : "rounded-lg border border-line bg-paper-sage px-3 py-2 text-xs font-medium text-ink-soft"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ icon: Icon, children }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-forest" aria-hidden="true" />}
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {children}
      </p>
    </div>
  );
}

export default function Skills() {
  const { familiar = [], improving = [], learning = [], softSkills = [] } =
    skillExtras;

  const hasGrowth =
    familiar.length > 0 || improving.length > 0 || learning.length > 0;

  return (
    <section id="skills" className="bg-paper-sage py-20 md:py-28">
      <div className="container-page">
        {/* Section heading */}
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">— Skills & Expertise</p>

            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
             Technical & Professional Skills
            </h2>

            <p className="mt-4 text-sm leading-7 text-ink-muted">
              {skillsNote}
            </p>
          </div>
        </Reveal>

        {/* Skill groups */}
        <Reveal delayMs={100}>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = getGroupIcon(group.label);

              return (
                <article
                  key={group.label}
                  className="group rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg hover:shadow-ink/5"
                >
                  <CardHeading
                    icon={Icon}
                    title={group.label}
                    subtitle={`${group.items.length} technologies`}
                  />

                  <ul className="space-y-5">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <SkillLogo name={item.name} />

                            <span className="truncate text-[13px] font-medium text-ink-soft">
                              {item.name}
                            </span>
                          </div>

                          <span className="shrink-0 font-mono text-xs tabular-nums text-forest">
                            {item.level}%
                          </span>
                        </div>

                        <ProgressBar value={item.level} />
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}

            {/* Growth: improving, learning, familiar */}
            {hasGrowth && (
              <article className="group rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg hover:shadow-ink/5">
                <CardHeading
                  icon={Sparkles}
                  title="Always growing"
                  subtitle="What I'm working to get better at"
                />

                <div className="space-y-6">
                  {improving.length > 0 && (
                    <div>
                      <SubHeading icon={TrendingUp}>
                        Currently improving
                      </SubHeading>
                      <BulletList items={improving} />
                    </div>
                  )}

                  {learning.length > 0 && (
                    <div className="border-t border-line pt-6">
                      <SubHeading icon={GraduationCap}>
                        Currently learning
                      </SubHeading>
                      <ChipList items={learning} dashed />
                    </div>
                  )}

                  {familiar.length > 0 && (
                    <div className="border-t border-line pt-6">
                      <SubHeading>Also familiar with</SubHeading>
                      <ChipList items={familiar} />
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* Soft skills */}
            {softSkills.length > 0 && (
              <article className="group rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg hover:shadow-ink/5">
                <CardHeading
                  icon={Users}
                  title="Soft skills"
                  subtitle="How I work with others"
                />

                <BulletList items={softSkills} />
              </article>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}