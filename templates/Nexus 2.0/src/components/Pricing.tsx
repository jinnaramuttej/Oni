import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const plans = [
  {
    name: "Starter",
    description: "For small teams getting organized.",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 users",
      "5 dashboards",
      "50 automations/month",
      "7-day data history",
      "Community support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    description: "For scaling teams that need more power.",
    price: "$49",
    period: "per user / month",
    features: [
      "Unlimited users",
      "Unlimited dashboards",
      "10,000 automations/month",
      "1-year data history",
      "AI insights",
      "Priority support",
      "SSO & SAML",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs.",
    price: "Custom",
    period: "annual billing",
    features: [
      "Everything in Growth",
      "Unlimited automations",
      "Unlimited data history",
      "Custom data residency",
      "Dedicated success manager",
      "Audit logs & SCIM",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan">Pricing</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-5 text-lg text-muted">
            Start free and scale as you grow. No hidden fees, no surprise charges.
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={`relative h-full rounded-[24px] border p-8 transition-all ${
                  plan.featured
                    ? "border-purple/40 bg-gradient-to-b from-purple/10 to-graphite shadow-2xl shadow-purple/10"
                    : "border-white/[0.06] bg-graphite hover:border-white/[0.12]"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-offwhite">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-offwhite">{plan.price}</span>
                  <span className="text-sm text-muted">/{plan.period}</span>
                </div>
                <a
                  href="#cta"
                  className={`mt-6 block w-full rounded-[18px] px-5 py-3 text-center text-sm font-semibold transition-all ${
                    plan.featured
                      ? "bg-offwhite text-charcoal shadow-lg shadow-white/10 hover:shadow-xl"
                      : "border border-white/[0.1] bg-white/[0.03] text-offwhite hover:bg-white/[0.06]"
                  }`}
                >
                  {plan.cta}
                </a>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
