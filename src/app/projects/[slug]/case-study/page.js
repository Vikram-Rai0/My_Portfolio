import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBundle, getProjectSlugs } from "@/lib/projects";
import { linkProps } from "@/lib/links";
import ProjectLayout from "@/components/project/ProjectLayout";
import Section from "@/components/project/Section";
import {
  BulletList,
  ChallengeFull,
  DecisionGrid,
  LayerList,
  NumberedList,
  Paragraphs,
  ProjectNav,
  primaryButton,
  secondaryButton,
} from "@/components/project/blocks";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const rows = await getProjectSlugs();
    return rows.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const bundle = await getProjectBundle(slug);

  if (!bundle) return { title: "Project not found — Vikram Rai", robots: { index: false } };

  const { project, details } = bundle;
  const description = (
    details.caseStudy?.background?.[0] ?? details.tagline ?? project.description
  ).slice(0, 200);
  const image = project.images[0] ?? "/portrait.jpg";
  const title = `${project.title} case study — Vikram Rai`;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.id}/case-study` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/projects/${project.id}/case-study`,
      images: [{ url: image, alt: `${project.title} screenshot` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}


export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const bundle = await getProjectBundle(slug);

  if (!bundle) notFound();

  const {
    project,
    details,
    caseStudy,
    architecture,
    decisions,
    implementation,
    prev,
    next,
  } = bundle;

  const challenges = details.challenges ?? [];

  const sections = [
    {
      id: "background",
      title: "Project background",
      show: caseStudy.background?.length,
      body: <Paragraphs items={caseStudy.background ?? []} />,
    },
        {
      id: "problem",
      title: "Problem and goals",
      show: details.problem?.length || details.objectives?.length,
      body: (
        <>
          <Paragraphs items={details.problem ?? []} />
          {details.objectives?.length > 0 && (
            <div className="mt-8">
              <h3 className="eyebrow mb-3">Goals</h3>
              <BulletList items={details.objectives} />
            </div>
          )}
        </>
      ),
    },
    {
      id: "decisions",
      title: "Technical decisions",
      show: decisions.length,
      body: <DecisionGrid items={decisions} />,
    },
    {
      id: "architecture",
      title: "System architecture",
      show: architecture.summary || architecture.layers.length,
      body: (
        <>
          {architecture.summary && <Paragraphs items={[architecture.summary]} />}
          {architecture.layers.length > 0 && (
            <div className={architecture.summary ? "mt-8" : ""}>
              <LayerList layers={architecture.layers} />
            </div>
          )}
        </>
      ),
    },
    {
      id: "implementation",
      title: "Implementation details",
      show: implementation.length,
      body: <NumberedList items={implementation} />,
    },
    {
      id: "challenges",
      title: "Challenges & solutions",
      show: challenges.length,
      body: <ChallengeFull items={challenges} />,
    },
        {
      id: "process",
      title: "How it was built",
      show: details.process?.length,
      body: <NumberedList items={details.process ?? []} />,
    },
    {
      id: "lessons",
      title: "Lessons learned",
      show: caseStudy.lessons?.length,
      body: <BulletList items={caseStudy.lessons ?? []} />,
    },
  ].filter((section) => section.show);

  return (
    <ProjectLayout title={`${project.title} case study — Vikram Rai`}>
      <section className="border-b border-line bg-paper-sage">
        <div className="container-page py-12 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[11px] uppercase tracking-widest2 text-ink-muted"
          >
            <Link href="/#work" className="transition-colors hover:text-ink">
              Projects
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link
              href={`/projects/${project.id}`}
              className="transition-colors hover:text-ink"
            >
              {project.title}
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-ink-soft">Case study</span>
          </nav>

          <p className="eyebrow mt-6">
            Case study · {project.index} / {project.year}
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            {details.tagline ?? project.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/projects/${project.id}`} className={primaryButton}>
              <span aria-hidden="true">←</span>
              Project details
            </Link>
            {project.liveHref && (
              <a
                href={project.liveHref}
                {...linkProps(project.liveHref)}
                className={secondaryButton}
              >
                View live
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={project.githubHref}
              {...linkProps(project.githubHref)}
              className={secondaryButton}
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav
            aria-label="Case study sections"
            className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-line bg-paper px-4 py-2 font-mono text-[11px] text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {sections.map((section, i) => (
        <Section
          key={section.id}
          id={section.id}
          index={String(i + 1).padStart(2, "0")}
          title={section.title}
        >
          {section.body}
        </Section>
      ))}

      <section className="border-t border-line bg-paper-sage py-14 md:py-20">
        <div className="container-page space-y-10">
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/projects/${project.id}`} className={secondaryButton}>
              <span aria-hidden="true">←</span>
              Back to project details
            </Link>
            <Link href="/#work" className={secondaryButton}>
              All projects
            </Link>
          </div>
          <ProjectNav prev={prev} next={next} suffix="/case-study" />
        </div>
      </section>
    </ProjectLayout>
  );
}