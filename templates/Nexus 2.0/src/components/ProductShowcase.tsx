import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart4, Cpu, Puzzle, LayoutGrid } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "analytics", label: "Analytics", icon: BarChart4 },
  { id: "ai", label: "AI Layer", icon: Cpu },
  { id: "integrations", label: "Integrations", icon: Puzzle },
];

const panelContent: Record<string, { title: string; description: string; highlights: string[] }> = {
  overview: {
    title: "Your entire operation, one dashboard away",
    description:
      "Nexus aggregates data from every corner of your stack into a clean, customizable command center.",
    highlights: [
      "Real-time KPIs with automatic refresh",
      "Drag-and-drop layout builder",
      "Role-based views for every team",
    ],
  },
  analytics: {
    title: "Answers that used to take days, now take seconds",
    description:
      "Explore trends, build reports, and share insights without waiting on analysts or writing SQL.",
    highlights: [
      "Funnel, cohort, and retention analysis",
      "Scheduled reports delivered to Slack",
      "Embeddable charts for your wiki",
    ],
  },
  ai: {
    title: "An AI teammate that never sleeps",
    description:
      "Nexus learns your business logic, alerts you to opportunities, and executes routine decisions autonomously.",
    highlights: [
      "Natural language querying across datasets",
      "Predictive alerts and anomaly detection",
      "Auto-generated summaries and playbooks",
    ],
  },
  integrations: {
    title: "Connects to the tools you already love",
    description:
      "Sync bi-directionally with 200+ apps. New integrations ship weekly based on customer demand.",
    highlights: [
      "CRM, data warehouse, and support sync",
      "Webhooks and custom API actions",
      "OAuth and granular permission scopes",
    ],
  },
};

export function ProductShowcase() {
  const [active, setActive] = useState("overview");

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-purple/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple">Product</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
            Built for how modern teams work
          </h2>
          <p className="mt-5 text-lg text-muted">
            Switch between perspectives to see how Nexus adapts to every layer of your business.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-offwhite text-charcoal shadow-lg shadow-white/10"
                    : "border border-white/[0.08] bg-white/[0.03] text-muted hover:text-offwhite hover:bg-white/[0.06]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </AnimatedSection>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <AnimatedSection delay={0.3}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="rounded-[28px] border border-white/[0.08] bg-graphite p-8 sm:p-10"
              >
                <h3 className="text-2xl font-bold text-offwhite sm:text-3xl">
                  {panelContent[active].title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {panelContent[active].description}
                </p>
                <ul className="mt-8 space-y-4">
                  {panelContent[active].highlights.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan" />
                      <span className="text-offwhite">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-[28px] border border-white/[0.08] bg-graphite p-6 shadow-2xl shadow-black/30"
              >
                {active === "overview" && <OverviewVisual />}
                {active === "analytics" && <AnalyticsVisual />}
                {active === "ai" && <AIVisual />}
                {active === "integrations" && <IntegrationsVisual />}

                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.04]" />
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function OverviewVisual() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div>
          <p className="text-sm text-muted">Monthly recurring revenue</p>
          <p className="text-2xl font-bold text-offwhite">$284,900</p>
        </div>
        <div className="h-10 w-24">
          <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M0,35 Q20,32 35,25 T65,20 T100,8"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <p className="text-sm text-muted">Active users</p>
          <p className="mt-1 text-xl font-bold text-offwhite">8,420</p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
          <p className="text-sm text-muted">Tasks done</p>
          <p className="mt-1 text-xl font-bold text-offwhite">1,204</p>
        </div>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-offwhite">Conversion funnel</span>
          <span className="text-xs text-muted">Last 30 days</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "Visitors", value: 92, color: "bg-purple" },
            { label: "Signups", value: 64, color: "bg-cyan" },
            { label: "Activated", value: 41, color: "bg-purple" },
            { label: "Paid", value: 18, color: "bg-cyan" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="w-20 text-xs text-muted">{b.label}</span>
              <div className="h-2 flex-1 rounded-full bg-white/[0.05]">
                <motion.div
                  className={`h-2 rounded-full ${b.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${b.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <span className="w-8 text-right text-xs text-offwhite">{b.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl rounded-tl-none bg-gradient-to-br from-purple/15 to-transparent p-4 text-sm text-offwhite">
        <p className="font-medium text-cyan mb-1">Nexus AI</p>
        Revenue is up 12% this week. The biggest driver was the new onboarding flow, which lifted
        activation by 18%.
      </div>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-none bg-white/[0.06] p-4 text-sm text-offwhite">
        Why did activation jump?
      </div>
      <div className="rounded-2xl rounded-tl-none bg-gradient-to-br from-purple/15 to-transparent p-4 text-sm text-offwhite">
        Three improvements shipped together: shorter form, SSO, and contextual tooltips. The tooltip
        change alone correlated with a 9% lift.
      </div>
    </div>
  );
}

function IntegrationsVisual() {
  const apps = ["Salesforce", "HubSpot", "Slack", "Stripe", "Snowflake", "Zendesk", "Notion", "Figma"];
  return (
    <div className="grid grid-cols-2 gap-3">
      {apps.map((app, i) => (
        <motion.div
          key={app}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] text-xs font-bold text-offwhite">
            {app[0]}
          </div>
          <span className="text-sm font-medium text-offwhite">{app}</span>
        </motion.div>
      ))}
    </div>
  );
}
