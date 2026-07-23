import { practiceAreas } from "../data";
import { Icons, SectionHeading } from "./ui";

export function PracticeAreas() {
  return (
    <section id="practice" className="bg-ink py-24 text-ivory lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            dark
            eyebrow="Practice Areas"
            title="Comprehensive counsel across every discipline"
            intro="A full-service practice engineered to protect and advance your interests — from the boardroom to the courtroom."
          />
          <a
            href="#consultation"
            className="reveal group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold-soft transition-colors hover:text-gold"
          >
            View All Services
            <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <Icons.arrowRight />
            </span>
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((p, i) => (
            <article
              key={p.title}
              className="reveal group flex flex-col rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:bg-white/[0.06] hover:shadow-[0_30px_60px_-30px_rgba(176,141,87,0.35)]"
              data-delay={i * 80}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                <span className="h-6 w-6">
                  <p.icon />
                </span>
              </span>
              <h3 className="mt-7 font-serif text-2xl text-ivory">{p.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ivory/65">{p.desc}</p>
              <a
                href="#consultation"
                className="mt-7 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-widest text-gold-soft transition-colors group-hover:text-gold"
              >
                Request Consultation
                <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <Icons.arrowUpRight />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
