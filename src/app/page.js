import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStrip from "@/components/TechStrip";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import BuildStack from "@/components/BuildStack";
import WorkingOn from "@/components/WorkingOn";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { developerPresenceLinks, github } from "@/data/content";
import { getFeaturedProjects } from "@/lib/projects";
import { SITE_DESCRIPTION, siteUrl } from "@/lib/site";

// ISR: rebuilt at most hourly; admin edits trigger on-demand revalidation.
export const revalidate = 3600;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vikram Rai",
  jobTitle: "Junior Full-Stack Developer",
  description: SITE_DESCRIPTION,
  url: siteUrl,
  image: `${siteUrl}/portrait.jpg`,
  sameAs: [
    github.profileHref,
    ...developerPresenceLinks
      .map((link) => link.href)
      .filter((href) => /linkedin\.com/.test(href)),
  ],
};

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-2.5 font-mono text-[13px] text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <TechStrip />
        <SelectedWork projects={projects} />
        <About />
        <Experience />
        <Skills />
        <BuildStack />
        <WorkingOn />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
