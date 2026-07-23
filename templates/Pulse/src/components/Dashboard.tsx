import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Calendar,
  ChartLine,
  ChevronDown,
  CircleDot,
  Command,
  DollarSign,
  Ellipsis,
  Filter,
  Globe,
  LayoutDashboard,
  Mail,
  Mic,
  Rocket,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import {
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";
import { Eye } from "lucide-react";
import { PulseDot } from "./ui";

/* ════════════════════════════════════════════════════════════
   Geometry helper — Catmull-Rom → cubic bézier smoothing
════════════════════════════════════════════════════════════ */
type Pt = { x: number; y: number };

function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/* ── Chart data ─────────────────────────────────────────────── */
const MONTHS = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const REVENUE = [182, 196, 189, 214, 238, 227, 253, 262, 258, 279, 293, 308];
const PREVIOUS = [148, 152, 161, 158, 172, 185, 179, 194, 203, 198, 212, 224];

const CH = [30, 42, 36, 52, 48, 60, 55, 66, 62, 74, 70, 82, 78, 92];
const BARS = [34, 48, 42, 58, 52, 66, 61, 74, 68, 82, 76, 88, 84, 96];

const KPIS = [
  { label: "Monthly revenue", value: "$284.9k", delta: "+12.4%", up: true, chart: CH },
  { label: "Active users", value: "48,211", delta: "+8.1%", up: true, chart: [40, 38, 46, 44, 52, 50, 58, 56, 62, 60, 66, 64, 70, 74] },
  { label: "Conversion", value: "3.42%", delta: "+0.6pt", up: true, chart: [22, 26, 24, 30, 28, 34, 38, 36, 42, 40, 46, 44, 50, 54] },
  { label: "Churn rate", value: "0.82%", delta: "-0.2pt", up: false, chart: [68, 62, 64, 56, 58, 50, 52, 46, 48, 40, 42, 36, 34, 30] },
];

const CHANNELS = [
  { icon: Globe, name: "Direct", users: "18,204", conv: "4.21%", delta: "+12.4%", up: true, w: 88 },
  { icon: Search, name: "Organic search", users: "12,940", conv: "3.84%", delta: "+9.1%", up: true, w: 66 },
  { icon: Share2, name: "Referral", users: "7,311", conv: "3.12%", delta: "+6.3%", up: true, w: 42 },
  { icon: Rocket, name: "Product launches", users: "5,082", conv: "5.62%", delta: "+21.8%", up: true, w: 30 },
  { icon: Mail, name: "Newsletter", users: "3,745", conv: "2.36%", delta: "-3.2%", up: false, w: 22 },
];

const INSIGHTS = [
  "Activation is up 18% this week. The new onboarding checklist drove 412 additional workspace setups — mostly from organic search traffic.",
  "Anomaly detected: EU signups dipped 9% after 14:00 UTC. It correlates with the auth deploy at 13:52 — rolling back restored baseline within 20 minutes.",
];

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: ChartLine, label: "Analytics" },
  { icon: Users, label: "Audience" },
  { icon: Filter, label: "Funnels" },
  { icon: DollarSign, label: "Revenue" },
  { icon: Workflow, label: "Automations" },
  { icon: Sparkles, label: "Copilot", badge: "AI" },
];

/* ── Sparkline ──────────────────────────────────────────────── */
function Sparkline({ data, id }: { data: number[]; id: string }) {
  const w = 96;
  const h = 30;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - 3 - ((v - min) / (max - min || 1)) * (h - 6),
  }));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-24" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d={smoothPath(pts)} fill="none" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ── Interactive revenue chart ──────────────────────────────── */
