import { ArrowRight, Clock } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { EXTRA_SERVICES, SERVICES } from "../data";
import { scrollToId } from "../lib/lenis";

export default function Services() {
  const book = (serviceId: string) => {
    window.dispatchEvent(new CustomEvent("prefill-service", { detail: serviceId }));
    scrollToId("#booking");
  };

  return (
    <section id="services" className="relative bg-ivory py-28 md:py-40">
      <div
        className="pointer-events-none absolute top-1/3 -left-56 h-[520px] w-[520px] rounded-full bg-champagne/40 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col items-end justify-between gap-8 md:flex-row">
          <SectionHeading
            align="left"
            eyebrow="The Services"
            title={
              <>
                Rituals of <span className="italic">transformation</span>
              </>
            }
            description="Four signature disciplines, each performed with couture precision and unhurried care. Every visit begins with a consultation and ends with a finish you'll want to photograph."
            className="max-w-xl"
          />
          <Reveal delay={0.25}>
            <p className="max-w-[240px] border-l border-rosegold/40 pl-5 text-[13px] leading-relaxed font-light text-taupe">
              All services include a welcome ritual, scalp analysis and
              professional styling lesson to take home.
            </p>
          </Reveal>
        </div>

        {/* Signature cards — editorial horizontal composition */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.15} y={56}>
              <article className="group grid h-full overflow-hidden rounded-[24px] border hairline bg-white/80 shadow-card transition-all duration-700 hover:-translate-y-1.5 hover:shadow-lift md:grid-cols-[46%_54%]">
                <div className="relative overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="img-editorial aspect-[4/3] h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05] md:aspect-auto"
                  />
                  <span className="absolute top-5 left-5 rounded-full bg-ivory/85 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.24em] text-charcoal uppercase backdrop-blur-sm">
                    {s.category}
                  </span>
                </div>

                <div className="flex flex-col p-7 md:p-8">
                  <h3 className="font-serif text-[27px] leading-tight font-medium text-charcoal">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed font-light text-taupe">
                    {s.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] text-charcoal/60 uppercase">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} strokeWidth={1.5} className="text-rosegold" />
                        {s.duration}
                      </span>
                      <span className="h-3 w-px bg-charcoal/15" />
                      <span>
                        From{" "}
                        <span className="font-serif text-lg text-metallic italic normal-case">
                          ${s.price}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => book(s.id)}
                      className="mt-5 inline-flex w-full items-center justify-between rounded-[16px] border border-charcoal/15 px-6 py-3.5 text-[11.5px] font-medium tracking-[0.22em] text-charcoal uppercase transition-all duration-500 group-hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                    >
                      Book this ritual
                      <ArrowRight
                        size={15}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Petit menu */}
        <Reveal delay={0.1} y={48}>
          <div className="mt-12 rounded-[24px] border hairline bg-cream/80 p-8 shadow-soft md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-serif text-2xl font-medium text-charcoal italic md:text-[28px]">
                The Petit Menu
              </h3>
              <span className="text-[11px] tracking-[0.3em] text-taupe uppercase">
                À la carte additions
              </span>
            </div>
            <ul className="mt-7 divide-y divide-charcoal/8">
              {EXTRA_SERVICES.map((x) => (
                <li
                  key={x.name}
                  className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-300 hover:bg-ivory/60"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[14.5px] font-normal text-charcoal transition-colors duration-300 group-hover:text-metallic">
                      {x.name}
                    </span>
                    <span className="text-[11px] tracking-[0.16em] text-taupe/80 uppercase">
                      {x.duration}
                    </span>
                  </div>
                  <span className="hidden flex-1 border-b border-dotted border-charcoal/20 sm:block" />
                  <span className="font-serif text-lg text-charcoal italic">
                    {x.price > 0 ? `$${x.price}` : x.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
