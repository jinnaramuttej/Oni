import { IMG } from "../data/images";
import { useParallax } from "../hooks/useReveal";

export default function Hero() {
  const bgRef = useParallax<HTMLDivElement>(0.1);

  return (
    <section id="top" className="relative flex h-svh min-h-[640px] items-end overflow-hidden">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-[-8%]">
        <img
          src={IMG.hero}
          alt="A refined tasting course plated on black ceramic under low light"
          className="hero-zoom h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>
      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 lg:px-10 lg:pb-32">
        <div className="max-w-3xl">
          <p
            className="eyebrow reveal is-visible mb-8"
            style={{ transitionDelay: "300ms" }}
          >
            Two Michelin Stars · Est. 1998
          </p>
          <h1 className="display text-[clamp(3rem,8vw,6.5rem)] text-ivory">
            An Evening,
            <br />
            <em className="font-light italic text-gold-soft">Composed</em> in
            Courses
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-8 text-ivory-dim">
            Behind an unmarked door on Rue de Sèvres, twelve tables await. A
            seasonal tasting menu, written each morning and gone by midnight —
            served by candlelight, one deliberate course at a time.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a href="#reserve" className="btn-gold">
              Reserve a Table
            </a>
            <a href="#menu" className="btn-ghost">
              View Menu
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 pb-6 md:flex">
        <span className="text-[0.5625rem] uppercase tracking-[0.4em] text-ivory-faint">
          Scroll
        </span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
