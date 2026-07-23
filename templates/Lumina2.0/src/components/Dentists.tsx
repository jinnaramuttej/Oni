import { ArrowRight, GraduationCap, Languages } from "lucide-react";
import { Button, Img, Reveal, SectionHeading } from "./ui";
import { DOCTORS } from "../lib/data";

export function Dentists() {
  return (
    <section id="doctors" className="relative bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Meet your dentists"
            title="Specialists who listen first, treat second"
            lede="A small, senior-only team. Every doctor here is board-certified with 10+ years of focused practice — and a reputation for gentle hands."
          />
          <Reveal delay={200} className="shrink-0">
            <Button href="#booking" variant="secondary">
              Meet the full team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOCTORS.map((doc, i) => (
            <Reveal as="li" key={doc.name} delay={i * 110}>
              <article className="group relative overflow-hidden rounded-[1.5rem] bg-white shadow-card ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="relative overflow-hidden">
                  <Img
                    src={doc.image}
                    alt={`Portrait of ${doc.name}, ${doc.role} at Lumina Dental Studio`}
                    containerClassName="aspect-[4/4.4]"
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/55 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aqua-300">
                      {doc.role}
                    </p>
                  </div>
                </div>

                <div className="p-6 lg:p-7">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-navy-800">
                    {doc.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{doc.bio}</p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5 text-[0.7rem] font-semibold text-slate-400">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 ring-1 ring-slate-100">
                      <GraduationCap className="h-3.5 w-3.5 text-teal-500" aria-hidden="true" />
                      Board certified
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 ring-1 ring-slate-100">
                      <Languages className="h-3.5 w-3.5 text-teal-500" aria-hidden="true" />
                      EN · ES
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-teal-100 bg-gradient-to-r from-teal-50 via-white to-aqua-100/60 px-7 py-6 sm:flex-row sm:px-9">
            <p className="text-center text-sm text-slate-600 sm:text-left">
              <span className="font-display font-semibold text-navy-800">Not sure who to see?</span>{" "}
              Tell us your concern and our coordinators will match you with the right specialist.
            </p>
            <Button href="#booking" size="md" className="shrink-0">
              Get matched
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
