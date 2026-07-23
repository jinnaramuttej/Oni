import { Reveal } from "../hooks/useReveal";

const COURSES = [
  { name: "Oyster, Green Apple & Frozen Gin", detail: "Gillardeau No. 2 · granité of juniper" },
  { name: "Celeriac Baked in Salt Crust", detail: "black truffle · aged comté emulsion" },
  { name: "Langoustine, Sea Foam & Fennel Pollen", detail: "signature since 2004" },
  { name: "Line-Caught Turbot, Champagne Beurre Blanc", detail: "sea lettuce · caviar oscietra" },
  { name: "Quail Roasted over Vine Cuttings", detail: "aged honey glaze · carved tableside" },
  { name: "Comté, Thirty-Six Months", detail: "walnut bread warm from the oven" },
  { name: "Honeycomb, Chamomile & Burnt Cream", detail: "from the rooftop hives" },
  { name: "Mignardises by Candlelight", detail: "to close the evening" },
];

export default function TastingMenu() {
  return (
    <section id="menu" className="relative overflow-hidden bg-coal py-28 lg:py-40">
      {/* faint radial candle glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[64rem] -translate-x-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(200,162,76,0.14), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-8">Winter · Menu Dégustation</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] text-ivory">
            The Season, in
            <br />
            <em className="italic text-gold-soft">Eight Courses</em>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-8 max-w-xl text-[0.9375rem] font-light leading-8 text-ivory-dim">
            Written each morning, printed on cotton paper, retired at midnight.
            Served to the entire table, three hours in the keeping.
          </p>
        </Reveal>

        <div className="mt-16 space-y-0">
          {COURSES.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <div className="group border-b border-ivory/[0.06] py-7 first:border-t transition-colors duration-500 hover:border-gold/20">
                <div className="flex items-baseline justify-center gap-4">
                  <h3 className="font-serif text-xl font-medium text-ivory transition-colors duration-500 group-hover:text-gold-soft md:text-2xl">
                    {c.name}
                  </h3>
                </div>
                <p className="mt-2 text-[0.75rem] font-light uppercase tracking-[0.24em] text-ivory-faint">
                  {c.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center gap-6">
            <p className="text-sm font-light text-ivory-dim">
              Eight courses · 290 &nbsp;|&nbsp; Wine pairing · 165 &nbsp;|&nbsp;
              Rare cellar pairing · 340
            </p>
            <a href="#reserve" className="btn-ghost">
              Request the Full Menu
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
