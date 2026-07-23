import { ArrowUpRight, Car, Clock, Mail, MapPin, Phone, Scissors, TrainFront } from "lucide-react";
import { CONTACT, HOURS, IMG, NAV_LINKS } from "../data";
import { CONTAINER, Grain, Kicker, Reveal, Section } from "./ui";

/* -------------------------------- VISIT -------------------------------- */
export function Visit() {
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;

  return (
    <Section id="visit" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <Grain opacity={0.04} />
      <div className={`${CONTAINER} relative z-[2]`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* image */}
          <div className="relative lg:col-span-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[20px] border border-bone/[0.08]">
                <img
                  src={IMG.visit}
                  alt="Inside the Vanguard lounge — leather chairs, warm light, walnut counters"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover img-duotone transition-transform duration-[1.8s] ease-out hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-[14px] border border-bone/15 bg-ink/70 px-5 py-3.5 backdrop-blur-md">
                  <MapPin size={16} strokeWidth={1.6} className="flex-none text-brass" />
                  <div className="leading-tight">
                    <p className="font-display text-[13.5px] font-medium uppercase tracking-[0.14em] text-bone">
                      {CONTACT.address}
                    </p>
                    <p className="mt-0.5 text-[10.5px] tracking-[0.2em] text-steel">
                      {CONTACT.area}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* info */}
          <div className="lg:col-span-6">
            <Reveal>
              <Kicker index="12" label="Visit the Lounge" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-tight text-bone sm:text-5xl">
                The door on
                <span className="font-editorial font-medium lowercase italic tracking-normal text-brass">
                  {" "}
                  Halsted.
                </span>
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {/* hours */}
              <Reveal delay={0.15}>
                <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">
                  <Clock size={14} strokeWidth={1.6} /> Opening Hours
                </p>
                <ul className="mt-5 space-y-0">
                  {HOURS.map((h, i) => (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between border-b border-bone/[0.07] py-2.5 text-[13px] ${
                        i === todayIdx ? "text-brass" : "text-bone/55"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {h.day}
                        {i === todayIdx && (
                          <span className="rounded-full bg-brass/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-brass">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={h.closed ? "text-steel" : "font-medium text-bone/75"}>
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* contact + getting here */}
              <Reveal delay={0.22}>
                <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">
                  <Phone size={14} strokeWidth={1.6} /> Reach the Counter
                </p>
                <div className="mt-5 space-y-4">
                  <a href={`tel:${CONTACT.phone}`} className="block font-display text-xl font-medium tracking-wide text-bone transition-colors hover:text-brass">
                    {CONTACT.phone}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-[13.5px] text-bone/60 transition-colors hover:text-brass">
                    <Mail size={14} className="text-brass" strokeWidth={1.6} />
                    {CONTACT.email}
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {[
                    { icon: Car, t: "Street + rear lot parking" },
                    { icon: TrainFront, t: "Blue Line · 4 min walk" },
                    { icon: Clock, t: "Walk-ins daily" },
                  ].map((c) => (
                    <span
                      key={c.t}
                      className="inline-flex items-center gap-2 rounded-full border border-bone/10 bg-coal px-4 py-2 text-[11px] font-medium tracking-wide text-bone/60"
                    >
                      <c.icon size={13} strokeWidth={1.6} className="text-brass" />
                      {c.t}
                    </span>
                  ))}
                </div>

                <SectionHeadless />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SectionHeadless() {
  return (
    <a
      href="https://maps.google.com/?q=214+N+Halsted+St+Chicago+IL"
      target="_blank"
      rel="noreferrer"
      className="group mt-8 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-brass"
    >
      <span className="relative">
        Get directions
        <span className="absolute -bottom-1.5 left-0 h-px w-full bg-brass/50 transition-transform duration-500 group-hover:scale-x-100" />
      </span>
    </a>
  );
}

/* -------------------------------- FOOTER ------------------------------- */
const FOOT_SERVICES = ["Precision Cut", "Skin Fade", "Royal Shave", "Beard Sculpt", "The Executive"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/[0.07] bg-ink">
      <Grain opacity={0.04} />
      {/* giant wordmark */}
      <div className="relative z-[1] select-none pt-14 text-center" aria-hidden>
        <span className="text-stroke font-display text-[clamp(4rem,14.5vw,13rem)] font-bold uppercase leading-[0.9] tracking-[0.08em]">
          Vanguard
        </span>
      </div>

      <div className={`${CONTAINER} relative z-[2] pb-10 pt-14`}>
        <div className="grid gap-12 border-t border-bone/[0.08] pt-14 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-brass/50 bg-brass/[0.06]">
                <Scissors size={15} className="text-brass" strokeWidth={1.6} />
              </span>
              <span className="font-display text-base font-semibold uppercase tracking-[0.22em] text-bone">
                Vanguard
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-bone/45">
              A gentlemen's grooming lounge in Chicago's West Loop. Craft, precision and
              an unrushed hour — since 1997.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Instagram", "Facebook", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#top"
                  aria-label={s}
                  className="group inline-flex items-center gap-1.5 rounded-[12px] border border-bone/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass/50 hover:text-brass"
                >
                  {s}
                  <ArrowUpRight size={12} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>

          {/* navigate */}
          <nav aria-label="Footer">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[13.5px] text-bone/50 transition-colors hover:text-brass">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">The Chair Menu</p>
            <ul className="mt-5 space-y-3">
              {FOOT_SERVICES.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-[13.5px] text-bone/50 transition-colors hover:text-brass">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">The Counter</p>
            <ul className="mt-5 space-y-3.5 text-[13.5px] text-bone/50">
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.6} className="mt-0.5 flex-none text-brass" />
                <span>
                  {CONTACT.address}
                  <br />
                  {CONTACT.area}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.6} className="flex-none text-brass" />
                {CONTACT.phone}
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} strokeWidth={1.6} className="flex-none text-brass" />
                {CONTACT.email}
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} strokeWidth={1.6} className="flex-none text-brass" />
                Mon–Sat · Sun closed
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-bone/[0.08] pt-8 sm:flex-row">
          <p className="text-[11px] tracking-[0.18em] text-bone/35">
            © 2026 VANGUARD BARBER CO. · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-7">
            <a href="#top" className="text-[10.5px] uppercase tracking-[0.24em] text-bone/35 transition-colors hover:text-brass">
              Privacy
            </a>
            <a href="#top" className="text-[10.5px] uppercase tracking-[0.24em] text-bone/35 transition-colors hover:text-brass">
              Terms
            </a>
            <span className="font-editorial text-sm italic text-brass/70">
              Crafted, not rushed.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
