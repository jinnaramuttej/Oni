import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { ARTICLES, INSIGHT_STATS, img } from "../data";
import { cn } from "../utils/cn";
import { ArrowLink, CONTAINER, Reveal, SectionHead } from "./ui";

export default function Insights() {
  return (
    <section id="insights" aria-label="Market insights" className="py-24 md:py-36">
      <div className={CONTAINER}>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead
              overline="Market Intelligence"
              title={
                <>
                  Knowledge is the
                  <br />
                  <em className="font-normal italic text-gold-deep">ultimate address</em>
                </>
              }
            />
          </div>
          <Reveal delay={200} className="lg:col-span-5 lg:pb-2 lg:text-right">
            <ArrowLink href="#consultation">Subscribe to the briefing</ArrowLink>
          </Reveal>
        </div>

        {/* ——— Credentials strip ——— */}
        <Reveal delay={150}>
          <dl className="mt-14 grid grid-cols-2 gap-y-10 border-y border-ink/[0.08] py-12 lg:grid-cols-4">
            {INSIGHT_STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex flex-col items-center gap-3 text-center lg:border-l lg:border-ink/[0.08]",
                  i === 0 && "lg:border-l-0"
                )}
              >
                <dd className="font-serif text-[clamp(2.6rem,4.5vw,3.8rem)] font-medium leading-none text-ink">
                  {s.value}
                </dd>
                <dt className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-gold-deep">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ——— Articles ——— */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.title} delay={i * 120}>
              <article className="group flex h-full flex-col rounded-[20px] border border-ink/[0.06] bg-white shadow-soft transition-all duration-700 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative overflow-hidden rounded-t-[20px] aspect-[16/10]">
                  <img
                    src={img(a.photo, 900, 570)}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-ivory/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-ink backdrop-blur">
                    {a.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-[24px] font-medium leading-[1.25] text-ink transition-colors duration-500 group-hover:text-gold-deep">
                    {a.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[13.5px] leading-[1.85] text-slate-600">{a.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/[0.07] pt-5">
                    <span className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={12.5} />
                        {a.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={12.5} />
                        {a.read}
                      </span>
                    </span>
                    <span className="grid size-10 place-items-center rounded-full border border-ink/12 text-ink transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-500 group-hover:rotate-45" />
                    </span>
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
