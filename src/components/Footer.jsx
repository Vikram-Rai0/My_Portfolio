import { footer } from "../data/content";
import { linkProps } from "../utils/links";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[13px] font-medium uppercase tracking-widest2 text-ink">
            {footer.name}
          </p>
          <p className="eyebrow mt-1">{footer.role}</p>
        </div>

        <ul className="flex gap-6">
          {footer.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...linkProps(link.href)}
                className="font-mono text-[12px] text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:text-right">
          <p className="font-mono text-[11px] text-ink-muted">
            © {footer.year} {footer.name}
          </p>
          <p className="font-mono text-[11px] text-ink-muted">
            Built with {footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
