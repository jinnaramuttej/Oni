import { motion } from "framer-motion";
import { Award, Clock, ShieldCheck } from "lucide-react";
import { IMG } from "../data";
import { Btn, EASE, Grain } from "./ui";

const TRUST = [
  { icon: Award, label: "Master Barbers", note: "20+ years avg. experience" },
  { icon: ShieldCheck, label: "Premium Products", note: "House-blended & vetted" },
  { icon: Clock, label: "Walk-Ins Welcome", note: "When a chair is open" },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* backdrop */}
      <motion.img
        src={IMG.hero}
        alt="Master barber performing a precision haircut at Vanguard Barber Co."
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover img-duotone"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <Grain opacity={0.07} />

      {/* vertical coordinate rail */}
      <div className="absolute right-8 top-1/2 z-[2] hidden -translate-y-1/2 items-center gap-4 2xl:flex">
        <span
          className="text-[10px] font-medium uppercase tracking-[0.5em] text-bone/40"
          style={{ writingMode: "vertical-rl" }}
        >
          41.8781° N — 87.6298° W
        </span>
        <span className="h-16 w-px bg-bone/15" />
      </div>

      {/* content */}
      <div className="relative z-[2] mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-14 pt-40 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-brass/80" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.44em] text-brass">
              Gentlemen's Grooming Lounge · Chicago
            </span>
          </motion.div>

          <h1 className="mt-8">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
                className="block font-display text-[clamp(3.4rem,10vw,8.5rem)] font-semibold uppercase leading-[0.94] tracking-tight text-bone"
              >
                Crafted
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
                className="block font-editorial text-[clamp(2.4rem,6.5vw,5.5rem)] font-medium italic leading-[1.05] text-brass"
              >
                for confidence.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
            className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-bone/65"
          >
            Every cut, shave and trim treated as a craft. Master barbers, house-blended
            products and an unrushed hour that belongs entirely to you — since 1997.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Btn href="#booking">Book Appointment</Btn>
            <Btn href="#services" variant="ghost">
              View Services
            </Btn>
          </motion.div>
        </div>

        {/* trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="mt-14 flex flex-wrap items-stretch gap-x-10 gap-y-5 border-t border-bone/10 pt-7"
        >
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-4">
              <t.icon size={20} strokeWidth={1.4} className="text-brass" />
              <div className="leading-tight">
                <p className="font-display text-[13px] font-medium uppercase tracking-[0.18em] text-bone">
                  {t.label}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-steel">{t.note}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-14 right-12 z-[2] hidden flex-col items-center gap-4 lg:flex"
      >
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.5em] text-bone/50">
          Scroll
        </span>
        <div className="relative h-20 w-px overflow-hidden bg-bone/10">
          <span className="scroll-drop absolute left-0 top-0 h-1/4 w-full bg-brass" />
        </div>
      </motion.div>
    </section>
  );
}
