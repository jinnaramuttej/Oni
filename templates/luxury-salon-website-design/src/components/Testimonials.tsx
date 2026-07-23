import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Reveal from "./Reveal";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  const item = TESTIMONIALS[index];

  return (
    <section
      id="voices"
      className="relative overflow-hidden bg-ivory py-28 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="texture-linen pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blush/60 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal y={24}>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-rosegold/70" />
            <span className="text-[11px] font-medium tracking-[0.42em] text-taupe uppercase">
              Kind Words
            </span>
            <span className="h-px w-10 bg-rosegold/70" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-rosegold/30 bg-blush">
            <Quote size={22} strokeWidth={1.25} className="text-metallic" />
          </div>
        </Reveal>

        <div className="relative mt-8 min-h-[260px] md:min-h-[230px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif text-[26px] leading-[1.35] font-medium text-charcoal italic md:text-[34px]">
                “{item.quote}”
              </p>
              <footer className="mt-8">
                <div className="flex items-center justify-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      strokeWidth={1}
                      className="fill-rosegold text-rosegold"
                    />
                  ))}
                </div>
                <p className="mt-3 text-[13px] font-medium tracking-[0.22em] text-charcoal uppercase">
                  {item.name}
                </p>
                <p className="mt-1 text-[11px] font-light tracking-[0.2em] text-taupe uppercase">
                  {item.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border hairline text-charcoal transition-all duration-500 hover:border-metallic hover:bg-blush hover:text-metallic"
            >
              <ChevronLeft size={17} strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-2.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={
                    i === index
                      ? "h-1.5 w-8 rounded-full bg-metallic transition-all duration-500"
                      : "h-1.5 w-3 rounded-full bg-charcoal/15 transition-all duration-500 hover:bg-rosegold"
                  }
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border hairline text-charcoal transition-all duration-500 hover:border-metallic hover:bg-blush hover:text-metallic"
            >
              <ChevronRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
