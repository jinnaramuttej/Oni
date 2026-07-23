import { Reveal } from "./Reveal";
import { SectionLabel, Button } from "./ui";
import { signatureTreatments } from "../lib/data";
import { ArrowRight } from "lucide-react";

export function SignatureTreatments() {
  return (
    <section id="signature" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">Signature Treatments</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-5xl">
            Composed rituals, found nowhere else
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-charcoal/65">
            Three hallmark journeys, each a study in restraint, rhythm, and renewal —
            performed only in our private suites.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-20 lg:mt-24 lg:gap-28">
          {signatureTreatments.map((t, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={t.name}>
                <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={`group relative overflow-hidden rounded-card shadow-card ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
                  </div>

                  <div className={reversed ? "lg:order-1" : ""}>
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold">
                      {t.tagline}
                    </span>
                    <h3 className="mt-4 font-serif text-3xl font-light text-charcoal lg:text-4xl">
                      {t.name}
                    </h3>
                    <p className="mt-5 max-w-md text-base font-light leading-relaxed text-charcoal/70">
                      {t.description}
                    </p>

                    <div className="mt-8 flex items-center gap-8">
                      <div>
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-charcoal/45">
                          Duration
                        </span>
                        <p className="mt-1 font-serif text-xl text-charcoal">{t.duration}</p>
                      </div>
                      <span className="h-10 w-px bg-stone" />
                      <div>
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-charcoal/45">
                          From
                        </span>
                        <p className="mt-1 font-serif text-xl text-gold">{t.price}</p>
                      </div>
                    </div>

                    <div className="mt-9">
                      <Button href="#booking" variant="outline">
                        Reserve this ritual
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
