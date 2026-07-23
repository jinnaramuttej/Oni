import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Database,
  Layers,
  Radar,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { GlowCard, PulseDot, SectionHeading, Stagger, StaggerItem } from "./ui";

/* ── mini visual: live event stream ─────────────────────────── */
const EVENTS = [
  { u: "SM", ev: "checkout.completed", t: "0.2s", chip: "$249.00" },
  { u: "JK", ev: "workspace.created", t: "0.4s", chip: "organic" },
  { u: "AR", ev: "onboarding.step_3", t: "0.8s", chip: "EU-west" },
  { u: "TN", ev: "report.generated", t: "1.1s", chip: "copilot" },
];

function EventStreamVisual() {
  return (
    <div className="relative mt-8 space-y-2" aria-hidden>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-graphite to-transparent" />
      {EVENTS.map((e, i) => (
        <motion.div
          key={e.ev}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
          className="flex items-center gap-3 rounded-xl border border-line bg-charcoal/60 px-3.5 py-2.5"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-soft/80 to-accent/60 font-mono text-[9px] font-bold text-white">
            {e.u}
          </span>
          <span className="font-mono text-[11px] text-mist/85">{e.ev}</span>
          <span className="ml-auto rounded-md bg-white/[0.05] px-1.5 py-0.5 font-mono text-[9px] text-mute">
            {e.chip}
          </span>
          <span className="w-8 text-right font-mono text-[9px] text-cyan">{e.t}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── mini visual: anomaly chart ─────────────────────────────── */
function AnomalyVisual() {
  return (
    <div className="relative mt-8" aria-hidden>
      <svg viewBox="0 0 280 120" className="w-full">
        <defs>
          <linearGradient id="anm" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {[28, 58, 88].map((y) => (
          <line key={y} x1="0" x2="280" y1={y} y2={y} stroke="white" strokeOpacity="0.05" />
        ))}
        <line x1="0" x2="280" y1="38" y2="38" stroke="white" strokeOpacity="0.15" strokeDasharray="3 5" />
        <motion.path
          d="M 0 88 C 24 84, 36 74, 60 72 S 104 60, 128 62 S 168 34, 182 20 S 210 66, 232 70 S 268 60, 280 56"
          fill="none"
          stroke="url(#anm)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, type: "spring", stiffness: 300, damping: 18 }}
        >
          <circle cx="182" cy="20" r="14" fill="#7c3aed" fillOpacity="0.16">
            <animate attributeName="r" values="10;16;10" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="182" cy="20" r="4.5" fill="#0b0b0c" stroke="#f472b6" strokeWidth="2" />
        </motion.g>
      </svg>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute right-1 top-0 flex items-center gap-1.5 rounded-lg border border-line bg-charcoal/90 px-2.5 py-1.5 shadow-xl"
      >
        <AlertTriangle className="size-3 text-pink-400" />
        <span className="font-mono text-[9px] text-mute">spike flagged · 2m ago</span>
      </motion.div>
    </div>
  );
}

/* ── mini visual: warehouse sync ────────────────────────────── */
function WarehouseVisual() {
  return (
    <div className="mt-8 flex items-center justify-between gap-2" aria-hidden>
      <div className="flex flex-col gap-2">
        {["Snowflake", "BigQuery"].map((n) => (
          <span key={n} className="flex items-center gap-2 rounded-lg border border-line bg-charcoal/60 px-2.5 py-2">
            <Database className="size-3.5 text-mute" />
            <span className="text-[10px] font-medium text-mist/80">{n}</span>
          </span>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        <RefreshCw className="size-3.5 text-cyan" />
        <span className="h-px w-8 bg-gradient-to-r from-accent-soft to-cyan sm:w-12" />
        <span className="font-mono text-[8px] uppercase tracking-wider text-mute">live sync</span>
      </div>
      <span className="flex items-center gap-2 rounded-xl border border-cyan/25 bg-cyan/[0.06] px-3 py-2.5 ring-1 ring-inset ring-cyan/10">
        <Zap className="size-4 text-cyan" />
        <span className="font-display text-xs font-semibold text-mist">Pulse</span>
      </span>
      <div className="hidden flex-col gap-2 sm:flex">
        {["Sub-second", "No ETL"].map((n) => (
          <span key={n} className="flex items-center gap-1.5 rounded-lg border border-line bg-charcoal/60 px-2.5 py-2">
            <Check className="size-3 text-cyan" />
            <span className="text-[10px] font-medium text-mist/80">{n}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── mini visual: segment builder ───────────────────────────── */
function SegmentVisual() {
  return (
    <div className="mt-8 space-y-2.5" aria-hidden>
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
        <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-accent-soft">plan = Scale</span>
        <span className="text-mute/60">AND</span>
        <span className="rounded-md border border-cyan/30 bg-cyan/10 px-2 py-1 text-cyan">mau &gt; 3</span>
        <span className="text-mute/60">AND</span>
        <span className="rounded-md border border-line bg-white/[0.04] px-2 py-1 text-mute">region = EU</span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-line bg-charcoal/60 px-3.5 py-3">
        <span className="flex items-center gap-2">
          <Users className="size-3.5 text-mute" />
          <span className="text-[11px] text-mute">Matching accounts</span>
        </span>
        <span className="font-display text-sm font-semibold text-mist">1,284</span>
      </div>
      <div className="flex gap-1.5">
        {["Win-back ready", "Expansion fit"].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[10px] text-mist/80"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
export default function Features() {
  return (
    <section id="features" aria-label="Features" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Platform"
          icon={<Layers className="size-3.5" />}
          title={
            <>
              Everything you need to{" "}
              <span className="text-grad">understand growth.</span>
            </>
          }
          description="Capture, query, and act on product data in one place — instrumented in minutes, not sprints."
        />

        <Stagger className="mt-16 grid gap-5 lg:grid-cols-12" delay={0.1}>
          {/* real-time stream */}
          <StaggerItem className="lg:col-span-7">
            <GlowCard className="h-full" innerClassName="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-cyan/20 bg-gradient-to-b from-cyan/15 to-transparent ring-1 ring-inset ring-white/5">
                  <Zap className="size-5 text-cyan" />
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-cyan/25 bg-cyan/[0.06] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-cyan">
                  <PulseDot /> Streaming
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-mist sm:text-2xl">
                Real-time event streaming
              </h3>
              <p className="mt-2 max-w-md text-[15px] leading-7 text-mute">
                Every click, scroll, and payment lands in your dashboard in
                under a second — no sampling, no nightly batch jobs.
              </p>
              <EventStreamVisual />
            </GlowCard>
          </StaggerItem>

          {/* copilot */}
          <StaggerItem className="lg:col-span-5">
            <GlowCard className="h-full" innerClassName="p-7 sm:p-8">
              <span className="flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-b from-accent/20 to-transparent ring-1 ring-inset ring-white/5">
                <Sparkles className="size-5 text-accent-soft" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-mist sm:text-2xl">
                An AI copilot, not a chatbot
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-mute">
                Ask a question. Copilot writes the query, runs it, and explains
                the answer with sources you can verify.
              </p>
              <div className="mt-8 rounded-xl border border-accent/20 bg-accent/[0.05] p-4" aria-hidden>
                <p className="font-mono text-[10px] text-mute">you · just now</p>
                <p className="mt-1 text-xs font-medium text-mist">"What moved MRR this week?"</p>
                <div className="mt-3 border-t border-line pt-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-medium text-accent-soft">
                    <Sparkles className="size-3" />
                    Copilot answer
                  </p>
                  <p className="mt-1.5 text-[11px] leading-5 text-mute">
                    Annual plan upgrades added <span className="font-semibold text-mist">$8.2k</span> —
                    driven by the in-app paywall test on May 4.
                  </p>
                </div>
              </div>
            </GlowCard>
          </StaggerItem>

          {/* anomaly */}
          <StaggerItem className="lg:col-span-4">
            <GlowCard className="h-full" innerClassName="p-7">
              <span className="flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-b from-accent/20 to-transparent ring-1 ring-inset ring-white/5">
                <Radar className="size-5 text-accent-soft" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-mist sm:text-xl">
                Anomaly detection
              </h3>
              <p className="mt-2 text-sm leading-6 text-mute">
                Pulse learns your baselines and flags meaningful shifts —
                before your standup does.
              </p>
              <AnomalyVisual />
            </GlowCard>
          </StaggerItem>

          {/* warehouse */}
          <StaggerItem className="lg:col-span-4">
            <GlowCard className="h-full" innerClassName="p-7">
              <span className="flex size-11 items-center justify-center rounded-xl border border-cyan/20 bg-gradient-to-b from-cyan/15 to-transparent ring-1 ring-inset ring-white/5">
                <Database className="size-5 text-cyan" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-mist sm:text-xl">
                Warehouse-native
              </h3>
              <p className="mt-2 text-sm leading-6 text-mute">
                Query Snowflake or BigQuery directly. Your data stays yours —
                zero copies, zero ETL.
              </p>
              <WarehouseVisual />
            </GlowCard>
          </StaggerItem>

          {/* segments + security combined row */}
          <StaggerItem className="lg:col-span-4">
            <GlowCard className="h-full" innerClassName="p-7">
              <span className="flex size-11 items-center justify-center rounded-xl border border-accent/25 bg-gradient-to-b from-accent/20 to-transparent ring-1 ring-inset ring-white/5">
                <Users className="size-5 text-accent-soft" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-mist sm:text-xl">
                Segments in seconds
              </h3>
              <p className="mt-2 text-sm leading-6 text-mute">
                Build audiences with plain filters and sync them anywhere —
                no CSV exports.
              </p>
              <SegmentVisual />
            </GlowCard>
          </StaggerItem>
        </Stagger>

        {/* security strip */}
        <Stagger className="mt-5 grid gap-5 lg:grid-cols-12">
          <StaggerItem className="lg:col-span-12">
            <GlowCard innerClassName="flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:p-8">
              <div className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-cyan/20 bg-gradient-to-b from-cyan/15 to-transparent ring-1 ring-inset ring-white/5">
                  <ShieldCheck className="size-5 text-cyan" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-mist">
                    Enterprise-grade by default
                  </h3>
                  <p className="mt-0.5 text-sm text-mute">
                    Security and compliance that clears procurement on the first pass.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-wrap items-center gap-2 sm:justify-end" aria-hidden>
                {["SOC 2 Type II", "GDPR & CCPA", "SSO / SAML", "99.99% SLA", "EU residency"].map((b) => (
                  <span key={b} className="rounded-full border border-line bg-charcoal/60 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-mute">
                    {b}
                  </span>
                ))}
                <a
                  href="#faq"
                  className="group ml-1 inline-flex items-center gap-1 text-sm font-medium text-mist transition-colors hover:text-cyan"
                >
                  Security overview
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </GlowCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
