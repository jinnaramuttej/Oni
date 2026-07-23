import type { LucideIcon } from "lucide-react";
import { Zap, ShieldCheck, BarChart3, ClipboardCheck, ArrowRight, ArrowUpRight, RefreshCcw, BadgeIndianRupee } from "lucide-react";
import { Reveal, SectionHeading, useInView } from "../lib/ui";

type Feature = { icon: LucideIcon; title: string; desc: string };

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Same-day query resolution",
    desc: "Your dedicated CA responds within hours — not after the filing window closes.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-notice compliance record",
    desc: "Calendars, checklists and four-eyes review keep every return ahead of scrutiny.",
  },
  {
    icon: BarChart3,
    title: "Live MIS & cash-flow dashboards",
    desc: "Runway, liabilities and payables updated monthly — decisions made on fresh numbers.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit-grade documentation",
    desc: "Every figure sourced, filed and defensible before an auditor ever asks for it.",
  },
];

const BARS = [34, 46, 42, 58, 52, 64, 56, 72, 62, 78, 70, 88];
const MONTHS = ["A", "M", "J", "J", "A", "S", "O", "N", "D", "J", "F", "M"];

function AreaChart({ active }: { active: boolean }) {
  const line = "M0 206 C 55 192, 85 148, 140 158 S 228 92, 282 112 S 368 46, 424 72 S 512 34, 540 40";
  const area = `${line} L540 260 L0 260 Z`;
  return (
    <svg
      viewBox="0 0 560 260"
      className="h-44 w-full md:h-52"
      preserveAspectRatio="none"
      role="img"
      aria-label="Illustrative chart showing tax outgo trending downward after engagement"
    >
      <defs>
        <linearGradient id="expertiseAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15803D" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[52, 104, 156, 208].map((y) => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#E8EEF5" strokeWidth="1" strokeDasharray="5 6" />
      ))}
      <path
        d={area}
        fill="url(#expertiseAreaFill)"
        style={{ opacity: active ? 1 : 0, transition: "opacity 1.4s ease 800ms" }}
      />
      <path
        d={line}
        fill="none"
        stroke="#15803D"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={1200}
        style={{
          strokeDashoffset: active ? 0 : 1200,
          transition: "stroke-dashoffset 2.2s cubic-bezier(0.16,1,0.3,1) 250ms",
        }}
      />
      <circle cx="424" cy="72" r="5" fill="#163A5F" fillOpacity="0.15" />
      <circle
        cx="540"
        cy="40"
        r="6"
        fill="#C9A227"
        stroke="#fff"
        strokeWidth="2.5"
        style={{ opacity: active ? 1 : 0, transition: "opacity 600ms ease 2s" }}
      />
    </svg>
  );
}

export default function Expertise() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section id="expertise" className="relative overflow-hidden bg-navy-900 py-24 md:py-32" aria-label="Our financial expertise">
      {/* Decorative geometry */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border-[56px] border-white/[0.04]" />
      <div aria-hidden="true" className="absolute -bottom-52 -left-32 h-[380px] w-[380px] rounded-full border-[48px] border-white/[0.04]" />

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-[1fr_1.08fr] lg:gap-20">
        {/* Copy + features */}
        <div>
          <SectionHeading
            dark
            eyebrow="Why Meridian"
            title={
              <>
                Clarity you can measure. Decisions you can <span className="text-green-300">defend.</span>
              </>
            }
            description="We run your finance function like a product team — instrumented, versioned and reviewed. The result is numbers that arrive on time and stand up to any audit."
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 110}>
                <li className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-700/25">
                    <feature.icon className="h-5 w-5 text-green-300" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[0.95rem] font-extrabold tracking-tight text-white">{feature.title}</h3>
                    <p className="mt-1 text-[0.82rem] leading-6 text-navy-100/75">{feature.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={320}>
            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-2xl bg-white px-7 py-4 text-[0.95rem] font-extrabold text-navy-800 shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get a financial health check
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* Dashboard mockup */}
        <Reveal delay={150}>
          <div ref={ref} className="relative">
            <div className="rounded-[28px] border border-slate-200/60 bg-white p-6 shadow-lift md:p-8">
              {/* Window header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gold-400" />
                  </span>
                  <p className="text-sm font-extrabold tracking-tight text-navy-800">Meridian Client Console</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[11px] font-extrabold text-navy-600">
                  <RefreshCcw className={`h-3 w-3 ${inView ? "animate-[spin_3s_linear_1]" : ""}`} aria-hidden="true" />
                  FY 25–26
                </span>
              </div>

              {/* KPI cards */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "Filings on time", value: "99.8%", delta: "+0.4" },
                  { label: "Notices triggered", value: "0", delta: "−3" },
                  { label: "Avg. response", value: "3.2 hrs", delta: "−1.1" },
                ].map((kpi, i) => (
                  <div
                    key={kpi.label}
                    className="rounded-2xl border border-slate-100 bg-mist/70 p-3.5 transition-all duration-500 md:p-4"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? "none" : "translateY(14px)",
                      transitionDelay: `${300 + i * 140}ms`,
                    }}
                  >
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500 md:text-[11px]">{kpi.label}</p>
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
                      <p className="text-lg font-extrabold tracking-tight text-navy-800 md:text-2xl">{kpi.value}</p>
                      <span className="inline-flex items-center rounded-full bg-green-700/10 px-1.5 py-0.5 text-[10px] font-extrabold text-green-700">
                        <ArrowUpRight className="h-2.5 w-2.5" aria-hidden="true" />
                        {kpi.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Area chart */}
              <div className="mt-5 rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">Tax outgo vs. planned</p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-700" aria-hidden="true" />
                    Optimised after review
                  </span>
                </div>
                <div className="mt-2">
                  <AreaChart active={inView} />
                </div>
              </div>

              {/* Bar chart */}
              <div className="mt-5 rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">Reconciled turnover (₹ Cr)</p>
                  <p className="text-[11px] font-bold text-slate-400">Apr – Mar</p>
                </div>
                <div className="mt-4 flex h-28 items-end gap-[6px] md:gap-2" aria-hidden="true">
                  {BARS.map((h, i) => (
                    <div key={i} className="group relative flex-1">
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 group-hover:bg-green-700 ${
                          i === BARS.length - 1 ? "bg-gold-500" : "bg-navy-600/85"
                        }`}
                        style={{
                          height: inView ? `${h}%` : "4px",
                          transition: `height 1s cubic-bezier(0.16,1,0.3,1) ${400 + i * 60}ms`,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-[6px] text-center text-[9px] font-extrabold uppercase tracking-wider text-slate-400 md:gap-2">
                  {MONTHS.map((m, i) => (
                    <span key={i} className="flex-1">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating savings chip */}
            <div className="animate-floaty absolute -right-4 -top-6 hidden items-center gap-3 rounded-2xl border border-white/15 bg-navy-800/90 px-5 py-4 shadow-lift backdrop-blur-md sm:flex md:-right-8">
              <span className="pulse-ring grid h-10 w-10 place-items-center rounded-xl bg-gold-500/15">
                <BadgeIndianRupee className="h-5 w-5 text-gold-300" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-extrabold tracking-tight text-white">₹18.6 Lakh optimised</p>
                <p className="text-[11px] font-semibold text-navy-100/70">across one mid-market client · FY 24–25</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
