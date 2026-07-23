import { Quote } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const testimonials = [
  {
    quote:
      "Nexus replaced five tools we were stitching together. Our ops team finally has a single place to see, decide, and act.",
    author: "Sarah Chen",
    role: "VP Operations, Linear",
  },
  {
    quote:
      "The AI assistant surfaced a churn risk we would have missed entirely. It paid for itself in the first month.",
    author: "Marcus Osei",
    role: "Head of Growth, Raycast",
  },
  {
    quote:
      "Cleanest enterprise software I’ve used. Setup took an afternoon, and adoption across the org was immediate.",
    author: "Elena Rossi",
    role: "CFO, Clerk",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple">Testimonials</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
            Loved by ambitious teams
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <div className="relative h-full rounded-[24px] border border-white/[0.06] bg-graphite p-8 transition-all hover:border-white/[0.12]">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-white/[0.06]" />
                <p className="relative z-10 text-lg leading-relaxed text-offwhite">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple to-cyan text-sm font-bold text-white">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-offwhite">{t.author}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
