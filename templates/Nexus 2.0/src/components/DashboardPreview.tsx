import { motion } from "framer-motion";
import {
  Search,
  Bell,
  LayoutDashboard,
  BarChart3,
  Users,
  Zap,
  Settings,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Counter } from "./Counter";

const stats = [
  { label: "Total Revenue", value: 284900, change: "+12.5%", up: true, prefix: "$" },
  { label: "Active Users", value: 8420, change: "+8.2%", up: true },
  { label: "Churn Rate", value: 2.4, change: "-0.6%", up: false, suffix: "%", decimals: 1 },
  { label: "Automation Runs", value: 129400, change: "+24%", up: true },
];

const activities = [
  { user: "Sarah Chen", action: "deployed workflow", target: "Onboarding v3", time: "2m ago" },
  { user: "Marcus Osei", action: "resolved alert", target: "API latency spike", time: "12m ago" },
  { user: "Elena Rossi", action: "merged report", target: "Q4 Forecast", time: "35m ago" },
  { user: "Devon Wright", action: "invited team", target: "Growth Squad", time: "1h ago" },
];

const tasks = [
  { label: "Review AI suggestions", done: true },
  { label: "Approve budget automation", done: true },
  { label: "Schedule stakeholder demo", done: false },
];

export function DashboardPreview() {
  return (
    <section id="product" className="relative bg-charcoal py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto overflow-hidden rounded-[28px] border border-white/[0.08] bg-graphite shadow-2xl shadow-black/40"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-ink px-5 py-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-4 flex flex-1 items-center justify-center">
              <div className="flex h-8 w-full max-w-md items-center justify-center gap-2 rounded-lg bg-white/[0.04] px-3 text-xs text-muted">
                <span className="opacity-60">app.nexus.so</span>
                <span>/dashboard</span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[520px]">
            {/* Sidebar */}
            <div className="hidden w-16 flex-col items-center gap-6 border-r border-white/[0.06] bg-ink/50 py-6 sm:flex">
              <LayoutDashboard className="h-5 w-5 text-offwhite" />
              <BarChart3 className="h-5 w-5 text-muted hover:text-offwhite cursor-pointer transition-colors" />
              <Users className="h-5 w-5 text-muted hover:text-offwhite cursor-pointer transition-colors" />
              <Zap className="h-5 w-5 text-muted hover:text-offwhite cursor-pointer transition-colors" />
              <Settings className="mt-auto h-5 w-5 text-muted hover:text-offwhite cursor-pointer transition-colors" />
            </div>

            {/* Dashboard content */}
            <div className="flex-1 overflow-auto p-5 sm:p-7">
              {/* Topbar */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-offwhite">Overview</h3>
                  <p className="text-sm text-muted">Welcome back, here&apos;s what&apos;s happening.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-sm text-muted">
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search anything</span>
                  </div>
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted hover:text-offwhite transition-colors">
                    <Bell className="h-4 w-4" />
                  </button>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple to-cyan" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-5 hover:border-white/[0.1] transition-colors"
                  >
                    <p className="text-sm font-medium text-muted">{s.label}</p>
                    <div className="mt-3 flex items-end justify-between">
                      <div className="text-2xl font-bold text-offwhite">
                        <Counter
                        value={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        decimals={s.decimals}
                        duration={2}
                      />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          s.up ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {s.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts row */}
              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-5 lg:col-span-2">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="font-semibold text-offwhite">Revenue trajectory</h4>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="h-2 w-2 rounded-full bg-purple" />
                      Revenue
                      <span className="ml-2 h-2 w-2 rounded-full bg-cyan" />
                      Forecast
                    </div>
                  </div>
                  <svg viewBox="0 0 400 140" className="h-44 w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0,120 C40,110 60,90 100,95 S160,60 200,65 S280,30 320,35 S360,15 400,20 V140 H0 Z"
                      fill="url(#areaPurple)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                    <motion.path
                      d="M0,120 C40,110 60,90 100,95 S160,60 200,65 S280,30 320,35 S360,15 400,20"
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth="2.5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M0,125 C50,115 90,105 140,100 S220,80 260,75 S340,55 400,45"
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 1 }}
                    />
                  </svg>
                </div>

                <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-5">
                  <h4 className="mb-5 font-semibold text-offwhite">Automation runs</h4>
                  <div className="flex h-44 items-end justify-between gap-2">
                    {[35, 48, 42, 60, 55, 78, 72, 88, 95, 82, 90, 98].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-full rounded-t-md bg-gradient-to-t from-purple to-cyan"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.04, duration: 0.6, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-muted">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <div className="rounded-[20px] border border-white/[0.06] bg-gradient-to-br from-purple/10 to-transparent p-5 lg:col-span-2">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan" />
                    <h4 className="font-semibold text-offwhite">AI Assistant</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl rounded-tl-none bg-white/[0.05] p-4 text-sm text-offwhite">
                      Your churn risk increased 0.3% this week. I identified 12 accounts with
                      declining engagement and drafted a retention playbook.
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-offwhite hover:bg-white/[0.12] transition-colors">
                        Review playbook
                      </button>
                      <button className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-muted hover:text-offwhite transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-5">
                  <h4 className="mb-4 font-semibold text-offwhite">Today</h4>
                  <ul className="space-y-3">
                    {tasks.map((t) => (
                      <li key={t.label} className="flex items-center gap-3">
                        <CheckCircle2
                          className={`h-5 w-5 ${t.done ? "text-cyan" : "text-white/20"}`}
                        />
                        <span className={`text-sm ${t.done ? "text-muted line-through" : "text-offwhite"}`}>
                          {t.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Activity */}
              <div className="mt-5 overflow-hidden rounded-[20px] border border-white/[0.06] bg-white/[0.03]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                  <h4 className="font-semibold text-offwhite">Recent activity</h4>
                  <MoreHorizontal className="h-4 w-4 text-muted" />
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {activities.map((a) => (
                    <div key={`${a.user}-${a.target}`} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-offwhite">
                          {a.user.charAt(0)}
                        </div>
                        <p className="text-sm text-offwhite">
                          <span className="font-medium">{a.user}</span>{" "}
                          <span className="text-muted">{a.action}</span>{" "}
                          <span className="font-medium">{a.target}</span>
                        </p>
                      </div>
                      <span className="hidden items-center gap-1 text-xs text-muted sm:flex">
                        <Clock className="h-3 w-3" />
                        {a.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
