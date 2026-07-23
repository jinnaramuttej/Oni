import { motion } from "framer-motion";
import { Rocket, Clock, Shield, Users } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const benefits = [
  {
    icon: Clock,
    title: "Save 15+ hours a week",
    description: "Automate reporting, alerts, and handoffs so your team can focus on high-impact work.",
  },
  {
    icon: Rocket,
    title: "Ship decisions faster",
    description: "Replace weekly review cycles with live dashboards and instant, shareable insights.",
  },
  {
    icon: Shield,
    title: "Reduce risk and drift",
    description: "Catch issues early with anomaly detection and proactive health checks across systems.",
  },
  {
    icon: Users,
    title: "Align every team",
    description: "One source of truth for product, sales, finance, and customer success.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Why Nexus</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
              Operate with clarity at any scale
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Nexus replaces the patchwork of spreadsheets, dashboards, and manual reports with a
              single intelligent layer that keeps everyone moving in the same direction.
            </p>
            <a
              href="#cta"
              className="mt-8 inline-flex items-center gap-2 rounded-[20px] bg-offwhite px-6 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-white/10 transition-all hover:shadow-xl"
            >
              Start your free trial
            </a>
          </AnimatedSection>

          <StaggerContainer className="grid gap-5 sm:grid-cols-2" stagger={0.1}>
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="h-full rounded-[20px] border border-white/[0.06] bg-graphite p-6 transition-colors hover:border-white/[0.12]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-purple">
                    <b.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-offwhite">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
