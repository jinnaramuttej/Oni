import { useState } from "react";
import { navLinks, categories } from "../lib/data";
import { Instagram, Facebook, Youtube, ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-ink text-ivory/70">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="font-serif text-3xl tracking-[0.06em] text-ivory">Aurelia</p>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-ivory/60">
              A sanctuary of slow rituals and quiet luxury — composed to restore
              balance to body, mind, and spirit.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-pill border border-ivory/15 text-ivory/70 transition-all duration-300 hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/45">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm font-light text-ivory/70 transition-colors duration-300 hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div className="lg:col-span-3">
            <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/45">
              Treatments
            </h4>
            <ul className="mt-5 space-y-3">
              {categories.map((c) => (
                <li key={c.id}>
                  <a href="#treatments" className="text-sm font-light text-ivory/70 transition-colors duration-300 hover:text-gold">
                    {c.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#packages" className="text-sm font-light text-ivory/70 transition-colors duration-300 hover:text-gold">
                  Spa Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ivory/45">
              The Aurelia Letter
            </h4>
            <p className="mt-5 text-sm font-light leading-relaxed text-ivory/60">
              Seasonal rituals, new treatments, and quiet notes — a few times a year.
            </p>
            {subscribed ? (
              <div className="mt-6 flex items-center gap-3 text-sm text-sage">
                <Check className="h-4 w-4" strokeWidth={1.75} />
                Thank you — you're on the list.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
                className="mt-6"
              >
                <div className="flex items-center gap-2 rounded-pill border border-ivory/15 bg-ivory/[0.04] p-1.5 pl-5 transition-colors focus-within:border-gold/50">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-transparent text-sm text-ivory placeholder-ivory/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-gold text-ivory transition-all duration-300 hover:bg-gold-deep"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs font-light text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aurelia Spa &amp; Wellness. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-gold">Privacy</a>
            <a href="#" className="transition-colors hover:text-gold">Terms</a>
            <a href="#" className="transition-colors hover:text-gold">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
