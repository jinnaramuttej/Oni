import { Award } from "lucide-react";
import Reveal from "./Reveal";

const AWARDS = [
  { year: "2024", title: "Site of the Day", org: "Awwwards", project: "Echo — Digital Experience" },
  { year: "2024", title: "Gold Pencil", org: "The One Club", project: "Nightfall — Film & Motion" },
  { year: "2023", title: "Best UI Design", org: "CSS Design Awards", project: "Solace — Product Design" },
  { year: "2023", title: "Design of the Year", org: "FWA", project: "Meridian — Brand Identity" },
  { year: "2022", title: "Webby Honoree", org: "The Webby Awards", project: "Echo — Digital Experience" },
  { year: "2022", title: "Best Studio", org: "Communication Arts", project: "Novum Agency" },
];

export default function Awards() {
  return (
    <section className="relative bg-ink py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-mist">
              <span className="h-px w-10 bg-mist/60" />
              Recognition
            </p>
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
              Awards &amp; Honors.
            </h2>
          </div>
          <p className="max-w-sm text-balance text-base leading-relaxed text-mist">
            Recognized internationally for design excellence, craft, and
            fearless creative thinking.
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {AWARDS.map((award, i) => (
            <Reveal key={`${award.title}-${i}`} delay={i * 0.05}>
              <div className="group grid grid-cols-2 items-center gap-4 py-6 sm:grid-cols-12 sm:py-7">
                <span className="font-display text-lg text-mist/60 sm:col-span-1">
                  {award.year}
                </span>
                <div className="col-span-2 flex items-center gap-3 sm:col-span-5">
                  <Award
                    size={18}
                    strokeWidth={1.5}
                    className="hidden shrink-0 text-violet-light sm:block"
                  />
                  <h3 className="font-display text-xl font-semibold text-paper transition-colors duration-300 group-hover:text-violet-light sm:text-2xl">
                    {award.title}
                  </h3>
                </div>
                <p className="text-sm text-mist sm:col-span-3">{award.org}</p>
                <p className="text-right text-sm text-mist sm:col-span-3 sm:text-left">
                  {award.project}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
