import { Leaf, ArrowRight } from "lucide-react";
import { Reveal, Eyebrow, staggerParent, staggerChild } from "./Reveal";
import { motion } from "framer-motion";
import { TIERS } from "../data";
import { scrollToId } from "../lib/scroll";

export default function Membership() {
  return (
    <section id="membership" className="relative overflow-hidden bg-ivory py-28 lg:py-40">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-sand/80 blur-2xl animate-drift-slow" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow index="07">Membership</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] text-ink sm:text-5xl">
              Choose a rhythm, <em className="font-normal italic text-eucalyptus-deep">not a contract</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-[15px] font-light leading-[1.95] text-charcoal/80">
              Pause anytime with a single email. No joining fees, no exit
              interviews, no guilt. Your first week at Stillwater is always ours
              to give — free of charge.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-16 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 lg:gap-8"
        >
          {TIERS.map((t) => (
            <motion.article
              key={t.name}
              variants={staggerChild}
              className={`group relative flex flex-col rounded-[24px] p-9 transition-all duration-700 hover:-translate-y-1.5 ${
                t.featured
                  ? "border border-eucalyptus bg-eucalyptus text-ivory shadow-glow lg:scale-[1.04]"
                  : "border border-pebble/50 bg-sand/45 text-ink shadow-soft hover:bg-sand/60 hover:shadow-lift"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-clay px-5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-ivory shadow-soft">
                  Most loved
                </span>
              )}

              <h3 className="font-serif text-[26px] font-normal">{t.name}</h3>
              <p className={`mt-2 font-serif text-[15px] italic ${t.featured ? "text-ivory/75" : "text-eucalyptus-deep"}`}>
                {t.tagline}
              </p>

              <p className="mt-7 flex items-end gap-2">
                <span className="font-serif text-[52px] font-light leading-none tracking-tight">{t.price}</span>
                <span className={`pb-1.5 text-[12px] font-light uppercase tracking-[0.14em] ${t.featured ? "text-ivory/65" : "text-charcoal/55"}`}>
                  {t.cadence}
                </span>
              </p>

              <ul className={`mt-8 flex-1 space-y-3.5 border-t pt-7 ${t.featured ? "border-ivory/20" : "border-charcoal/10"}`}>
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] font-light leading-[1.7]">
                    <Leaf size={14} strokeWidth={1.5} className={`mt-1 shrink-0 ${t.featured ? "text-sand" : "text-eucalyptus-deep"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToId("booking")}
                className={`mt-9 inline-flex items-center justify-center gap-2.5 rounded-[20px] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-500 ${
                  t.featured
                    ? "bg-ivory text-eucalyptus-deep hover:bg-sand"
                    : "border border-eucalyptus/35 bg-ivory text-eucalyptus-deep hover:border-eucalyptus hover:bg-eucalyptus hover:text-ivory"
                }`}
              >
                Begin with {t.name}
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-14 max-w-xl text-center text-[13px] font-light leading-[2] text-charcoal/60">
            Concessions are quietly available for students, carers and anyone
            between jobs — no proof required, just ask at the desk. Wellness
            should never be gated by income.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
