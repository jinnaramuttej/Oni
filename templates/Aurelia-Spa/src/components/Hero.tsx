import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Award, Leaf, Gem } from "lucide-react";
import { Button, SectionLabel } from "./ui";
import { trustBadges } from "../lib/data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const badgeIcons = [Award, Leaf, Gem];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Parallax photograph */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <img
          src="/images/hero-spa.jpg"
          alt="Sunlit luxury spa suite with a stone bath, linen, and warm natural light"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Layered overlays for legibility & mood */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/75"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(20,18,16,0.5)_100%)]" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          <SectionLabel tone="light" align="center">
            Spa &amp; Wellness Sanctuary
          </SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          className="mt-7 max-w-4xl font-serif text-[2.9rem] font-light leading-[1.04] tracking-[-0.01em] text-ivory sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
        >
          The art of stillness,
          <br />
          <span className="italic text-gold">reimagined.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/80 sm:text-lg"
        >
          A sanctuary of slow rituals and quiet luxury — where every treatment is
          composed to restore balance to body, mind, and spirit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease: EASE }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href="#booking" variant="gold">
            Book Your Treatment
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Button>
          <Button href="#signature" variant="light">
            Explore Services
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {trustBadges.map((badge, i) => {
            const Icon = badgeIcons[i] ?? Award;
            return (
              <li key={badge.label} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span className="text-left">
                  <span className="block text-[0.8rem] font-medium tracking-wide text-ivory">
                    {badge.label}
                  </span>
                  <span className="block text-[0.7rem] text-ivory/55">{badge.detail}</span>
                </span>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3, ease: EASE }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-ivory/60">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/25">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-gold"
            animate={{ y: [-20, 48] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="h-3 w-3 text-ivory/40" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
