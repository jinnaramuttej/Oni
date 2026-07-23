import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ivory/[0.06] bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="display text-3xl text-ivory">
              Maison <em className="italic text-gold">Lumière</em>
            </p>
            <p className="mt-6 max-w-sm text-sm font-light leading-7 text-ivory-faint">
              A two-Michelin-star house on the Rive Gauche. Twelve tables, one
              sitting, and a menu written by the season itself.
            </p>
            <div className="mt-8 flex gap-8">
              {["Instagram", "Journal", "Press"].map((s) => (
                <a
                  key={s}
                  href="#top"
                  className="gold-link text-[0.6875rem] uppercase tracking-[0.3em] text-ivory-dim transition-colors duration-500 hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav className="md:col-span-3">
            <h3 className="text-[0.625rem] uppercase tracking-[0.35em] text-gold">
              Explore
            </h3>
            <ul className="mt-6 space-y-3.5">
              {[
                ["Philosophy", "#philosophy"],
                ["The Cuisine", "#cuisine"],
                ["Tasting Menu", "#menu"],
                ["The Cellar", "#cellar"],
                ["Reservations", "#reserve"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="gold-link text-sm font-light text-ivory-dim transition-colors duration-500 hover:text-ivory"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-[0.625rem] uppercase tracking-[0.35em] text-gold">
              Correspondence
            </h3>
            <address className="mt-6 space-y-3.5 text-sm font-light not-italic leading-6 text-ivory-dim">
              <p>11 Rue de Sèvres, 75006 Paris</p>
              <p>
                <a href="tel:+33145440000" className="gold-link">
                  +33 1 45 44 00 00
                </a>
              </p>
              <p>
                <a href="mailto:table@maisonlumiere.fr" className="gold-link">
                  table@maisonlumiere.fr
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[0.6875rem] font-light tracking-[0.18em] text-ivory-faint">
            © {new Date().getFullYear()} Maison Lumière · Paris — All rights
            reserved
          </p>
          <a
            href="#top"
            className="group flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.32em] text-ivory-faint transition-colors duration-500 hover:text-gold"
          >
            Return to top
            <ArrowUp
              size={14}
              strokeWidth={1.25}
              className="transition-transform duration-500 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
