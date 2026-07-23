import { AnimatedSection } from "./AnimatedSection";

const logos = ["Linear", "Vercel", "Notion", "Raycast", "Clerk", "Stripe"];

export function TrustedBy() {
  return (
    <section className="border-y border-white/[0.04] bg-charcoal py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted">
            Trusted by teams at
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {logos.map((name) => (
              <span
                key={name}
                className="text-lg font-semibold tracking-tight text-white/20 transition-colors hover:text-white/40"
              >
                {name}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
