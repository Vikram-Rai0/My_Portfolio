import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TechStrip from "../components/TechStrip";
import SelectedWork from "../components/SelectedWork";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import BuildStack from "../components/BuildStack";
import WorkingOn from "../components/WorkingOn";
import GitHubActivity from "../components/GitHubActivity";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
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
        <SelectedWork />
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
