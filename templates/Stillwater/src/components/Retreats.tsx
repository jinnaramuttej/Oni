import { MapPin, CalendarRange, ArrowRight } from "lucide-react";
import { RETREATS } from "../data";
import { Reveal, Eyebrow, staggerParent, staggerChild } from "./Reveal";
import { motion } from "framer-motion";
import { scrollToId } from "../lib/scroll";

export default function Retreats() {
  return (
    <section id="retreats" className="grain relative overflow-hidden bg-sand py-28 lg:py-36">
      <div className="pointer-events-none absolute -left-40 top-24 h-[380px] w-[380px] rounded-full bg-mist/60 blur-2xl animate-drift-slow" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow index="04">Wellness retreats</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] text-ink sm:text-5xl">
              Go further into <em className="font-normal italic text-eucalyptus-deep">the quiet</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-[15px] font-light leading-[1.95] text-charcoal/80">
              A few times a year we leave the studio entirely — for cedar
              forests, empty beaches and rooms where the loudest thing is the
              kettle. Phones stay in a basket. Rest does the rest.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
        >
          {RETREATS.map((r) => (
            <motion.article
              key={r.name}
              variants={staggerChild}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-ivory/70 bg-ivory shadow-soft transition-all duration-700 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="img-frame relative">
                <img
                  src={r.image}
                  alt={`${r.name} retreat — ${r.location}`}
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover"
                />
                <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ivory/85 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-eucalyptus-deep backdrop-blur-sm">
                  <CalendarRange size={12} strokeWidth={1.5} />
                  {r.dates}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-eucalyptus-deep">
                  <MapPin size={12} strokeWidth={1.5} />
                  {r.location}
                </p>
                <h3 className="mt-3 font-serif text-[27px] font-normal text-ink">{r.name}</h3>
                <p className="mt-3 flex-1 text-[14px] font-light leading-[1.85] text-charcoal/75">
                  {r.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-5">
                  <div>
                    <p className="text-[13px] font-light text-charcoal/60">{r.length}</p>
                    <p className="font-serif text-lg text-ink">{r.price}</p>
                  </div>
                  <button
                    onClick={() => scrollToId("booking")}
                    className="group/btn inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-eucalyptus-deep transition-colors hover:text-ink"
                  >
                    Reserve
                    <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
