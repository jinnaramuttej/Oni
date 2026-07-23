import Reveal from "./Reveal";

const STATS = [
  { value: "120+", label: "Projects delivered worldwide" },
  { value: "38", label: "International design awards" },
  { value: "12", label: "Years shaping bold brands" },
  { value: "94%", label: "Clients who return for more" },
];

export default function Philosophy() {
  return (
    <section id="studio" className="relative overflow-hidden bg-charcoal py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
              <span className="h-px w-10 bg-mist/60" />
              Studio Philosophy
            </p>
            <h2 className="font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              We believe design should make people{" "}
              <span className="text-mist">feel</span> something —
              not just look at something.
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 max-w-xl space-y-6 text-lg leading-relaxed text-mist">
            <p>
              Novum exists at the intersection of craft and courage. We reject the
              safe, the templated, and the forgettable — building instead for the
              brands willing to take a real stand.
            </p>
            <p>
              Every project begins with a single question: what would happen if
              we did this fearlessly? The answer shapes everything — from the
              first sketch to the final pixel.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-mist">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <Reveal delay={0.2} className="relative h-full min-h-[420px]">
            <div className="sticky top-32 overflow-hidden rounded-3xl">
              <img
                src="/images/philosophy-bg.jpg"
                alt="Abstract macro photography of rippling dark liquid with violet and blue light reflections"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-ink/60 p-5 backdrop-blur-md">
                <p className="font-display text-xl italic text-paper">
                  "Craft is the discipline. Fearlessness is the difference."
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-mist">
                  — Novum Founding Principle
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
