import { contact } from "@/data/content";
import { linkProps } from "@/lib/links";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import { Mail, FileText, ArrowUpRight } from "lucide-react";

const contactIcons = {
  github: "https://cdn.simpleicons.org/github/181717",
  linkedin: "https://cdn.simpleicons.org/linkedin/0A66C2",
};

function getContactIcon(label) {
  const value = label.toLowerCase();

  if (value.includes("github")) {
    return (
      <img
        src={contactIcons.github}
        alt=""
        className="h-4 w-4 dark:invert"
      />
    );
  }

  if (value.includes("linkedin")) {
    return (
      <img
        src={contactIcons.linkedin}
        alt=""
        className="h-4 w-4"
      />
    );
  }

  if (value.includes("email") || value.includes("mail")) {
    return <Mail size={16} />;
  }

  if (value.includes("resume") || value.includes("cv")) {
    return <FileText size={16} />;
  }

  return <ArrowUpRight size={16} />;
}

export default function Contact() {
  return (
    <section id="contact" className="bg-paper-sage py-24 md:py-32">
      <div className="container-page">
        <Reveal className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading, text and contact links */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="eyebrow mb-6">— Contact</p>

            <h2 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              {contact.heading[0]}
              <br />
              {contact.heading[1]}
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
              {contact.paragraph}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {contact.links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...linkProps(link.href)}
                  aria-label={link.label}
                  className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-mono text-[12px] uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                    i === 0
                      ? "bg-ink text-paper hover:opacity-85"
                      : "border border-line text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {getContactIcon(link.label)}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}