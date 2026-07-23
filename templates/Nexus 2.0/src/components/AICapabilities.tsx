import { Sparkles, MessageSquareText, Bot, Wand2 } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const capabilities = [
  {
    icon: MessageSquareText,
    title: "Ask in plain English",
    description: "Query every connected dataset with natural language. No SQL, no waiting.",
  },
  {
    icon: Bot,
    title: "Autonomous agents",
    description: "Deploy agents that monitor metrics, draft actions, and loop in humans when needed.",
  },
  {
    icon: Wand2,
    title: "Smart enrichment",
    description: "Let AI tag, classify, and summarize records so your data stays organized effortlessly.",
  },
];

export function AICapabilities() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-purple" />
            <span className="text-sm font-medium text-offwhite">AI Capabilities</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
            Intelligence built into every workflow
          </h2>
          <p className="mt-5 text-lg text-muted">
            Nexus doesn&apos;t just visualize your data. It understands context, spots patterns, and
            takes action on your behalf.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <StaggerContainer className="grid gap-5" stagger={0.12}>
            {capabilities.map((c) => (
              <StaggerItem key={c.title}>
                <div className="group rounded-[20px] border border-white/[0.06] bg-graphite p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.02]">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-cyan ring-1 ring-white/[0.06]">
                    <c.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-offwhite">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.3}>
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-ink p-6 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 border-b border-white/[0.06] pb-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-3 text-xs text-muted">ai_query.js</span>
              </div>
              <pre className="mt-5 overflow-x-auto text-sm leading-relaxed">
                <code className="font-mono">
                  <span className="text-purple">nexus</span>
                  <span className="text-offwhite">.</span>
                  <span className="text-cyan">ask</span>
                  <span className="text-offwhite">(</span>
                  <span className="text-emerald-400">&quot;Why did revenue dip last Tuesday?&quot;</span>
                  <span className="text-offwhite">)</span>
                  {"\n"}
                  <span className="text-muted">{"// → Dropped 8% due to checkout latency spike"}</span>
                  {"\n"}
                  <span className="text-muted">{"//   on US-West. Alert sent to #engineering."}</span>
                </code>
              </pre>

              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-cyan/20 blur-[80px]" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
