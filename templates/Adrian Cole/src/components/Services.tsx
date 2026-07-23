import { Check, Code2, Compass, Component, PenTool } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const services = [
  {
    number: "01",
    icon: PenTool,
    title: "Product Design",
    description:
      "End-to-end UX/UI for web and mobile — research, flows and interfaces that convert.",
    deliverables: ["UX research & audits", "High-fidelity UI in Figma", "Interactive prototypes"],
    engagement: "2–6 weeks",
  },
  {
    number: "02",
    icon: Code2,
    title: "Front-End Development",
    description:
      "Production-grade React and TypeScript builds with obsessive attention to detail.",
    deliverables: ["React / Next.js apps", "CMS & e-commerce builds", "95+ Lighthouse scores"],
    engagement: "3–8 weeks",
  },
  {
    number: "03",
    icon: Component,
    title: "Design Systems",
    description:
      "Scalable component libraries and tokens that keep teams shipping consistently.",
    deliverables: ["Design tokens & theming", "Documented components", "Figma ↔ code sync"],
    engagement: "4–10 weeks",
  },
  {
    number: "04",
    icon: Compass,
    title: "Technical Consulting",
    description:
      "A senior sparring partner for architecture, performance and accessibility decisions.",
    deliverables: ["Code & UX audits", "Performance roadmaps", "Workshops & enablement"],
    engagement: "Ongoing",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-mist py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Services"
          title="How we can work together."
          description="Focused engagements with clear scope, honest pricing and a single senior point of contact — me."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={i * 100} className="h-full">
              <article className="group flex h-full flex-col rounded-card bg-white p-8 shadow-card ring-1 ring-ink/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tabular-nums text-slate-300 transition-colors duration-300 group-hover:text-accent">
                    {service.number}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.04] text-ink transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                    <service.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>

                <h3 className="mt-7 font-display text-xl font-semibold tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <p className="border-t border-ink/[0.06] pt-5 text-xs font-medium text-slate-400">
                    Typical engagement ·{" "}
                    <span className="font-semibold text-slate-600">{service.engagement}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
