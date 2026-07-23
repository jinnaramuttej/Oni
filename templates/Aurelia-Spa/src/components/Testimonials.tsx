import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionLabel } from "./ui";
import { testimonials } from "../lib/data";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="bg-stone py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel align="center">Guest Reflections</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[-0.01em] text-charcoal sm:text-5xl">
            Quietly, they tell the story
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <figure className="flex h-full flex-col rounded-card bg-ivory p-9 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-card">
                <Quote className="h-8 w-8 text-gold" strokeWidth={1} />
                <blockquote className="mt-5 flex-1 font-serif text-xl font-light leading-relaxed text-charcoal">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 border-t border-stone/70 pt-5">
                  <p className="font-medium text-charcoal">{t.name}</p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-charcoal/50">
                    {t.title}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
