import { ArrowUpRight, Clock } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { TRANSFORMATIONS } from "../data";
import { scrollToId } from "../lib/lenis";

const LAYOUT = [
  { wrap: "lg:col-span-7", fig: "aspect-[16/10]" },
  { wrap: "lg:col-span-5", fig: "aspect-[4/3]" },
  { wrap: "lg:col-span-5", fig: "aspect-[4/3]" },
  { wrap: "lg:col-span-3", fig: "aspect-[4/3]" },
  { wrap: "lg:col-span-4", fig: "aspect-[4/3]" },
];

export default function Transformations() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-charcoal py-28 md:py-40">
      <div
        className="pointer-events-none absolute -top-52 right-0 h-[480px] w-[480px] rounded-full bg-metallic/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading
          dark
          eyebrow="Before & After"
          title={
            <>
              Quiet, undeniable <span className="italic">transformations</span>
            </>
          }
          description="Real guests, photographed in the atelier. Each result is engineered to grow out beautifully — so the transformation lasts long after you've left the chair."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {TRANSFORMATIONS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.1} y={48} className={LAYOUT[i].wrap}>
              <figure className="group relative h-full w-full overflow-hidden rounded-[24px]">
                <div className={LAYOUT[i].fig}>
                  <img
                    src={t.image}
                    alt={`${t.title} — ${t.detail}`}
                    loading="lazy"
                    className="img-editorial absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-95" />

                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                  <div>
                    <p className="font-serif text-[22px] leading-tight font-medium text-ivory md:text-2xl">
                      {t.title}
                    </p>
                    <p className="mt-1.5 text-[11px] font-light tracking-[0.18em] text-ivory/70 uppercase">
                      {t.detail}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ivory/25 px-3.5 py-1.5 text-[10.5px] tracking-[0.16em] text-ivory/85 uppercase backdrop-blur-sm">
                    <Clock size={12} strokeWidth={1.5} />
                    {t.time}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}

          {/* CTA band */}
          <Reveal delay={0.2} y={48} className="lg:col-span-12">
            <button
              onClick={() => scrollToId("#booking")}
              className="group relative flex min-h-[190px] w-full flex-col items-start justify-between gap-8 overflow-hidden rounded-[24px] border border-ivory/15 bg-metallic/10 p-8 text-left transition-all duration-700 hover:border-metallic/60 hover:bg-metallic/20 md:p-10 lg:flex-row lg:items-center"
            >
              <span
                className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-metallic/25 blur-2xl transition-transform duration-700 group-hover:scale-125"
                aria-hidden
              />
              <div className="relative">
                <p className="text-[11px] font-medium tracking-[0.36em] text-champagne uppercase">
                  Begin your own story
                </p>
                <p className="mt-3 font-serif text-3xl leading-tight font-medium text-ivory italic md:text-4xl">
                  Your transformation awaits
                </p>
              </div>
              <span className="relative inline-flex items-center gap-3 rounded-[18px] bg-ivory px-7 py-4 text-[11.5px] font-medium tracking-[0.22em] text-charcoal uppercase transition-all duration-500 group-hover:gap-4 group-hover:shadow-btn">
                Reserve a consultation
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
