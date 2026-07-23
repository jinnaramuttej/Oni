import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "../utils/cn";
import { chip } from "../utils/classes";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  metric: string;
  image: string;
  alt: string;
  span: string;
}

const projects: Project[] = [
  {
    title: "Nova Analytics",
    category: "SaaS Platform",
    year: "2025",
    description:
      "A real-time analytics platform for e-commerce teams — turning millions of raw events into decisions in seconds, with a dark-mode UI engineers actually enjoy.",
    tech: ["React", "TypeScript", "D3.js", "Node.js"],
    metric: "+34% activation",
    image: "/images/project-dashboard.jpg",
    alt: "Nova Analytics dark-mode SaaS dashboard interface",
    span: "lg:col-span-7",
  },
  {
    title: "Pulse Banking",
    category: "Fintech · Mobile",
    year: "2025",
    description:
      "A challenger-bank app re-designed and rebuilt from scratch — instant payments, spending insights and a card experience that feels physical.",
    tech: ["React Native", "GraphQL", "Plaid API"],
    metric: "4.9★ App Store",
    image: "/images/project-fintech.jpg",
    alt: "Pulse Banking fintech mobile app on two floating phones",
    span: "lg:col-span-5",
  },
  {
    title: "Atelier Nord",
    category: "E-Commerce",
    year: "2024",
    description:
      "A headless storefront for a Scandinavian fashion label — editorial storytelling meets a checkout flow tuned down to the millisecond.",
    tech: ["Next.js", "Shopify", "Sanity", "GSAP"],
    metric: "+52% conversion",
    image: "/images/project-commerce.jpg",
    alt: "Atelier Nord minimal e-commerce website on a laptop",
    span: "lg:col-span-5",
  },
  {
    title: "Scribe AI",
    category: "AI · Web App",
    year: "2024",
    description:
      "An AI-assisted writing platform for product teams — from blank page to published docs, with drafts, reviews and model controls built in.",
    tech: ["Next.js", "OpenAI", "Postgres", "Tailwind"],
    metric: "120k users · 6 months",
    image: "/images/project-ai.jpg",
    alt: "Scribe AI writing assistant interface in a browser window",
    span: "lg:col-span-7",
  },
  {
    title: "Mendo Health",
    category: "HealthTech",
    year: "2023",
    description:
      "A HIPAA-compliant telehealth platform connecting 2,400 clinicians with patients — scheduling, video visits and e-prescriptions in one calm interface.",
    tech: ["React", "WebRTC", "Node.js", "HIPAA"],
    metric: "−41% no-shows",
    image: "/images/project-health.jpg",
    alt: "Mendo Health appointment booking interface on a tablet",
    span: "lg:col-span-7",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-ink/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-lift",
        project.span,
      )}
    >
      {/* Framed preview */}
      <div className="p-2.5 pb-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-mist">
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            width={960}
            height={600}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.02]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
          {/* Outcome metric chip */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/85 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-soft backdrop-blur-md">
            <TrendingUp className="h-3.5 w-3.5 text-accent" />
            {project.metric}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-7 pt-6 md:p-8 md:pt-6">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span className="text-accent">{project.category}</span>
          <span className="h-px w-6 bg-ink/15" aria-hidden="true" />
          <span className="tabular-nums text-slate-400">{project.year}</span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-[1.65rem]">
          {project.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className={chip}>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/[0.06] pt-5 mt-7">
          <a
            href="#contact"
            className="group/link inline-flex items-center gap-2.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
            aria-label={`View the ${project.title} case study`}
          >
            View case study
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 transition-all duration-300 group-hover/link:border-accent group-hover/link:bg-accent group-hover/link:text-white">
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
            </span>
          </a>
          <span className="text-xs font-medium text-slate-400">Design + Build</span>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 bg-mist py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          title="Projects that shipped real value."
          description="A few favourites from the last few years — each one designed, engineered and measured against a business outcome."
          action={
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              Full archive on request
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {projects.slice(0, 4).map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 120} className={cn("flex", project.span)}>
              <ProjectCard project={{ ...project, span: "w-full" }} />
            </Reveal>
          ))}

          {/* Final row: 5th project + invitation card */}
          <Reveal className="flex lg:col-span-7">
            <ProjectCard project={{ ...projects[4], span: "w-full" }} />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <a
              href="#contact"
              className="group flex h-full min-h-[320px] flex-col items-center justify-center gap-5 rounded-card border-2 border-dashed border-ink/15 bg-transparent p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:border-ink/40 hover:bg-white"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-white">
                <Sparkles className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight text-ink">
                  Your project, next.
                </p>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                  30+ more case studies live in my private archive — or we write a new one together.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-btn bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft transition-all duration-300 group-hover:bg-accent group-hover:shadow-lift">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
