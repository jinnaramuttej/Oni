import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV_LINKS, TREATMENTS } from "../lib/data";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socials = [
  { icon: InstagramIcon, label: "Lumina Dental Studio on Instagram", href: "#top" },
  { icon: FacebookIcon, label: "Lumina Dental Studio on Facebook", href: "#top" },
  { icon: YoutubeIcon, label: "Lumina Dental Studio on YouTube", href: "#top" },
];

export function Footer() {
  return (
    <footer className="relative bg-navy-950 text-navy-100/70">
      <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-aqua-400 to-teal-500" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-16 sm:px-8 lg:pb-12 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="inline-flex items-center gap-3" aria-label="Lumina Dental Studio — back to top">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-500 shadow-lg shadow-teal-500/25">
                <svg viewBox="0 0 24 24" className="h-5.5 w-5.5 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M12 5.5c-2 0-2.6.9-4 .9C5.9 6.4 4.6 8.2 4.6 10c0 3 2 9 3.4 9 1.2 0 1.1-3.4 4-3.4s2.8 3.4 4 3.4c1.4 0 3.4-6 3.4-9 0-1.8-1.3-3.6-3.4-3.6-1.4 0-2-.9-4-.9Z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl font-bold tracking-tight text-white">Lumina</span>
                <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-aqua-300">
                  Dental Studio
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Precision dentistry, gentle care. A modern studio in Beverly Hills
              creating healthy, confident smiles since 2010.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-500 hover:text-white hover:ring-teal-400"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer — explore">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-aqua-300">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#insurance" className="transition-colors hover:text-aqua-300">
                  Insurance &amp; Pricing
                </a>
              </li>
            </ul>
          </nav>

          {/* Treatments */}
          <nav aria-label="Footer — treatments">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Treatments</p>
            <ul className="mt-5 space-y-3 text-sm">
              {TREATMENTS.map((t) => (
                <li key={t.name}>
                  <a href="#treatments" className="transition-colors hover:text-aqua-300">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Visit</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
                <span>
                  {CONTACT.address}
                  <br />
                  {CONTACT.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
                <a href={CONTACT.phoneHref} className="transition-colors hover:text-aqua-300">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-aqua-400" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-aqua-300">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <a
              href="#booking"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-400"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book Appointment
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-navy-100/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Lumina Dental Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#top" className="transition-colors hover:text-aqua-300">Privacy</a>
            <a href="#top" className="transition-colors hover:text-aqua-300">Terms</a>
            <a href="#top" className="transition-colors hover:text-aqua-300">Accessibility</a>
            <a href="#top" className="transition-colors hover:text-aqua-300">HIPAA Notice</a>
          </div>
        </div>
      </div>

      {/* Mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-900/5 bg-white/85 px-4 py-3 backdrop-blur-xl lg:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <a
            href={CONTACT.phoneHref}
            aria-label={`Call ${CONTACT.phone}`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-navy-800 transition-colors hover:bg-slate-200"
          >
            <Phone className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
          <a
            href="#booking"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-transform active:scale-[0.98]"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book Appointment
          </a>
        </div>
      </div>
    </footer>
  );
}
