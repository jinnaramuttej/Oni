import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { SCHEDULE } from "../data";
import { Reveal, Eyebrow } from "./Reveal";
import { scrollToId } from "../lib/scroll";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const LABELS: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export default function Schedule() {
  const todayIndex = (new Date().getDay() + 6) % 7; // Monday-first
  const [day, setDay] = useState<(typeof DAYS)[number]>(DAYS[todayIndex]);
  const sessions = SCHEDULE[day];

  return (
    <section id="schedule" className="grain relative overflow-hidden bg-mist/45 py-28 lg:py-36">
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow index="06">Weekly rhythm</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] text-ink sm:text-5xl">
                The week, arranged <em className="font-normal italic text-eucalyptus-deep">around breath</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-xs text-[13.5px] font-light leading-[1.9] text-charcoal/70">
              Doors open twenty minutes before every class. We begin on time,
              and we always end with tea if you want to stay.
            </p>
          </Reveal>
        </div>

        {/* ——— Day chooser ——— */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Choose a day"
            className="mt-12 flex gap-1.5 overflow-x-auto rounded-[22px] border border-ivory/70 bg-ivory/75 p-1.5 backdrop-blur-sm sm:grid sm:grid-cols-7"
          >
            {DAYS.map((d, i) => (
              <button
                key={d}
                role="tab"
                aria-selected={day === d}
                onClick={() => setDay(d)}
                className={`relative min-w-[70px] shrink-0 rounded-[16px] py-3 text-center transition-colors duration-500 ${
                  day === d ? "text-ivory" : "text-charcoal/65 hover:text-ink"
                }`}
              >
                {day === d && (
                  <motion.span
                    layoutId="day-pill"
                    className="absolute inset-0 rounded-[16px] bg-eucalyptus"
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium uppercase tracking-[0.16em]">{d}</span>
                  {i === todayIndex && (
                    <span className={`text-[9px] uppercase tracking-[0.2em] ${day === d ? "text-ivory/75" : "text-eucalyptus-deep/70"}`}>
                      today
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* ——— Sessions ——— */}
        <div className="mt-8 overflow-hidden rounded-[24px] border border-ivory/70 bg-ivory shadow-soft">
          <AnimatePresence mode="wait">
            <motion.ul
              key={day}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {sessions.map((s, i) => (
                <li
                  key={`${day}-${i}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-pebble/40 px-6 py-6 transition-colors duration-500 first:border-t-0 hover:bg-sand/45 sm:grid-cols-[88px_1fr_1fr_auto_auto] sm:gap-6 sm:px-8"
                >
                  <div className="font-serif text-2xl font-light text-ink">
                    {s.time}
                    <span className="mt-0.5 block text-[9.5px] font-medium uppercase tracking-[0.24em] text-charcoal/45">
                      {LABELS[day].slice(0, 3)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-[19px] font-normal leading-snug text-ink">{s.name}</h3>
                    <p className="mt-0.5 text-[12px] font-light uppercase tracking-[0.14em] text-charcoal/55">
                      {s.teacher}
                    </p>
                  </div>
                  <span className="hidden w-fit rounded-full border border-pebble/70 px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-charcoal/60 sm:block">
                    {s.level}
                  </span>
                  <span
                    className={`hidden items-center gap-1.5 text-[11.5px] font-light sm:flex ${
                      s.spots <= 3 ? "text-clay" : "text-eucalyptus-deep"
                    }`}
                  >
                    <CircleDot size={11} strokeWidth={1.5} />
                    {s.spots <= 3 ? `${s.spots} left` : `${s.spots} places`}
                  </span>
                  <button
                    onClick={() => scrollToId("booking")}
                    aria-label={`Reserve ${s.name}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-eucalyptus/30 text-eucalyptus-deep transition-all duration-500 group-hover:border-eucalyptus group-hover:bg-eucalyptus group-hover:text-ivory"
                  >
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-[12.5px] font-light leading-[1.9] text-charcoal/60">
            Private tuition runs Tuesday–Thursday afternoons · The studio rests between 2 pm and 4 pm, and so should you
          </p>
        </Reveal>
      </div>
    </section>
  );
}
