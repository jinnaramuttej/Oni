import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gauge, Clock3, UserRound, ArrowUpRight } from "lucide-react";
import { CLASSES } from "../data";
import { Reveal, Eyebrow } from "./Reveal";
import { scrollToId } from "../lib/scroll";

const FILTERS = ["All", "Flow", "Slow & Restore", "Foundations"] as const;

export default function Classes() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const visible = CLASSES.filter((c) => filter === "All" || c.category === filter);

  return (
    <section id="classes" className="relative overflow-hidden bg-ivory py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow index="02">Yoga classes</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] tracking-[-0.01em] text-ink sm:text-5xl">
                Classes for the pace <em className="font-normal italic text-eucalyptus-deep">you need</em> today
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-[15px] font-light leading-[1.95] text-charcoal/80">
                Some mornings ask for movement; some evenings ask for candlelight
                and doing almost nothing at all. Both are practice.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-500 ${
                  filter === f
                    ? "bg-eucalyptus text-ivory shadow-[0_10px_24px_-10px_rgb(127_145_114/0.6)]"
                    : "border border-pebble/70 bg-transparent text-charcoal/70 hover:border-eucalyptus/50 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </div>

        <motion.div layout className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                key={c.name}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.85, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-pebble/40 bg-sand/50 shadow-soft transition-all duration-700 hover:-translate-y-1.5 hover:bg-sand hover:shadow-lift"
              >
                <div className="img-frame relative">
                  <img
                    src={c.image}
                    alt={`${c.name} yoga class`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ivory/85 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-eucalyptus-deep backdrop-blur-sm">
                    {c.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-[26px] font-normal leading-snug text-ink">{c.name}</h3>
                  <p className="mt-3 flex-1 text-[14px] font-light leading-[1.85] text-charcoal/75">
                    {c.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-charcoal/10 pt-5 text-[12.5px] font-normal text-charcoal/70">
                    <li className="flex items-center gap-2">
                      <Gauge size={14} strokeWidth={1.5} className="text-eucalyptus-deep" />
                      {c.level}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock3 size={14} strokeWidth={1.5} className="text-eucalyptus-deep" />
                      {c.duration}
                    </li>
                    <li className="flex items-center gap-2">
                      <UserRound size={14} strokeWidth={1.5} className="text-eucalyptus-deep" />
                      {c.instructor}
                    </li>
                  </ul>

                  <button
                    onClick={() => scrollToId("booking")}
                    className="mt-7 inline-flex w-full items-center justify-between rounded-[20px] border border-eucalyptus/35 bg-ivory px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-eucalyptus-deep transition-all duration-500 group-hover:border-transparent group-hover:bg-eucalyptus group-hover:text-ivory"
                  >
                    Book Class
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
