import { Reveal } from "./Reveal";
import { SectionLabel, Button } from "./ui";
import { spaPackages } from "../lib/data";
import { Check } from "lucide-react";

export function SpaPackages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      {/* Atmospheric background photograph */}
      <div className="absolute inset-0">
        <img
          src="/images/spa-packages.jpg"
          alt="Candlelit spa pool at dusk"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel tone="light" align="center">
            Spa Packages
          </SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-ivory sm:text-5xl">
            Journey beyond a single treatment
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-ivory/70">
            Half-day, full-day, and two-day immersions — composed sequences that
            unfold without hurry, with cuisine, rest, and the thermal circuit woven in.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:mt-20 lg:grid-cols-3">
          {spaPackages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-card border p-8 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1.5 lg:p-9 ${
                  p.featured
                    ? "border-gold/40 bg-ivory/10 shadow-lift lg:-translate-y-3"
                    : "border-ivory/15 bg-ivory/[0.04] hover:border-ivory/30"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-8 rounded-pill bg-gold px-4 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ivory">
                    Most chosen
                  </span>
                )}

                <h3 className="font-serif text-3xl font-light text-ivory">{p.name}</h3>
                <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-ivory/50">
                  {p.span}
                </p>
                <p className="mt-5 text-sm font-light leading-relaxed text-ivory/70">
                  {p.description}
                </p>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className="font-serif text-4xl text-gold">{p.price}</span>
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ivory/45">
                    per guest
                  </span>
                </div>

                <ul className="mt-7 space-y-3.5 border-t border-ivory/10 pt-7">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 text-sm font-light text-ivory/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} />
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex-1" />
                <Button
                  href="#booking"
                  variant={p.featured ? "gold" : "light"}
                  className="mt-2 w-full"
                >
                  Reserve
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
