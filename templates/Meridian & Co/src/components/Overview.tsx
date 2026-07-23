import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import { Reveal, SectionHeading, CountUp, LazyImage } from "../lib/ui";

const MAIN_IMAGE =
  "https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1120&w=900";
const OVERLAY_IMAGE =
  "https://images.pexels.com/photos/8152734/pexels-photo-8152734.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=640";

const COMMITMENTS = [
  { title: "A dedicated CA for every engagement", desc: "One accountable partner who knows your books end to end." },
  { title: "Transparent, fixed-fee engagements", desc: "Scope and pricing agreed upfront — never a surprise invoice." },
  { title: "Audit-ready books, every quarter", desc: "Reconciled, sourced and defensible long before deadlines." },
] as const;

type Stat = { value: number; prefix: string; suffix: string; label: string; note: string };

const STATS: Stat[] = [
  { value: 15, prefix: "", suffix: "+", label: "Years of practice", note: "Established 2009" },
  { value: 1000, prefix: "", suffix: "+", label: "Businesses served", note: "Across 20+ sectors" },
  { value: 2400, prefix: "₹", suffix: " Cr+", label: "Assets under advisory", note: "30-40% average tax efficiency" },
  { value: 98, prefix: "", suffix: "%", label: "Client retention", note: "Multi-year engagements" },
];

export default function Overview() {
  return (
    <div id="about">
      {/* Firm overview */}
      <section className="bg-white py-24 md:py-32" aria-label="About the firm">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-20">
          {/* Copy */}
          <div>
            <SectionHeading
              eyebrow="About the Firm"
              title={
                <>
                  A partner in your financial journey —{" "}
                  <span className="relative inline-block text-green-700">
                    not just an accountant.
                    <svg viewBox="0 0 220 12" aria-hidden="true" className="absolute -bottom-2 left-0 w-full text-gold-400" fill="none">
                      <path d="M3 9C60 3 160 3 217 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </>
              }
              description="Founded in 2009, Meridian & Co. blends the rigour of a traditional CA practice with the speed and clarity of a modern fintech. Our teams serve founders, CFOs and family businesses who expect their numbers to work as hard as they do."
            />

            <ul className="mt-10 space-y-5">
              {COMMITMENTS.map((item, i) => (
                <Reveal key={item.title} delay={i * 110}>
                  <li className="flex gap-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-700/10">
                      <CheckCircle2 className="h-[18px] w-[18px] text-green-700" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-extrabold tracking-tight text-navy-800">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.desc}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={350}>
              <a
                href="#experts"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-extrabold text-navy-800 transition-colors hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 rounded-lg"
              >
                Meet the people behind the practice
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          {/* Photography collage */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Reveal>
              <LazyImage
                src={MAIN_IMAGE}
                alt="Chartered accountants collaborating over financial charts and documents"
                className="h-[460px] rounded-[24px] shadow-soft md:h-[560px]"
              />
            </Reveal>
            <Reveal delay={200} className="absolute -bottom-10 -left-4 w-44 sm:-left-10 sm:w-56">
              <LazyImage
                src={OVERLAY_IMAGE}
                alt="Chartered accountant shaking hands with a client after a successful engagement"
                className="h-52 rounded-2xl shadow-lift ring-8 ring-white sm:h-64"
              />
            </Reveal>
            <Reveal delay={320} className="absolute -right-3 top-8 sm:-right-6">
              <div className="animate-floaty-delayed flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500/10">
                  <Award className="h-5 w-5 text-gold-600" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-lg font-extrabold leading-none tracking-tight text-navy-800">15+ Years</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">of trusted practice</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Animated statistics band */}
      <section className="bg-navy-800 py-16 md:py-20" aria-label="Firm statistics">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 110} className={i > 0 ? "lg:border-l lg:border-white/10 lg:pl-10" : ""}>
                <div>
                  <p className="flex items-baseline font-extrabold tracking-tight text-white">
                    <CountUp
                      end={stat.value}
                      prefix={stat.prefix ?? ""}
                      suffix={stat.suffix}
                      className="text-4xl md:text-5xl"
                    />
                  </p>
                  <span aria-hidden="true" className="mt-3 block h-0.5 w-8 bg-gold-500" />
                  <p className="mt-3 text-sm font-extrabold uppercase tracking-[0.14em] text-blue-100/90">{stat.label}</p>
                  <p className="mt-1 text-xs font-medium text-navy-200/70">{stat.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
