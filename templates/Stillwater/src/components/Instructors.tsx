import { Reveal, Eyebrow, staggerParent, staggerChild } from "./Reveal";
import { motion } from "framer-motion";
import { INSTRUCTORS } from "../data";

export default function Instructors() {
  return (
    <section id="teachers" className="relative overflow-hidden bg-ivory py-28 lg:py-36">
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[340px] w-[340px] rounded-full bg-mist/50 blur-2xl animate-drift" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow index="05">Meet the teachers</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] text-ink sm:text-5xl">
              Teachers who <em className="font-normal italic text-eucalyptus-deep">teach softly</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-[15px] font-light leading-[1.95] text-charcoal/80">
              Fifty-two years of combined practice between four people who would
              still rather adjust a blanket than demonstrate a handstand.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {INSTRUCTORS.map((t) => (
            <motion.article key={t.name} variants={staggerChild} className="group text-center">
              <div className="img-frame mx-auto max-w-[260px] rounded-t-[999px] rounded-b-[24px] border border-pebble/50 bg-sand shadow-soft transition-shadow duration-700 group-hover:shadow-lift">
                <img
                  src={t.image}
                  alt={`${t.name}, ${t.role} at Stillwater Studio`}
                  loading="lazy"
                  className="aspect-[3/3.9] w-full object-cover"
                />
              </div>
              <h3 className="mt-7 font-serif text-2xl font-normal text-ink">{t.name}</h3>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-eucalyptus-deep">
                {t.role}
              </p>
              <p className="mx-auto mt-4 max-w-[250px] text-[13.5px] font-light leading-[1.85] text-charcoal/70">
                {t.bio}
              </p>
              <span className="mt-5 inline-block rounded-full border border-pebble/70 px-4 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.2em] text-charcoal/60">
                {t.years}
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
