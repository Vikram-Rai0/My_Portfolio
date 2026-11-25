import Link from "next/link";
import { db } from "@/lib/db";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { deleteProject } from "../actions";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: [{ order: "asc" }, { id: "asc" }],
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-ink">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-ink px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide text-paper transition-opacity hover:opacity-85"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-[15px] text-ink-soft">
          No projects yet. Run <code className="font-mono">npx prisma db seed</code> or add one.
        </p>
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line">
          {projects.map((project) => (
            <li key={project.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-ink">{project.title}</p>
                <p className="mt-0.5 font-mono text-[11px] text-ink-muted">
                  #{project.order} · /projects/{project.slug} · {project.year}
                  {!project.published && " · draft"}
                  {project.published && !project.featured && " · not on homepage"}
                </p>
              </div>
              <div className="flex items-center gap-5">
                {project.published && (
                  <Link href={`/projects/${project.slug}`} target="_blank" className="font-mono text-[11px] uppercase tracking-wide text-ink-soft hover:text-ink">
                    View ↗
                  </Link>
                )}
                <Link href={`/admin/projects/${project.id}`} className="font-mono text-[11px] uppercase tracking-wide text-forest hover:text-ink">
                  Edit
                </Link>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <ConfirmButton
                    message={`Delete "${project.title}"? This cannot be undone.`}
                    className="font-mono text-[11px] uppercase tracking-wide text-ink-muted hover:text-ink"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
