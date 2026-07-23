import { Mail, Phone } from "lucide-react";
import { AGENTS, img } from "../data";
import { CONTAINER, Reveal, SectionHead } from "./ui";

export default function Agents() {
  return (
    <section id="advisors" aria-label="Meet our advisors" className="bg-mist py-24 md:py-36">
      <div className={CONTAINER}>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead
              overline="The Private Office"
              title={
                <>
                  Advisors you would
                  <br />
                  <em className="font-normal italic text-gold-deep">invite to dinner</em>
                </>
              }
            />
          </div>
          <Reveal delay={200} className="lg:col-span-5 lg:pb-2">
            <p className="text-[15px] leading-[1.9] text-slate-600">
              Our advisors average eighteen years in prime markets and speak nine
              languages between them. Discretion is assumed; relationships are
              measured in decades, not deals.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AGENTS.map((a, i) => (
            <Reveal key={a.email} delay={i * 110}>
              <article className="group rounded-[24px] border border-ink/[0.05] bg-white p-3 pb-7 shadow-soft transition-all duration-700 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative overflow-hidden rounded-[16px] aspect-[3/3.6]">
                  <img
                    src={img(a.photo, 700, 840)}
                    alt={`Portrait of ${a.name}, ${a.role} at Meridian Fine Estates`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <a
                      href={`tel:${a.phone.replace(/\s/g, "")}`}
                      aria-label={`Call ${a.name}`}
                      className="grid size-11 translate-y-3 place-items-center rounded-full bg-ivory/95 text-ink shadow-soft backdrop-blur transition-all duration-500 hover:bg-gold group-hover:translate-y-0"
                    >
                      <Phone size={15} strokeWidth={1.9} />
                    </a>
                    <a
                      href={`mailto:${a.email}`}
                      aria-label={`Email ${a.name}`}
                      className="grid size-11 translate-y-3 place-items-center rounded-full bg-ivory/95 text-ink shadow-soft backdrop-blur transition-all duration-500 delay-75 hover:bg-gold group-hover:translate-y-0"
                    >
                      <Mail size={15} strokeWidth={1.9} />
                    </a>
                  </div>
                </div>

                <div className="px-3 pt-6 text-center">
                  <h3 className="font-serif text-[24px] font-medium leading-tight text-ink">{a.name}</h3>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-deep">{a.role}</p>
                  <p className="mx-auto mt-3 max-w-[210px] border-t border-ink/[0.07] pt-3 text-[12.5px] font-medium tracking-wide text-slate-500">
                    {a.specialty}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-14 text-center text-[13px] tracking-wide text-slate-500">
            Every client is served by a dedicated advisor and a full research desk —
            <a href="#consultation" className="ml-1 font-bold text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors hover:text-ink">
              request an introduction
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
