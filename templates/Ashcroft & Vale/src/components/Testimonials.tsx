import { awards, testimonials } from "../data";
import { Eyebrow, Icons, SectionHeading } from "./ui";

export function Testimonials() {
  return (
    <section className="bg-ivory paper-texture py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          align="center"
          eyebrow="Client Testimonials"
          title="The confidence of those we serve"
          intro="Enduring relationships built on results, discretion, and unwavering commitment."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="reveal flex flex-col rounded-[var(--radius-card)] border border-ink/5 bg-white p-8 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              data-delay={i * 100}
            >
              <span className="h-9 w-9 text-gold/70">
                <Icons.quote />
              </span>
              <blockquote className="mt-5 flex-1 font-serif text-xl leading-relaxed text-ink/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-ink/10 pt-5">
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="mt-0.5 block text-sm text-bronze">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Awards */}
        <div className="mt-20">
          <div className="reveal flex flex-col items-center text-center">
            <Eyebrow>Awards &amp; Recognition</Eyebrow>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((a, i) => (
              <div
                key={a.name}
                className="reveal flex flex-col items-center gap-3 bg-white px-6 py-9 text-center"
                data-delay={i * 80}
              >
                <span className="h-8 w-8 text-gold">
                  <Icons.award />
                </span>
                <span className="font-serif text-lg text-ink">{a.name}</span>
                <span className="text-xs uppercase tracking-wider text-slate-warm">
                  {a.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
