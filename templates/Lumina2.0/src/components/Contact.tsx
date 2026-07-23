import { ArrowRight, Car, Clock, Mail, MapPin, Navigation, Phone, TramFront } from "lucide-react";
import { Button, Img, Reveal, SectionHeading } from "./ui";
import { CONTACT, HOURS, IMAGES } from "../lib/data";

function StylizedMap() {
  return (
    <div
      className="relative h-full min-h-[26rem] overflow-hidden rounded-[1.75rem] bg-[#eef4f7] ring-1 ring-slate-900/5"
      role="img"
      aria-label="Stylized map showing Lumina Dental Studio on Rosewood Avenue, Beverly Hills"
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 440" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="440" fill="#eef4f7" />
        {/* park */}
        <rect x="240" y="36" width="140" height="120" rx="24" fill="#dcefdd" />
        {/* water */}
        <path d="M-20 360 Q 90 330 160 372 T 420 380 L 420 460 L -20 460 Z" fill="#d6ecf4" />
        {/* blocks */}
        <g fill="#ffffff">
          <rect x="30" y="40" width="90" height="70" rx="14" />
          <rect x="140" y="40" width="70" height="110" rx="14" />
          <rect x="30" y="140" width="90" height="90" rx="14" />
          <rect x="250" y="190" width="120" height="80" rx="14" />
          <rect x="30" y="260" width="160" height="60" rx="14" />
          <rect x="250" y="300" width="120" height="50" rx="14" />
        </g>
        {/* roads */}
        <g stroke="#dbe4ea" strokeWidth="14" strokeLinecap="round">
          <path d="M-10 240 H 410" />
          <path d="M230 -10 V 350" />
          <path d="M-10 130 H 230" />
          <path d="M130 130 V 350" />
          <path d="M230 350 Q 250 370 410 365" />
        </g>
        <g stroke="#ffffff" strokeWidth="4" strokeDasharray="14 12" strokeLinecap="round">
          <path d="M-10 240 H 410" />
          <path d="M230 -10 V 350" />
          <path d="M-10 130 H 230" />
        </g>
      </svg>

      {/* Pin */}
      <div className="absolute left-[57.5%] top-[54.5%] -translate-x-1/2 -translate-y-full">
        <span className="relative flex flex-col items-center">
          <span className="absolute -bottom-2 h-4 w-4 animate-ping rounded-full bg-teal-500/40" aria-hidden="true" />
          <span className="grid h-12 w-12 place-items-center rounded-full rounded-br-none bg-teal-500 shadow-lg shadow-teal-500/40 ring-4 ring-white/70 [transform:rotate(45deg)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 -rotate-45 text-white" fill="currentColor" aria-hidden="true">
              <path d="M12 5.5c-2 0-2.6.9-4 .9C5.9 6.4 4.6 8.2 4.6 10c0 3 2 9 3.4 9 1.2 0 1.1-3.4 4-3.4s2.8 3.4 4 3.4c1.4 0 3.4-6 3.4-9 0-1.8-1.3-3.6-3.4-3.6-1.4 0-2-.9-4-.9Z" />
            </svg>
          </span>
        </span>
      </div>

      {/* Label card */}
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-card backdrop-blur-md sm:inset-x-6 sm:bottom-6">
        <div>
          <p className="font-display text-sm font-bold text-navy-800">Rosewood Medical Plaza</p>
          <p className="mt-0.5 text-xs text-slate-500">Suite 210 · Elevator access · Free parking</p>
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=9248+Rosewood+Avenue+Beverly+Hills+CA"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-navy-800 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-700"
        >
          <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
          Directions
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Visit us"
          title="Five minutes from Rodeo, an ocean away from clinical"
          lede="Bright, quiet, and easy to reach — with validated parking underneath the building."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Info card */}
          <Reveal>
            <div className="flex h-full flex-col rounded-[1.75rem] border border-slate-100 bg-white p-8 shadow-card lg:p-10">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                    <MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-[0.95rem] font-semibold text-navy-800">{CONTACT.address}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{CONTACT.city}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                    <Phone className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <a href={CONTACT.phoneHref} className="font-display text-[0.95rem] font-semibold text-navy-800 transition-colors hover:text-teal-600">
                      {CONTACT.phone}
                    </a>
                    <p className="mt-0.5 text-sm text-slate-500">24/7 triage for current patients</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                    <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <a href={`mailto:${CONTACT.email}`} className="font-display text-[0.95rem] font-semibold text-navy-800 transition-colors hover:text-teal-600">
                      {CONTACT.email}
                    </a>
                    <p className="mt-0.5 text-sm text-slate-500">Replies within one working hour</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 border-t border-slate-100 pt-7">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  <Clock className="h-4 w-4 text-teal-500" aria-hidden="true" />
                  Opening hours
                </p>
                <dl className="mt-4 space-y-2.5">
                  {HOURS.map((h) => (
                    <div key={h.days} className="flex items-center justify-between text-sm">
                      <dt className="text-slate-500">{h.days}</dt>
                      <dd className={h.time === "Closed" ? "font-medium text-slate-400" : "font-semibold text-navy-800"}>
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 grid gap-3 border-t border-slate-100 pt-7 text-xs text-slate-500 sm:grid-cols-2">
                <p className="flex items-center gap-2.5">
                  <Car className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
                  2h validated parking, level B1
                </p>
                <p className="flex items-center gap-2.5">
                  <TramFront className="h-4 w-4 shrink-0 text-teal-500" aria-hidden="true" />
                  Wilshire/Rodeo station · 6 min walk
                </p>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={140}>
            <StylizedMap />
          </Reveal>
        </div>

        {/* Closing CTA */}
        <Reveal delay={160} className="mt-20">
          <figure className="relative overflow-hidden rounded-[2rem] shadow-soft">
            <Img
              src={IMAGES.office}
              alt="The calm, sunlit interior of the Lumina Dental Studio reception and treatment space"
              containerClassName="aspect-[16/10] sm:aspect-[21/9]"
              className="transition-transform duration-700 hover:scale-[1.02]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/45 to-navy-900/10" />
            <figcaption className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-aqua-300">
                Your first visit awaits
              </p>
              <h3 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                Ready to love the dentist? So are we.
              </h3>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <Button href="#booking" size="lg">
                  Book your first visit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
                </Button>
                <Button href={CONTACT.phoneHref} size="lg" variant="glass">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {CONTACT.phone}
                </Button>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
