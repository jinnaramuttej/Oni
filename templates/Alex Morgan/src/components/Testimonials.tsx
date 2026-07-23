import Reveal from "./Reveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Product, Drift",
    content:
      "Alex is the rare talent who can take a vague concept and turn it into something beautiful and functional. The design system they built for us is still the foundation of our product two years later.",
  },
  {
    name: "Marcus Williams",
    role: "CTO, Nova Technologies",
    content:
      "Working with Alex was transformative for our team. They brought product thinking, design rigor, and engineering excellence to every sprint. Our conversion rate increased 40% after the redesign.",
  },
  {
    name: "Emily Okafor",
    role: "Founder, Studio Okafor",
    content:
      "I've collaborated with many designers and developers over the years, and Alex stands out for their meticulous attention to detail and genuine care for the end user. A true professional.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative border-t border-gray-100 px-6 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-1.5 text-xs font-medium text-slate-custom/70">
            Testimonials
          </span>
        </Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={100}>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-matte-black sm:text-4xl">
              Kind words from
              <br />
              <span className="text-gradient">great people</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-md text-base text-slate-custom/70 lg:text-right">
              What it&apos;s like to work together — from startup founders to
              enterprise leaders.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={100 + i * 100}>
              <div className="group relative flex flex-col rounded-[20px] border border-gray-100 bg-white p-7 shadow-premium-card transition-all duration-500 hover:shadow-premium-card-hover hover:-translate-y-0.5">
                <Quote className="h-6 w-6 text-gray-200 transition-colors duration-300 group-hover:text-subtle-blue/30" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-custom/80">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-light-gray text-xs font-semibold text-slate-custom/70">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-matte-black">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-custom/50">{t.role}</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-black/5 ring-inset" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
