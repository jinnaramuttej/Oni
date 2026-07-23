import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { Reveal, Eyebrow } from "./Reveal";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const current = TESTIMONIALS[index];
  const step = (dir: number) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="voices" className="grain relative overflow-hidden bg-sand py-28 lg:py-36">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal className="flex justify-center">
          <Eyebrow index="08">Voices from the studio</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full border border-eucalyptus/25 bg-ivory/70 text-eucalyptus-deep">
            <Quote size={20} strokeWidth={1.25} />
          </span>
        </Reveal>

        <div
          className="relative mt-10 min-h-[240px] sm:min-h-[190px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-serif text-[clamp(1.45rem,3.4vw,2.25rem)] font-light leading-[1.5] text-ink">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-serif text-lg text-eucalyptus-deep">{current.name}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.26em] text-charcoal/50">
                  {current.detail}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={() => step(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-eucalyptus/30 text-eucalyptus-deep transition-all duration-500 hover:bg-eucalyptus hover:text-ivory"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="group py-2"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-600 ${
                      i === index ? "w-8 bg-eucalyptus-deep" : "w-1.5 bg-charcoal/25 group-hover:bg-charcoal/45"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => step(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-eucalyptus/30 text-eucalyptus-deep transition-all duration-500 hover:bg-eucalyptus hover:text-ivory"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