function RevenueChart() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const W = 720;
  const H = 264;
  const PX = 14;
  const PT = 26;
  const PB = 30;
  const MAX = 340;

  const pts = useMemo<Pt[]>(
    () =>
      REVENUE.map((v, i) => ({
        x: PX + (i / (REVENUE.length - 1)) * (W - PX * 2),
        y: PT + (1 - v / MAX) * (H - PT - PB),
      })),
    []
  );
  const prevPts = useMemo<Pt[]>(
    () =>
      PREVIOUS.map((v, i) => ({
        x: PX + (i / (PREVIOUS.length - 1)) * (W - PX * 2),
        y: PT + (1 - v / MAX) * (H - PT - PB),
      })),
    []
  );

  const line = smoothPath(pts);
  const prevLine = smoothPath(prevPts);
  const area = `${line} L ${pts[pts.length - 1].x} ${H - PB} L ${pts[0].x} ${H - PB} Z`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const frac = (e.clientX - rect.left) / rect.width;
    const ix = Math.round(frac * (REVENUE.length - 1));
    setHover(Math.max(0, Math.min(REVENUE.length - 1, ix)));
  };

  const delta =
    hover !== null
      ? (((REVENUE[hover] - PREVIOUS[hover]) / PREVIOUS[hover]) * 100).toFixed(1)
      : null;

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative cursor-crosshair">
      {/* tooltip */}
      {hover !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+10px)]"
          style={{
            left: `clamp(64px, ${(pts[hover].x / W) * 100}%, calc(100% - 64px))`,
            top: `${(pts[hover].y / H) * 100}%`,
          }}
        >
          <div className="whitespace-nowrap rounded-xl border border-white/10 bg-[#101013]/95 px-3 py-2 shadow-2xl backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-wider text-mute">
              {MONTHS[hover]} 2025
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-sm font-semibold text-mist">
                ${REVENUE[hover]}.4k
              </span>
              <span className="text-[11px] text-mute line-through decoration-mute/40">
                ${PREVIOUS[hover]}.0k
              </span>
              <span className="inline-flex items-center gap-0.5 rounded-md bg-cyan/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan">
                <ArrowUpRight className="size-2.5" aria-hidden />
                {delta}%
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Revenue chart showing growth from June to May">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#7c3aed" stopOpacity="0.28" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#8b5cf6" />
            <stop offset="0.6" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* grid */}
        {[0, 1, 2, 3].map((i) => {
          const y = PT + (i / 3) * (H - PT - PB);
          return (
            <g key={i}>
              <line x1={PX} x2={W - PX} y1={y} y2={y} stroke="white" strokeOpacity="0.05" />
              <text x={0} y={y + 3} fill="#a1a1aa" fillOpacity="0.55" fontSize="9" fontFamily="JetBrains Mono">
                ${Math.round(MAX - (i / 3) * MAX)}k
              </text>
            </g>
          );
        })}

        {/* previous period */}
        <motion.path
          d={prevLine}
          fill="none"
          stroke="white"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
        />

        {/* area + main line */}
        <motion.path
          d={area}
          fill="url(#areaFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.9 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* x labels */}
        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={pts[i].x}
            y={H - 10}
            textAnchor="middle"
            fill="#a1a1aa"
            fillOpacity="0.55"
            fontSize="9"
            fontFamily="JetBrains Mono"
          >
            {m}
          </text>
        ))}

        {/* crosshair */}
        {hover !== null && (
          <g>
            <line
              x1={pts[hover].x}
              x2={pts[hover].x}
              y1={PT}
              y2={H - PB}
              stroke="white"
              strokeOpacity="0.18"
              strokeDasharray="2 4"
            />
            <circle cx={pts[hover].x} cy={pts[hover].y} r="9" fill="#7c3aed" fillOpacity="0.18" />
            <circle cx={pts[hover].x} cy={pts[hover].y} r="4" fill="#0b0b0c" stroke="#a78bfa" strokeWidth="2" />
            <circle cx={prevPts[hover].x} cy={prevPts[hover].y} r="3" fill="#0b0b0c" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

/* ── Copilot typewriter ─────────────────────────────────────── */
function useTypewriter(texts: string[], active: boolean) {
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (!active) return;
    const current = texts[idx];
    let t: number;
    if (len < current.length) {
      t = window.setTimeout(() => setLen((v) => v + 1), 17);
    } else {
      t = window.setTimeout(() => {
        setLen(0);
        setIdx((i) => (i + 1) % texts.length);
      }, 4200);
    }
    return () => window.clearTimeout(t);
  }, [len, idx, texts, active]);

  return texts[idx].slice(0, len);
}

function CopilotCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const typed = useTypewriter(INSIGHTS, inView);

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white/[0.02]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 text-xs font-semibold text-mist">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent/15 ring-1 ring-inset ring-accent/30">
            <Sparkles className="size-3 text-accent-soft" aria-hidden />
          </span>
          Pulse Copilot
        </span>
        <span className="rounded-md bg-cyan/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-cyan ring-1 ring-inset ring-cyan/25">
          Beta
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* user message */}
        <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] leading-5 text-mist/90">
          Why did activation spike last week?
        </div>

        {/* AI response */}
        <div ref={ref} className="relative max-w-full rounded-xl rounded-tl-sm border border-accent/20 bg-accent/[0.06] px-3 py-2.5">
          <p className="min-h-[60px] text-[11px] leading-5 text-mist/85">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-cyan align-baseline"
              aria-hidden
            />
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["Onboarding funnel", "Traffic sources"].map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-md border border-line bg-charcoal/60 px-1.5 py-0.5 font-mono text-[9px] text-mute">
                <CircleDot className="size-2 text-cyan" aria-hidden />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* input */}
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-charcoal/60 px-3 py-2">
          <Command className="size-3.5 text-mute/70" aria-hidden />
          <span className="flex-1 text-[11px] text-mute/70">Ask anything about your data…</span>
          <Mic className="size-3.5 text-mute/70" aria-hidden />
          <span className="flex size-5 items-center justify-center rounded-md bg-mist text-charcoal">
            <Send className="size-2.5" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Floating telemetry cards ───────────────────────────────── */
