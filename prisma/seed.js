/**
 * Seeds the database with the projects that used to live in
 * src/data/content.js (+ projectDetails.js).
 *
 *   npx prisma db seed            # inserts missing projects, never overwrites edits
 *   SEED_FORCE=1 npx prisma db seed   # resets seeded projects to the original content
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { projects, projectTechnicalDetails } from "./seed-projects.js";
import { projectDetails } from "./seed-project-details.js";
import { projectSchema } from "../src/lib/validation.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const force = process.env.SEED_FORCE === "1";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

/** Keeps only screenshot paths whose files exist in /public (avoids 404s). */
function existingImages(slug, images = []) {
  const kept = [];
  const skipped = [];

  for (const src of images) {
    const onDisk = path.join(root, "public", src.replace(/^\//, ""));
    (fs.existsSync(onDisk) ? kept : skipped).push(src);
  }

  if (skipped.length) {
    console.log(`  - ${slug}: skipped ${skipped.length} missing image(s), add them later from /admin`);
  }

  return kept;
}

async function main() {
  let created = 0;
  let updated = 0;
  let untouched = 0;

  for (const [position, project] of projects.entries()) {
    const { tagline, ...details } = projectDetails[project.id] ?? {};

    const candidate = {
      slug: project.id,
      title: project.title,
      year: project.year,
      status: project.status,
      tagline,
      description: project.description,
      order: position,
      liveUrl: project.liveHref,
      githubUrl: project.githubHref,
      visual: project.visual ?? "availability",
      featured: true,
      published: true,
      stack: project.stack,
      highlights: project.highlights,
      images: existingImages(project.id, project.images),
      details: {
        ...details,
        technicalNotes: projectTechnicalDetails[project.id] ?? undefined,
      },
    };

    // Same validation the admin form uses, so seeded data is always valid.
    const data = projectSchema.parse(candidate);

    const existing = await db.project.findUnique({ where: { slug: data.slug } });

    if (existing && !force) {
      untouched += 1;
      continue;
    }

    const row = { ...data, status: data.status ?? null, tagline: data.tagline ?? null, liveUrl: data.liveUrl ?? null };

    await db.project.upsert({
      where: { slug: data.slug },
      create: row,
      update: row,
    });

    existing ? (updated += 1) : (created += 1);
  }

  console.log(
    `Seed finished: ${created} created, ${updated} reset, ${untouched} left as-is (use SEED_FORCE=1 to reset).`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
