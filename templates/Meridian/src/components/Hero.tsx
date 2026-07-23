import { useReveal, useCountUp } from "../hooks/useReveal";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconShield,
  IconSparkles,
  IconTrendingUp,
  IconActivity,
  IconCalendar,
  IconLeaf,
} from "./icons";

function StatBlock({ label, value, trend, accent }: { label: string; value: string; trend?: string; accent?: "up" | "down" }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0">
      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</div>
        <div className="mt-0.5 text-[15px] font-semibold text-navy-700 tabular-nums">{value}</div>
      </div>
      {trend && (
        <div
          className={[
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            accent === "down"
              ? "bg-rose-50 text-rose-700"
              : "bg-emerald-50 text-emerald-700",
          ].join(" ")}
        >
          {accent === "down" ? "↓" : "↑"} {trend}
        </div>
      )}
    </div>
  );
}

function Chart() {
  // Static, but with draw animation via CSS
  return (
    <svg viewBox="0 0 320 110" className="w-full">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15803D" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#163A5F" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#163A5F" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="0"
          x2="320"
          y1={20 + i * 22}
          y2={20 + i * 22}
          stroke="#e2e8f0"
          strokeDasharray="3 4"
        />
      ))}
      {/* Area 1 */}
      <path
        d="M0 90 C 30 82, 50 70, 70 72 S 110 60, 130 50 S 170 38, 195 30 S 235 20, 260 25 S 300 18, 320 14 L 320 110 L 0 110 Z"
        fill="url(#grad)"
      />
      <path
        d="M0 90 C 30 82, 50 70, 70 72 S 110 60, 130 50 S 170 38, 195 30 S 235 20, 260 25 S 300 18, 320 14"
        fill="none"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        className="draw-line"
      />
      {/* Area 2 */}
      <path
        d="M0 100 C 30 96, 60 88, 90 86 S 140 78, 170 70 S 220 60, 250 56 S 290 50, 320 46 L 320 110 L 0 110 Z"
        fill="url(#grad2)"
      />
      <path
        d="M0 100 C 30 96, 60 88, 90 86 S 140 78, 170 70 S 220 60, 250 56 S 290 50, 320 46"
        fill="none"
        stroke="#163A5F"
        strokeWidth="2"
        strokeLinecap="round"
        className="draw-line"
        style={{ animationDelay: "0.4s" }}
      />
      {/* Points */}
      {[
        [70, 72],
        [130, 50],
        [195, 30],
        [260, 25],
        [320, 14],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke="#15803D" strokeWidth="2" />
      ))}
    </svg>
  );
}

