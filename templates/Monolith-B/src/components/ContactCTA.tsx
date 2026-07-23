import { ArrowUpRight, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-48"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.35),transparent_60%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Rotating stamp */}
      <div className="pointer-events-none absolute right-8 top-8 hidden md:block lg:right-16 lg:top-20">
        <div className="spin-slow relative h-40 w-40">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <path
                id="circle"
                d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                fill="none"
              />
            </defs>
            <text fill="#FAFAFA" fontSize="12" letterSpacing="4" fontFamily="Space Grotesk">
              <textPath href="#circle">
                AVAILABLE FOR NEW WORK — Q2 2026 — AVAILABLE FOR NEW WORK — Q2 2026 —
              </textPath>
            </text>
          </svg>
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6FF3D]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
          <span className="h-px w-10 bg-[#A3A3A3]" />
          [ 09 ] Let's build something
        </div>

        <h2 className="mt-8 font-display text-[16vw] leading-[0.86] tracking-tight md:text-[11vw]">
          Have a brief?
          <br />
          <em className="italic">Have a hunch?</em>
          <br />
          Have <span className="text-[#C6FF3D]">both</span>?
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-6 border-t border-white/10 pt-10">
          <div className="col-span-12 flex flex-wrap items-center gap-4 md:col-span-6">
            <a
              href="mailto:studio@monolith.co"
              className="group inline-flex items-center gap-3 rounded-[18px] bg-white px-7 py-4 text-sm font-medium text-[#0A0A0A] shadow-[0_20px_60px_-20px_rgba(255,255,255,0.5)] transition-all hover:bg-[#C6FF3D] hover:shadow-[0_20px_60px_-20px_rgba(198,255,61,0.6)]"
            >
              <Mail className="h-4 w-4" />
              studio@monolith.co
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-3 rounded-[18px] border border-white/15 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Book an intro call
              <span className="inline-block h-px w-6 bg-white transition-all group-hover:w-10 group-hover:bg-[#C6FF3D]" />
            </a>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <dl className="grid grid-cols-2 gap-8">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                  Studio
                </dt>
                <dd className="mt-3 font-display text-xl leading-tight">
                  Torstraße 141
                  <br />
                  10119 Berlin, DE
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                  Press
                </dt>
                <dd className="mt-3 font-display text-xl leading-tight">
                  press@monolith.co
                  <br />
                  +49 30 555 0102
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
