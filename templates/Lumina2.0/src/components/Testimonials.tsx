import { Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { TESTIMONIALS } from "../lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
      {/* Geometric pattern */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.05]">
        <defs>
          <pattern id="cross-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M28 22v12M22 28h12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cross-grid)" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-aqua-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            tone="dark"
            eyebrow="Patient stories"
            title="The reviews we're quietly proud of"
            lede="Unedited words from patients who trusted us with their smiles — anxiety, implants, first visits, and all."
          />
          <Reveal delay={180} className="shrink-0">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-7 py-5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5" aria-label="4.9 out of 5 stars average">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-2 font-display text-2xl font-bold text-white">
                4.9 <span className="text-sm font-medium text-navy-100/60">average</span>
              </p>
              <p className="mt-0.5 text-xs text-navy-100/60">1,200+ verified reviews</p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 2) * 110}>
              <figure className="group relative h-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] lg:p-8">
                <Quote
                  className="h-8 w-8 text-teal-400/70 transition-transform duration-500 group-hover:-translate-y-1"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <blockquote className="mt-5 text-[0.98rem] leading-relaxed text-navy-50/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-navy-100/50">{t.detail}</p>
                  </div>
                  <div className="flex gap-0.5" aria-label={`${t.rating} star review`}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
