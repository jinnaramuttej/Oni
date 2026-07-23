import { useReveal } from "../hooks/useReveal";
import { IconCheck, IconArrowRight, IconSparkles, IconTarget, IconActivity, IconCoins } from "./icons";

const pillars = [
  {
    icon: IconTarget,
    title: "Strategic clarity",
    body: "Quarterly partner reviews aligned to your board calendar — so finance is a lever for growth, not a backlog.",
  },
  {
    icon: IconActivity,
    title: "Real-time visibility",
    body: "Live dashboards for revenue, runway, burn and tax position. Know your numbers the moment they change.",
  },
  {
    icon: IconCoins,
    title: "Tax-efficient design",
    body: "We engineer entity structure, ESOPs and capital flows so you keep more of what you build.",
  },
];

const proof = [
  "Founder-led pods (not anonymous juniors)",
  "Fixed monthly retainers, never hourly",
  "Onboarding in 7–10 working days",
  "Quarterly partner reviews included",
  "ISO 27001 certified data practices",
  "Single Slack channel for everything",
];

export default function GrowthSection() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Visual */}
          <div
            ref={r1.ref}
            className={["relative reveal lg:col-span-6", r1.visible ? "is-visible" : ""].join(" ")}
          >
            <div className="relative">
              {/* Image */}
              <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.18)]">
                <img
                  src="https://images.unsplash.com/photo-1664575602807-e002fc8c0947?auto=format&fit=crop&w=1400&q=80"
                  alt="Financial advisor meeting with clients"
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/40 via-transparent to-transparent" />
              </div>

              {/* Floating dashboard mockup */}
              <div className="absolute -bottom-10 -right-2 hidden w-[280px] sm:block">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_24px_48px_-20px_rgba(15,23,42,0.18)]">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Q4 forecast
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
                      +18.2%
                    </span>
                  </div>
                  <div className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em] text-navy-700 tabular-nums">
                    ₹ 12.8 Cr
                  </div>
                  <div className="mt-1 text-[11.5px] text-slate-500">vs ₹ 10.8 Cr target</div>

                  <svg viewBox="0 0 240 60" className="mt-3 w-full">
                    <defs>
                      <linearGradient id="g-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#15803D" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 50 C 20 46, 40 38, 60 36 S 100 24, 120 18 S 160 8, 180 12 S 220 4, 240 2 L 240 60 L 0 60 Z"
                      fill="url(#g-grad)"
                    />
                    <path
                      d="M0 50 C 20 46, 40 38, 60 36 S 100 24, 120 18 S 160 8, 180 12 S 220 4, 240 2"
                      stroke="#15803D"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="mt-3 flex items-center gap-3 text-[11.5px] text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      Revenue
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      Target
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating stat - top left */}
              <div className="absolute -left-4 -top-6 hidden rotate-[-4deg] sm:block">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_24px_48px_-20px_rgba(15,23,42,0.18)]">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-100 text-gold-600">
                      <IconSparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Tax saved
                      </div>
                      <div className="text-[15px] font-semibold text-navy-700">₹ 2.4 Cr · FY25</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            ref={r2.ref}
            className={["lg:col-span-6 reveal", r2.visible ? "is-visible" : ""].join(" ")}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-paper px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Financial expertise
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
              Built for the next{" "}
              <span className="italic font-medium text-emerald-700">decade of growth.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-slate-500">
              From your first invoice to your first $100M — Meridian is the
              finance partner that grows with you. We bring the rigour of a
              Big 4 firm, the speed of a fintech product, and the care of a
              family business.
            </p>

            <div className="mt-10 space-y-6">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="flex gap-4"
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-navy-50 text-navy-700 ring-1 ring-navy-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-tight text-navy-700">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-[1.7] text-slate-500">
                        {p.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-paper p-6">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {proof.map((p) => (
                  <div
                    key={p}
                    className="flex items-start gap-2.5 text-[13.5px] text-slate-600"
                  >
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <IconCheck className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#book-call"
              className="mt-9 group inline-flex items-center gap-2 rounded-[16px] bg-navy-700 px-5 py-3.5 text-[14px] font-semibold text-white transition hover:bg-navy-800"
            >
              See how we work
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
