import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "./ui";

/** Full-bleed parallax interlude — a cinematic breath between sections. */
export function Interlude() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <img
          src="/images/body-therapy.jpg"
          alt="A guest at rest during a restorative body treatment"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:py-40">
        <SectionLabel tone="light" align="center">
          The Aurelia Promise
        </SectionLabel>
        <p className="mt-8 font-serif text-3xl font-light leading-[1.25] text-ivory sm:text-4xl lg:text-[2.75rem]">
          Rest is not idleness. It is the quiet space where the body remembers how
          to heal, and the mind learns, once more, to be still.
        </p>
      </div>
    </section>
  );
}
