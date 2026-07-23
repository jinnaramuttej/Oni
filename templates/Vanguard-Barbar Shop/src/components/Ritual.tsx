import { IMG } from "../data";
import { Btn, CONTAINER, Grain, Kicker, Reveal, Section } from "./ui";

const STEPS = [
  {
    n: "01",
    title: "The Cleanse",
    note: "Warm lather and pre-shave oil soften the beard and wake the skin.",
  },
  {
    n: "02",
    title: "The Hot Towel",
    note: "Steam-infused towels, pressed and rested. Most men nod off somewhere here.",
  },
  {
    n: "03",
    title: "The Blade",
    note: "Straight razor passes mapped to your growth — with, then across the grain.",
  },
  {
    n: "04",
    title: "The Close",
    note: "Cold towel, alum, house balm and a quiet nod in the mirror at the new man.",
  },
];

export default function Ritual() {
  return (
    <Section
      id="ritual"
      className="relative overflow-hidden py-24 md:py-36"
    >
      {/* walnut-toned backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(155deg,#201914_0%,#171310_45%,#111111_100%)]" />
      <div className="bg-hairline pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <Grain opacity={0.05} />

      <div className={`${CONTAINER} relative z-[2]`}>
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* portrait */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[20px] border border-bone/[0.08]">
                  <img
                    src={IMG.ritualMain}
                    alt="Barber performing a straight razor shave during the hot towel ritual"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover img-duotone sm:aspect-[5/4] transition-transform duration-[1.8s] ease-out hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-lg font-medium uppercase tracking-[0.14em] text-bone">
                        Royal Straight Razor Shave
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-brass">
                        45 minutes · The full ceremony
                      </p>
                    </div>
                    <span className="rounded-full border border-brass/40 bg-ink/60 px-5 py-2 font-display text-lg font-medium text-brass backdrop-blur-md">
                      $55
                    </span>
                  </div>
                </div>
                {/* brass corner accents */}
                <span className="absolute -left-2.5 -top-2.5 h-10 w-10 border-l border-t border-brass/60" aria-hidden />
                <span className="absolute -bottom-2.5 -right-2.5 h-10 w-10 border-b border-r border-brass/60" aria-hidden />
              </div>
            </Reveal>
          </div>

          {/* steps */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <Reveal>
              <Kicker index="04" label="The Signature Experience" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-tight text-bone sm:text-5xl lg:text-[3.4rem]">
                The hot towel
                <span className="block font-editorial font-medium lowercase italic tracking-normal text-brass">
                  ritual.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-[15px] leading-relaxed text-bone/55">
                Forty-five minutes. Four acts. One blade. The ritual hasn't changed in a
                century because it never needed to — it's the closest thing a man has to
                ceremony in an ordinary week.
              </p>
            </Reveal>

            <div className="mt-10 space-y-0">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={0.12 + i * 0.09}>
                  <div className="group relative flex gap-6 border-b border-bone/[0.07] py-6 first:border-t">
                    <span className="font-editorial text-2xl italic leading-none text-brass/80 transition-transform duration-500 group-hover:-translate-y-0.5">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.2em] text-bone">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-bone/45">
                        {s.note}
                      </p>
                    </div>
                    <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-brass/60 transition-all duration-700 group-hover:w-24" />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="mt-10">
                <Btn href="#booking">Reserve the Ritual</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
