import { Bed, Bath, Maximize, ArrowUpRight } from 'lucide-react';
import type { Property } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';

interface PropertyCardProps {
  property: Property;
  index?: number;
  variant?: 'default' | 'featured' | 'sold';
}

export default function PropertyCard({
  property,
  index = 0,
  variant = 'default',
}: PropertyCardProps) {
  const { ref, isInView } = useInView();

  return (
    <article
      ref={ref}
      className={cn(
        'group relative bg-white rounded-[20px] overflow-hidden transition-all duration-500',
        'shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)]',
        'hover:-translate-y-1',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className={cn(
        'relative overflow-hidden',
        variant === 'featured' ? 'aspect-[4/3]' : 'aspect-[16/10]'
      )}>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        {property.tag && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
            {property.tag}
          </span>
        )}

        {/* Sold Overlay */}
        {variant === 'sold' && (
          <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center">
            <span className="bg-charcoal/80 backdrop-blur-sm text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-6 py-2.5 rounded-full border border-white/20">
              Sold
            </span>
          </div>
        )}

        {/* Hover CTA */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <button className="bg-white text-charcoal p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl md:text-[22px] font-medium text-charcoal group-hover:text-forest transition-colors leading-tight">
              {property.title}
            </h3>
            <p className="mt-1 text-[13px] text-slate font-light tracking-wide">
              {property.location}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-stone/60">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl md:text-[22px] font-semibold text-charcoal">
              {property.price}
            </span>
            <div className="flex items-center gap-4 text-slate">
              <span className="flex items-center gap-1.5 text-[12px]">
                <Bed className="w-3.5 h-3.5" />
                {property.bedrooms}
              </span>
              <span className="flex items-center gap-1.5 text-[12px]">
                <Bath className="w-3.5 h-3.5" />
                {property.bathrooms}
              </span>
              <span className="flex items-center gap-1.5 text-[12px]">
                <Maximize className="w-3.5 h-3.5" />
                {property.area}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
