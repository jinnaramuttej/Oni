import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Novum didn't just redesign our brand — they redefined how we think about creativity internally. Every deliverable felt like a piece of art with a purpose.",
    name: "Elena Voss",
    role: "CMO, Meridian Bank",
  },
  {
    quote:
      "Working with this team is like working with a film studio, an engineering firm, and a design agency all at once. The craft is simply unmatched.",
    name: "Julian Park",
    role: "Founder, Solace",
  },
  {
    quote:
      "They pushed us further than we ever expected to go — and the results speak for themselves. Bold, precise, and utterly unforgettable.",
    name: "Amara Osei",
    role: "VP Brand, Orbital",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 md:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet/10 blur-[160px]"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <Quote className="mx-auto mb-8 text-violet-light" size={40} strokeWidth={1.25} />
        </Reveal>

        <div className="relative min-h-[260px] sm:min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-balance font-display text-2xl font-medium leading-snug tracking-tight text-paper sm:text-3xl lg:text-4xl">
                “{active.quote}”
              </p>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-paper">
                {active.name}
              </p>
              <p className="mt-1 text-sm text-mist">{active.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-paper transition-colors duration-300 hover:border-white/50"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-paper" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-paper transition-colors duration-300 hover:border-white/50"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
