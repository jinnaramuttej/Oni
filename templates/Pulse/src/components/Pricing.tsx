import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Gem, Rocket, Sprout } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";
import { EASE, SectionHeading } from "./ui";

type Tier = {
  icon: typeof Rocket;
  name: string;
  monthly: number | null;
  annual: number | null;
  blurb: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

const TIERS: Tier[] = [
  {
    icon: Sprout,
    name: "Starter",
    monthly: 0,
    annual: 0,
    blurb: "For side projects and first dashboards.",
    cta: "Start Free",
    features: [
      "100k events / month",
      "1 project · 3 seats",
      "Core funnels & cohorts",
      "30-day data retention",
      "Community support",
    ],
  },
  {
    icon: Rocket,
    name: "Growth",
    monthly: 49,
    annual: 39,
    blurb: "For teams turning data into a habit.",
    cta: "Start 14-day trial",
    featured: true,
    features: [
      "5M events / month",
      "Unlimited projects & seats",
      "Pulse Copilot included",
      "Anomaly detection & alerts",
      "12-month retention",
      "Slack digests & webhooks",
      "Priority support",
    ],
  },
  {
    icon: Gem,
    name: "Enterprise",
    monthly: null,
    annual: null,
    blurb: "For scale, security, and procurement.",
    cta: "Book Demo",
    features: [
      "Unlimited events & retention",
      "Warehouse-native queries",
      "99.99% uptime SLA",
      "SSO / SAML · SCIM · audit logs",
      "EU & US data residency",
      "Dedicated success manager",
    ],
  },
];

function Price({ tier, annual }: { tier: Tier; annual: boolean }) {
  if (tier.monthly === null) {
    return (
      <p className="font-display text-[44px] font-semibold leading-none tracking-[-0.03em] text-mist">
        Custom
      </p>
    );
  }
  const value = annual ? tier.annual! : tier.monthly!;
  return (
    <p className="flex items-baseline gap-2">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: EASE }}
          className="font-display text-[44px] font-semibold leading-none tracking-[-0.03em] text-mist"
        >
          ${value}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-mute">/ editor / mo</span>
    </p>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" aria-label="Pricing" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-[-160px] top-24 h-96 w-96 rounded-full bg-cyan/[0.05] blur-[120px]" aria-hidden />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          icon={<Gem className="size-3.5" />}
          title={
            <>
              Start free. <span className="text-grad">Scale when it clicks.</span>
            </>
          }
          description="Transparent pricing that grows with your usage — not your headcount. Every plan includes unlimited viewers."
        />

        {/* billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-10 flex items-center justify-center"
        >
          <div className="relative flex items-center rounded-full border border-line bg-graphite p-1">
            {(["Monthly", "Annual"] as const).map((label) => {
              const isAnnual = label === "Annual";
              const active = annual === isAnnual;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(isAnnual)}
                  aria-pressed={active}
                  className={cn(
                    "relative z-10 flex h-9 items-center rounded-full px-5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-accent-soft",
                    active ? "text-charcoal" : "text-mute hover:text-mist"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-mist"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {label}
                  {isAnnual && (
                    <span
                      className={cn(
                        "ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                        active ? "bg-accent/15 text-accent" : "bg-cyan/10 text-cyan"
                      )}
                    >
                      −20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* tiers */}
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className={cn(tier.featured && "lg:-my-4")}
            >
              <div
                className={cn(
                  "h-full rounded-[20px] transition-transform duration-500",
                  tier.featured
                    ? "bg-gradient-to-b from-accent/60 via-cyan/30 to-transparent p-px shadow-[0_32px_80px_-24px_rgb(124_58_237/0.35)]"
                    : ""
                )}
              >
                <div
                  className={cn(
                    "card-lift relative flex h-full flex-col border bg-graphite p-7 sm:p-8",
                    tier.featured ? "border-transparent rounded-[19px]" : "border-line rounded-[19px]"
                  )}
                >
                  {tier.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-soft to-cyan px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal shadow-lg">
                      Most popular
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl border ring-1 ring-inset ring-white/5",
                        tier.featured
                          ? "border-accent/30 bg-accent/15"
                          : "border-line bg-white/[0.03]"
                      )}
                    >
                      <tier.icon className={cn("size-[18px]", tier.featured ? "text-accent-soft" : "text-mute")} aria-hidden />
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-mist">{tier.name}</h3>
                  </div>

                  <p className="mt-2.5 text-sm text-mute">{tier.blurb}</p>

                  <div className="mt-6">
                    <Price tier={tier} annual={annual} />
                    <p className="mt-1.5 h-4 font-mono text-[10px] uppercase tracking-wider text-mute/60">
                      {tier.monthly !== null && tier.monthly > 0
                        ? annual
                          ? "billed annually"
                          : "billed monthly"
                        : tier.monthly === 0
                          ? "free forever"
                          : "volume-based"}
                    </p>
                  </div>

                  <a
                    href="#cta"
                    className={cn(
                      "group mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-[18px] text-[15px] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft",
                      tier.featured
                        ? "btn-sheen bg-mist text-charcoal shadow-[0_10px_32px_-10px_rgb(124_58_237/0.5)] hover:-translate-y-0.5 hover:bg-white"
                        : "border border-line bg-white/[0.03] text-mist hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
                    )}
                  >
                    {tier.cta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                  </a>

                  <ul className="mt-8 space-y-3 border-t border-line pt-7">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-mute">
                        <span
                          className={cn(
                            "mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full",
                            tier.featured ? "bg-cyan/15" : "bg-white/[0.05]"
                          )}
                        >
                          <Check className={cn("size-2.5", tier.featured ? "text-cyan" : "text-mist/70")} aria-hidden />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center text-sm text-mute/70"
        >
          Nonprofits and open-source projects get Growth free —{" "}
          <a href="#faq" className="font-medium text-mist underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan">
            just ask
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