function FloatingCards() {
  return (
    <>
      {/* churn alert */}
      <div
        style={{ transform: "translateZ(70px)" }}
        className="absolute -left-4 top-[16%] z-20 hidden lg:block xl:-left-16"
        aria-hidden
      >
        <div className="w-60 animate-float rounded-2xl border border-line bg-graphite-2/90 p-3.5 shadow-[0_24px_60px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-inset ring-accent/30">
              <Sparkles className="size-4 text-accent-soft" />
            </span>
            <div>
              <p className="text-xs font-semibold text-mist">Copilot alert</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-mute">2 min ago</p>
            </div>
          </div>
          <p className="mt-2.5 text-[11px] leading-5 text-mute">
            <span className="font-semibold text-mist">12 accounts</span> show declining
            usage. Draft win-back play is ready to review.
          </p>
          <div className="mt-2.5 flex gap-2">
            <span className="rounded-lg bg-mist px-2.5 py-1 text-[10px] font-semibold text-charcoal">Review play</span>
            <span className="rounded-lg border border-line px-2.5 py-1 text-[10px] font-medium text-mute">Dismiss</span>
          </div>
        </div>
      </div>

      {/* enterprise signup */}
      <div
        style={{ transform: "translateZ(90px)" }}
        className="absolute -right-4 top-[8%] z-20 hidden lg:block xl:-right-16"
        aria-hidden
      >
        <div className="w-64 animate-float-slow rounded-2xl border border-line bg-graphite-2/90 p-3.5 shadow-[0_24px_60px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-soft to-cyan font-display text-xs font-bold text-charcoal">
              AC
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-mist">Acme Corp upgraded</p>
              <p className="mt-0.5 text-[11px] leading-4 text-mute">
                Scale plan · <span className="text-cyan">$2,400/mo</span>
              </p>
            </div>
            <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-cyan" />
          </div>
        </div>
      </div>

      {/* revenue today */}
      <div
        style={{ transform: "translateZ(60px)" }}
        className="absolute -bottom-6 right-[10%] z-20 hidden lg:block"
        aria-hidden
      >
        <div className="flex animate-float items-center gap-3 rounded-2xl border border-line bg-graphite-2/90 p-3.5 pr-5 shadow-[0_24px_60px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl">
          <span className="flex size-9 items-center justify-center rounded-lg bg-cyan/10 ring-1 ring-inset ring-cyan/25">
            <DollarSign className="size-4 text-cyan" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-mist">+$12,480</p>
            <p className="font-mono text-[9px] uppercase tracking-wider text-mute">Collected today</p>
          </div>
        </div>
      </div>

      {/* uptime chip */}
      <div
        style={{ transform: "translateZ(80px)" }}
        className="absolute -left-6 bottom-[22%] z-20 hidden lg:block xl:-left-14"
        aria-hidden
      >
        <div className="flex animate-float-slow items-center gap-2 rounded-full border border-line bg-graphite-2/90 py-2 pl-3 pr-4 shadow-xl backdrop-blur-xl">
          <PulseDot />
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Realtime · 2.1B events</span>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   Dashboard assembly with parallax tilt
════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const rotateX = useSpring(useMotionValue(6), { stiffness: 60, damping: 16 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 });
  const tiltRef = useRef<HTMLDivElement>(null);

  const onTilt = (e: MouseEvent<HTMLDivElement>) => {
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top) / rect.height;
    rotateX.set(6 + (0.5 - fy) * 5);
    rotateY.set((fx - 0.5) * 6);
  };
  const resetTilt = () => {
    rotateX.set(6);
    rotateY.set(0);
  };

  return (
    <div
      ref={tiltRef}
      onMouseMove={onTilt}
      onMouseLeave={resetTilt}
      className="relative mx-auto max-w-6xl [perspective:1800px]"
    >
      {/* floor glow */}
      <div className="absolute inset-x-8 -bottom-10 top-1/3 rounded-[40px] bg-accent/[0.12] blur-[90px]" aria-hidden />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* gradient shell */}
        <div className="ring-grad rounded-[24px] shadow-[0_60px_140px_-40px_rgb(0_0_0/0.8)]">
          <div className="overflow-hidden rounded-[23px] bg-graphite">
            {/* browser chrome */}
            <div className="flex items-center gap-3 border-b border-line bg-graphite-2/60 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-2 rounded-lg border border-line bg-charcoal/70 px-3">
                <ShieldCheck className="size-3 text-cyan" aria-hidden />
                <span className="font-mono text-[11px] text-mute">app.pulse.io/overview</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex" aria-hidden>
                <Bell className="size-3.5 text-mute/70" />
                <span className="size-5 rounded-full bg-gradient-to-br from-accent-soft to-accent" />
              </div>
            </div>

            <div className="flex">
              {/* sidebar */}
              <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-line bg-charcoal/40 p-3 md:flex" aria-label="Product navigation preview">
                <div className="mb-2 flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-2.5 py-2">
                  <Search className="size-3.5 text-mute/70" aria-hidden />
                  <span className="flex-1 text-[11px] text-mute/70">Search…</span>
                  <kbd className="rounded border border-line px-1 font-mono text-[9px] text-mute/60">⌘K</kbd>
                </div>
                {SIDEBAR.map((item) => (
                  <span
                    key={item.label}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs",
                      item.active
                        ? "bg-white/[0.06] font-semibold text-mist ring-1 ring-inset ring-white/[0.08]"
                        : "text-mute hover:bg-white/[0.03] hover:text-mist"
                    )}
                  >
                    <item.icon className={cn("size-3.5", item.active && "text-cyan")} aria-hidden />
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto rounded bg-accent/20 px-1 py-px font-mono text-[8px] font-bold text-accent-soft">{item.badge}</span>
                    )}
                  </span>
                ))}
                <div className="mt-auto space-y-2 border-t border-line pt-3">
                  <span className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-mute">
                    <Settings className="size-3.5" aria-hidden />
                    Settings
                  </span>
                  <div className="rounded-xl border border-line bg-white/[0.02] p-2.5">
                    <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-mute">
                      <PulseDot /> Data health
                    </p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "97%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-soft to-cyan"
                      />
                    </div>
                    <p className="mt-1.5 text-[10px] text-mute/80">97% events verified</p>
                  </div>
                </div>
              </aside>

              {/* main panel */}
              <div className="min-w-0 flex-1 p-4 sm:p-5">
                {/* header */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base font-semibold tracking-tight text-mist">Overview</h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/25 bg-cyan/[0.07] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-cyan">
                        <PulseDot /> Live
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-mute">Workspace · Meridian Labs</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="hidden items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-mute sm:flex">
                      <Calendar className="size-3" aria-hidden />
                      Last 12 months
                      <ChevronDown className="size-3" aria-hidden />
                    </span>
                    <span className="flex items-center gap-1.5 rounded-lg bg-mist px-2.5 py-1.5 text-[11px] font-semibold text-charcoal">
                      <ArrowUpRight className="size-3" aria-hidden />
                      Share
                    </span>
                  </div>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {KPIS.map((k, i) => (
                    <div key={k.label} className="rounded-2xl border border-line bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.04]">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium text-mute">{k.label}</p>
                        <Ellipsis className="size-3.5 text-mute/50" aria-hidden />
                      </div>
                      <div className="mt-1.5 flex items-end justify-between gap-2">
                        <div>
                          <p className="font-display text-lg font-semibold tracking-tight text-mist sm:text-xl">{k.value}</p>
                          <span
                            className={cn(
                              "mt-0.5 inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                              k.up ? "bg-cyan/10 text-cyan" : "bg-accent/10 text-accent-soft"
                            )}
                          >
                            {k.up ? <ArrowUpRight className="size-2.5" aria-hidden /> : <ArrowDownRight className="size-2.5" aria-hidden />}
                            {k.delta}
                          </span>
                        </div>
                        <Sparkline data={k.chart} id={`spark-${i}`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* chart + copilot */}
                <div className="mt-3 grid gap-3 xl:grid-cols-3">
                  <div className="rounded-2xl border border-line bg-white/[0.02] p-4 xl:col-span-2">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-mist">Monthly recurring revenue</p>
                        <p className="mt-0.5 text-[11px] text-mute">Current vs. previous period</p>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-mute">
                        <span className="flex items-center gap-1.5">
                          <span className="h-[3px] w-4 rounded-full bg-gradient-to-r from-accent-soft to-cyan" aria-hidden />
                          Current
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-px w-4 border-t border-dashed border-white/40" aria-hidden />
                          Previous
                        </span>
                      </div>
                    </div>
                    <RevenueChart />
                  </div>
                  <CopilotCard />
                </div>

                {/* channels + signups */}
                <div className="mt-3 grid gap-3 xl:grid-cols-3">
                  <div className="overflow-hidden rounded-2xl border border-line bg-white/[0.02] xl:col-span-2">
                    <div className="flex items-center justify-between border-b border-line px-4 py-3">
                      <p className="text-xs font-semibold text-mist">Top acquisition channels</p>
                      <Ellipsis className="size-3.5 text-mute/50" aria-hidden />
                    </div>
                    <div className="divide-y divide-white/[0.04]" role="table" aria-label="Top acquisition channels">
                      {CHANNELS.map((c) => (
                        <div key={c.name} className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.03]" role="row">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-line bg-charcoal/60">
                            <c.icon className="size-3.5 text-mute transition-colors group-hover:text-cyan" aria-hidden />
                          </span>
                          <span className="w-32 truncate text-xs font-medium text-mist/90">{c.name}</span>
                          <div className="hidden h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06] sm:block">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${c.w}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-accent/70 to-cyan/70"
                            />
                          </div>
                          <span className="ml-auto w-16 text-right font-mono text-[11px] text-mute">{c.users}</span>
                          <span className="hidden w-14 text-right font-mono text-[11px] text-mist/80 sm:block">{c.conv}</span>
                          <span
                            className={cn(
                              "inline-flex w-16 items-center justify-end gap-0.5 text-[11px] font-semibold",
                              c.up ? "text-cyan" : "text-accent-soft"
                            )}
                          >
                            {c.up ? <ArrowUpRight className="size-2.5" aria-hidden /> : <ArrowDownRight className="size-2.5" aria-hidden />}
                            {c.delta}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* signups bar chart */}
                  <div className="rounded-2xl border border-line bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-mist">Weekly signups</p>
                        <p className="mt-0.5 font-mono text-[10px] text-mute/70">Last 14 weeks</p>
                      </div>
                      <span className="flex size-7 items-center justify-center rounded-lg border border-line bg-charcoal/60">
                        <Eye className="size-3.5 text-mute" aria-hidden />
                      </span>
                    </div>
                    <div className="mt-4 flex h-24 items-end gap-1.5">
                      {BARS.map((v, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${v}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.4 + i * 0.04, ease: "easeOut" }}
                          className={cn(
                            "flex-1 rounded-t-sm transition-colors duration-300",
                            i === BARS.length - 1
                              ? "bg-gradient-to-t from-accent to-cyan shadow-[0_0_16px_rgb(34_211_238/0.3)]"
                              : "bg-white/[0.09] hover:bg-white/[0.16]"
                          )}
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                      <span className="font-mono text-[10px] text-mute">Total · 9,412</span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-cyan/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan">
                        <ArrowUpRight className="size-2.5" aria-hidden />
                        18.2%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FloatingCards />
      </motion.div>
    </div>
  );
}
