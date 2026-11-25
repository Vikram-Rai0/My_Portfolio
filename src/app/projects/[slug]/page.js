import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBundle, getProjectSlugs } from "@/lib/projects";
import { linkProps } from "@/lib/links";
import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectGallery from "@/components/project/ProjectGallery";
import Section from "@/components/project/Section";
import {
  CaseStudyCta,
  FeatureGrid,
  Paragraphs,
  ProjectNav,
  TechnologyList,
  primaryButton,
  secondaryButton,
} from "@/components/project/blocks";

// ISR: pages are generated on demand / at build and refreshed on admin edits.
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const rows = await getProjectSlugs();
    return rows.map(({ slug }) => ({ slug }));
  } catch {
    // Database not reachable at build time: pages render on first request.
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const bundle = await getProjectBundle(slug);

  if (!bundle) return { title: "Project not found — Vikram Rai", robots: { index: false } };

  const { project, details } = bundle;
  const description = (details.tagline ?? project.description).slice(0, 200);
  const image = project.images[0] ?? "/portrait.jpg";
  const title = `${project.title} — Vikram Rai`;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/projects/${project.id}`,
      images: [{ url: image, alt: `${project.title} screenshot` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}


// The details page is a short summary. Depth lives in the case study.
const MAX_FEATURES = 4;
const MAX_OVERVIEW_PARAGRAPHS = 1;

function Fact({ label, children }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1 text-[14px] text-ink">{children}</dd>
    </div>
  );
}

export default async function ProjectDetails({ params }) {
  const { slug } = await params;
  const bundle = await getProjectBundle(slug);

  if (!bundle) notFound();

  const { project, details, features, technologies, prev, next } = bundle;

  const stackPreview = project.stack.slice(0, 4).join(", ");
  const stackRest = project.stack.length - 4;

  const sections = [
    {
      id: "overview",
      title: "Overview",
      show: details.overview?.length,
      body: (
        <Paragraphs
          items={(details.overview ?? []).slice(0, MAX_OVERVIEW_PARAGRAPHS)}
        />
      ),
    },
    {
      id: "features",
      title: "Key features",
      show: features.length,
      body: <FeatureGrid items={features.slice(0, MAX_FEATURES)} />,
    },
    {
      id: "technologies",
      title: "Tech stack",
      show: technologies.core.length,
      body: <TechnologyList core={technologies.core} also={[]} />,
    },
  ].filter((section) => section.show);

  return (
    <ProjectLayout title={`${project.title} — Vikram Rai`}>
      <section className="border-b border-line bg-paper-sage">
        <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div>
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
              <span className="text-ink-soft">{project.title}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="eyebrow">
                {project.index} / {project.year}
              </p>
              {project.status && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/30 bg-forest-light/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-forest">
                  <span className="h-1 w-1 rounded-full bg-forest" aria-hidden="true" />
                  {project.status}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">
              {details.tagline ?? project.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
              <Fact label="Year">{project.year}</Fact>
              {project.status && <Fact label="Status">{project.status}</Fact>}
              <Fact label="Stack">
                {stackPreview}
                {stackRest > 0 && (
                  <span className="text-ink-muted"> +{stackRest} more</span>
                )}
              </Fact>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.id}/case-study`}
                className={primaryButton}
              >
                View Case Study
                <span aria-hidden="true">→</span>
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
          </div>

          <ProjectGallery project={project} />
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
          <CaseStudyCta project={project} />
          <ProjectNav prev={prev} next={next} />
        </div>
      </section>
    </ProjectLayout>
  );
}