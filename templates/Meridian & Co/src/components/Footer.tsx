import type { SVGProps } from "react";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

const SERVICE_LINKS = [
  "Accounting & Bookkeeping",
  "Tax Planning & Income Tax",
  "GST Services",
  "Business Registration",
  "Payroll Management",
  "Virtual CFO & Advisory",
];

const COMPANY_LINKS = [
  { label: "About the firm", href: "#about" },
  { label: "Why Meridian", href: "#expertise" },
  { label: "Meet the experts", href: "#experts" },
  { label: "Insights & resources", href: "#insights" },
  { label: "Schedule a consultation", href: "#contact" },
];

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}
function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", Icon: LinkedInIcon },
  { label: "X (Twitter)", Icon: XIcon },
  { label: "YouTube", Icon: YouTubeIcon },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100/80" aria-label="Footer">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700">
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white text-lg font-extrabold text-navy-800">
                M
                <span aria-hidden="true" className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-gold-500" />
              </span>
              <span className="leading-tight text-white">
                <span className="block text-[1.02rem] font-extrabold tracking-tight">
                  Meridian <span className="text-gold-400">&amp;</span> Co.
                </span>
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-navy-200/60">
                  Chartered Accountants
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-navy-200/75">
              A full-service Chartered Accountancy practice serving founders, finance teams and family businesses since
              2009 — with the rigour of a Big-4 methodology and the responsiveness of a boutique.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={`Meridian & Co. on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-navy-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">Practices</h3>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-200/75 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-3.5" aria-hidden="true" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">Company</h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-200/75 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-3.5" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + newsletter */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">Head office</h3>
            <address className="mt-5 not-italic">
              <ul className="space-y-3 text-sm font-semibold text-navy-200/75">
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                  Level 9, Platina Tower, Bandra Kurla Complex, Mumbai 400 051
                </li>
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                  <a href="tel:+912248902200" className="transition-colors hover:text-white">+91 22 4890 2200</a>
                </li>
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                  <a href="mailto:hello@meridianco.in" className="transition-colors hover:text-white">hello@meridianco.in</a>
                </li>
              </ul>
            </address>

            <form
              className="mt-7"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Subscribe to the compliance calendar newsletter"
            >
              <label htmlFor="newsletter-email" className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-200/70">
                Monthly compliance calendar
              </label>
              <div className="mt-2.5 flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] transition-colors focus-within:border-green-600">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-4 py-3 text-sm font-semibold text-white placeholder:text-navy-200/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid w-12 shrink-0 place-items-center bg-green-700 text-white transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Compliance + legal bar */}
      <div className="border-t border-white/[0.07]">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-7 text-center md:flex-row md:text-left">
          <p className="text-xs font-medium leading-5 text-navy-200/55">
            © 2025 Meridian &amp; Co. — Registered with the Institute of Chartered Accountants of India (FRN 021847W).
            Content on this site is informational and does not constitute solicitation, per ICAI guidelines.
          </p>
          <ul className="flex shrink-0 gap-6 text-xs font-bold text-navy-200/65">
            <li><a href="#top" className="transition-colors hover:text-white">Privacy</a></li>
            <li><a href="#top" className="transition-colors hover:text-white">Terms</a></li>
            <li><a href="#top" className="transition-colors hover:text-white">Disclaimer</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
