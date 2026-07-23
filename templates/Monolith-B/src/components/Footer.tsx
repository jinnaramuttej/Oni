import { ArrowUpRight } from "lucide-react";

const cols = [
  {
    title: "Studio",
    links: ["About", "Careers", "News", "Contact"],
  },
  {
    title: "Work",
    links: ["Selected", "Archive", "Case Studies", "Press"],
  },
  {
    title: "Elsewhere",
    links: ["Instagram", "Are.na", "LinkedIn", "Vimeo"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0A0A0A] px-6 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-10 pb-16 md:pb-24">
          {/* Brand */}
          <div className="col-span-12 md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
                <span className="h-2 w-2 rounded-full bg-[#C6FF3D]" />
              </span>
              <span className="font-display text-2xl">
                Monolith<span className="text-[#C6FF3D]">.</span>
              </span>
            </a>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              An independent creative studio building brands, digital products
              and films that outlive the trend cycle.
            </p>
            <form
              className="mt-10 flex max-w-md items-center gap-2 rounded-[18px] border border-white/15 bg-white/[0.03] p-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button className="inline-flex items-center gap-2 rounded-[12px] bg-white px-4 py-2 text-sm font-medium text-[#0A0A0A] transition-colors hover:bg-[#C6FF3D]">
                Field Notes
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              A quarterly letter · No noise · Unsubscribe anytime
            </p>
          </div>

          {/* Columns */}
          {cols.map((c) => (
            <div key={c.title} className="col-span-6 md:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                {c.title}
              </div>
              <ul className="mt-6 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="link-underline font-display text-xl text-white/90"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact quick */}
          <div className="col-span-12 md:col-span-1 md:col-start-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              Studio
            </div>
            <address className="mt-6 not-italic text-sm leading-relaxed text-white/80">
              Berlin
              <br />
              Kyoto
              <br />
              Remote
            </address>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative -mx-6 overflow-hidden border-t border-white/10 md:-mx-10">
          <div className="select-none px-6 pb-10 pt-10 text-center md:px-10">
            <div className="font-display leading-none tracking-[-0.03em]">
              <span className="block text-[24vw] leading-[0.85]">
                MONOLITH
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3] md:flex-row md:items-center">
          <div>© 2014–2026 Monolith Studio GmbH — All rights reserved</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Imprint</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C6FF3D]" />
              All systems nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
