import Reveal from "./Reveal";
import { ArrowRight, PenTool, Code, Lightbulb, Component, Smartphone, Workflow } from "lucide-react";

const services = [
  {
    title: "Product Design",
    desc: "End-to-end product design from discovery and research to high-fidelity interfaces and interactive prototypes.",
    icon: PenTool,
    gradient: "from-subtle-blue/5 to-transparent",
  },
  {
    title: "Front-End Development",
    desc: "Production-ready code built with React, TypeScript, and modern CSS. Performance-obsessed and accessibility-first.",
    icon: Code,
    gradient: "from-muted-purple/5 to-transparent",
  },
  {
    title: "Design Systems",
    desc: "Scalable, documented component libraries that bring consistency and velocity to your product teams.",
    icon: Component,
    gradient: "from-emerald-400/5 to-transparent",
  },
  {
    title: "UX Consulting",
    desc: "Audits, user research, information architecture, and strategic recommendations to improve your product experience.",
    icon: Lightbulb,
    gradient: "from-amber-400/5 to-transparent",
  },
  {
    title: "Responsive Web",
    desc: "Mobile-first websites and web applications that work flawlessly across every screen size and device.",
    icon: Smartphone,
    gradient: "from-rose-400/5 to-transparent",
  },
  {
    title: "Code Review & Mentoring",
    desc: "Elevate your team's output with structured code reviews, pair programming, and front-end architecture guidance.",
    icon: Workflow,
    gradient: "from-cyan-400/5 to-transparent",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-gray-100 bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
                What I Do
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
                Services &amp; offerings
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p className="max-w-md text-base text-slate-custom/70 lg:text-right">
              From concept to deployment — I offer end-to-end services that
              bring digital products to life.
            </p>
          </Reveal>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={80 + i * 70}>
                <div className="group relative overflow-hidden rounded-[20px] border border-gray-100 bg-off-white p-7 transition-all duration-500 hover:border-gray-200 hover:shadow-premium-card-hover hover:-translate-y-1">
                  {/* Gradient background accent */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} aria-hidden="true" />

                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-premium-sm transition-all duration-300 group-hover:shadow-premium-md">
                      <Icon className="h-5 w-5 text-matte-black" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-matte-black">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-custom/70">
                      {service.desc}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-slate-custom/50 transition-all duration-300 group-hover:text-matte-black">
                      <span>Learn more</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-black/5 ring-inset" aria-hidden="true" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
