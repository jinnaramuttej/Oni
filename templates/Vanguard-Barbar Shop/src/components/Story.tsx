import { Coffee, Scissors, ShieldCheck, Sparkles } from "lucide-react";
import { IMG } from "../data";
import { CONTAINER, Grain, Kicker, Reveal, Section } from "./ui";

const FEATURES = [
  {
    icon: Scissors,
    title: "Unrushed appointments",
    note: "Forty-five minutes minimum. Nobody's next cut is more important than yours.",
  },
  {
    icon: Sparkles,
    title: "House-blended products",
    note: "Pomades and oils we formulate, use in the chair, and stand behind at the shelf.",
  },
  {
    icon: Coffee,
    title: "The lounge standard",
    note: "Proper espresso, a quiet pour of bourbon if the hour allows, and chairs that hold you.",
  },
  {
    icon: ShieldCheck,
    title: "Sterile steel, every time",
    note: "Barbicide-grade discipline. Autoclaved tools, fresh blades, zero shortcuts.",
  },
];

const STATS = [
  { value: "28+", label: "Years behind the chair" },
  { value: "42K", label: "Cuts & counting" },
  { value: "06", label: "Master barbers on the floor" },
  { value: "4.9", label: "Across 1,200+ reviews" },
];

export default function Story() {
  return (
    <Section id="story" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <Grain opacity={0.04} />
      <div className="bg-hairline pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className={`${CONTAINER} relative z-[2]`}>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* imagery */}
          <div className="relative lg:col-span-7">
            <Reveal>
              <div className="relative overflow-hidden rounded-[20px] border border-bone/[0.08]">
                <img
                  src={IMG.storyMain}
                  alt="Vanguard barbershop interior — walnut wood, leather chairs and vintage mirrors"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover img-duotone transition-transform duration-[1.6s] ease-out hover:scale-[1.04]"
                />
                <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-bone/10" />
              </div>
            </Reveal>

            <Reveal delay={0.2} className="absolute -bottom-10 -right-2 hidden w-52 sm:block lg:-right-6 lg:w-64">
              <div className="overflow-hidden rounded-[16px] border-[6px] border-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
                <img
                  src={IMG.storyDetail}
                  alt="Vintage leather barber chair with chrome detailing"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover img-duotone"
                />
              </div>
              <span className="absolute -left-3 top-8 h-16 w-px bg-brass/60" />
            </Reveal>
          </div>

          {/* copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <Kicker index="01" label="Our Story" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-tight text-bone sm:text-5xl lg:text-[3.4rem]">
                Heritage in
                <span className="font-editorial font-medium lowercase italic tracking-normal text-brass"> every </span>
                detail
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 text-[15px] leading-relaxed text-bone/55">
                Vanguard opened its doors in 1997 in a century-old ironworks on Halsted
                Street — walnut counters poured by hand, chairs reupholstered in saddle
                leather, and mirrors that have watched three decades of men become
                fathers.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-bone/55">
                We kept the bones of the old shop and the discipline of the old trade.
                A haircut here isn't a transaction; it's an hour of craft from a barber
                who remembers your name, your cut, and how you take your espresso.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} delay={0.1 + i * 0.08}>
                  <div className="group flex items-start gap-5">
                    <span className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-[14px] border border-bone/10 bg-graphite/50 transition-colors duration-500 group-hover:border-brass/40 group-hover:bg-brass/[0.08]">
                      <f.icon size={17} strokeWidth={1.5} className="text-brass" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-medium uppercase tracking-[0.14em] text-bone">
                        {f.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-bone/45">{f.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <p className="mt-10 font-editorial text-2xl italic text-bone/70">
                "We don't rush. That's the whole secret."
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">
                — Marcus Cole · Founder & Master Barber
              </p>
            </Reveal>
          </div>
        </div>

        {/* stats */}
        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-bone/[0.08] bg-bone/[0.04] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-ink">
              <div className="flex h-full flex-col justify-between gap-8 px-7 py-9 transition-colors duration-500 hover:bg-coal">
                <span className="h-px w-8 bg-brass/50 transition-all duration-700 group-hover:w-14" />
                <div>
                  <p className="font-display text-5xl font-semibold tracking-tight text-bone lg:text-[3.4rem]">
                    {s.value}
                  </p>
                  <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.24em] text-steel">
                    {s.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
