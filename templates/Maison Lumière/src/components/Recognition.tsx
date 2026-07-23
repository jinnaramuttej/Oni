import { Star } from "lucide-react";
import { Reveal } from "../hooks/useReveal";

const HONOURS = [
  { year: "2004 — Present", title: "Two Michelin Stars", body: "Held without interruption for two decades." },
  { year: "2023", title: "World's 50 Best · No. 11", body: "Highest entry for a Parisian house that year." },
  { year: "2022", title: "Grand Prix de l'Art de la Table", body: "For the Kaneko ceramic collaboration." },
  { year: "2019", title: "Gault & Millau · 19/20", body: "Five toques — Chef of the Year, Élise Marchand." },
];

export default function Recognition() {
  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <Reveal>
            <div className="mb-8 flex items-center justify-center gap-3 text-gold">
              <Star size={16} strokeWidth={1.25} fill="currentColor" />
              <Star size={16} strokeWidth={1.25} fill="currentColor" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-ivory">
              Quietly <em className="italic text-gold-soft">recognised</em>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {HONOURS.map((h, i) => (
            <Reveal key={h.title} delay={i * 120}>
              <div className="lux-card h-full p-8">
                <p className="text-[0.625rem] uppercase tracking-[0.32em] text-gold">
                  {h.year}
                </p>
                <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-ivory">
                  {h.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-7 text-ivory-faint">
                  {h.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
