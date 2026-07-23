import { Wine as WineIcon, Grape, Sparkles } from "lucide-react";
import { IMG } from "../data/images";
import { Reveal, useParallax } from "../hooks/useReveal";

const PAIRINGS = [
  {
    icon: WineIcon,
    title: "The Classic Pairing",
    text: "Seven pours drawn from Burgundy, the Loire and the Jura — each chosen the same morning as the menu it accompanies.",
  },
  {
    icon: Grape,
    title: "The Rare Cellar",
    text: "Bottles that rarely leave the vault. Vintage Krug, old Chave Hermitage, and a 1989 d'Yquem poured by the thimble.",
  },
  {
    icon: Sparkles,
    title: "The Sans-Alcool",
    text: "House-made infusions, pressed juices and clarified teas, composed with the same gravity as the wines they stand beside.",
  },
];

export default function Wine() {
  const imgRef = useParallax<HTMLDivElement>(0.07);

  return (
    <section id="cellar" className="relative overflow-hidden py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* Image left this time — alternating asymmetry */}
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <div ref={imgRef}>
            <Reveal>
              <div className="img-frame aspect-[3/4] w-[86%] shadow-[var(--shadow-card)]">
                <img
                  src={IMG.winePourWhite}
                  alt="White wine poured into crystal against a dark background"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <Reveal delay={250} className="absolute -right-2 bottom-8 hidden w-[44%] md:block">
            <div className="img-frame aspect-square border border-charcoal shadow-[var(--shadow-card)]">
              <img
                src={IMG.wineGlasses}
                alt="Crystal glasses in a dimly lit restaurant"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Text right */}
        <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow mb-8">The Cellar</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] text-ivory">
              Twelve metres
              <br />
              below the <em className="italic text-gold-soft">street</em>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-[0.9375rem] font-light leading-8 text-ivory-dim">
              Beneath the dining room, 14,000 bottles rest in seventeenth-century
              stone. Sommelier Théo Lenoir walks the racks each afternoon,
              matching the cellar's memory to the evening's menu.
            </p>
          </Reveal>

          <div className="mt-12 space-y-8">
            {PAIRINGS.map((p, i) => (
              <Reveal key={p.title} delay={320 + i * 130}>
                <div className="group flex gap-5">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 text-gold transition-all duration-500 group-hover:border-gold/60 group-hover:shadow-[var(--shadow-glow)]">
                    <p.icon size={18} strokeWidth={1.25} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-ivory">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-light leading-7 text-ivory-faint">
                      {p.text}
                    </p>
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
