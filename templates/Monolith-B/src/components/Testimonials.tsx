import { Quote } from "lucide-react";

const quotes = [
  {
    text:
      "Monolith didn't design a website. They designed the way we now speak, hire and sell. Two years later we still refer to their guidelines weekly.",
    name: "Amelia Kowalski",
    role: "CEO — Herz Berlin",
  },
  {
    text:
      "The most opinionated, precise studio we've worked with. They pushed back three times on our brief — and were right every time.",
    name: "Daichi Watanabe",
    role: "Founder — Kaiku Records",
  },
  {
    text:
      "They treat craft like a moral question. Nothing shipped without a fight, and nothing shipped that wasn't beautiful.",
    name: "Sophie Larsen",
    role: "Creative Director — MUBI",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-40">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_60%)]" />
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              <span className="h-px w-10 bg-[#A3A3A3]" />
              [ 08 ] Words from clients
            </div>
            <h2 className="mt-6 font-display text-[13vw] leading-[0.9] tracking-tight md:text-[6.5vw]">
              What they said,
              <br />
              <em className="italic">unedited.</em>
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {quotes.map((q, i) => (
            <blockquote
              key={i}
              className="reveal relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111]/60 p-8 transition-all hover:border-[#C6FF3D]/50 md:p-10"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-[#C6FF3D]" strokeWidth={1} />
              <p className="mt-8 font-display text-2xl leading-tight tracking-tight md:text-3xl">
                "{q.text}"
              </p>
              <footer className="mt-10 border-t border-white/10 pt-6">
                <div className="font-display text-xl">{q.name}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                  {q.role}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
