import Reveal from "./Reveal";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Senior Product Designer",
    company: "Stripe",
    period: "2022 — Present",
    desc: "Leading design for the payment infrastructure team. Shipping interfaces that handle billions in transaction volume.",
    tags: ["Design Systems", "UX", "React"],
  },
  {
    role: "Lead Front-End Developer",
    company: "Vercel",
    period: "2020 — 2022",
    desc: "Built and maintained developer tooling and marketing sites. Contributed to open-source projects and design system.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    role: "Product Designer & Developer",
    company: "Independent",
    period: "2017 — 2020",
    desc: "Full-service freelance practice serving 30+ clients across fintech, health, e-commerce, and SaaS.",
    tags: ["UI/UX", "Full-Stack", "Consulting"],
  },
  {
    role: "Junior Developer",
    company: "Thoughtbot",
    period: "2015 — 2017",
    desc: "Built web applications for agency clients using modern JavaScript frameworks and Rails.",
    tags: ["Ruby on Rails", "React", "PostgreSQL"],
  },
];

export default function Experience() {
  return (
    <section className="relative border-t border-gray-100 px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
                Experience
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
                Where I&apos;ve worked
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p className="max-w-md text-base text-slate-custom/70 lg:text-right">
              A career shaped by startups, design studios, and big tech —
              always focused on craft and impact.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role + exp.company} delay={80 + i * 80}>
              <div className="group relative flex flex-col gap-4 border-b border-gray-100 py-8 last:border-b-0 lg:flex-row lg:items-start lg:gap-12">
                {/* Timeline dot */}
                <div className="absolute -left-3 top-10 hidden h-2 w-2 rounded-full bg-gray-300 transition-all duration-300 group-hover:bg-matte-black lg:block" />

                {/* Period */}
                <div className="flex-shrink-0 lg:w-40">
                  <span className="text-sm font-medium text-slate-custom/50">
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 lg:pl-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                    <h3 className="text-lg font-semibold text-matte-black transition-colors duration-300 group-hover:text-slate-custom/70">
                      {exp.role}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-custom/50">
                      <Briefcase className="h-3.5 w-3.5" />
                      {exp.company}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-custom/70">
                    {exp.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-light-gray px-2.5 py-1 text-[11px] font-medium text-slate-custom/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
