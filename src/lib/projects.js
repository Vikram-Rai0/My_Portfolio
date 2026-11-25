import { cache } from "react";
import { db } from "@/lib/db";
import { buildStack } from "@/data/content";

const pad = (n) => String(n).padStart(2, "0");

// Short descriptions for technologies, reused from the site's stack data.
const techNotes = {
  ...Object.fromEntries(
    buildStack.flatMap((group) =>
      group.items.map((item) => [item.name, item.note])
    )
  ),
  "TanStack Query": "Server state and caching",
  Prisma: "ORM for PostgreSQL",
};

/** DB row -> the project shape the UI components were written against. */
function toProject(row, position) {
  return {
    id: row.slug,
    index: pad(position + 1),
    year: row.year,
    status: row.status ?? undefined,
    title: row.title,
    description: row.description,
    highlights: row.highlights,
    stack: row.stack,
    liveHref: row.liveUrl ?? undefined,
    githubHref: row.githubUrl,
    visual: row.visual,
    images: row.images,
    featured: row.featured,
  };
}

/** Published projects in display order (deduped per request). */
export const getPublishedProjects = cache(async () => {
  const rows = await db.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });

  return rows.map((row, position) => ({
    project: toProject(row, position),
    row,
  }));
});

/** Slimmed-down list for the homepage carousel (featured only). */
export async function getFeaturedProjects() {
  const all = await getPublishedProjects();
  return all.filter(({ row }) => row.featured).map(({ project }) => project);
}

export async function getProjectSlugs() {
  const rows = await db.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });
  return rows;
}

/**
 * Everything a project page needs. Same shape the old static
 * getProjectBundle(id) returned. null for unknown / unpublished slugs.
 */
export const getProjectBundle = cache(async (slug) => {
  const all = await getPublishedProjects();
  const position = all.findIndex(({ project }) => project.id === slug);
  if (position === -1) return null;

  const { project, row } = all[position];
  const details = { ...(row.details ?? {}), tagline: row.tagline ?? undefined };
  const caseStudy = details.caseStudy ?? {};
  const { architecture: technicalArchitecture, ...technicalDecisions } =
    details.technicalNotes ?? {};

  const withNote = (name) => ({ name, note: techNotes[name] });

  return {
    project,
    details,
    caseStudy,
    prev: all[position - 1]?.project ?? null,
    next: all[position + 1]?.project ?? null,

    features:
      details.features ?? project.highlights.map((title) => ({ title })),

    technologies: {
      core: project.stack.map(withNote),
      also: (details.alsoUsed ?? []).map(withNote),
    },

    architecture: {
      summary:
        details.architecture?.summary ?? technicalArchitecture?.description,
      layers: details.architecture?.layers ?? [],
    },

    decisions: [
      ...Object.values(technicalDecisions).map(({ title, description }) => ({
        title,
        text: description,
      })),
      ...(caseStudy.decisions ?? []),
    ],

    implementation:
      caseStudy.implementation ?? project.highlights.map((title) => ({ title })),
  };
});
