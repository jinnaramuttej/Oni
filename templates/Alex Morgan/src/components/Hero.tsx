import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12 sm:px-8 lg:px-12"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-subtle-blue/3 to-muted-purple/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-subtle-blue/2 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <Reveal delay={0}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/60 px-4 py-1.5 text-xs font-medium text-slate-custom/70 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse-soft" />
              Available for new projects
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-matte-black sm:text-5xl md:text-6xl lg:text-7xl">
              Crafting digital
              <br />
              <span className="text-gradient-blue">products</span> that
              <br />
              make an impact
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-custom/80 sm:text-lg lg:mx-0">
              I&apos;m Alex Morgan — a product designer and front-end developer
              who partners with startups and agencies to design, build, and ship
              memorable digital experiences.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#contact"
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-matte-black px-7 py-3.5 text-sm font-medium text-white shadow-premium-button transition-all duration-300 hover:bg-neutral-800 hover:shadow-premium-button-hover hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
              >
                Hire Me
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#projects"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-gray-200 bg-white/80 px-7 py-3.5 text-sm font-medium text-matte-black shadow-premium-sm backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-premium-md hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
              >
                View Projects
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Portrait / Visual */}
        <Reveal delay={200} className="flex-shrink-0">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-gradient-to-br from-subtle-blue/5 to-muted-purple/5 blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-2 -left-2 h-48 w-48 rounded-full bg-gradient-to-tr from-subtle-blue/3 to-transparent blur-xl" aria-hidden="true" />

            {/* Portrait container */}
            <div className="relative h-72 w-72 overflow-hidden rounded-[32px] border border-gray-100 bg-light-gray shadow-premium-xl sm:h-80 sm:w-80">
              {/* Workspace/desk illustration */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-light-gray to-white p-8">
                <div className="flex flex-col items-center gap-4">
                  {/* Desk setup SVG */}
                  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                    <rect x="10" y="35" width="100" height="8" rx="4" fill="#111111" fillOpacity="0.1" />
                    <rect x="25" y="43" width="70" height="25" rx="3" fill="#111111" fillOpacity="0.06" />
                    <rect x="30" y="48" width="28" height="16" rx="2" fill="#111111" fillOpacity="0.08" />
                    <rect x="62" y="48" width="28" height="16" rx="2" fill="#2563EB" fillOpacity="0.15" />
                    <rect x="15" y="68" width="8" height="32" rx="3" fill="#111111" fillOpacity="0.08" />
                    <rect x="97" y="68" width="8" height="32" rx="3" fill="#111111" fillOpacity="0.08" />
                    <rect x="10" y="88" width="100" height="6" rx="3" fill="#111111" fillOpacity="0.1" />
                    {/* Monitor glow */}
                    <rect x="62" y="48" width="28" height="16" rx="2" fill="#2563EB" fillOpacity="0.05" />
                  </svg>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-matte-black">
                      <span className="text-xs font-bold text-white">AM</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-matte-black">Alex Morgan</p>
                      <p className="text-xs text-slate-custom/60">Design & Code</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle inner border */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-black/5 ring-inset" aria-hidden="true" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-2 -right-2 flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-2.5 shadow-premium-md animate-float">
              <div className="flex -space-x-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-subtle-blue">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <span className="text-xs font-medium text-matte-black">120+ projects</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <Reveal delay={600}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="#projects"
            className="flex flex-col items-center gap-2 text-slate-custom/50 transition-colors duration-300 hover:text-slate-custom/80"
            aria-label="Scroll to see projects"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-[1px] bg-gradient-to-b from-slate-custom/30 to-transparent" />
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </div>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
