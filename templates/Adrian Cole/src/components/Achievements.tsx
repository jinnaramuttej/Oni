import { ArrowUpRight } from "lucide-react";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const metrics = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "+", label: "Clients worldwide" },
  { value: 14, suffix: "", label: "International awards" },
  { value: 12, suffix: "k+", label: "GitHub stars on OSS" },
];

const awards = [
  { year: "2025", award: "Awwwards — Site of the Day ×2", project: "Scribe AI" },
  { year: "2024", award: "CSS Design Awards — Best UI Design", project: "Atelier Nord" },
  { year: "2024", award: "FWA — FWA of the Day", project: "Pulse Banking" },
  { year: "2023", award: "Webby Awards — Honoree, Financial Services", project: "Vantage Trading" },
];

export function Achievements() {
  return (
    <section aria-labelledby="achievements-heading" className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      {/* Ambient layers */}
      <div
        className="bg-grid-pattern-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <span id="achievements-heading" className="sr-only">
          Selected achievements
        </span>
        <SectionHeading
          dark
          index="07"
          eyebrow="Recognition"
          title="Work that gets noticed."
          description="Numbers first, trophies second — but both earned by shipping things that matter."
        />

        {/* Counters */}
        <dl className="mt-16 grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 100}>
              <div className={i > 0 ? "flex flex-col lg:border-l lg:border-white/10 lg:pl-10" : "flex flex-col"}>
                <dd className="font-display text-5xl font-semibold tracking-tight text-paper md:text-6xl">
                  <Counter end={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="mt-3 text-sm font-medium text-slate-400">{metric.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>

        {/* Awards */}
        <Reveal delay={140}>
          <div className="mt-20 border-t border-white/10">
            <ol>
              {awards.map((item) => (
                <li key={`${item.year}-${item.project}`}>
                  <a
                    href="#contact"
                    className="group grid items-center gap-2 border-b border-white/10 px-2 py-6 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[90px_1fr_auto] md:gap-6 md:px-4"
                  >
                    <span className="text-sm font-medium tabular-nums text-slate-500">
                      {item.year}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:text-white md:text-xl">
                        {item.award}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-slate-500">
                        {item.project}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="hidden h-5 w-5 text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
