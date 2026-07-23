import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navLinks, site, socialLinks } from "../data/site";

const serviceLinks = [
  { label: "Product Design", href: "#services" },
  { label: "Front-End Development", href: "#services" },
  { label: "Design Systems", href: "#services" },
  { label: "Technical Consulting", href: "#services" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto w-full max-w-7xl px-6 pt-20 lg:px-8">
        <div className="grid gap-14 pb-16 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <a href="#top" className="group inline-flex items-center gap-3" aria-label="Back to top">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper font-display text-sm font-bold text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                AC
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                Adrian Cole<span className="text-accent">.</span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-slate-400">
              Product designer and front-end engineer crafting digital experiences with intent —
              from Berlin, for the world.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-7 inline-flex items-center gap-2.5 text-lg font-semibold text-paper transition-colors hover:text-accent"
            >
              {site.email}
              <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
            <p className="mt-6 text-xs font-medium tracking-wide text-slate-600">
              {site.location} · {site.coords}
            </p>
          </div>

          {/* Link columns */}
          <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7" aria-label="Footer">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Sitemap
              </p>
              <ul className="mt-5 space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-block py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Services
              </p>
              <ul className="mt-5 space-y-1">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Elsewhere
              </p>
              <ul className="mt-5 space-y-1">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-8 md:flex-row">
          <p className="text-sm font-medium text-slate-500">
            © 2026 {site.name}. All rights reserved.
          </p>
          <p className="hidden text-sm font-medium text-slate-600 md:block">
            Designed &amp; built by hand — no templates, no shortcuts.
          </p>
          <a
            href="#top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-paper hover:bg-paper hover:text-ink"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </a>
        </div>

        {/* Giant watermark */}
        <p
          aria-hidden="true"
          className="pointer-events-none select-none text-center font-display text-[clamp(3.5rem,13.5vw,11rem)] font-bold leading-[0.8] tracking-[-0.04em] text-white/[0.045] -mb-6"
        >
          ADRIAN COLE
        </p>
      </div>
    </footer>
  );
}
