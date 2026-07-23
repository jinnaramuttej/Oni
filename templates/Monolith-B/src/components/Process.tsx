const steps = [
  {
    n: "01",
    title: "Immersion",
    weeks: "Week 1–2",
    body:
      "We embed with your team, read everything, and spend time with the people who use what you make. No decks yet.",
  },
  {
    n: "02",
    title: "Direction",
    weeks: "Week 3–4",
    body:
      "Three sharp creative territories, each a complete world — not moodboards, but living prototypes you can react to.",
  },
  {
    n: "03",
    title: "Craft",
    weeks: "Week 5–10",
    body:
      "The chosen direction is built out with the same team from day one. Weekly reviews. No account managers between us.",
  },
  {
    n: "04",
    title: "Launch & After",
    weeks: "Week 11 →",
    body:
      "We ship, then stay. A twelve-month care partnership so the work keeps compounding long after go-live.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative border-t border-white/10 bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                <span className="h-px w-10 bg-[#A3A3A3]" />
                [ 06 ] Process
              </div>
              <h2 className="mt-6 font-display text-[11vw] leading-[0.9] tracking-tight md:text-[5.5vw]">
                A method
                <br />
                <em className="italic">without</em>
                <br />
                a template.
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-white/70">
                Every engagement is a bespoke build — but the underlying
                rhythm is always the same four movements.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <ol className="space-y-6">
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]/60 p-8 transition-all hover:border-white/25 md:p-10"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* accent */}
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(198,255,61,0.08),transparent_70%)]" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6FF3D]">
                      Step {s.n}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#A3A3A3]">
                      {s.weeks}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-5xl leading-none tracking-tight md:text-6xl">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
                    {s.body}
                  </p>
                  <div className="mt-8 h-px w-full bg-white/10">
                    <div
                      className="h-px bg-[#C6FF3D] transition-all duration-1000 group-hover:w-full"
                      style={{ width: `${(i + 1) * 25}%` }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
