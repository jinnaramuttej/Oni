import { Accessibility, Component, Download, Gauge, MapPin, PenTool } from "lucide-react";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const values = [
  {
    icon: PenTool,
    title: "Design-driven engineering",
    text: "Every build starts in Figma — systems, spacing and states decided before a line of code.",
  },
  {
    icon: Gauge,
    title: "Performance as a feature",
    text: "Budgets for every page. I ship fast by default and measure it in production.",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    text: "WCAG AA+ is the floor, not the ceiling. Great products work for everyone.",
  },
  {
    icon: Component,
    title: "Systems thinking",
    text: "Tokens, components and docs that keep your product consistent as it scales.",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "+", label: "Happy clients" },
  { value: 98, suffix: "%", label: "Client retention" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Sticky heading rail */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="01"
                eyebrow="About"
                title="Engineer by training, designer by instinct."
              />
              <Reveal delay={260}>
                <a
                  href="#contact"
                  className="group mt-9 inline-flex items-center gap-2.5 rounded-btn border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download résumé
                </a>
              </Reveal>
            </div>
          </div>

          {/* Story + values + stats */}
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-ink md:text-[1.7rem]">
                For the past decade I&apos;ve helped founders and product teams turn ambitious ideas
                into software that is fast, accessible and quietly beautiful.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8 text-[15px] leading-relaxed text-slate-600 md:grid-cols-2">
              <Reveal delay={100}>
                <p>
                  I work across the whole product lifecycle — strategy, UX, interface design and
                  production front-end — which means fewer handoffs, faster iteration and a single
                  point of accountability for quality. My sweet spot is the 0 → 1 phase: taking a
                  rough idea to a polished product users can trust.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p>
                  Clients describe me as calm, direct and relentless about detail. I write
                  documentation people actually read, give honest estimates, and treat your budget
                  like my own. Off the clock you&apos;ll find me cycling Brandenburg&apos;s back
                  roads or shooting film photography.
                </p>
              </Reveal>
            </div>

            {/* Values */}
            <ul className="mt-14 grid gap-4 sm:grid-cols-2">
              {values.map((value, i) => (
                <Reveal key={value.title} delay={i * 90}>
                  <li className="group flex h-full items-start gap-4 rounded-card border border-ink/[0.06] bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/15 hover:shadow-soft">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/[0.05] text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <value.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{value.title}</span>
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-slate-500">
                        {value.text}
                      </span>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            {/* Stats */}
            <Reveal delay={150}>
              <dl className="mt-14 grid grid-cols-2 gap-y-10 border-y border-ink/[0.08] py-10 md:grid-cols-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={
                      i > 0 ? "flex flex-col md:border-l md:border-ink/[0.08] md:pl-8" : "flex flex-col"
                    }
                  >
                    <dt className="order-2 mt-2 block text-sm font-medium text-slate-500">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-4xl font-semibold tracking-tight text-ink">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Workspace photograph */}
        <Reveal delay={120}>
          <figure className="group relative mt-20 overflow-hidden rounded-[28px] shadow-soft ring-1 ring-ink/[0.06]">
            <img
              src="/images/workspace.jpg"
              alt="Adrian's studio workspace in Kreuzberg, Berlin"
              loading="lazy"
              width={1600}
              height={720}
              className="aspect-[21/9] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-60"
              aria-hidden="true"
            />
            <figcaption className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-ink/40 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-md">
              <MapPin className="h-3.5 w-3.5" />
              The studio — Kreuzberg, Berlin
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
