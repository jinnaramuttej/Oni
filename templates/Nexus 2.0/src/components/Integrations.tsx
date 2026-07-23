import { motion } from "framer-motion";
import { ArrowRight, Plug } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const integrations = [
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Slack", category: "Messaging" },
  { name: "Stripe", category: "Payments" },
  { name: "Snowflake", category: "Warehouse" },
  { name: "Zendesk", category: "Support" },
  { name: "Notion", category: "Docs" },
  { name: "Figma", category: "Design" },
  { name: "Jira", category: "Project" },
  { name: "GitHub", category: "Engineering" },
  { name: "Looker", category: "BI" },
  { name: "Segment", category: "Data" },
];

export function Integrations() {
  return (
    <section className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Integrations</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
            Plays nice with your entire stack
          </h2>
          <p className="mt-5 text-lg text-muted">
            Connect 200+ tools in minutes. Sync data, trigger workflows, and keep everything aligned.
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {integrations.map((app) => (
            <StaggerItem key={app.name}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="group flex items-center gap-4 rounded-[20px] border border-white/[0.06] bg-graphite p-5 transition-colors hover:border-white/[0.12]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] text-base font-bold text-offwhite transition-colors group-hover:bg-purple/15 group-hover:text-purple">
                  {app.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-offwhite">{app.name}</h4>
                  <p className="text-xs text-muted">{app.category}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-offwhite hover:text-cyan transition-colors"
          >
            <Plug className="h-4 w-4" />
            Browse all integrations
            <ArrowRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
