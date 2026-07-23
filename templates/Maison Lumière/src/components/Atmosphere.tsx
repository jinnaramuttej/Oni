import { IMG } from "../data/images";
import { Reveal } from "../hooks/useReveal";

const SHOTS = [
  {
    img: IMG.interiorNight,
    alt: "Candlelit fine dining table set for the evening",
    caption: "The dining room, 7 p.m.",
    span: "md:col-span-7",
    ratio: "aspect-[16/10]",
  },
  {
    img: IMG.interiorCandles,
    alt: "Candles and crystal glassware on a laid table",
    caption: "Crystal & candlewax",
    span: "md:col-span-5",
    ratio: "aspect-[16/10] md:aspect-auto md:h-full",
  },
  {
    img: IMG.interiorHall,
    alt: "The main hall of the restaurant with ambient lighting",
    caption: "The salon",
    span: "md:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    img: IMG.candleFlowers,
    alt: "Lilies and roses beside candlelight on a dining table",
    caption: "Fresh flowers, daily",
    span: "md:col-span-4",
    ratio: "aspect-[4/5]",
  },
  {
    img: IMG.interiorTables,
    alt: "Tables dressed for dinner at night",
    caption: "Twelve tables, no more",
    span: "md:col-span-4",
    ratio: "aspect-[4/5]",
  },
];

export default function Atmosphere() {
  return (
    <section id="house" className="bg-coal py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-8">The House</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] text-ivory">
                Lit only by
                <br />
                <em className="italic text-gold-soft">flame</em> and intention
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={260}>
              <p className="text-[0.9375rem] font-light leading-8 text-ivory-dim">
                A 1687 townhouse, restored over four years. Oak, marble,
                beeswax candles — and the quiet confidence of a room that has
                nothing to prove.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8">
          {SHOTS.map((s, i) => (
            <Reveal key={s.caption} delay={i * 100} className={s.span}>
              <figure className="group h-full">
                <div className={`img-frame relative h-full ${s.ratio}`}>
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-45" />
                  <figcaption className="absolute bottom-5 left-6 text-[0.6875rem] uppercase tracking-[0.32em] text-ivory/85">
                    {s.caption}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
