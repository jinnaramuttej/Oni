import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { Search, SlidersHorizontal, MapPin, DollarSign, Home, Bed } from 'lucide-react';

export default function AdvancedSearch() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-16 md:py-20 bg-stone-light">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div
          ref={ref}
          className={cn(
            'transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
                <span className="w-6 h-px bg-gold" />
                Find Your Home
              </span>
              <h2 className="mt-2 font-serif text-charcoal text-[28px] md:text-[36px] leading-[1.15] font-light">
                Advanced Search
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[12px] text-slate font-medium tracking-[0.08em] uppercase hover:text-gold transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
            </button>
          </div>

          <div className="bg-white rounded-[20px] p-4 md:p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Location */}
              <div className="relative">
                <label className="text-[10px] text-slate/60 font-semibold tracking-[0.1em] uppercase mb-2 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/30" />
                  <input
                    type="text"
                    placeholder="City or neighborhood"
                    className="w-full pl-10 pr-3 py-3 rounded-[12px] border border-stone/60 text-sm text-charcoal placeholder-slate/40 outline-none focus:border-gold/50 transition-colors bg-ivory/30"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-[10px] text-slate/60 font-semibold tracking-[0.1em] uppercase mb-2 block">Price Range</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/30" />
                  <select className="w-full pl-10 pr-3 py-3 rounded-[12px] border border-stone/60 text-sm text-charcoal outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer bg-ivory/30">
                    <option>Any Price</option>
                    <option>$1M - $5M</option>
                    <option>$5M - $10M</option>
                    <option>$10M - $25M</option>
                    <option>$25M - $50M</option>
                    <option>$50M+</option>
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="text-[10px] text-slate/60 font-semibold tracking-[0.1em] uppercase mb-2 block">Property Type</label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/30" />
                  <select className="w-full pl-10 pr-3 py-3 rounded-[12px] border border-stone/60 text-sm text-charcoal outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer bg-ivory/30">
                    <option>All Types</option>
                    <option>Villa</option>
                    <option>Penthouse</option>
                    <option>Estate</option>
                    <option>Waterfront</option>
                    <option>Chalet</option>
                  </select>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="text-[10px] text-slate/60 font-semibold tracking-[0.1em] uppercase mb-2 block">Bedrooms</label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/30" />
                  <select className="w-full pl-10 pr-3 py-3 rounded-[12px] border border-stone/60 text-sm text-charcoal outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer bg-ivory/30">
                    <option>Any</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                    <option>5+</option>
                    <option>7+</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full bg-charcoal hover:bg-forest text-white text-[12px] font-semibold tracking-[0.1em] uppercase py-3.5 rounded-[12px] transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
