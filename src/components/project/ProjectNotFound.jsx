import Link from "next/link";
import ProjectLayout from "./ProjectLayout";
import { primaryButton } from "./blocks";

export default function ProjectNotFound() {
  return (
    <ProjectLayout>
      <section className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-4 py-20">
        <p className="eyebrow">404</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Project not found
        </h1>
        <p className="max-w-md text-[15px] text-ink-soft">
          That project doesn’t exist or has moved. You can browse all projects
          from the homepage.
        </p>
        <Link href="/#work" className={`mt-2 ${primaryButton}`}>
          Back to projects
        </Link>
      </section>
    </ProjectLayout>
  );
}