function HeroDashboard() {
  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      {/* Background image - professional with client */}
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-navy-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
          alt="Financial advisor consulting with client"
          loading="eager"
          className="aspect-[4/5] w-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/20" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/85">
              Live client session
            </span>
          </div>
        </div>
      </div>

      {/* Floating notification - top right */}
      <div className="absolute -top-6 -right-2 z-30 hidden md:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)] px-4 py-3 animate-float">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <IconCheck className="h-4.5 w-4.5" strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <div className="text-[12.5px] font-semibold text-navy-700">Tax saved · FY25-26</div>
          <div className="text-[18px] font-semibold text-emerald-600 tabular-nums">₹ 1,24,80,210</div>
        </div>
      </div>

      {/* Main dashboard card - overlaid on image */}
      <div className="absolute -bottom-16 -left-4 z-20 w-[calc(100%-2rem)] sm:w-[440px] rounded-[22px] border border-slate-200/80 bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.35)] overflow-hidden backdrop-blur">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="ml-3 hidden sm:flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              meridian.finance / client / brightline
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide text-emerald-700">
              Live
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 p-5 sm:p-6">
          {/* Left - big metric */}
          <div className="col-span-12 sm:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Net revenue · YTD</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="font-display text-[34px] font-semibold text-navy-700 tabular-nums">₹ 38.2 Cr</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                <IconTrendingUp className="h-3 w-3" /> 24.6%
              </span>
            </div>
            <div className="mt-1 text-[12px] text-slate-500">vs ₹ 30.6 Cr last year</div>

            <div className="mt-4 -mx-1">
              <Chart />
            </div>

            <div className="mt-3 flex items-center gap-5 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600" /> Revenue
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-navy-700" /> Forecast
              </span>
              <span className="ml-auto">Jan — Dec 2025</span>
            </div>
          </div>

          {/* Right - stat list */}
          <div className="col-span-12 sm:col-span-5 sm:border-l sm:border-slate-100 sm:pl-5">
            <StatBlock label="Gross margin" value="62.4%" trend="3.1%" />
            <StatBlock label="Burn (monthly)" value="₹ 84 L" trend="2.4%" />
            <StatBlock label="Runway" value="28 mo" trend="0.8%" accent="up" />
            <StatBlock label="Tax efficiency" value="+18.2%" trend="on plan" />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 border-t border-slate-100 divide-x divide-slate-100 bg-slate-50/50">
          {[
            { label: "GST filings", val: "12/12" },
            { label: "Compliance", val: "100%" },
            { label: "Audit status", val: "In progress" },
          ].map((s) => (
            <div key={s.label} className="px-4 py-3 text-center">
              <div className="text-[11px] uppercase tracking-wide text-slate-500">{s.label}</div>
              <div className="mt-0.5 text-[13px] font-semibold text-navy-700">{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating card - bottom right */}
      <div className="absolute -bottom-4 right-4 z-30 hidden md:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.2)]">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-navy-50 text-navy-700">
          <IconCalendar className="h-4.5 w-4.5" />
        </div>
        <div className="leading-tight">
          <div className="text-[11.5px] text-slate-500">Next compliance</div>
          <div className="text-[13.5px] font-semibold text-navy-700">GSTR-3B · 20 Feb</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const r1 = useReveal<HTMLDivElement>();
  const r2 = useReveal<HTMLDivElement>();
  const counter1 = useCountUp(15, true);
  const counter2 = useCountUp(1200, true, 2200);
  const counter3 = useCountUp(42, true, 1800);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-navy-700 text-white"
    >
      {/* Background visuals */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-emerald-600/15 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-navy-500/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-32 md:pt-40 pb-28 md:pb-40">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-12 lg:items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div
              ref={r1.ref}
              className={["reveal", r1.visible ? "is-visible" : ""].join(" ")}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/80 backdrop-blur">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500/20">
                  <IconLeaf className="h-2.5 w-2.5 text-emerald-300" />
                </span>
                Chartered Accountants · Since 2010
                <span className="ml-1 text-white/40">·</span>
                <span className="inline-flex items-center gap-1 text-gold-300">
                  <IconSparkles className="h-3 w-3" /> New: 2026 CFO programme
                </span>
              </div>
            </div>

            <h1
              ref={r2.ref}
              className={[
                "reveal reveal-delay-1 mt-7 font-display text-[44px] sm:text-[56px] lg:text-[72px] font-semibold leading-[0.98] tracking-[-0.025em] text-white",
                r2.visible ? "is-visible" : "",
              ].join(" ")}
            >
              Smarter financial decisions,{" "}
              <span className="relative inline-block">
                <span className="text-emerald-300 italic font-medium">made simple.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5 Q 50 1, 100 4 T 199 4"
                    stroke="#c69a36"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p
              className={[
                "reveal reveal-delay-2 mt-7 max-w-xl text-[16.5px] leading-[1.65] text-white/70",
                r1.visible ? "is-visible" : "",
              ].join(" ")}
              style={{ transitionDelay: "0.2s" }}
            >
              Meridian Advisors is a partner-led chartered accountancy firm helping
              ambitious businesses navigate tax, compliance and growth with
              confidence — from first invoice to first fundraise and beyond.
            </p>

            <div
              className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3"
              style={{ transitionDelay: "0.3s" }}
            >
              <a
                href="#book-call"
                className="group inline-flex items-center gap-2 rounded-[16px] bg-emerald-600 px-5.5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(21,128,61,0.55)] transition hover:bg-emerald-700 hover:shadow-[0_14px_34px_-10px_rgba(21,128,61,0.7)]"
              >
                Schedule a consultation
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-[16px] border border-white/15 bg-white/5 px-5.5 py-3.5 text-[14.5px] font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Explore services
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Trust badges */}
            <div
              className="reveal reveal-delay-4 mt-12 grid grid-cols-3 gap-6 max-w-lg"
              style={{ transitionDelay: "0.4s" }}
            >
              {[
                { v: `${counter1}+`, l: "Years experience" },
                { v: `${counter2}+`, l: "Businesses served" },
                { v: `${counter3}Cr+`, l: "Tax optimised" },
              ].map((b) => (
                <div key={b.l}>
                  <div className="font-display text-[28px] font-semibold tabular-nums text-white">
                    {b.v}
                  </div>
                  <div className="mt-0.5 text-[12px] uppercase tracking-[0.12em] text-white/55">
                    {b.l}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="reveal reveal-delay-5 mt-10 flex flex-wrap items-center gap-5 text-[12.5px] text-white/55"
              style={{ transitionDelay: "0.5s" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <IconShield className="h-3.5 w-3.5 text-emerald-300" /> Certified CAs
              </span>
              <span className="text-white/25">|</span>
              <span className="inline-flex items-center gap-1.5">
                <IconCheck className="h-3.5 w-3.5 text-emerald-300" /> ISO 27001 data security
              </span>
              <span className="text-white/25">|</span>
              <span className="inline-flex items-center gap-1.5">
                <IconActivity className="h-3.5 w-3.5 text-emerald-300" /> 98% client retention
              </span>
            </div>
          </div>

          {/* Right - dashboard */}
          <div className="lg:col-span-5 reveal" style={{ transitionDelay: "0.2s" }}>
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10.5px] uppercase tracking-[0.2em]">Scroll to explore</span>
        <span className="relative h-9 w-[18px] rounded-full border border-white/25">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-300 animate-float" />
        </span>
      </div>
    </section>
  );
}
