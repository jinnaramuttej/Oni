import { ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const roles = [
  {
    period: "2021 — Present",
    role: "Senior Product Engineer & Consultant",
    company: "Independent",
    current: true,
    description:
      "Partnering with startups and scale-ups across fintech, health and AI — from zero-to-one products to design systems used by hundreds of engineers. 40+ engagements, all referral-driven.",
    highlights: ["40+ engagements", "100% referral-driven"],
  },
  {
    period: "2018 — 2021",
    role: "Lead Front-End Engineer",
    company: "Vantage",
    current: false,
    description:
      "Led a team of six building a retail trading platform serving 300k users. Introduced the design system from zero and cut time-to-interactive by 58% across the core app.",
    highlights: ["Team of 6", "−58% load time"],
  },
  {
    period: "2016 — 2018",
    role: "Product Designer & Developer",
    company: "Lumina Studio",
    current: false,
    description:
      "Shipped 20+ brand and product sites for European startups and cultural institutions — and collected my first international design awards along the way.",
    highlights: ["20+ launches", "2 design awards"],
  },
  {
    period: "2014 — 2016",
    role: "Front-End Developer",
    company: "Brightline Agency",
    current: false,
    description:
      "Cut my teeth building marketing sites and e-commerce storefronts under tight deadlines. Where I learned to sweat the details — and to love the web platform.",
    highlights: ["E-commerce & CMS", "Agile delivery"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-y border-ink/[0.06] bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Sticky heading rail */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="04"
                eyebrow="Experience"
                title="A decade of shipping."
                description="From agency trenches to leading product teams — and four years running an independent practice built entirely on referrals."
              />
              <Reveal delay={240}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
                >
                  Full résumé on LinkedIn
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-8">
            <ol>
              {roles.map((item, i) => (
                <Reveal key={item.role} delay={i * 80}>
                  <li
                    className={cn(
                      "group grid gap-x-8 gap-y-4 py-9 md:grid-cols-[170px_1fr_36px]",
                      i !== roles.length - 1 && "border-b border-ink/[0.07]",
                    )}
                  >
                    <div className="flex flex-col items-start gap-2 pt-1">
                      <span className="text-sm font-medium tabular-nums text-slate-500">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/10">
                          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
                          Current
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                        {item.role}
                        <span className="mx-2 font-normal text-slate-300">/</span>
                        <span className="text-accent">{item.company}</span>
                      </h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="rounded-full border border-ink/[0.08] px-3 py-1 text-xs font-medium text-slate-500"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ArrowUpRight
                      className="hidden h-5 w-5 self-start pt-1 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
                      aria-hidden="true"
                    />
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
