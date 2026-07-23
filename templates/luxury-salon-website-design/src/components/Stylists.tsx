import { AtSign } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { STYLISTS } from "../data";

export default function Stylists() {
  return (
    <section id="artists" className="relative bg-blush py-28 md:py-36">
      <div className="texture-linen pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading
          eyebrow="The Artists"
          title={
            <>
              Hands you can <span className="italic">trust</span>
            </>
          }
          description="A resident ensemble of master stylists and colorists — each with a signature discipline, each devoted to a small circle of guests."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {STYLISTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.15} y={56}>
              <article className="group relative">
                <div className="relative overflow-hidden rounded-[24px] shadow-card transition-shadow duration-700 group-hover:shadow-lift">
                  <img
                    src={s.image}
                    alt={`${s.name}, ${s.role} at Lumière`}
                    loading="lazy"
                    className="img-editorial aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  {/* hover veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-6 p-7 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm leading-relaxed font-light text-ivory/90">
                      {s.bio}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ivory/30 px-4 py-2 text-[11px] tracking-[0.18em] text-ivory uppercase backdrop-blur-sm">
                      <AtSign size={13} strokeWidth={1.5} />
                      {s.handle}
                    </div>
                  </div>
                  {/* index chip */}
                  <div className="absolute top-5 left-5 rounded-full bg-ivory/85 px-3.5 py-1.5 text-[10.5px] font-medium tracking-[0.24em] text-charcoal uppercase backdrop-blur-sm">
                    0{i + 1}
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4 px-1">
                  <div>
                    <h3 className="font-serif text-[26px] leading-tight font-medium text-charcoal">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium tracking-[0.22em] text-metallic uppercase">
                      {s.role}
                    </p>
                    <p className="mt-2 text-[13px] font-light text-taupe">
                      {s.specialty}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
