import ProductCard from './ProductCard';
import { breads } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';

export default function ArtisanBreads() {
  const { ref: bannerRef, isVisible: bannerVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-32 bg-cream texture-paper">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial Banner */}
        <div
          ref={bannerRef}
          className={cn(
            'mb-16 lg:mb-20 rounded-[28px] overflow-hidden relative transition-all duration-700',
            bannerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <img
            src="https://images.pexels.com/photos/30903776/pexels-photo-30903776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400"
            alt="Artisan bread loaves on wooden boards"
            loading="lazy"
            className="w-full h-64 lg:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-16">
            <div className="max-w-md">
              <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-medium">From Our Oven</span>
              <h2 className="mt-3 font-serif text-3xl lg:text-5xl text-ivory leading-tight">
                Artisan Breads
              </h2>
              <p className="mt-3 text-white/60 font-light text-sm lg:text-base">
                Slow-fermented with wild yeast starters, stone-milled flours, and the patience that great bread demands.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {breads.map((bread, i) => (
            <ProductCard key={bread.id} product={bread} index={i} layout="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
