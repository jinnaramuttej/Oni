import {
  Activity,
  Atom,
  Braces,
  Check,
  Database,
  FlaskConical,
  Gauge,
  GitBranch,
  Layers,
  PenTool,
  Server,
  ShieldCheck,
  Sparkles,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const coreStack = [
  { name: "React & React Native", detail: "9 yrs · Expert", icon: Atom },
  { name: "TypeScript", detail: "8 yrs · Expert", icon: Braces },
  { name: "Next.js", detail: "6 yrs · Expert", icon: Layers },
  { name: "Tailwind CSS", detail: "6 yrs · Expert", icon: Wind },
  { name: "Node.js", detail: "8 yrs · Advanced", icon: Server },
  { name: "PostgreSQL & Prisma", detail: "6 yrs · Advanced", icon: Database },
  { name: "Figma", detail: "9 yrs · Expert", icon: PenTool },
  { name: "Framer Motion", detail: "5 yrs · Advanced", icon: Zap },
];

const designSkills = [
  "Multi-platform design systems",
  "Interaction & motion design",
  "Accessibility (WCAG AA+)",
  "Prototyping & user testing",
  "UX writing & content design",
];

const practices = [
  { label: "Vitest & Playwright testing", icon: FlaskConical },
  { label: "CI/CD with GitHub Actions", icon: GitBranch },
  { label: "Performance budgets & RUM", icon: Gauge },
  { label: "Type-safe APIs · tRPC, GraphQL", icon: Workflow },
  { label: "Observability & product analytics", icon: Activity },
  { label: "Security-first code review", icon: ShieldCheck },
];

const exploring = ["Rust & WebAssembly", "WebGL & Three.js", "LLM agents & RAG tooling"];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-paper py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Skills & Technologies"
          title="A full-stack toolkit, sharpened daily."
          description="Deep expertise in the modern web platform — chosen deliberately, mastered through a decade of production work."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Core stack — hero card */}
          <Reveal className="lg:col-span-8">
            <div className="h-full rounded-card bg-white p-8 shadow-card ring-1 ring-ink/[0.04] md:p-10">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  Core stack
                </h3>
                <span className="text-xs font-medium text-slate-400">
                  The tools I reach for first
                </span>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {coreStack.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-center gap-4 rounded-2xl border border-ink/[0.05] bg-paper p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-soft"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/[0.05] text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{item.name}</span>
                      <span className="mt-0.5 block text-xs font-medium text-slate-500">
                        {item.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Design & motion */}
          <Reveal delay={120} className="lg:col-span-4">
            <div className="h-full rounded-card bg-white p-8 shadow-card ring-1 ring-ink/[0.04]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/[0.05] text-ink">
                  <PenTool className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  Design &amp; motion
                </h3>
              </div>
              <ul className="mt-6 divide-y divide-ink/[0.06]">
                {designSkills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 py-3.5 text-sm font-medium text-slate-600">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Engineering practices */}
          <Reveal className="lg:col-span-7">
            <div className="h-full rounded-card bg-white p-8 shadow-card ring-1 ring-ink/[0.04] md:p-10">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                Engineering practices
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                How I keep production code boring, predictable and easy to hand over.
              </p>
              <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {practices.map((practice) => (
                  <li key={practice.label} className="flex items-center gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/[0.04] text-slate-600">
                      <practice.icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-medium text-slate-600">{practice.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Currently exploring */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-card border border-grape/20 bg-gradient-to-br from-grape/[0.06] to-accent/[0.04] p-8 shadow-card md:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-grape/10 text-grape">
                  <Sparkles className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  Currently exploring
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                The field moves fast — so do I. Here is what I&apos;m deep in right now.
              </p>
              <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
                {exploring.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-grape/25 bg-white/80 px-4 py-2 text-xs font-semibold text-grape backdrop-blur-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
