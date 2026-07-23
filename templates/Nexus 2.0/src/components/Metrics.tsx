import { Counter } from "./Counter";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const metrics = [
  { value: 4000, suffix: "+", label: "Teams onboarded" },
  { value: 99.99, suffix: "%", label: "Uptime SLA", decimals: 2 },
  { value: 50, suffix: "ms", label: "Average query" },
  { value: 2.5, suffix: "x", label: "Faster decisions", decimals: 1 },
];

export function Metrics() {
  return (
    <section className="border-y border-white/[0.04] bg-graphite py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <AnimatedSection>
                <div className="text-center">
                  <div className="text-4xl font-bold tracking-tight text-offwhite sm:text-5xl">
                    <Counter
                      value={m.value}
                      suffix={m.suffix}
                      decimals={m.decimals}
                      duration={2.2}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-muted">{m.label}</p>
                </div>
              </AnimatedSection>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
