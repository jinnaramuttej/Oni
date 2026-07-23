import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import Reveal from "./Reveal";

export default function FeaturedWork() {
  return (
    <section id="work" className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
              <span className="h-px w-10 bg-mist/60" />
              Selected Work
            </p>
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
              Featured
              <br />
              Projects.
            </h2>
          </div>
          <p className="max-w-sm text-balance text-base leading-relaxed text-mist">
            A curated collection of work spanning brand systems, product design,
            motion, and immersive digital experiences.
          </p>
        </Reveal>

        <div className="mt-4">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} isLast={i === projects.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  isLast,
}: {
  project: (typeof projects)[number];
  isLast: boolean;
}) {
  return (
    <Reveal>
      <a
        href="#contact"
        className={`group relative grid grid-cols-1 gap-8 border-b ${
          isLast ? "" : "border-white/10"
        } py-12 md:grid-cols-12 md:gap-6 md:py-16`}
      >
        <div className="flex items-start gap-5 md:col-span-4 md:flex-col md:justify-between md:gap-0">
          <span className="font-display text-sm font-medium text-mist/70">
            {project.index}
          </span>
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-paper transition-colors duration-500 group-hover:text-violet-light sm:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-xs text-balance text-sm leading-relaxed text-mist md:text-base">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-mist"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm text-mist md:mt-8 md:flex">
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-mist/50" />
            <span>{project.year}</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl md:col-span-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-charcoal sm:aspect-[16/9]">
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              className="h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-60 transition-opacity duration-500 group-hover:opacity-30" />

            <div className="absolute inset-0 flex items-end justify-between p-6 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:p-8">
              <span className="flex items-center gap-3 text-sm font-medium text-paper md:hidden">
                {project.category} — {project.year}
              </span>
              <span className="ml-auto inline-flex h-14 w-14 translate-y-2 items-center justify-center rounded-full bg-paper text-ink shadow-lg transition-transform duration-500 group-hover:translate-y-0">
                <ArrowUpRight size={22} />
              </span>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}
