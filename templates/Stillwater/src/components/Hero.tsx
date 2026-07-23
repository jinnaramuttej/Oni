import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, Sprout, UsersRound, ArrowRight } from "lucide-react";
import { IMAGES } from "../data";
import { scrollToId } from "../lib/scroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 34 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.3, delay, ease: EASE },
  });

  return (
    <section ref={ref} id="hero" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* ——— Imagery, slowly receding ——— */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.img
          src={IMAGES.hero}
          alt="A person meditating at sunrise beside a still lake"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 3.4, ease: EASE }}
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* ——— Quiet, natural light washes ——— */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/25 to-transparent" />

      {/* ——— Words ——— */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 lg:px-10"
      >
        <motion.div {...fade(0.5)} className="flex items-center gap-4">
          <span className="h-px w-12 bg-ivory/70" />
          <span className="text-[11px] font-medium uppercase tracking-[0.38em] text-ivory/90">
            Portland, Oregon · Est. 2016
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.72)}
          className="mt-8 max-w-3xl font-serif text-[13vw] font-light leading-[1.04] tracking-[-0.02em] text-ivory sm:text-6xl md:text-7xl lg:text-[5.4rem]"
        >
          Return to your
          <br />
          <em className="font-normal italic text-sand">natural rhythm.</em>
        </motion.h1>

        <motion.p
          {...fade(0.94)}
          className="mt-8 max-w-md text-[15px] font-light leading-[1.9] text-ivory/85 sm:text-base"
        >
          Stillwater is a quiet sanctuary for yoga, meditation and breathwork —
          small classes, honest teaching, and one hour of your day handed gently
          back to you.
        </motion.p>

        <motion.div {...fade(1.16)} className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToId("booking")}
            className="group inline-flex items-center gap-3 rounded-[20px] bg-ivory px-8 py-4 text-[13px] font-medium uppercase tracking-[0.16em] text-ink shadow-[0_18px_40px_-16px_rgb(46_46_42/0.45)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-sand"
          >
            Book Your First Class
            <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToId("classes")}
            className="inline-flex items-center gap-3 rounded-[20px] border border-ivory/45 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.16em] text-ivory backdrop-blur-sm transition-all duration-500 hover:border-ivory/80 hover:bg-ivory/10"
          >
            Explore Classes
          </button>
        </motion.div>

        {/* ——— Quiet trust marks ——— */}
        <motion.ul {...fade(1.4)} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            { icon: BadgeCheck, label: "Certified instructors" },
            { icon: Sprout, label: "Beginner friendly" },
            { icon: UsersRound, label: "Groups of 12 or fewer" },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 text-ivory/80">
              <Icon size={15} strokeWidth={1.5} className="text-sage" />
              <span className="text-[12px] font-light uppercase tracking-[0.2em]">{label}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* ——— Scroll breath ——— */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.4 }}
        className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-16"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-ivory/70">Breathe</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/25">
          <span
            className="absolute top-0 h-6 w-px bg-ivory"
            style={{ animation: "scroll-hint 2.6s cubic-bezier(0.22,1,0.36,1) infinite" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
