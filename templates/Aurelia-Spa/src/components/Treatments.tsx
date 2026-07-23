import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";
import { ServiceCard } from "./ServiceCard";
import { categories, treatments } from "../lib/data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Treatments() {
  const [active, setActive] = useState(categories[0].id);
  const filtered = treatments.filter((t) => t.category === active);
  const current = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <section id="treatments" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">The Treatment Menu</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-5xl">
            A complete wellness journey
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-charcoal/65">
            Five disciplines, one philosophy of care. Move between massage, facial,
            body, aromatherapy, and multi-hour rituals — each composed to meet you
            exactly where you are.
          </p>
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`rounded-pill px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-all duration-400 ease-out sm:px-6 ${
                  active === c.id
                    ? "bg-charcoal text-ivory shadow-soft"
                    : "border border-stone/60 bg-ivory text-charcoal/60 hover:border-gold/40 hover:text-charcoal"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-7 text-center">
          <p className="font-serif text-lg italic text-charcoal/50">{current.blurb}</p>
        </Reveal>

        {/* Filtered grid — re-animates on category change */}
        <motion.div
          key={active}
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((t) => (
            <motion.div key={t.name} variants={item} className="h-full">
              <ServiceCard treatment={t} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
