import { IMG } from "../data/images";
import { Reveal, useParallax } from "../hooks/useReveal";

export default function Philosophy() {
  const imgRef = useParallax<HTMLDivElement>(0.06);

  return (
    <section id="philosophy" className="relative overflow-hidden py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* Text — asymmetric left */}
        <div className="lg:col-span-5 lg:pt-16">
          <Reveal>
            <p className="eyebrow mb-8">The Philosophy</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] text-ivory">
              Restraint is the
              <br />
              rarest <em className="italic text-gold-soft">ingredient</em>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 space-y-6 text-[0.9375rem] font-light leading-8 text-ivory-dim">
              <p>
                Chef Élise Marchand cooks the way a poet edits — removing until
                only the essential remains. A single langoustine. Three drops
                of brown butter. Nothing on the plate that has not earned its
                place.
              </p>
              <p>
                Her kitchen keeps no freezer and no shortcuts. Produce arrives
                each dawn from growers she has known for twenty years, and the
                menu is rewritten around whatever the morning brings.
              </p>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-12">
              <p className="font-serif text-2xl italic text-ivory">
                “We do not decorate plates. We finish thoughts.”
              </p>
              <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.35em] text-ivory-faint">
                Élise Marchand — Chef &amp; Propriétaire
              </p>
            </div>
          </Reveal>
        </div>

        {/* Images — asymmetric right composition */}
        <div className="relative lg:col-span-7 lg:pl-12">
          <div ref={imgRef}>
            <Reveal delay={150}>
              <div className="img-frame ml-auto aspect-[3/4] w-[82%] shadow-[var(--shadow-card)]">
                <img
                  src={IMG.chefSaucing}
                  alt="Chef finishing a haute cuisine dish with a delicate sauce"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={350} className="absolute -bottom-10 left-0 hidden w-[46%] md:block lg:-bottom-14">
            <div className="img-frame aspect-[4/5] border border-charcoal shadow-[var(--shadow-card)]">
              <img
                src={IMG.chefPlating}
                alt="Chef plating a gourmet dish with tweezers in the kitchen"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-28 max-w-7xl px-6 lg:mt-40 lg:px-10">
        <div className="hairline" />
      </div>
    </section>
  );
}
