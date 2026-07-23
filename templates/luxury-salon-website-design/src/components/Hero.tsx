import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Award, BadgeCheck, Gem } from "lucide-react";
import { scrollToId } from "../lib/lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

const trust = [
  { icon: BadgeCheck, label: "Certified Stylists" },
  { icon: Gem, label: "Premium Products" },
  { icon: Award, label: "Award-Winning Salon" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Backdrop */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="The sunlit Lumière salon atelier with blush velvet chairs and arched mirrors"
          className="img-editorial h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      {/* Readability veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/55 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-28 md:px-10 md:pb-24"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-metallic/80" />
            <span className="text-[11px] font-medium tracking-[0.5em] text-charcoal/70 uppercase">
              SoHo · New York · Est. 2012
            </span>
          </motion.div>

          <h1 className="font-serif text-[13vw] leading-[0.98] font-medium text-charcoal sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.85, ease: EASE }}
              className="block"
            >
              Where confidence
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.0, ease: EASE }}
              className="block italic"
            >
              is <span className="text-metallic not-italic">crafted.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
            className="mt-7 max-w-xl text-[15px] leading-relaxed font-light tracking-wide text-charcoal/70 md:text-base"
          >
            Lumière is a private hair atelier where couture color, precision
            cutting and restorative rituals unfold at your pace — an unhurried
            hour of beauty, devoted entirely to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.35, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("#booking")}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[18px] bg-metallic px-8 py-4 text-[12.5px] font-medium tracking-[0.2em] text-ivory uppercase shadow-btn transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="absolute inset-0 -translate-x-full bg-charcoal transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Book Appointment</span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="relative transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <button
              onClick={() => scrollToId("#services")}
              className="inline-flex items-center gap-3 rounded-[18px] border border-charcoal/20 bg-ivory/40 px-8 py-4 text-[12.5px] font-medium tracking-[0.2em] text-charcoal uppercase backdrop-blur-sm transition-all duration-500 hover:border-charcoal/50 hover:bg-ivory/80"
            >
              Explore Services
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.55, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {trust.map((t, i) => (
              <div key={t.label} className="flex items-center gap-3">
                <t.icon size={17} strokeWidth={1.25} className="text-metallic" />
                <span className="text-[11px] font-medium tracking-[0.24em] text-charcoal/60 uppercase">
                  {t.label}
                </span>
                {i < trust.length - 1 && (
                  <span className="ml-5 hidden h-3.5 w-px bg-charcoal/15 sm:block" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        onClick={() => scrollToId("#maison")}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll to discover"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[10px] tracking-[0.4em] text-charcoal/50 uppercase">
            Scroll
          </span>
          <div className="relative h-14 w-px overflow-hidden bg-charcoal/15">
            <motion.span
              className="absolute top-0 left-0 h-6 w-px bg-metallic"
              animate={{ y: [-24, 56] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.button>
    </section>
  );
}
