import { Reveal, Eyebrow, staggerParent, staggerChild } from "./Reveal";
import { motion } from "framer-motion";
import { Leaf, UsersRound, HeartHandshake } from "lucide-react";
import { IMAGES } from "../data";

const VALUES = [
  {
    icon: UsersRound,
    title: "Small by design",
    text: "Twelve mats, never more. A teacher who knows your name, your knees, and the story your shoulders are telling today.",
  },
  {
    icon: Leaf,
    title: "Rooted in nature",
    text: "Cedar floors, linen curtains, a courtyard of ferns. We practise with the windows open to the seasons, not sealed against them.",
  },
  {
    icon: HeartHandshake,
    title: "Kindness to beginners",
    text: "There is no level you must reach to belong here. Rest is participation. Leaving early is fine. You already qualify.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="grain relative overflow-hidden bg-sand py-28 lg:py-40">
      {/* ambient botanical circle */}
      <div className="pointer-events-none absolute -right-40 top-16 z-0 h-[420px] w-[420px] rounded-full bg-mist/50 blur-2xl animate-drift-slow" />
      <div className="pointer-events-none absolute -left-32 bottom-10 z-0 h-[300px] w-[300px] rounded-full bg-clay/20 blur-2xl animate-drift" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* ——— Words ——— */}
        <div className="lg:col-span-6 lg:pr-8">
          <Reveal>
            <Eyebrow index="01">Our philosophy</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] tracking-[-0.01em] text-ink sm:text-5xl lg:text-[3.4rem]">
              Practice, not <em className="font-normal italic text-eucalyptus-deep">performance.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-lg text-[15px] font-light leading-[2] text-charcoal/85 sm:text-base">
              We opened Stillwater with a single belief: that the hour you spend
              on a mat should feel like the opposite of the rest of your day.
              No mirrors to correct yourself in, no leaderboards, no heat turned
              up to impress. Just cedar underfoot, breath in your chest, and a
              room full of people quietly doing the same honest work.
            </p>
          </Reveal>

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mt-12 space-y-7"
          >
            {VALUES.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={staggerChild} className="flex gap-5">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-eucalyptus/30 bg-ivory/70 text-eucalyptus-deep">
                  <Icon size={17} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-normal text-ink">{title}</h3>
                  <p className="mt-1.5 max-w-md text-[14px] font-light leading-[1.9] text-charcoal/75">{text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ——— Image collage ——— */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[430px] lg:ml-auto lg:mr-16">
            <Reveal y={48}>
              <div className="img-frame rounded-t-[999px] rounded-b-[28px] border border-ivory/60 shadow-lift">
                <img
                  src={IMAGES.philosophyArch}
                  alt="A woman resting in meditation with her eyes closed in soft light"
                  loading="lazy"
                  className="aspect-[3/4.1] w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal y={40} delay={0.15} className="absolute -left-8 bottom-6 w-44 sm:-left-16 sm:w-56">
              <div className="img-frame rounded-[24px] border-4 border-ivory shadow-lift animate-drift">
                <img
                  src={IMAGES.lakePose}
                  alt="Yoga practised beside a lake in the early morning"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal y={32} delay={0.3} className="absolute -right-4 top-8 sm:-right-10">
              <div className="img-frame w-28 rounded-full border-4 border-ivory shadow-lift animate-drift-slow sm:w-36">
                <img
                  src={IMAGES.teaCandle}
                  alt="A candle, tea and incense arranged quietly"
                  loading="lazy"
                  className="aspect-square w-full rounded-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.35} className="mt-14 max-w-sm lg:ml-auto lg:mr-6">
            <p className="font-serif text-lg font-light italic leading-[1.8] text-eucalyptus-deep">
              “Teach this triple truth to all: a generous heart, kind speech,
              and a life of service are the things which renew humanity.”
            </p>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/50">
              Words on our studio wall
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
