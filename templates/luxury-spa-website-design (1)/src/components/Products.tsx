import { ArrowRight } from 'lucide-react';

const products = [
  { name: 'Golden Rose Facial Serum', volume: '30ml', price: '$148', desc: 'A luminous blend of rosehip oil, vitamin C, and gold-infused botanical extracts.', tag: 'Best Seller' },
  { name: 'Stone Bath Ritual Set', volume: '360ml', price: '$92', desc: 'Natural sea salt, organic essential oils, and healing clay for the perfect soak.', tag: 'New' },
  { name: 'Essential Oil Collection', volume: '3 x 15ml', price: '$135', desc: 'Hand-blended aromatherapy oils: Serenity, Clarity, and Deep Restoration.', tag: 'Limited' },
];

export default function Products() {
  return (
    <section className="relative bg-ivory overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-stone/20 -translate-y-1/3 translate-x-1/4 blur-3xl" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-32 lg:pt-44 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(59,59,59,0.12)]">
              <img
                src="/images/products.jpg"
                alt="Luxury spa skincare products"
                className="w-full h-[480px] lg:h-[640px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 lg:pt-8">
            <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">Curated Wellness</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.025em] text-charcoal mb-6">
              Premium <span className="italic">Skincare</span>
            </h2>
            <div className="w-14 h-[1px] bg-champagne/40 mb-8" />
            <p className="text-charcoal-soft text-[15px] leading-[1.8] font-light font-sans mb-10 max-w-lg">
              Extend the spa experience into your daily ritual. Each product is formulated with 
              certified organic ingredients, sustainably sourced essential oils, and no synthetic fragrances.
            </p>

            <div className="space-y-6">
              {products.map((p) => (
                <div key={p.name} className="group bg-warm-white rounded-[24px] p-7 lg:p-8 border border-stone/20 hover:border-champagne/20 shadow-[0_10px_30px_-15px_rgba(59,59,59,0.06)] hover:shadow-[0_20px_50px_-20px_rgba(59,59,59,0.1)] transition-all duration-500">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-[1.15rem] text-charcoal tracking-tight">{p.name}</h3>
                        <span className="text-[9px] tracking-[0.15em] uppercase bg-champagne/10 text-champagne font-medium px-2.5 py-0.5 rounded-full">{p.tag}</span>
                      </div>
                      <p className="text-[13px] text-charcoal-soft font-light leading-relaxed mb-3">{p.desc}</p>
                      <div className="flex items-center gap-4 text-[11px] tracking-[0.1em] text-charcoal/50 font-medium">
                        <span>Volume: {p.volume}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <span className="font-display text-[1.25rem] text-charcoal">{p.price}</span>
                      <a href="#booking" className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-champagne font-medium hover:text-rose-wood transition-colors">
                        Add <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
