import { AtSign, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { INSTAGRAM_IMAGES } from "../data";

export default function Instagram() {
  return (
    <section className="relative bg-cream py-28 md:py-36">
      <div className="texture-linen pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal y={24}>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-rosegold/70" />
                <span className="text-[11px] font-medium tracking-[0.42em] text-taupe uppercase">
                  Social
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.08] font-medium text-charcoal md:text-5xl">
                Life inside <span className="italic">the atelier</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-[18px] border border-charcoal/15 px-6 py-3.5 text-[11.5px] font-medium tracking-[0.22em] text-charcoal uppercase transition-all duration-500 hover:border-metallic hover:bg-blush hover:text-metallic"
            >
              <AtSign size={14} strokeWidth={1.5} />
              lumiere.atelier
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {INSTAGRAM_IMAGES.map((src, i) => (
            <Reveal key={src + i} delay={i * 0.08} y={40}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-[20px]"
                aria-label="Open Lumière on Instagram"
              >
                <img
                  src={src}
                  alt="Inside the Lumière atelier"
                  loading="lazy"
                  className="img-editorial aspect-square w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-metallic/0 backdrop-blur-0 transition-all duration-700 group-hover:bg-metallic/35 group-hover:backdrop-blur-[2px]">
                  <span className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-ivory/90 text-charcoal opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <AtSign size={17} strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
