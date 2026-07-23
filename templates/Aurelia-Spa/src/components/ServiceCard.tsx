import type { Treatment } from "../lib/data";
import { ArrowRight } from "lucide-react";

/** Refined treatment card — soft shadow, 24px radius, gentle hover lift. */
export function ServiceCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group flex h-full flex-col rounded-card border border-stone/60 bg-ivory p-8 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-light leading-tight text-charcoal">
            {treatment.name}
          </h3>
          <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-charcoal/45">
            {treatment.duration}
          </p>
        </div>
        <span className="font-serif text-xl text-gold">{treatment.price}</span>
      </div>

      <p className="mt-5 flex-1 text-sm font-light leading-relaxed text-charcoal/65">
        {treatment.description}
      </p>

      <a
        href="#booking"
        className="mt-7 inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-300 hover:text-gold"
      >
        Book treatment
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
      </a>
    </article>
  );
}
