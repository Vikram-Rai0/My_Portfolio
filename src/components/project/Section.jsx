/** Editorial section: sticky label on the left, content on the right. */
export default function Section({ id, index, title, children }) {
  return (
    <section id={id} className="border-t border-line py-12 first:border-t-0 md:py-16">
      <div className="container-page grid gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <header className="md:sticky md:top-28 md:self-start">
          <p className="eyebrow">{index}</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {title}
          </h2>
        </header>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}