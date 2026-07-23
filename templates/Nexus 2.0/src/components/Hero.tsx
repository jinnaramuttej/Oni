import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-charcoal pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-36">
      {/* Ambient aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple/20 blur-[120px]" />
        <div className="absolute top-[10%] right-[10%] h-[400px] w-[500px] rounded-full bg-cyan/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-cyan" />
              <span className="text-sm font-medium text-offwhite">Introducing Nexus 2.0</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight text-offwhite sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
              The intelligence layer for{" "}
              <span className="bg-gradient-to-r from-purple via-cyan to-purple bg-clip-text text-transparent">
                modern operations
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Unify data, workflows, and AI in one beautifully simple platform. Ship faster,
              decide smarter, and scale with confidence.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#cta"
                className="group relative inline-flex items-center gap-2 rounded-[20px] bg-offwhite px-7 py-3.5 text-base font-semibold text-charcoal shadow-lg shadow-white/10 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-[20px] border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-base font-semibold text-offwhite backdrop-blur-sm transition-all hover:bg-white/[0.06] hover:border-white/[0.14]"
              >
                Book Demo
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="mt-5 text-sm text-muted">No credit card required. 14-day free trial.</p>
          </AnimatedSection>
        </div>
      </div>

      <motion.a
        href="#product"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-offwhite transition-colors md:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-label="Scroll to product preview"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
