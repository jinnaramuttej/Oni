import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { Calendar, ArrowRight } from 'lucide-react';

export default function SeasonalSpecials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-32 bg-chocolate texture-paper relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-gold/5" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-gold/5" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Calendar size={14} className="text-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold/80 font-light">
                Limited Time
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight">
              Summer Berry<br />
              <span className="italic text-gold">Collection</span>
            </h2>
            <p className="mt-6 text-white/50 font-light leading-relaxed max-w-md">
              Celebrate the season with our curated selection of berry-forward pastries, 
              cakes, and tarts featuring fresh strawberries, blueberries, and raspberries 
              sourced from local farms.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Strawberry Chiffon Layer Cake — $62',
                'Mixed Berry Galette — $32',
                'Blueberry Lavender Scones — $5.50',
                'Raspberry Rose Macarons (box of 12) — $28',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                  <span className="text-sm text-white/70 font-light">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#order"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-[20px] bg-gold text-chocolate font-medium text-sm hover:bg-ivory transition-all duration-300 group"
            >
              Order Seasonal Specials
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <img
                src="https://images.pexels.com/photos/29039083/pexels-photo-29039083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800"
                alt="Raspberry dessert with sugar topping"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            {/* Price badge */}
            <div className="absolute -top-4 -right-4 lg:top-6 lg:-right-6 w-24 h-24 rounded-full bg-gold flex flex-col items-center justify-center shadow-lg">
              <span className="text-[10px] uppercase tracking-wider text-chocolate/70">From</span>
              <span className="font-serif text-xl text-chocolate">$5.50</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
