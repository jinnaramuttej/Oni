import { ArrowRight, ArrowUp } from "lucide-react";
import { scrollToId } from "../lib/lenis";

const EXPLORE = [
  { label: "The Maison", href: "#maison" },
  { label: "Our Artists", href: "#artists" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Le Cercle", href: "#membership" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="texture-linen pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[620px] rounded-full bg-metallic/12 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-10 md:px-10 md:pt-28">
        {/* Masthead */}
        <div className="grid gap-12 border-b border-ivory/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-serif text-[13vw] leading-none font-medium tracking-[0.08em] sm:text-7xl lg:text-[6.5rem]">
              LUMIÈRE
            </p>
            <p className="mt-4 text-[10.5px] tracking-[0.5em] text-champagne/80 uppercase">
              Beauté · Confiance · Transformation
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="font-serif text-2xl leading-snug font-light text-ivory/90 italic md:text-3xl">
              Join the letter — seasonal looks, atelier news, quiet openings.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 flex items-center gap-2 rounded-[18px] border border-ivory/15 bg-ivory/5 p-2 backdrop-blur-sm transition-colors focus-within:border-metallic/60"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm font-light text-ivory placeholder:text-ivory/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-metallic text-ivory transition-all duration-500 hover:bg-ivory hover:text-charcoal"
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-[10.5px] font-medium tracking-[0.4em] text-champagne/70 uppercase">
              Explore
            </h3>
            <ul className="mt-6 space-y-3.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollToId(l.href)}
                    className="link-lux text-[14px] font-light text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10.5px] font-medium tracking-[0.4em] text-champagne/70 uppercase">
              Rituals
            </h3>
            <ul className="mt-6 space-y-3.5 text-[14px] font-light text-ivory/70">
              <li>Signature Cut & Style</li>
              <li>Couture Color & Balayage</li>
              <li>Bridal Atelier</li>
              <li>Le Rituel — Hair Spa</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10.5px] font-medium tracking-[0.4em] text-champagne/70 uppercase">
              Contact
            </h3>
            <ul className="mt-6 space-y-3.5 text-[14px] font-light text-ivory/70">
              <li>128 Greene Street, SoHo</li>
              <li>New York, NY 10012</li>
              <li>
                <a href="tel:+12125550184" className="link-lux hover:text-ivory">
                  +1 212 555 0184
                </a>
              </li>
              <li>
                <a href="mailto:concierge@lumiere.salon" className="link-lux hover:text-ivory">
                  concierge@lumiere.salon
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10.5px] font-medium tracking-[0.4em] text-champagne/70 uppercase">
              Hours
            </h3>
            <ul className="mt-6 space-y-3.5 text-[14px] font-light text-ivory/70">
              <li className="flex justify-between gap-4">
                <span>Tue — Fri</span>
                <span className="text-ivory">9:00 — 19:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span className="text-ivory">9:00 — 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span className="text-ivory">10:00 — 16:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Monday</span>
                <span className="text-ivory/50">By appointment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-ivory/10 pt-8 sm:flex-row">
          <p className="text-[11px] tracking-[0.2em] text-ivory/45 uppercase">
            © 2026 Lumière Hair Atelier · All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="link-lux text-[11px] tracking-[0.2em] text-ivory/60 uppercase transition-colors hover:text-ivory"
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="link-lux text-[11px] tracking-[0.2em] text-ivory/60 uppercase transition-colors hover:text-ivory"
            >
              Pinterest
            </a>
            <button
              onClick={() => scrollToId("#top")}
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-500 hover:border-metallic hover:bg-metallic hover:text-ivory"
            >
              <ArrowUp size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
