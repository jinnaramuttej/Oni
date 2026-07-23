import { caseResults, img, industries } from "../data";
import { Eyebrow } from "./ui";

export function Results() {
  return (
    <>
      {/* Case results — parallax-style band */}
      <section id="results" className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <img
            src={img.skyline}
            alt="City skyline at dusk"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/92" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <Eyebrow dark>Case Results</Eyebrow>
            <h2 className="reveal mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-ivory text-balance sm:text-5xl" data-delay="60">
              A record measured in trust — and results.
            </h2>
            <p className="reveal mt-5 text-lg leading-relaxed text-ivory/70" data-delay="120">
              Numbers rarely tell the whole story, but they speak to a consistent
              standard our clients have relied upon for over two decades.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {caseResults.map((r, i) => (
              <div
                key={r.label}
                className="reveal bg-white/[0.04] px-7 py-10 backdrop-blur-sm"
                data-delay={i * 90}
              >
                <span className="block font-serif text-5xl font-semibold text-gold">
                  {r.value}
                </span>
                <span className="mt-4 block text-sm leading-relaxed text-ivory/70">
                  {r.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="bg-charcoal py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="reveal">
              <Eyebrow dark>Industries Served</Eyebrow>
              <h3 className="mt-5 font-serif text-3xl font-medium leading-tight text-ivory sm:text-4xl">
                Deep expertise across the sectors that move markets.
              </h3>
            </div>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/10 sm:grid-cols-2">
              {industries.map((ind, i) => (
                <li
                  key={ind}
                  className="reveal flex items-center gap-3 bg-white/[0.03] px-6 py-5 text-ivory/80 transition-colors hover:bg-white/[0.07] hover:text-gold-soft"
                  data-delay={i * 50}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-sm font-medium">{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
