import { MapPin, Phone, Train, Clock3 } from "lucide-react";
import { Reveal } from "../hooks/useReveal";

const DETAILS = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["11 Rue de Sèvres", "75006 Paris, France"],
  },
  {
    icon: Clock3,
    title: "Hours",
    lines: ["Tue – Sat · 19:00 — 23:30", "Closed Sundays & Mondays"],
  },
  {
    icon: Phone,
    title: "Telephone",
    lines: ["+33 1 45 44 00 00", "Concierge from 10:00"],
  },
  {
    icon: Train,
    title: "Arriving",
    lines: ["Métro Sèvres–Babylone (10, 12)", "Valet from 18:30"],
  },
];

export default function Location() {
  return (
    <section id="visit" className="bg-coal py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16">
          <Reveal>
            <p className="eyebrow mb-8">Finding Us</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display max-w-2xl text-[clamp(2.25rem,4.5vw,3.75rem)] text-ivory">
              Behind an unmarked door,
              <em className="italic text-gold-soft"> Rive Gauche</em>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Map */}
          <Reveal className="lg:col-span-8">
            <div className="lux-card overflow-hidden p-0">
              <div className="relative aspect-[16/9] w-full">
                <iframe
                  title="Maison Lumière — 11 Rue de Sèvres, Paris"
                  src="https://maps.google.com/maps?q=Rue%20de%20S%C3%A8vres%2011%2C%2075006%20Paris&z=16&output=embed"
                  loading="lazy"
                  className="map-dark absolute inset-0 h-full w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] shadow-[inset_0_0_60px_rgba(13,13,13,0.55)]" />
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-5">
            {DETAILS.map((d, i) => (
              <Reveal key={d.title} delay={120 + i * 110}>
                <div className="flex gap-5 rounded-2xl border border-ivory/[0.06] bg-onyx/60 p-6">
                  <d.icon
                    size={19}
                    strokeWidth={1.25}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  <div>
                    <h3 className="text-[0.6875rem] uppercase tracking-[0.3em] text-ivory">
                      {d.title}
                    </h3>
                    {d.lines.map((l) => (
                      <p
                        key={l}
                        className="mt-1.5 text-sm font-light leading-6 text-ivory-dim"
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
