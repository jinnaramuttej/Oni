import Reveal from "./Reveal";
import {
  Code2,
  Palette,
  Database,
  Blocks,
} from "lucide-react";

const skillGroups = [
  {
    title: "Front-End",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: Code2,
  },
  {
    title: "Design",
    skills: ["Figma", "UI/UX Design", "Design Systems", "Prototyping"],
    icon: Palette,
  },
  {
    title: "Backend",
    skills: ["Node.js", "PostgreSQL", "GraphQL", "REST APIs"],
    icon: Database,
  },
  {
    title: "Tools",
    skills: ["Git / GitHub", "VS Code", "Vercel", "Linear"],
    icon: Blocks,
  },
];

export default function Skills() {
  return (
    <section className="relative border-t border-gray-100 bg-white px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
                Expertise
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
                Skills &amp; technologies
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p className="max-w-md text-base text-slate-custom/70 lg:text-right">
              A versatile toolkit built across design, engineering, and product
              strategy — always evolving with the industry.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={100 + i * 80}>
                <div className="group rounded-[20px] border border-gray-100 bg-off-white p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-premium-card-hover hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-premium-sm transition-all duration-300 group-hover:shadow-premium-md">
                    <Icon className="h-5 w-5 text-matte-black" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-matte-black">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2.5 text-sm text-slate-custom/70">
                        <span className="h-1 w-1 rounded-full bg-slate-custom/30" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
