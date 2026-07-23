import { attorneys } from "../data";
import { Icons, SectionHeading } from "./ui";

export function Attorneys() {
  return (
    <section id="attorneys" className="bg-ivory paper-texture py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          align="center"
          eyebrow="Our Attorneys"
          title="Counsel of the highest calibre"
          intro="Meet the partners whose judgment, discretion, and record of results define the firm's reputation."
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {attorneys.map((a, i) => (
            <article
              key={a.name}
              className="reveal group overflow-hidden rounded-[var(--radius-card)] border border-ink/5 bg-white shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              data-delay={i * 90}
            >
              <div className="relative overflow-hidden">
                <img
                  src={a.photo}
                  alt={`Portrait of ${a.name}`}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-sm leading-relaxed text-ivory/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {a.bio}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 p-6">
                <div>
                  <h3 className="font-serif text-xl text-ink">{a.name}</h3>
                  <p className="mt-1 text-[0.78rem] uppercase tracking-wider text-bronze">
                    {a.role}
                  </p>
                </div>
                <a
                  href="#contact"
                  aria-label={`Contact ${a.name}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  <span className="h-4 w-4">
                    <Icons.arrowUpRight />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
