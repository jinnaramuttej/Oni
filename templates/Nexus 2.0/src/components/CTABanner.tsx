import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function CTABanner() {
  return (
    <section id="cta" className="relative bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-graphite p-10 text-center sm:p-16 lg:p-20">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/20 blur-[120px]" />
              <div className="absolute right-1/4 top-1/4 h-[200px] w-[200px] rounded-full bg-cyan/15 blur-[80px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-cyan" />
                <span className="text-sm font-medium text-offwhite">Start building smarter today</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-offwhite sm:text-4xl lg:text-5xl">
                Ready to unify your operations?
              </h2>
              <p className="mt-5 text-lg text-muted">
                Join thousands of teams using Nexus to move faster, reduce noise, and make better
                decisions every day.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 rounded-[20px] bg-offwhite px-7 py-3.5 text-base font-semibold text-charcoal shadow-lg shadow-white/10 transition-all hover:shadow-xl"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-[20px] border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-base font-semibold text-offwhite backdrop-blur-sm transition-all hover:bg-white/[0.06]"
                >
                  Book Demo
                </a>
              </div>
              <p className="mt-5 text-sm text-muted">Free 14-day trial · No credit card required</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
