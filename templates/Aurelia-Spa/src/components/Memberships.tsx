import { Reveal } from "./Reveal";
import { SectionLabel, Button } from "./ui";
import { memberships } from "../lib/data";
import { Check } from "lucide-react";

export function Memberships() {
  return (
    <section id="memberships" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">Memberships</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-5xl">
            A practice, not a visit
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-charcoal/65">
            Make restoration a rhythm. Members enjoy priority access, reduced rates,
            and the quiet assurance that your suite is always waiting.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-3">
          {memberships.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-card border p-8 transition-all duration-500 ease-out lg:p-9 ${
                  m.featured
                    ? "border-gold/40 bg-ivory shadow-lift lg:-translate-y-3"
                    : "border-stone/60 bg-ivory shadow-soft hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-card"
                }`}
              >
                {m.featured && (
                  <span className="absolute -top-3 left-8 rounded-pill bg-gold px-4 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ivory">
                    Most popular
                  </span>
                )}

                <h3 className="font-serif text-3xl font-light text-charcoal">{m.name}</h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-serif text-4xl text-gold">{m.price}</span>
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] text-charcoal/45">
                    {m.cadence}
                  </span>
                </div>
                <p className="mt-4 text-sm font-light leading-relaxed text-charcoal/65">
                  {m.description}
                </p>

                <ul className="mt-7 space-y-3.5 border-t border-stone/60 pt-7">
                  {m.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm font-light text-charcoal/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex-1" />
                <Button
                  href="#booking"
                  variant={m.featured ? "gold" : "outline"}
                  className="mt-8 w-full"
                >
                  Become a member
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm font-light text-charcoal/50">
            All memberships begin with a complimentary welcome ritual. Pause or cancel
            anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
