import Reveal from "./Reveal";
import { Code2, Palette, Globe } from "lucide-react";

const highlights = [
  {
    icon: Palette,
    label: "Design",
    desc: "UI/UX, visual design, design systems",
  },
  {
    icon: Code2,
    label: "Development",
    desc: "React, Next.js, Tailwind, TypeScript",
  },
  {
    icon: Globe,
    label: "Strategy",
    desc: "Product thinking, user research, growth",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-gray-100 bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Info */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
                About Me
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
                Design-minded developer
                <br />
                <span className="text-gradient">with product intuition</span>
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-custom/80">
                <p>
                  With over 8 years of experience, I bridge the gap between
                  design and engineering. I&apos;ve helped startups raise funding,
                  enterprises scale their platforms, and agencies deliver
                  award-winning work.
                </p>
                <p>
                  My approach combines meticulous craftsmanship with pragmatic
                  product thinking. I don&apos;t just build interfaces — I solve
                  problems, reduce complexity, and create systems that endure.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Product Design", "Front-End", "Design Systems", "UX Strategy"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-slate-custom/70 shadow-premium-sm transition-all duration-300 hover:border-gray-300 hover:shadow-premium-md"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </Reveal>
          </div>

          {/* Right - Highlights */}
          <div className="flex flex-col justify-center">
            <Reveal delay={200}>
              <div className="grid gap-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="group flex items-start gap-5 rounded-[20px] border border-gray-100 bg-off-white p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-premium-card-hover hover:-translate-y-0.5"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-premium-sm transition-all duration-300 group-hover:shadow-premium-md">
                        <Icon className="h-5 w-5 text-matte-black" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-matte-black">
                          {item.label}
                        </h3>
                        <p className="mt-1 text-sm text-slate-custom/70">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex items-center gap-8 rounded-2xl bg-light-gray/60 px-6 py-5">
                <div className="text-center">
                  <span className="text-2xl font-bold text-matte-black">8+</span>
                  <p className="text-xs text-slate-custom/60 mt-0.5">Years Exp.</p>
                </div>
                <div className="h-10 w-[1px] bg-gray-200" />
                <div className="text-center">
                  <span className="text-2xl font-bold text-matte-black">50+</span>
                  <p className="text-xs text-slate-custom/60 mt-0.5">Clients</p>
                </div>
                <div className="h-10 w-[1px] bg-gray-200" />
                <div className="text-center">
                  <span className="text-2xl font-bold text-matte-black">120+</span>
                  <p className="text-xs text-slate-custom/60 mt-0.5">Projects</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
