import {
  Anchor,
  ArrowRight,
  CalendarCheck,
  Clock,
  Headphones,
  ShieldCheck,
  Smile,
  Sparkles,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button, Img, Reveal, SectionHeading } from "./ui";
import { IMAGES, TREATMENTS } from "../lib/data";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Sparkles,
  Smile,
  Sun,
  Anchor,
  Users,
};

export function Treatments() {
  return (
    <section id="treatments" className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      {/* Geometric backdrop */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 text-aqua-200/50"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="150" cy="50" r="110" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="150" cy="50" r="78" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="150" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Treatments"
          title="Complete care, under one calm roof"
          lede="From six-month cleanings to full smile design — every treatment is planned digitally, priced transparently, and delivered gently."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TREATMENTS.map((treatment, i) => {
            const Icon = ICONS[treatment.icon] ?? Sparkles;
            return (
              <Reveal as="li" key={treatment.name} delay={(i % 3) * 100}>
                <article className="group relative flex h-full flex-col rounded-[1.25rem] border border-slate-100 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-100 hover:shadow-card-hover lg:p-8">
                  {treatment.tag && (
                    <span className="absolute right-6 top-6 rounded-full bg-teal-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-teal-600 ring-1 ring-teal-100">
                      {treatment.tag}
                    </span>
                  )}

                  <span className="grid h-13 w-13 place-items-center rounded-[1.1rem] bg-gradient-to-br from-aqua-100 to-teal-50 text-teal-600 ring-1 ring-aqua-200/60 transition-all duration-500 group-hover:scale-105 group-hover:from-teal-500 group-hover:to-teal-400 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/30">
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 pr-16 font-display text-[1.15rem] font-semibold tracking-tight text-navy-800">
                    {treatment.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.925rem] leading-relaxed text-slate-500">
                    {treatment.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-teal-500" aria-hidden="true" />
                      {treatment.duration}
                    </span>
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-all duration-300 hover:gap-2.5 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 rounded-lg"
                      aria-label={`Book ${treatment.name}`}
                    >
                      Book
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        {/* Comfort banner */}
        <Reveal delay={120} className="mt-16">
          <figure className="relative overflow-hidden rounded-[1.75rem] shadow-soft">
            <Img
              src={IMAGES.treatment}
              alt="Bright, spotless treatment operatory with advanced dental equipment and soft natural light"
              containerClassName="aspect-[16/9] sm:aspect-[21/9]"
              className="transition-transform duration-700 hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/45 to-transparent"
            />
            <figcaption className="absolute inset-0 flex items-center">
              <div className="max-w-md px-7 py-8 sm:px-12">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-aqua-300 ring-1 ring-white/20 backdrop-blur-sm">
                  <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
                  Anxious? You&apos;re in good hands
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Sedation &amp; comfort menu in every operatory
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-100/80">
                  Warm blankets, ceiling-mounted shows, nitrous, and noise-cancelling
                  headphones — pick what helps you relax.
                </p>
                <div className="mt-6">
                  <Button href="#booking" variant="glass">
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Plan a gentle visit
                  </Button>
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
