import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Play } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink"
    >
      {/* Background image + ambient light */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          role="presentation"
          className="h-full w-full object-cover opacity-60"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink/60" />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-violet/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-azure/20 blur-[140px]"
      />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-6 pt-32 pb-10 md:px-10 lg:px-16 lg:pt-40">
        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist"
          >
            <span className="h-px w-10 bg-mist/60" />
            Independent Creative Agency — Est. 2013
          </motion.p>

          <h1 className="font-display text-[15vw] font-semibold leading-[0.85] tracking-tight text-paper sm:text-[13vw] lg:text-[9.5vw]">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              We craft
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block bg-gradient-to-r from-violet-light via-paper to-azure-light bg-clip-text text-transparent"
            >
              fearless
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              ideas.
            </motion.span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col justify-between gap-10 border-t border-white/10 pt-8 lg:flex-row lg:items-end"
        >
          <p className="max-w-md text-balance font-sans text-lg leading-relaxed text-mist md:text-xl">
            Novum is a design &amp; technology studio building brands, products, and
            digital experiences for the boldest companies on earth.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#contact" variant="primary">
              Start a Project
              <ArrowUpRight size={18} />
            </MagneticButton>
            <MagneticButton href="#work" variant="secondary">
              <Play size={16} className="fill-current" />
              View Our Work
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-mist"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
