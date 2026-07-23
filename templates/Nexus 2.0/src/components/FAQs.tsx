import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const faqs = [
  {
    question: "How long does it take to set up Nexus?",
    answer:
      "Most teams connect their first data source and build their first dashboard within an hour. Our onboarding wizard, templates, and 200+ integrations make it fast and frictionless.",
  },
  {
    question: "Do I need engineering resources to use Nexus?",
    answer:
      "Not at all. Nexus is built for operators, analysts, and leaders. No-code workflows, natural language queries, and point-and-click dashboards mean anyone can get value immediately.",
  },
  {
    question: "Is my data secure with Nexus?",
    answer:
      "Yes. Nexus is SOC 2 Type II certified, supports SSO and SCIM, encrypts data in transit and at rest, and offers custom data residency for Enterprise customers.",
  },
  {
    question: "Can I try Nexus before committing?",
    answer:
      "Absolutely. Every plan starts with a 14-day free trial with full feature access. No credit card is required to get started.",
  },
  {
    question: "What happens if I exceed my automation limits?",
    answer:
      "We’ll notify you well in advance. You can upgrade at any time, or purchase additional automation packs without changing your plan.",
  },
];

export function FAQs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple">FAQ</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-offwhite sm:text-4xl">
            Questions? Answered.
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-14 space-y-4" stagger={0.08}>
          {faqs.map((faq, i) => (
            <StaggerItem key={faq.question}>
              <div className="overflow-hidden rounded-[20px] border border-white/[0.06] bg-graphite">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="pr-4 text-base font-semibold text-offwhite">{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-offwhite">
                    {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
