import { MessageSquareQuote, Quote, Star } from "lucide-react";
import { GlowCard, SectionHeading, Stagger, StaggerItem } from "./ui";

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-cyan text-cyan" aria-hidden />
      ))}
    </span>
  );
}

const QUOTES = [
  {
    quote:
      "We replaced four dashboards and a weekly analytics sync with one question box. Copilot paid for itself the first Monday it sent the digest.",
    name: "Maya Chen",
    role: "VP Product, Northwind",
    initials: "MC",
    gradient: "from-accent-soft to-accent",
  },
  {
    quote:
      "The only analytics tool our engineers didn't complain about. Typed SDK, real API, subsecond everything.",
    name: "Jonas Richter",
    role: "Staff Engineer, Kernel & Co",
    initials: "JR",
    gradient: "from-cyan to-accent",
  },
  {
    quote:
      "Anomaly alerts caught a broken checkout flow at 2am. It would've cost us a weekend of revenue. That's the whole review.",
    name: "Priya Natarajan",
    role: "Head of Growth, Helios",
    initials: "PN",
    gradient: "from-accent to-cyan",
  },
  {
    quote:
      "Warehouse-native sold security instantly. Procurement took two weeks instead of the usual three months.",
    name: "Daniel Osei",
    role: "CISO, Forge",
    initials: "DO",
    gradient: "from-accent-soft/80 to-cyan/80",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" aria-label="Customer testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Customers"
          icon={<MessageSquareQuote className="size-3.5" />}
          title={
            <>
              Teams feel the difference
              <br />
              <span className="text-grad">in the first week.</span>
            </>
          }
          description="From two-person startups to public companies — here's what happens once Pulse becomes the source of truth."
        />

        <Stagger className="mt-16 grid gap-5 lg:grid-cols-3" delay={0.1}>
          {/* featured */}
          <StaggerItem className="lg:row-span-2">
            <GlowCard className="h-full" innerClassName="flex h-full flex-col p-8 sm:p-10">
              <Quote className="size-8 text-accent-soft/70" aria-hidden />
              <blockquote className="mt-6 font-display text-2xl font-medium leading-[1.28] tracking-[-0.02em] text-mist sm:text-[28px]">
                "We stopped arguing about numbers in meetings.{" "}
                <span className="text-grad">Everyone just asks Pulse</span> —
                the answer is the same for the CEO as it is for the intern."
              </blockquote>
              <div className="mt-auto pt-10">
                <Stars />
                <div className="mt-4 flex items-center gap-3.5">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-soft to-cyan font-display text-sm font-bold text-charcoal">
                    SA
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-mist">Sofia Almeida</p>
                    <p className="text-sm text-mute">Chief Product Officer, Arcadia</p>
                  </div>
                  <span className="ml-auto rounded-full border border-line bg-charcoal/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-mute">
                    G2 Leader
                  </span>
                </div>
              </div>
            </GlowCard>
          </StaggerItem>

          {QUOTES.map((q) => (
            <StaggerItem key={q.name}>
              <GlowCard className="h-full" innerClassName="flex h-full flex-col p-7">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[15px] leading-7 text-mist/85">
                  "{q.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className={`flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${q.gradient} font-display text-xs font-bold text-charcoal`}>
                    {q.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-mist">{q.name}</p>
                    <p className="text-[13px] text-mute">{q.role}</p>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
