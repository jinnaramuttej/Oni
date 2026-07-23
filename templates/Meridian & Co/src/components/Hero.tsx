import { ArrowRight, ArrowDown, BadgeCheck, History, Building2, CheckCircle2 } from "lucide-react";
import { useInView } from "../lib/ui";

const HERO_IMAGE =
  "https://images.pexels.com/photos/7794032/pexels-photo-7794032.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920";

const TRUST_BADGES = [
  { icon: BadgeCheck, label: "Certified CAs", sub: "ICAI registered firm" },
  { icon: History, label: "15+ Years Experience", sub: "Est. 2009, Mumbai" },
  { icon: Building2, label: "1,000+ Businesses Served", sub: "Across 20+ sectors" },
] as const;

function Sparkline() {
  return (
    <svg viewBox="0 0 120 36" className="h-9 w-full" aria-hidden="true">
      <polyline
        points="0,28 15,24 30,26 45,18 60,20 75,12 90,14 105,6 120,8"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="8" r="3" fill="#dcbc55" />
    </svg>
  );
}

export default function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1, "0px");

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-navy-900" aria-label="Introduction">
      {/* Photographic backdrop */}
      <img
        src={HERO_IMAGE}
        alt="Chartered accountants reviewing a client's financial plan in a modern office"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-900/70 to-navy-900/55" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-900/30 to-transparent" />
      {/* Geometric grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div ref={ref} className="container-x relative z-10 pb-44 pt-36 md:pt-40 lg:pb-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p
            className={`reveal ${inView ? "is-visible" : ""} inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-100 backdrop-blur-md md:text-xs`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            ICAI-Registered Firm · Since 2009
          </p>

          {/* Headline */}
          <h1
            className={`reveal ${inView ? "is-visible" : ""} mt-7 text-balance text-[2.65rem] font-extrabold leading-[1.06] tracking-[-0.028em] text-white sm:text-6xl xl:text-[4.6rem]`}
            style={{ transitionDelay: "120ms" }}
          >
            Smarter <span className="text-green-300">financial decisions</span>, engineered for growth.
          </h1>

          {/* Supporting copy */}
          <p
            className={`reveal ${inView ? "is-visible" : ""} mt-6 max-w-xl text-pretty text-base leading-8 text-blue-100/90 md:text-lg`}
            style={{ transitionDelay: "240ms" }}
          >
            Meridian &amp; Co. pairs certified Chartered Accountants with modern financial tooling — so tax, GST and
            compliance run quietly in the background while you build the business.
          </p>

          {/* CTAs */}
          <div className={`reveal ${inView ? "is-visible" : ""} mt-9 flex flex-col gap-3 sm:flex-row sm:items-center`} style={{ transitionDelay: "360ms" }}>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-green-700 px-7 py-4 text-[0.95rem] font-bold text-white shadow-glow-emerald transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Schedule a Consultation
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-[0.95rem] font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Services
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 transition-transform duration-300 group-hover:scale-150" aria-hidden="true" />
            </a>
          </div>

          {/* Trust badges */}
          <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={badge.label}
                className={`reveal ${inView ? "is-visible" : ""} flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.07] px-4 py-3.5 backdrop-blur-md`}
                style={{ transitionDelay: `${480 + i * 120}ms` }}
              >
                <badge.icon className="h-6 w-6 shrink-0 text-green-300" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <dt className="text-sm font-extrabold tracking-tight text-white">{badge.label}</dt>
                  <dd className="text-xs font-medium text-blue-100/70">{badge.sub}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Floating compliance card (desktop) */}
      <aside
        aria-label="Illustrative compliance summary"
        className="animate-floaty absolute bottom-32 right-10 z-10 hidden w-[340px] rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lift backdrop-blur-xl xl:block"
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-100/80">Compliance · FY 25–26</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1 text-[11px] font-extrabold text-green-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-300" aria-hidden="true" />
            On track
          </span>
        </div>
        <ul className="mt-4 space-y-2.5">
          {["GST returns — 100% filed on time", "Advance tax schedule locked", "Books reconciled · March closed"].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[0.82rem] font-semibold text-white/90">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-300" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="flex items-end justify-between gap-4">
            <Sparkline />
            <p className="shrink-0 text-right text-[11px] font-bold uppercase tracking-wider text-blue-100/60">
              Tax outgo <span className="block text-sm font-extrabold normal-case tracking-tight text-green-300">−22% YoY</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="group absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
        aria-label="Scroll to about section"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5 transition-colors group-hover:border-white/70">
          <span className="scroll-hint-dot h-2 w-1 rounded-full bg-white/80" aria-hidden="true" />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/60 transition-colors group-hover:text-white/90">
          Scroll
        </span>
        <ArrowDown className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
      </a>
    </section>
  );
}
