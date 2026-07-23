import { CalendarCheck, Crown, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { scrollToId } from "../lib/lenis";

const PERKS = [
  {
    icon: Sparkles,
    title: "Monthly Ritual",
    text: "One signature blowout or gloss refresh, every month.",
  },
  {
    icon: CalendarCheck,
    title: "Priority Booking",
    text: "First access to weekend slots and your artist's calendar.",
  },
  {
    icon: Crown,
    title: "Member Pricing",
    text: "15% off all services and apothecary, always.",
  },
  {
    icon: Gift,
    title: "Guest Passes",
    text: "Two annual passes to introduce someone you love.",
  },
];

export default function Membership() {
  return (
    <section id="membership" className="relative overflow-hidden bg-blush py-28 md:py-40">
      <div className="texture-linen pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -bottom-48 -left-40 h-[480px] w-[480px] rounded-full bg-ivory blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 md:px-10 lg:grid-cols-12">
        {/* Copy + perks */}
        <div className="lg:col-span-6">
          <Reveal y={24}>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-rosegold/70" />
              <span className="text-[11px] font-medium tracking-[0.42em] text-taupe uppercase">
                Membership
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.08] font-medium text-charcoal md:text-5xl lg:text-[3.4rem]">
              Le Cercle — <span className="italic">our inner circle</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed font-light text-taupe">
              A membership for those who consider great hair a non-negotiable.
              Two hundred memberships a year, released each January — each one
              an open door to your artist, your ritual, your standing
              appointment.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={0.22 + i * 0.08} y={32}>
                <div className="group flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rosegold/35 bg-ivory/70 text-metallic transition-all duration-500 group-hover:border-metallic group-hover:bg-ivory">
                    <p.icon size={17} strokeWidth={1.25} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-charcoal">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed font-light text-taupe">
                      {p.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <button
              onClick={() => scrollToId("#booking")}
              className="group relative mt-11 inline-flex items-center gap-3 overflow-hidden rounded-[18px] bg-charcoal px-8 py-4 text-[12px] font-medium tracking-[0.2em] text-ivory uppercase transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="absolute inset-0 -translate-x-full bg-metallic transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Request an Invitation</span>
            </button>
          </Reveal>
        </div>

        {/* Membership card */}
        <div className="lg:col-span-5 lg:col-start-8">
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="animate-float relative mx-auto max-w-[420px]"
          >
            {/* back card */}
            <div
              className="absolute inset-x-6 -bottom-6 h-full rounded-[26px] bg-champagne/70"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[26px] border border-metallic/25 bg-gradient-to-br from-charcoal via-[#3a3232] to-[#4a3a3c] p-9 shadow-lift">
              <div
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-metallic/30 blur-3xl"
                aria-hidden
              />
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif text-2xl tracking-[0.18em] text-ivory">
                    LUMIÈRE
                  </p>
                  <p className="mt-1 text-[9px] tracking-[0.5em] text-champagne uppercase">
                    Le Cercle Privé
                  </p>
                </div>
                <Crown size={22} strokeWidth={1.25} className="text-champagne" />
              </div>

              <div className="mt-14">
                <p className="text-[10px] tracking-[0.4em] text-ivory/50 uppercase">
                  Member
                </p>
                <p className="mt-1.5 font-serif text-[26px] text-ivory italic">
                  Vivienne Laurent
                </p>
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.4em] text-ivory/50 uppercase">
                    Nº
                  </p>
                  <p className="mt-1 font-serif text-lg tracking-[0.3em] text-champagne">
                    0047 · 200
                  </p>
                </div>
                <p className="font-serif text-lg text-metallic italic">$240 / mo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
