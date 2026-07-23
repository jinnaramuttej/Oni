import { IMG } from "../data/images";
import { Reveal } from "../hooks/useReveal";

const DISHES = [
  {
    img: IMG.dishSeafood,
    no: "I",
    name: "Langoustine, Sea Foam & Fennel Pollen",
    note: "Raw Brittany langoustine beneath a veil of citrus air, finished with oil pressed from last summer's fennel flowers.",
    tall: false,
  },
  {
    img: IMG.dishQuail,
    no: "II",
    name: "Quail Roasted over Vine Cuttings",
    note: "Glazed in its own jus and aged honey, rested in beeswax, carved at the table.",
    tall: true,
  },
  {
    img: IMG.dishEggs,
    no: "III",
    name: "Hen Egg, Smoked Cream & Caviar",
    note: "A sixty-three-degree yolk suspended in smoked crème fraîche, crowned with golden osetra.",
    tall: true,
  },
  {
    img: IMG.dishDessert,
    no: "IV",
    name: "Honeycomb, Chamomile & Burnt Cream",
    note: "Raw comb from our rooftop hives with frozen chamomile milk and a shard of caramelised cream.",
    tall: false,
  },
];

export default function Dishes() {
  return (
    <section id="cuisine" className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Editorial header */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-8">The Cuisine</p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] text-ivory">
                Four movements,
                <br />
                hung like <em className="italic text-gold-soft">canvases</em>
              </h2>
            </Reveal>
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={260}>
              <p className="text-[0.9375rem] font-light leading-8 text-ivory-dim">
                Signatures that survive every season's rewrite. Each is plated
                on ceramics thrown for the house by atelier Kaneko, Kyoto.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {DISHES.map((d, i) => (
            <Reveal key={d.no} delay={i * 120}>
              <figure className="group">
                <div
                  className={`img-frame relative ${
                    d.tall ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-40" />
                  <span className="absolute left-6 top-6 font-serif text-xl italic text-gold/80">
                    {d.no}
                  </span>
                </div>
                <figcaption className="px-1 pt-6">
                  <h3 className="font-serif text-2xl font-medium text-ivory">
                    {d.name}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm font-light leading-7 text-ivory-faint">
                    {d.note}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
