import { Quote, Star } from "lucide-react";
import { avatars } from "../data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const featured = {
  quote:
    "Adrian is the rare engineer who thinks like a founder and cares like a designer. He rebuilt our platform in twelve weeks — conversion is up 52%, and the codebase is a joy to work in.",
  name: "Marcus Bennett",
  role: "CEO, Northwind",
  avatar: avatars.marcus,
};

const testimonials = [
  {
    quote:
      "He treats accessibility and performance as features, not chores. Every handoff arrives documented, tested and pixel-perfect — every single time.",
    name: "Aisha Diallo",
    role: "VP Product, Lumina Health",
    avatar: avatars.aisha,
  },
  {
    quote:
      "Working with Adrian felt like adding a co-founder. He challenged our roadmap, sharpened the scope — then shipped it three weeks ahead of schedule.",
    name: "Elena Rodriguez",
    role: "Founder, Helix Labs",
    avatar: avatars.elena,
  },
  {
    quote:
      "The design system Adrian built is still the backbone of our product four years later. Quite simply the best investment we've made in engineering.",
    name: "Daniel Weber",
    role: "CTO, Vantage",
    avatar: avatars.daniel,
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="Testimonials"
          title="Words from people I've shipped with."
        />

        {/* Featured quote */}
        <Reveal delay={140}>
          <blockquote className="mx-auto mt-16 max-w-4xl text-center">
            <Quote className="mx-auto h-8 w-8 rotate-180 text-accent/40" aria-hidden="true" />
            <p className="mt-7 font-display text-2xl font-medium leading-[1.35] tracking-[-0.01em] text-balance text-ink md:text-[2.1rem]">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-9 flex items-center justify-center gap-4">
              <img
                src={featured.avatar}
                alt={`Portrait of ${featured.name}`}
                loading="lazy"
                width={52}
                height={52}
                className="h-13 w-13 rounded-full object-cover shadow-card ring-2 ring-white"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-ink">{featured.name}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">{featured.role}</p>
              </div>
            </footer>
          </blockquote>
        </Reveal>

        {/* Supporting quotes */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 110} className="h-full">
              <figure className="flex h-full flex-col rounded-card bg-paper p-8 shadow-card ring-1 ring-ink/[0.04] transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lift">
                <Stars />
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-ink/[0.06] pt-6">
                  <img
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    loading="lazy"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
