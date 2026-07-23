import { MapPin } from "lucide-react";
import { SOLD, SOLD_STATS, img } from "../data";
import { CONTAINER, Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

export default function Sold() {
  return (
    <section id="results" aria-label="Recently sold properties" className="relative overflow-hidden bg-ink py-24 md:py-36">
      {/* ——— Understated architectural hairlines ——— */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-full w-px bg-ivory/[0.04]" />
        <div className="absolute left-1/4 top-0 h-full w-px bg-ivory/[0.03]" />
        <div className="absolute right-1/4 top-0 h-full w-px bg-ivory/[0.03]" />
      </div>

      <div className={cn(CONTAINER, "relative")}>
        <SectionHead
          center
          tone="light"
          overline="Proven Results"
          title={
            <>
              Recently <em className="font-normal italic text-gold">sold</em>
            </>
          }
          copy="Talk is cheap in this business. These are the outcomes — negotiated quietly, closed precisely, celebrated privately."
        />

        {/* ——— Performance stats ——— */}
        <Reveal delay={200}>
          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-10 rounded-[24px] border border-ivory/10 bg-ivory/[0.03] px-6 py-10 backdrop-blur-sm md:grid-cols-4 md:divide-x md:divide-ivory/10">
            {SOLD_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2.5 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-[40px] font-medium leading-none text-ivory md:text-[44px]">{s.value}</dd>
                <dd className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ——— Sold cards ——— */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SOLD.map((s, i) => (
            <Reveal key={s.name} delay={i * 110}>
              <article className="group">
                <div className="relative overflow-hidden rounded-[18px] shadow-soft aspect-[4/3.2]">
                  <img
                    src={img(s.photo, 900, 720)}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.26em] text-ink">
                    Sold
                  </span>
                  <p className="absolute bottom-4 left-5 font-serif text-[24px] font-medium text-ivory">{s.price}</p>
                </div>
                <div className="mt-5 px-1">
                  <h3 className="font-serif text-[21px] font-medium leading-snug text-ivory transition-colors duration-500 group-hover:text-gold">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-2 text-[12px] font-medium tracking-wide text-ivory/45">
                    <MapPin size={12.5} className="text-gold" />
                    {s.location}
                  </p>
                  <p className="mt-3 border-l-2 border-gold/60 pl-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-gold/90">
                    {s.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
