import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { value: "13+", label: "Years of artistry" },
  { value: "9", label: "Resident artists" },
  { value: "12k", label: "Guests welcomed" },
];

export default function Story() {
  return (
    <section id="maison" className="relative overflow-hidden bg-ivory py-28 md:py-40">
      <div className="texture-linen pointer-events-none absolute inset-0" />
      {/* soft organic blush shape */}
      <div
        className="pointer-events-none absolute -top-40 -right-48 h-[560px] w-[560px] rounded-full bg-blush/70 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Imagery — asymmetric composition */}
        <div className="relative lg:col-span-6">
          <Reveal y={60}>
            <div className="relative ml-auto w-[86%] md:w-[78%]">
              <div
                className="absolute -top-6 -left-6 h-full w-full rounded-[28px] border border-rosegold/30"
                aria-hidden
              />
              <div className="group relative overflow-hidden rounded-[28px] shadow-lift">
                <img
                  src="/images/story.jpg"
                  alt="A Lumière stylist perfecting a guest's hair in warm window light"
                  loading="lazy"
                  className="img-editorial aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </Reveal>

          {/* Floating quote card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass absolute -bottom-10 left-0 max-w-[280px] rounded-[24px] border hairline p-7 shadow-soft md:left-[6%]"
          >
            <Asterisk size={20} strokeWidth={1.25} className="text-metallic" />
            <p className="mt-3 font-serif text-xl leading-snug text-charcoal italic">
              “We don't chase trends. We reveal the woman already there.”
            </p>
            <p className="mt-4 text-[10.5px] tracking-[0.28em] text-taupe uppercase">
              Isabelle Marchetti — Founder
            </p>
          </motion.div>

          {/* Slow orbiting accent */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[8%] -left-3 hidden h-24 w-24 items-center justify-center md:flex"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <path id="circlePath" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
              </defs>
              <text className="fill-taupe text-[10.5px] tracking-[0.32em] uppercase">
                <textPath href="#circlePath">
                  maison lumière · since 2012 ·
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal y={24}>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-rosegold/70" />
              <span className="text-[11px] font-medium tracking-[0.42em] text-taupe uppercase">
                The Maison
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.08] font-medium text-charcoal md:text-5xl lg:text-[3.4rem]">
              A salon, reimagined as a
              <span className="italic"> private atelier</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 text-[15px] leading-relaxed font-light text-taupe md:text-base">
              Founded in a sun-drenched SoHo loft, Lumière was born from a
              simple conviction — that beautiful hair is never rushed. Every
              appointment begins with tea and an honest conversation, and
              unfolds in a space designed like a couture house: arched mirrors,
              blush velvet, and quiet attention.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed font-light text-taupe md:text-base">
              Our artists train in Paris and Milan, work with clean,
              bond-loving formulas, and take a limited number of guests each
              day. The result is hair that looks extraordinary on the day —
              and even better three weeks later.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-3 divide-x divide-charcoal/10 border-y hairline py-8">
              {stats.map((s) => (
                <div key={s.label} className="px-4 text-center first:pl-0 last:pr-0">
                  <p className="font-serif text-4xl font-medium text-charcoal md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[10.5px] tracking-[0.22em] text-taupe uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
