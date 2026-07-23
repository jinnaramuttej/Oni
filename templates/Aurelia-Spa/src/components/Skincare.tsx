import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionLabel, Button } from "./ui";
import { products } from "../lib/data";
import { ArrowRight } from "lucide-react";

export function Skincare() {
  return (
    <section id="skincare" className="bg-beige py-24 lg:py-32">
      {/* Feature banner with photograph */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="relative overflow-hidden rounded-card shadow-card">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <img
                src="/images/skincare.jpg"
                alt="Premium skincare formulations in glass vessels"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center bg-charcoal p-10 lg:p-14">
              <SectionLabel tone="light">Premium Skincare</SectionLabel>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] text-ivory sm:text-5xl">
                The Atelier Collection
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-ivory/70">
                Clean, traceable formulations developed alongside our aestheticians
                — the same actives used in our treatments, distilled for your daily
                ritual at home.
              </p>
              <div className="mt-9">
                <Button href="#contact" variant="gold">
                  Shop the collection
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Product grid */}
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <article className="group flex h-full flex-col rounded-card border border-stone/60 bg-ivory p-7 shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="rounded-pill bg-beige px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-charcoal/60">
                    {p.tag}
                  </span>
                  <span className="font-serif text-xl text-gold">{p.price}</span>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-light leading-tight text-charcoal">
                  {p.name}
                </h3>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-charcoal/65">
                  {p.description}
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-300 hover:text-gold"
                >
                  Add to bag
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
