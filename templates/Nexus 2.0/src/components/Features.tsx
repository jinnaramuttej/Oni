import {
  Workflow,
  BrainCircuit,
  ShieldCheck,
  LineChart,
  Blocks,
  Gauge,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Insights",
    description:
      "Surface anomalies, forecasts, and recommendations from every data source without writing a single query.",
  },
  {
    icon: Workflow,
    title: "No-Code Automations",
    description:
      "Build complex multi-step workflows with triggers, conditions, and approvals in a visual canvas.",
  },
  {
    icon: LineChart,
    title: "Unified Analytics",
    description:
      "Bring metrics, events, and funnels into one view. Slice, filter, and share in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II, SSO, SCIM, and end-to-end encryption keep your data protected at scale.",
  },
  {
    icon: Blocks,
    title: "Deep Integrations",
    description:
      "Connect the tools your team already uses. Sync data bi-directionally with 200+ native integrations.",
  },
  {
    icon: Gauge,
    title: "Blazing Performance",
    description:
      "Sub-50ms queries, edge caching, and global replication ensure your dashboards load instantly.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Features</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
            Everything you need to move faster
          </h2>
          <p className="mt-5 text-lg text-muted">
            A complete operating system for modern teams. Connect, automate, analyze, and scale
            from a single source of truth.
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group relative h-full rounded-[20px] border border-white/[0.06] bg-graphite p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-xl hover:shadow-purple/5">
                <div className="absolute inset-x-0 top-0 h-px rounded-t-[20px] bg-gradient-to-r from-transparent via-purple/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-cyan ring-1 ring-white/[0.06] transition-all group-hover:bg-purple/10 group-hover:text-purple">
                  <f.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-offwhite">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
