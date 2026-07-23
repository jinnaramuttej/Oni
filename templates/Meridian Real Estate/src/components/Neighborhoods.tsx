import { ArrowUpRight, TrendingUp } from "lucide-react";
import { HOOD_IMAGES, NEIGHBORHOODS, img } from "../data";
import { ArrowLink, CONTAINER, Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

export default function Neighborhoods() {
  return (
    <section id="neighborhoods" aria-label="Luxury neighborhoods" className="overflow-hidden py-24 md:py-36">
      <div className={cn(CONTAINER, "grid items-center gap-16 lg:grid-cols-12 lg:gap-10")}>
        {/* ——— Editorial copy ——— */}
        <div className="lg:col-span-5">
          <SectionHead
            overline="Addresses of Distinction"
            title={
              <>
                Where the world
                <br />
                <em className="font-normal italic text-gold-deep">chooses to live</em>
              </>
            }
            copy="Postcode is destiny. Our advisors walk these streets weekly — they know which penthouse will trade quietly next quarter, and which villa will never be listed at all."
          />

          <ul className="mt-12">
            {NEIGHBORHOODS.map((n, i) => (
              <Reveal key={n.name} delay={i * 90}>
                <li>
                  <a
                    href="#consultation"
                    className="group flex items-center justify-between gap-6 border-b border-ink/10 py-5 transition-colors duration-500 hover:border-gold-deep/50"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-serif text-sm italic text-gold">0{i + 1}</span>
                      <span className="font-serif text-[22px] font-medium text-ink transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-gold-deep md:text-2xl">
                        {n.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="hidden text-right sm:block">
                        <span className="block text-[12px] font-bold tracking-wide text-ink/70">{n.metric}</span>
                        <span className="mt-0.5 block text-[11px] font-semibold tracking-wider text-forest">{n.trend}</span>
                      </span>
                      <ArrowUpRight
                        size={17}
                        className="text-slate-400 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold-deep"
                      />
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={300}>
            <ArrowLink href="#consultation" className="mt-10">
              Explore all neighborhoods
            </ArrowLink>
          </Reveal>
        </div>

        {/* ——— Layered image composition ——— */}
        <div className="relative lg:col-span-7 lg:pl-10">
          <div className="grid grid-cols-12 gap-5">
            <Reveal scale className="col-span-7">
              <div className="relative overflow-hidden rounded-[20px] shadow-lift aspect-[3/4]">
                <img
                  src={img(HOOD_IMAGES.main.photo, 1000, 1330)}
                  alt={HOOD_IMAGES.main.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <div className="col-span-5 flex flex-col justify-center gap-5">
              <Reveal scale delay={150}>
                <div className="relative overflow-hidden rounded-[20px] shadow-soft aspect-[4/3.4]">
                  <img
                    src={img(HOOD_IMAGES.second.photo, 800, 680)}
                    alt={HOOD_IMAGES.second.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal scale delay={280}>
                <div className="relative overflow-hidden rounded-[20px] shadow-soft aspect-[4/3.4]">
                  <img
                    src={img(HOOD_IMAGES.third.photo, 800, 680)}
                    alt={HOOD_IMAGES.third.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* ——— Floating market card ——— */}
          <Reveal delay={350} className="relative z-10 -mt-10 ml-4 w-[min(320px,80%)] md:-mt-14 md:ml-10">
            <div className="rounded-[18px] border border-ink/[0.06] bg-ivory/95 p-6 shadow-lift backdrop-blur-md">
              <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-gold-deep">
                <TrendingUp size={14} />
                Prime Market Index
              </p>
              <p className="mt-3 font-serif text-[42px] font-medium leading-none text-ink">
                +11.8<span className="text-2xl text-gold-deep">%</span>
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
                Average appreciation across our twelve prime neighborhoods, trailing 24 months.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
