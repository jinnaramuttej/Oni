import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!layerRef.current) return;
      const y = Math.min(window.scrollY, 800);
      layerRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#0A0A0A]"
    >
      {/* Ambient background layers */}
      <div
        ref={layerRef}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* radial ambient */}
        <div className="absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.35),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.28),transparent_65%)] blur-3xl" />
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Top meta bar */}
      <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1600px] items-start justify-between px-6 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3] md:top-28 md:px-10">
        <div className="hidden max-w-[220px] leading-relaxed md:block">
          [ 01 ] — Independent
          <br />
          creative studio est. 2014
        </div>
        <div className="hidden text-right leading-relaxed md:block">
          N 52.5200°
          <br />
          E 13.4050°
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-6 pb-24 pt-40 md:px-10 md:pb-32 md:pt-44">
        <div className="grid grid-cols-12 items-end gap-6">
          {/* Left short intro */}
          <div className="col-span-12 mb-10 max-w-md md:col-span-4 md:mb-0">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#A3A3A3]">
              (Creative studio — Brand · Digital · Film)
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/80 md:text-lg">
              We are a small, obsessive team building{" "}
              <em className="font-display italic text-white">
                cinematic brands
              </em>{" "}
              and interactive worlds for companies that refuse to be forgotten.
            </p>
          </div>

          {/* Massive headline */}
          <div className="col-span-12 md:col-span-8">
            <h1 className="font-display leading-[0.86] tracking-[-0.02em]">
              <span className="block text-[15vw] md:text-[10vw]">Design</span>
              <span className="block text-[15vw] md:text-[10vw]">
                with <em className="italic text-[#C6FF3D]">intent.</em>
              </span>
              <span className="mt-3 block text-[15vw] md:text-[10vw]">
                Build with{" "}
                <span className="relative inline-block align-middle">
                  <span className="relative z-10 text-[#0A0A0A]">soul</span>
                  <span className="absolute inset-0 -skew-x-6 rounded-md bg-white/95" />
                </span>
                .
              </span>
            </h1>
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 md:mt-20 md:flex-row md:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 rounded-[18px] bg-white px-7 py-4 text-sm font-medium text-[#0A0A0A] shadow-[0_20px_60px_-20px_rgba(255,255,255,0.4)] transition-all duration-500 hover:bg-[#C6FF3D] hover:shadow-[0_20px_60px_-20px_rgba(198,255,61,0.6)]"
            >
              <span className="h-2 w-2 rounded-full bg-[#0A0A0A]" />
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-[18px] border border-white/15 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              View our work
              <span className="inline-block h-px w-6 bg-white transition-all duration-500 group-hover:w-10 group-hover:bg-[#C6FF3D]" />
            </a>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="text-white/60">
              <div className="font-mono uppercase tracking-[0.24em] text-[#A3A3A3]">
                Now booking
              </div>
              <div className="mt-1 font-display text-lg text-white">
                Q2 · 2026
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-white/60">
              <div className="font-mono uppercase tracking-[0.24em] text-[#A3A3A3]">
                Trusted by
              </div>
              <div className="mt-1 font-display text-lg text-white">
                120+ brands
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating side text */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[11px] uppercase tracking-[0.32em] text-[#A3A3A3] lg:block">
        Scroll — 001 / 010
      </div>

      {/* Scroll indicator */}
      <a
        href="#work"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-mono uppercase tracking-[0.32em] text-[#A3A3A3] transition-colors hover:text-white"
      >
        <span>Scroll to explore</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-4 animate-[float-y_2s_ease-in-out_infinite] bg-[#C6FF3D]" />
        </span>
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  );
}
