import { ArrowRight, Plus, ShoppingBag } from "lucide-react";
import Reveal from "./Reveal";
import { PRODUCTS } from "../data";
import { scrollToId } from "../lib/lenis";

export default function Products() {
  return (
    <section id="products" className="relative overflow-hidden bg-cream py-28 md:py-36">
      <div className="texture-linen pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-6 md:px-10 lg:grid-cols-12">
        {/* Still life */}
        <div className="lg:col-span-6">
          <Reveal y={56}>
            <div className="relative">
              <div className="group relative overflow-hidden rounded-[28px] shadow-lift">
                <img
                  src="/images/products.jpg"
                  alt="The Lumière Apothecary collection arranged on travertine stone"
                  loading="lazy"
                  className="img-editorial aspect-[5/4] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="glass absolute -bottom-6 left-6 flex items-center gap-3 rounded-full border hairline px-5 py-3 shadow-soft md:left-10">
                <ShoppingBag size={15} strokeWidth={1.5} className="text-metallic" />
                <span className="text-[11px] font-medium tracking-[0.24em] text-charcoal uppercase">
                  The Lumière Apothecary
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* List */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal y={24}>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-rosegold/70" />
              <span className="text-[11px] font-medium tracking-[0.42em] text-taupe uppercase">
                Featured Products
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.08] font-medium text-charcoal md:text-5xl">
              The ritual continues <span className="italic">at home</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 text-[15px] leading-relaxed font-light text-taupe">
              A tightly curated shelf of clean, salon-grade formulas — the very
              same our artists reach for at the basin. Members enjoy 15% off,
              always.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <ul className="mt-9 divide-y divide-charcoal/10 border-y hairline">
              {PRODUCTS.map((p) => (
                <li
                  key={p.name}
                  className="group flex items-center justify-between gap-4 py-5 transition-all duration-300 hover:pl-2"
                >
                  <div>
                    <p className="font-serif text-[21px] leading-tight font-medium text-charcoal transition-colors duration-300 group-hover:text-metallic">
                      {p.name}
                    </p>
                    <p className="mt-0.5 text-[11.5px] font-light tracking-[0.18em] text-taupe uppercase">
                      {p.line}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-lg text-charcoal italic">
                      ${p.price}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-charcoal transition-all duration-500 group-hover:rotate-90 group-hover:border-metallic group-hover:bg-blush group-hover:text-metallic">
                      <Plus size={15} strokeWidth={1.5} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.34}>
            <button
              onClick={() => scrollToId("#booking")}
              className="group mt-9 inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.26em] text-charcoal uppercase"
            >
              <span className="link-lux">Visit the boutique</span>
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="text-metallic transition-transform duration-500 group-hover:translate-x-1.5"
              />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
