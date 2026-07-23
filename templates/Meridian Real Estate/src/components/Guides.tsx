import { Download } from "lucide-react";
import { GUIDES, img } from "../data";
import { CONTAINER, Reveal } from "./ui";
import { cn } from "../utils/cn";

export default function Guides() {
  return (
    <section id="guides" aria-label="Buying and selling guides" className="pb-24 md:pb-36">
      <div className={cn(CONTAINER, "grid gap-6 lg:grid-cols-2")}>
        {GUIDES.map((g, i) => (
          <Reveal key={g.title} delay={i * 140}>
            <a
              href="#consultation"
              className="group relative block h-[440px] overflow-hidden rounded-[24px] shadow-soft transition-shadow duration-700 hover:shadow-lift md:h-[480px]"
              aria-label={`${g.title} — ${g.meta}`}
            >
              <img
                src={img(g.photo, 1300, 900)}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/15 transition-colors duration-700 group-hover:from-forest-deep/95"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-11">
                <p className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  <span aria-hidden className="h-px w-8 bg-gold/80" />
                  {g.overline}
                </p>
                <h3 className="mt-4 font-serif text-[clamp(2rem,3.4vw,2.9rem)] font-medium leading-tight text-ivory">
                  {g.title}
                </h3>
                <p className="mt-4 max-w-md text-[13.5px] leading-[1.85] text-ivory/70">{g.copy}</p>

                <div className="mt-8 flex items-center gap-5">
                  <span className="inline-flex items-center gap-3 rounded-[14px] bg-gold px-6 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink shadow-gold transition-all duration-500 group-hover:-translate-y-0.5 group-hover:bg-ivory">
                    <Download size={14} strokeWidth={2.2} />
                    Download the Guide
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ivory/55">{g.meta}</span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
