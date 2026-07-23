import { ArrowUpRight, Palette, Boxes, Film, Code2, Camera, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const SERVICES = [
  {
    icon: Palette,
    number: "01",
    title: "Brand Identity",
    description: "Strategy, naming, visual systems and art direction built to last.",
    skills: ["Positioning", "Identity Systems", "Art Direction", "Naming"],
  },
  {
    icon: Boxes,
    number: "02",
    title: "Product & UI Design",
    description: "Interfaces and design systems engineered for scale and delight.",
    skills: ["UX Strategy", "UI Design", "Design Systems", "Prototyping"],
  },
  {
    icon: Code2,
    number: "03",
    title: "Web & Interactive",
    description: "Cinematic, high-performance digital experiences built to convert.",
    skills: ["WebGL", "Front-End Engineering", "CMS", "Motion Dev"],
  },
  {
    icon: Film,
    number: "04",
    title: "Motion & Film",
    description: "Story-led film, animation and generative visuals for every screen.",
    skills: ["Direction", "3D & VFX", "Animation", "Sound Design"],
  },
  {
    icon: Camera,
    number: "05",
    title: "Photography",
    description: "Editorial and product photography with a distinct visual voice.",
    skills: ["Art Direction", "Product", "Editorial", "Retouching"],
  },
  {
    icon: Sparkles,
    number: "06",
    title: "Creative Strategy",
    description: "Insight-driven thinking that gives every idea a reason to exist.",
    skills: ["Research", "Positioning", "Innovation", "Workshops"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
            <span className="h-px w-10 bg-mist/60" />
            What We Do
          </p>
          <h2 className="font-display text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            Full-spectrum creative, engineered for impact.
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-white/10 border-y border-white/10">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <div className="group grid grid-cols-1 items-center gap-6 py-8 transition-colors duration-500 hover:bg-white/[0.03] md:grid-cols-12 md:gap-4 md:px-4 md:py-10">
                <span className="font-display text-sm text-mist/60 md:col-span-1">
                  {service.number}
                </span>

                <div className="flex items-center gap-4 md:col-span-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-paper transition-all duration-500 group-hover:border-violet-light/60 group-hover:bg-violet/10">
                    <service.icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                    {service.title}
                  </h3>
                </div>

                <p className="text-base leading-relaxed text-mist md:col-span-4">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 md:col-span-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-mist"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-start md:col-span-1 md:justify-end">
                  <ArrowUpRight
                    size={22}
                    className="text-mist transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-paper"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
