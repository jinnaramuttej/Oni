import { ArrowUpRight } from "lucide-react";
import { team } from "../data/team";
import Reveal from "./Reveal";

export default function Team() {
  return (
    <section id="team" className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
              <span className="h-px w-10 bg-mist/60" />
              The Studio
            </p>
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
              Minds behind
              <br />
              the work.
            </h2>
          </div>
          <p className="max-w-sm text-balance text-base leading-relaxed text-mist">
            A collective of strategists, designers, engineers and storytellers
            united by one obsession — craft.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-charcoal">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-paper">
                      {member.name}
                    </h3>
                    <p className="text-sm text-mist">{member.role}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/20 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
