import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Scissors } from "lucide-react";
import { SERVICES, type Service } from "../data";
import { ArrowLink, CONTAINER, EASE, Reveal, Section, SectionHead } from "./ui";

const TABS = [
  { key: "cuts", label: "Haircuts" },
  { key: "shave", label: "Beard & Shave" },
] as const;

function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-bone/[0.08] bg-coal transition-all duration-500 hover:-translate-y-1.5 hover:border-brass/40 hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.85)]">
      <div className="relative overflow-hidden">
        <img
          src={s.img}
          alt={s.name}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover img-duotone transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/70 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full border border-brass/30 bg-ink/70 px-4 py-1.5 font-display text-sm font-medium tracking-wide text-brass backdrop-blur-md">
          ${s.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold uppercase tracking-[0.06em] text-bone">
            {s.name}
          </h3>
          <span className="mt-1 inline-flex flex-none items-center gap-1.5 text-[11.5px] font-medium tracking-wide text-steel">
            <Clock size={12.5} strokeWidth={1.8} className="text-brass" />
            {s.mins} min
          </span>
        </div>
        <p className="mt-3.5 flex-1 text-[13.5px] leading-relaxed text-bone/50">{s.desc}</p>
        <div className="mt-6 border-t border-bone/[0.07] pt-5">
          <ArrowLink href="#booking">Book Appointment</ArrowLink>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("cuts");
  const list = useMemo(() => SERVICES.filter((s) => s.cat === tab), [tab]);

  return (
    <Section id="services" className="relative bg-ink py-24 md:py-36">
      <div className={CONTAINER}>
        <div className="flex flex-col gap-10 lg:items-end lg:justify-between xl:flex-row">
          <SectionHead
            index="03"
            kicker="Services & Care"
            title={
              <>
                Cut with intent,
                <span className="block">
                  priced with
                  <span className="font-editorial font-medium lowercase italic tracking-normal text-brass">
                    {" "}
                    honesty.
                  </span>
                </span>
              </>
            }
          />

          {/* tabs */}
          <Reveal delay={0.15}>
            <div className="inline-flex rounded-[16px] border border-bone/10 bg-coal p-1.5" role="tablist" aria-label="Service categories">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative rounded-[12px] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    tab === t.key ? "text-ink" : "text-bone/50 hover:text-bone"
                  }`}
                >
                  {tab === t.key && (
                    <motion.span
                      layoutId="serv-tab"
                      className="absolute inset-0 rounded-[12px] bg-brass"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative z-[1]">{t.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* grid */}
        <div className="relative mt-14 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {list.map((s) => (
                <ServiceCard key={s.name} s={s} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center gap-4 rounded-[16px] border border-bone/[0.08] bg-coal/60 px-6 py-5">
            <Scissors size={16} strokeWidth={1.5} className="flex-none text-brass" />
            <p className="text-[13px] leading-relaxed text-bone/55">
              Every chair service includes a consultation, hot-towel neck finish and a
              styled send-off. No upsells, no surprises — the price on the card is the
              price at the counter.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
