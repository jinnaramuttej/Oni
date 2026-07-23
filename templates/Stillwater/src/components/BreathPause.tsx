import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * A quiet interlude — a guided breath, right on the page.
 * Inhale 4.5s, exhale 4.5s, forever.
 */
export default function BreathPause() {
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p === "in" ? "out" : "in")), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section aria-label="Take a breath" className="relative overflow-hidden bg-gradient-to-b from-eucalyptus-deep to-deep py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-sage">A pause, while you're here</p>

        <div className="relative mt-14 flex h-64 w-64 items-center justify-center">
          {/* expanding halo rings */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border border-sage/25"
            animate={{ scale: [1, 1.22], opacity: [0.5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-6 rounded-full border border-sand/20"
            animate={{ scale: [1, 1.18], opacity: [0.45, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          />
          {/* the breath circle */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-br from-sage/40 to-moss/25 backdrop-blur-sm"
            animate={{ scale: phase === "in" ? 1.14 : 0.86 }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-8 rounded-full bg-ivory/10"
            animate={{ scale: phase === "in" ? 1.2 : 0.78 }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
          />
          <motion.p
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="relative font-serif text-2xl font-light italic text-ivory"
          >
            {phase === "in" ? "Breathe in…" : "Let it go…"}
          </motion.p>
        </div>

        <p className="mt-14 max-w-md font-serif text-xl font-light italic leading-[1.8] text-sand/90">
          “Between stimulus and response there is a space. In that space is our
          power to choose our response.”
        </p>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-sage/80">Viktor Frankl</p>
      </div>
    </section>
  );
}
