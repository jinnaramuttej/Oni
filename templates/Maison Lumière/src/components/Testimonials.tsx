import { Reveal } from "../hooks/useReveal";

const QUOTES = [
  {
    quote:
      "Not a meal so much as three hours of held breath. The quail alone justifies the flight to Paris.",
    source: "Margaux Deneuve",
    role: "Le Figaro — Gastronomie",
  },
  {
    quote:
      "Marchand cooks in whispers where others shout. The most disciplined tasting menu in Europe.",
    source: "Jonathan Ashe",
    role: "The World's 50 Best, Juror",
  },
  {
    quote:
      "We came for an anniversary and left having recalibrated what a restaurant can be.",
    source: "S. Okafor",
    role: "Guest, twelfth visit",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-coal py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-16 text-center">In Their Words</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-3 lg:gap-10">
          {QUOTES.map((q, i) => (
            <Reveal key={q.source} delay={i * 150}>
              <blockquote className="flex h-full flex-col border-t border-gold/25 pt-10">
                <span className="font-serif text-5xl leading-none text-gold/60">
                  “
                </span>
                <p className="mt-2 flex-1 font-serif text-[1.375rem] font-light italic leading-relaxed text-ivory">
                  {q.quote}
                </p>
                <footer className="mt-8">
                  <p className="text-[0.75rem] uppercase tracking-[0.28em] text-ivory">
                    {q.source}
                  </p>
                  <p className="mt-1.5 text-[0.6875rem] font-light uppercase tracking-[0.22em] text-ivory-faint">
                    {q.role}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
