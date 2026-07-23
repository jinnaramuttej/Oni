import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS, CITIES, img } from "../data";
import { CONTAINER, Diamond, Reveal, SectionHead } from "./ui";

/* ————————————————— Collections (property categories) ————————————————— */
export function Collections() {
  return (
    <section id="collections" aria-label="Property collections" className="bg-mist py-24 md:py-36">
      <div className={CONTAINER}>
        <SectionHead
          center
          overline="Curated Collections"
          title={
            <>
              Find your <em className="font-normal italic text-gold-deep">way of living</em>
            </>
          }
          copy="Four collections, one standard: the exceptional. Browse by the life you intend to live — not merely the walls around it."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.n} delay={i * 110}>
              <a
                href="#properties"
                className="group relative block overflow-hidden rounded-[20px] shadow-soft aspect-[3/4] transition-shadow duration-700 hover:shadow-lift"
                aria-label={`${c.name} — ${c.count} residences`}
              >
                <img
                  src={img(c.photo, 900, 1200)}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10 transition-opacity duration-700 group-hover:from-forest-deep/90"
                />
                <span className="absolute right-5 top-5 rounded-full border border-ivory/25 bg-ink/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ivory backdrop-blur-md">
                  {c.count} residences
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="font-serif text-sm italic text-gold">{c.n}</p>
                    <h3 className="mt-1 font-serif text-[26px] font-medium leading-tight text-ivory">{c.name}</h3>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ivory/30 text-ivory transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <ArrowUpRight size={16} strokeWidth={1.8} className="transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————— City ticker ————————————————— */
export function CityTicker() {
  const row = [...CITIES, ...CITIES];
  return (
    <div className="marquee overflow-hidden border-y border-gold/25 bg-forest py-5" aria-hidden>
      <div className="marquee-track flex w-max items-center">
        {row.map((city, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-serif text-xl font-medium italic tracking-wide text-ivory/85">{city}</span>
            <Diamond />
          </span>
        ))}
      </div>
    </div>
  );
}
