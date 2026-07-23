import { Reveal } from "./Reveal";
import { SectionLabel, Button } from "./ui";
import { philosophyStats } from "../lib/data";
import { ArrowRight } from "lucide-react";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Layered image composition */}
          <Reveal className="relative">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-card shadow-card">
              <img
                src="/images/philosophy-stones.jpg"
                alt="Warm basalt stones arranged along the back during a restorative treatment"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
            </div>

            {/* Overlapping detail image */}
            <div className="absolute -bottom-8 -right-4 hidden w-40 overflow-hidden rounded-card border-[6px] border-cream shadow-card sm:block lg:-right-8 lg:w-52">
              <img
                src="/images/orchid-detail.jpg"
                alt="A single white orchid in soft focus"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -left-4 top-10 rounded-card bg-ivory/90 px-6 py-5 shadow-soft backdrop-blur-sm lg:-left-8">
              <p className="font-serif text-4xl leading-none text-gold">22</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-charcoal/55">
                Years of craft
              </p>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <SectionLabel>Our Philosophy</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-5xl">
                Luxury, distilled to its essence
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-lg text-base font-light leading-relaxed text-charcoal/70">
                We believe wellness is not an indulgence to be rushed, but a practice
                to be inhabited. Every detail at Aurelia — from the warmth of the linen
                to the cadence of a therapist's hands — is composed to slow the breath
                and quiet the mind.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-charcoal/70">
                Our treatments draw on traditions from Kyoto to the Mediterranean,
                unified by a single principle: that true luxury is the feeling of time
                returned to you.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-stone/60 pt-10 sm:grid-cols-4">
                {philosophyStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-serif text-3xl text-charcoal">{stat.value}</dt>
                    <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-charcoal/50">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-12">
                <Button href="#signature" variant="ghost">
                  Discover our rituals
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
