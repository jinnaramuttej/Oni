import { Button, Icons } from "./ui";

const badges = [
  { icon: Icons.clock, label: "20+ Years", sub: "of Experience" },
  { icon: Icons.award, label: "Award-Winning", sub: "Legal Practice" },
  { icon: Icons.shield, label: "Absolute", sub: "Confidentiality" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Modern law firm boardroom overlooking the city at dusk"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      {/* Thin gold frame accent */}
      <div className="pointer-events-none absolute inset-6 hidden border border-white/10 lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-16 lg:px-10">
        <div className="max-w-3xl">
          <p className="reveal flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-luxe text-gold-soft">
            <span className="h-px w-10 bg-gold-soft/60" />
            Est. 2003 · Trusted Counsel Worldwide
          </p>

          <h1 className="reveal mt-7 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-ivory text-balance sm:text-6xl lg:text-[4.75rem]" data-delay="80">
            Distinguished Legal Counsel for Matters That Define Your Future
          </h1>

          <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-ivory/75" data-delay="180">
            For over two decades, Ashcroft &amp; Vale has represented individuals,
            families, and enterprises with discretion, precision, and unwavering
            resolve — turning complex challenges into decisive outcomes.
          </p>

          <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row" data-delay="280">
            <Button href="#consultation" variant="primary" icon={<Icons.arrowRight />}>
              Schedule a Consultation
            </Button>
            <Button href="#practice" variant="light" icon={<Icons.arrowUpRight />}>
              Explore Practice Areas
            </Button>
          </div>

          {/* Trust badges */}
          <div className="reveal mt-14 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/5 sm:grid-cols-3" data-delay="380">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-3.5 bg-ink/40 px-5 py-5 backdrop-blur-sm"
              >
                <span className="h-8 w-8 shrink-0 text-gold">
                  <b.icon />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-serif text-lg text-ivory">{b.label}</span>
                  <span className="text-[0.72rem] uppercase tracking-wider text-ivory/50">
                    {b.sub}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#firm"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/60 transition-colors hover:text-gold lg:flex"
        aria-label="Scroll to explore"
      >
        <span className="text-[0.65rem] font-medium uppercase tracking-luxe">Scroll</span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-ivory/30">
          <span className="mt-2 h-2 w-1 animate-bounce rounded-full bg-gold" />
        </span>
      </a>
    </section>
  );
}
