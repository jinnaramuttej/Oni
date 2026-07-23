import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { PRACTICES, IMAGES } from "../data";
import { scrollToId } from "../lib/scroll";

export default function Practice() {
  return (
    <section id="practice" className="relative overflow-hidden bg-deep py-28 lg:py-40">
      {/* ambient glow, like candlelight on a wall */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-moss/15 blur-3xl animate-drift-slow" />
      <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-clay/10 blur-3xl animate-drift" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index="03" tone="dark">Meditation &amp; breathwork</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] text-ivory sm:text-5xl">
                Stillness is a skill — <em className="font-normal italic text-sage">we teach it.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-md text-[15px] font-light leading-[1.95] text-ivory/70">
                Meditation and breath are not the absence of effort; they are a
                craft, refined slowly in good company. Our programs are secular,
                evidence-informed, and designed for real, busy, modern minds.
              </p>
            </Reveal>

            <Reveal delay={0.24} y={44}>
              <div className="img-frame mt-12 hidden rounded-[28px] border border-ivory/10 shadow-lift lg:block">
                <img
                  src={IMAGES.meditationClose}
                  alt="Close portrait of peaceful meditation at dusk"
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover opacity-90"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul>
            {PRACTICES.map((p, i) => (
              <Reveal key={p.no} delay={i * 0.07} y={28}>
                <li className="group border-t border-ivory/10 py-9 transition-colors duration-700 first:border-t-0 first:pt-0 hover:border-sage/40">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex gap-6">
                      <span className="mt-1 font-serif text-xl font-light italic text-clay/80">{p.no}</span>
                      <div>
                        <span className="text-[10.5px] font-medium uppercase tracking-[0.26em] text-sage">
                          {p.kind}
                        </span>
                        <h3 className="mt-2 font-serif text-2xl font-normal leading-snug text-ivory transition-transform duration-700 group-hover:translate-x-1.5 sm:text-[27px]">
                          {p.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-[14px] font-light leading-[1.85] text-ivory/60">
                          {p.description}
                        </p>
                        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[12px] font-light uppercase tracking-[0.16em] text-ivory/45">
                          <span>{p.duration}</span>
                          <span className="text-clay/70">·</span>
                          <span>{p.schedule}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => scrollToId("booking")}
                      aria-label={`Reserve ${p.title}`}
                      className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all duration-600 group-hover:border-sage group-hover:bg-sage group-hover:text-deep"
                    >
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-10 border-t border-ivory/10 pt-8 text-[13px] font-light leading-[1.9] text-ivory/50">
              All meditation sits are free for members. First-time visitors are
              welcome to join any open sit as our guest — simply arrive, take a
              cushion, and close your eyes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
