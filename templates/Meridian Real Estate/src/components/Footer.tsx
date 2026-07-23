import { ArrowUp, ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import { CONTAINER } from "./ui";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Featured Properties", href: "#properties" },
      { label: "Curated Collections", href: "#collections" },
      { label: "Neighborhoods", href: "#neighborhoods" },
      { label: "Recently Sold", href: "#results" },
    ],
  },
  {
    title: "The Firm",
    links: [
      { label: "Our Advisors", href: "#advisors" },
      { label: "Market Insights", href: "#insights" },
      { label: "Buyer's Guide", href: "#guides" },
      { label: "Seller's Guide", href: "#guides" },
    ],
  },
  {
    title: "Private Office",
    links: [
      { label: "Book a Consultation", href: "#consultation" },
      { label: "Contact", href: "#contact" },
      { label: "+1 212 555 0184", href: "tel:+12125550184" },
      { label: "privateoffice@meridian.estate", href: "mailto:privateoffice@meridian.estate" },
    ],
  },
];

const SOCIALS = ["Instagram", "LinkedIn", "YouTube", "Journal"];

export default function Footer() {
  return (
    <footer aria-label="Footer" className="relative overflow-hidden bg-ink text-ivory">
      {/* ——— Hairline architecture ——— */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-full w-px bg-ivory/[0.03]" />
        <div className="absolute right-1/4 top-0 h-full w-px bg-ivory/[0.03]" />
      </div>

      <div className={cn(CONTAINER, "relative pb-12 pt-20 md:pt-28")}>
        {/* ——— Brand + newsletter ——— */}
        <div className="grid gap-12 border-b border-ivory/10 pb-14 lg:grid-cols-2 lg:items-end">
          <div>
            <a href="#top" className="group inline-flex items-center gap-4">
              <span className="grid size-12 rotate-45 place-items-center border border-ivory/30 transition-colors duration-500 group-hover:border-gold">
                <span className="-rotate-45 font-serif text-xl font-semibold leading-none">M</span>
              </span>
              <span>
                <span className="block font-serif text-xl font-semibold tracking-[0.28em]">MERIDIAN</span>
                <span className="mt-1.5 block text-[8.5px] font-bold uppercase tracking-[0.52em] text-gold">
                  Fine Estates
                </span>
              </span>
            </a>
            <p className="mt-7 max-w-md text-[14px] leading-[1.9] text-ivory/55">
              An international brokerage for the world's most extraordinary
              residences — and the extraordinary people who call them home.
            </p>
          </div>

          <form
            aria-label="Subscribe to the private briefing"
            onSubmit={(e) => e.preventDefault()}
            className="lg:justify-self-end lg:w-full lg:max-w-md"
          >
            <label htmlFor="newsletter" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
              The Private Briefing — Monthly
            </label>
            <div className="mt-4 flex gap-3">
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Your email address"
                className="w-full rounded-[14px] border border-ivory/15 bg-ivory/[0.06] px-5 py-4 text-[14px] font-medium text-ivory placeholder:text-ivory/35 backdrop-blur transition-colors duration-400 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-[54px] shrink-0 place-items-center rounded-[14px] bg-gold text-ink shadow-gold transition-all duration-500 hover:-translate-y-0.5 hover:bg-ivory"
              >
                <ArrowUpRight size={18} strokeWidth={2} />
              </button>
            </div>
            <p className="mt-3 text-[11px] tracking-wide text-ivory/35">
              Market intelligence, off-market previews. Never noise.
            </p>
          </form>
        </div>

        {/* ——— Link columns ——— */}
        <nav aria-label="Footer" className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{col.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[13.5px] font-medium tracking-wide text-ivory/60 transition-colors duration-400 hover:text-gold"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-400 group-hover:w-3" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Follow</h3>
            <ul className="mt-6 space-y-3.5">
              {SOCIALS.map((s) => (
                <li key={s}>
                  <a
                    href="#top"
                    className="group inline-flex items-center gap-2 text-[13.5px] font-medium tracking-wide text-ivory/60 transition-colors duration-400 hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-400 group-hover:w-3" />
                    {s}
                    <ArrowUpRight size={12} className="opacity-0 transition-all duration-400 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-[12px] leading-relaxed text-ivory/40">
              New York · London · Monaco
              <br />
              Dubai · Paris · Geneva
            </p>
          </div>
        </nav>

        {/* ——— Legal bar ——— */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-ivory/10 pt-8 md:flex-row">
          <p className="text-[11.5px] tracking-wide text-ivory/40">
            © 2026 Meridian Fine Estates. All rights reserved. Licensed Real Estate Broker.
          </p>
          <div className="flex items-center gap-7">
            <a href="#top" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/40 transition-colors hover:text-gold">
              Privacy
            </a>
            <a href="#top" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/40 transition-colors hover:text-gold">
              Terms
            </a>
            <a href="#top" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/40 transition-colors hover:text-gold">
              Fair Housing
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="grid size-11 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              <ArrowUp size={16} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>

      {/* ——— Monumental wordmark ——— */}
      <div aria-hidden className="relative select-none overflow-hidden">
        <p className="pointer-events-none -mb-[4vw] text-center font-serif text-[18.5vw] font-medium leading-none tracking-[0.08em] text-ivory/[0.045]">
          MERIDIAN
        </p>
      </div>
    </footer>
  );
}
