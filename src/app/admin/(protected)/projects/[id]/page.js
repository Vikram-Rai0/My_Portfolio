import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = { title: "Edit project — Admin" };

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) notFound();

  const row = await db.project.findUnique({ where: { id: numericId } });
  if (!row) notFound();

  const project = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    year: row.year,
    status: row.status ?? "",
    tagline: row.tagline ?? "",
    description: row.description,
    order: String(row.order),
    liveUrl: row.liveUrl ?? "",
    githubUrl: row.githubUrl,
    visual: row.visual,
    stack: row.stack.join(", "),
    highlights: row.highlights.join("\n"),
    images: row.images.join("\n"),
    details: JSON.stringify(row.details ?? {}, null, 2),
    featured: row.featured,
    published: row.published,
  };

  return (
    <>
      <h1 className="mb-8 text-2xl font-extrabold text-ink">Edit “{row.title}”</h1>
      <ProjectForm project={project} />
    </>
  );
}
