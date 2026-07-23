import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Dashboard from "./Dashboard";
import { EASE, PulseDot } from "./ui";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden pt-36 sm:pt-44">
      {/* ── ambient backdrop ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-420px] h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-accent/[0.13] blur-[140px]" />
        <div className="absolute left-[8%] top-[160px] h-72 w-72 rounded-full bg-cyan/[0.05] blur-[110px]" />
        <div className="absolute right-[6%] top-[240px] h-72 w-72 rounded-full bg-accent-soft/[0.06] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* ── announcement ── */}
        <motion.div {...fadeUp(0.05)} className="flex justify-center">
          <a
            href="#copilot"
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pl-1.5 pr-4 text-sm text-mute transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:text-mist focus-visible:outline-2 focus-visible:outline-accent-soft"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-soft ring-1 ring-inset ring-accent/25">
              <Sparkles className="size-3" aria-hidden />
              New
            </span>
            Pulse Copilot — ask your data anything
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </motion.div>

        {/* ── headline ── */}
        <motion.h1
          {...fadeUp(0.14)}
          className="mx-auto mt-8 max-w-4xl text-center font-display text-[44px] font-semibold leading-[1.04] tracking-[-0.04em] text-mist sm:text-6xl md:text-7xl lg:text-[84px]"
        >
          Your product data,{" "}
          <span className="whitespace-nowrap">finally</span>
          <br className="hidden sm:block" />
          speaking <span className="text-grad">your language.</span>
        </motion.h1>

        {/* ── value prop ── */}
        <motion.p
          {...fadeUp(0.24)}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-8 text-mute sm:text-lg"
        >
          Pulse streams every event in real time and turns it into decisions
          with an AI copilot your whole team can trust. No SQL. No waiting.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          {...fadeUp(0.34)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#pricing"
            className="btn-sheen group inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[18px] bg-mist px-7 text-base font-semibold tracking-[-0.01em] text-charcoal shadow-[0_10px_40px_-10px_rgb(124_58_237/0.5),inset_0_1px_0_rgb(255_255_255/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.985] sm:w-auto"
          >
            Start Free
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a
            href="#cta"
            className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[18px] border border-line bg-white/[0.03] px-7 text-base font-medium tracking-[-0.01em] text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] active:translate-y-0 active:scale-[0.985] sm:w-auto"
          >
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mist/50" />
              <span className="relative inline-flex size-2 rounded-full bg-mist/80" />
            </span>
            Book Demo
          </a>
        </motion.div>

        {/* ── microcopy ── */}
        <motion.ul
          {...fadeUp(0.42)}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-mute/80"
        >
          {["Free 14-day Pro trial", "No credit card required", "Set up in 5 minutes"].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="size-3.5 text-cyan" aria-hidden />
              {t}
            </li>
          ))}
        </motion.ul>

        {/* ── product preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
          className="relative mt-16 sm:mt-20"
        >
          <Dashboard />
        </motion.div>

        {/* ── scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-2.5 pb-2"
          aria-hidden
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute/60">
            Scroll
          </span>
          <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/15 p-1.5">
            <span className="h-1.5 w-[3px] animate-scroll-dot rounded-full bg-cyan" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export { PulseDot };
