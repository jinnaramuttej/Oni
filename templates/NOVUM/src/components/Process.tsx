import Reveal from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your world — audience, market, ambition — to find the real opportunity.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Strategy sharpens into a single, unmistakable creative direction everyone can rally behind.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Concepts become tangible — brand systems, interfaces, and stories crafted with obsessive care.",
  },
  {
    number: "04",
    title: "Develop",
    description:
      "Engineering meets craft. We build performant, resilient products worthy of the design.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "We launch, measure, and refine — ensuring the work performs as beautifully as it looks.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-charcoal py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
            <span className="h-px w-10 bg-mist/60" />
            How We Work
          </p>
          <h2 className="font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            A process built for bold outcomes.
          </h2>
        </Reveal>

        <div className="relative mt-20 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="pointer-events-none absolute inset-x-0 top-8 hidden h-px bg-white/10 lg:block" aria-hidden />
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1} className="relative">
              <div className="flex flex-col gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-charcoal font-display text-lg font-semibold text-paper">
                  {step.number}
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-paper">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-mist">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
