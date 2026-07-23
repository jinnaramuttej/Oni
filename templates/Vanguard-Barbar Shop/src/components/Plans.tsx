import { Check, Clock, Crown } from "lucide-react";
import { MEMBERSHIPS, PACKAGES } from "../data";
import { Btn, CONTAINER, Reveal, Section, SectionHead } from "./ui";

export default function Plans() {
  return (
    <>
      {/* ------------------------- PACKAGES ------------------------- */}
      <Section id="packages" className="relative bg-ink py-24 md:py-36">
        <div className={CONTAINER}>
          <SectionHead
            index="05"
            kicker="Bundled Craft"
            title={
              <>
                Packages for the man
                <span className="block">
                  who plans
                  <span className="font-editorial font-medium lowercase italic tracking-normal text-brass">
                    {" "}
                    ahead.
                  </span>
                </span>
              </>
            }
            sub="Two hours out of the month. Everything handled — cut, beard, skin — and a door that locks the noise out behind you."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1} className="h-full">
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.85)] ${
                    p.featured
                      ? "border-brass/50 bg-gradient-to-b from-[#231c14] to-coal hover:border-brass/80"
                      : "border-bone/[0.08] bg-coal hover:border-brass/35"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute right-0 top-0 z-[2] rounded-bl-[16px] bg-brass px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-ink">
                      Most Requested
                    </span>
                  )}
                  <div className="relative overflow-hidden">
                    <img
                      src={p.img}
                      alt={`${p.name} grooming package`}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover img-duotone transition-transform duration-[1.4s] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/20 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[22px] font-semibold uppercase tracking-[0.06em] text-bone">
                        {p.name}
                      </h3>
                      <span className="inline-flex flex-none items-center gap-1.5 text-[11.5px] text-steel">
                        <Clock size={12} className="text-brass" strokeWidth={1.8} />
                        {p.time}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="font-display text-4xl font-semibold text-bone">
                        ${p.price}
                      </span>
                      <span className="rounded-full bg-leather/25 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brass">
                        {p.save}
                      </span>
                    </div>

                    <ul className="mt-6 flex-1 space-y-3 border-t border-bone/[0.07] pt-6">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[13.5px] text-bone/60">
                          <Check size={15} strokeWidth={2.2} className="mt-0.5 flex-none text-brass" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Btn
                        href="#booking"
                        variant={p.featured ? "brass" : "ghost"}
                        className="w-full px-5 py-3.5"
                      >
                        Book the Package
                      </Btn>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------ MEMBERSHIP ------------------------ */}
      <Section id="membership" className="relative overflow-hidden bg-coal py-24 md:py-36">
        <div className="bg-hairline pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className={`${CONTAINER} relative z-[2]`}>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHead
              index="06"
              kicker="Membership"
              title={
                <>
                  A standing chair,
                  <span className="block">
                    held in
                    <span className="font-editorial font-medium lowercase italic tracking-normal text-brass">
                      {" "}
                      your name.
                    </span>
                  </span>
                </>
              }
            />
            <Reveal delay={0.2} className="lg:pb-2">
              <p className="max-w-xs text-[14px] leading-relaxed text-bone/45 lg:text-right">
                No contracts, no fine print. Pause any month. Your slot, your barber,
                held like a reservation that never expires.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-7">
            {MEMBERSHIPS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-[20px] p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                    m.featured
                      ? "border border-brass/60 bg-gradient-to-b from-[#261e14] to-[#161310] shadow-[0_40px_80px_-32px_rgba(179,138,77,0.35)] lg:-translate-y-4 lg:hover:-translate-y-6"
                      : "border border-bone/[0.09] bg-ink hover:border-brass/30 hover:shadow-[0_30px_60px_-26px_rgba(0,0,0,0.9)]"
                  }`}
                >
                  {m.featured && (
                    <span className="absolute -top-3.5 left-8 inline-flex items-center gap-2 rounded-full bg-brass px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                      <Crown size={11} strokeWidth={2.4} />
                      Most Popular
                    </span>
                  )}

                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">
                    {m.tagline}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.1em] text-bone">
                    {m.name}
                  </h3>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-display text-6xl font-semibold tracking-tight text-bone">
                      ${m.price}
                    </span>
                    <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-steel">
                      / month
                    </span>
                  </div>

                  <ul className="mt-7 flex-1 space-y-3.5 border-t border-bone/[0.08] pt-7">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-bone/60">
                        <Check size={15} strokeWidth={2.2} className="mt-0.5 flex-none text-brass" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Btn
                      href="#booking"
                      variant={m.featured ? "brass" : "ghost"}
                      className="w-full px-5 py-3.5"
                    >
                      Join {m.name}
                    </Btn>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-[12px] uppercase tracking-[0.24em] text-steel">
              First month includes a complimentary line-up · Cancel or pause anytime
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
