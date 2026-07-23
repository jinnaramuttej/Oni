import { ExternalLink, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const projects = [
  {
    title: "Nova Platform",
    category: "SaaS Platform",
    description:
      "A powerful analytics dashboard that processes millions of data points in real-time. Designed and built the entire front-end from scratch.",
    tech: ["React", "TypeScript", "Tailwind", "D3.js"],
    gradient: "from-subtle-blue/5 to-muted-purple/5",
    accent: "bg-subtle-blue",
    accentLight: "bg-subtle-blue/10",
  },
  {
    title: "Meridian Design System",
    category: "Design System",
    description:
      "A comprehensive design system with 80+ components, serving 12 product teams across the organization with consistent UX.",
    tech: ["React", "Storybook", "Figma", "CSS"],
    gradient: "from-muted-purple/5 to-subtle-blue/5",
    accent: "bg-muted-purple",
    accentLight: "bg-muted-purple/10",
  },
  {
    title: "Drift E-Commerce",
    category: "E-Commerce",
    description:
      "A premium e-commerce experience with 3D product previews, seamless checkout flow, and personalized recommendations engine.",
    tech: ["Next.js", "Three.js", "Stripe", "Prisma"],
    gradient: "from-emerald-400/5 to-subtle-blue/5",
    accent: "bg-emerald-500",
    accentLight: "bg-emerald-500/10",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
                Featured Work
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
                Selected projects
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-3 max-w-md text-base text-slate-custom/70">
                A curated selection of recent work — each project represents a
                unique challenge and a meaningful outcome.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-[18px] border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-matte-black shadow-premium-sm transition-all duration-300 hover:border-gray-300 hover:shadow-premium-md hover:-translate-y-0.5"
            >
              Let&apos;s work together
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        {/* Project Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={100 + i * 100}>
              <article className="group relative flex h-full flex-col rounded-[20px] border border-gray-100 bg-white shadow-premium-card transition-all duration-500 hover:shadow-premium-card-hover hover:-translate-y-1">
                {/* Preview Area */}
                <div className={`relative h-52 overflow-hidden rounded-[20px] rounded-b-none bg-gradient-to-br ${project.gradient}`}>
                  {/* Abstract project illustration */}
                  <div className="flex h-full w-full items-center justify-center p-8">
                    <div className="relative h-full w-full">
                      {/* Abstract geometric representation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`h-24 w-24 rounded-3xl ${project.accentLight} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`} />
                        <div className={`absolute h-16 w-16 -translate-x-8 -translate-y-6 rounded-2xl ${project.accentLight} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3`} />
                        <div className={`absolute h-12 w-12 translate-x-8 translate-y-6 rounded-xl ${project.accentLight} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`} />
                      </div>
                      {/* Floating label */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 backdrop-blur-sm">
                        <div className={`h-2 w-2 rounded-full ${project.accent}`} />
                        <span className="text-xs font-medium text-slate-custom/70">{project.category}</span>
                      </div>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-matte-black/0 transition-all duration-500 group-hover:bg-matte-black/40">
                    <span className="flex h-10 w-10 scale-0 items-center justify-center rounded-full bg-white shadow-premium-lg transition-all duration-500 group-hover:scale-100">
                      <ExternalLink className="h-4 w-4 text-matte-black" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${project.accent}`} />
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-custom/60">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-matte-black transition-colors duration-300 group-hover:text-slate-custom/70">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-custom/70">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-light-gray px-2.5 py-1 text-[11px] font-medium text-slate-custom/70 transition-colors duration-300 group-hover:bg-gray-200/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-matte-black/60 transition-all duration-300 group-hover:text-matte-black">
                    <span>View case study</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Subtle border hover */}
                <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-black/5 ring-inset transition-all duration-500 group-hover:ring-black/10" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
