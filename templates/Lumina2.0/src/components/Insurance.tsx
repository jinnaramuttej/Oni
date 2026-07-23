import { BadgeDollarSign, ClipboardCheck, CreditCard, Wallet } from "lucide-react";
import { Button, Reveal, SectionHeading } from "./ui";
import { INSURANCE_PARTNERS } from "../lib/data";

const perks = [
  {
    icon: ClipboardCheck,
    title: "Benefits verified for you",
    text: "Send us your insurance card before your first visit — we confirm coverage, file every claim, and chase approvals so you never have to.",
  },
  {
    icon: Wallet,
    title: "Clear, upfront pricing",
    text: "Every treatment plan arrives with an itemized estimate. The price we quote is the price you pay — no codes, no surprises.",
  },
  {
    icon: CreditCard,
    title: "0% flexible financing",
    text: "Spread larger treatments over 6–18 months with interest-free plans, or join our in-house membership for two cleanings a year.",
  },
];

export function Insurance() {
  return (
    <section id="insurance" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Insurance & pricing"
          title="Premium care that respects your budget"
          lede="We're in-network with most major PPO plans — and radically transparent with everyone else."
        />

        {/* Partner marquee */}
        <Reveal delay={140} className="mt-12">
          <div
            className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 py-5"
            aria-label={`In-network with ${INSURANCE_PARTNERS.join(", ")} and more`}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-slate-50 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-slate-50 to-transparent" aria-hidden="true" />
            <div className="flex w-max animate-marquee items-center gap-14 whitespace-nowrap px-8 hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[...INSURANCE_PARTNERS, ...INSURANCE_PARTNERS].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="inline-flex items-center gap-2.5 font-display text-sm font-semibold tracking-wide text-slate-400"
                  aria-hidden={i >= INSURANCE_PARTNERS.length}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" aria-hidden="true" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3 lg:gap-6">
          {perks.map((perk, i) => (
            <Reveal as="li" key={perk.title} delay={i * 110}>
              <article className="group h-full rounded-[1.5rem] border border-slate-100 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-100 hover:shadow-card-hover lg:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100 transition-all duration-500 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/30">
                  <perk.icon className="h-5.5 w-5.5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-navy-800">
                  {perk.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{perk.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={160}>
          <p className="mt-9 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-slate-500">
            <BadgeDollarSign className="h-4 w-4 text-teal-500" aria-hidden="true" />
            No insurance? Our <span className="font-semibold text-navy-800">Lumina Membership</span> —
            $34/mo — covers two cleanings, exams, X-rays, and 15% off treatment.
            <Button href="#booking" variant="outline" size="md" className="ml-1 !px-4 !py-2 text-xs">
              Ask about membership
            </Button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
