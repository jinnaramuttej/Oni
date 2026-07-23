import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ShoppingBag } from 'lucide-react';
import { cn } from '../utils/cn';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
  layout?: 'vertical' | 'horizontal';
}

const badgeStyles = {
  bestseller: 'bg-caramel/90 text-white',
  seasonal: 'bg-blush/90 text-chocolate',
  new: 'bg-gold/90 text-white',
};

const badgeLabels = {
  bestseller: 'Bestseller',
  seasonal: 'Seasonal',
  new: 'New',
};

export default function ProductCard({ product, index = 0, layout = 'vertical' }: ProductCardProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  if (layout === 'horizontal') {
    return (
      <div
        ref={ref}
        className={cn(
          'group flex flex-col sm:flex-row gap-5 bg-white rounded-[22px] overflow-hidden shadow-[0_2px_20px_rgba(90,58,41,0.06)] hover:shadow-[0_8px_40px_rgba(90,58,41,0.1)] transition-all duration-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="relative sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <span className={cn(
              'absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium',
              badgeStyles[product.badge]
            )}>
              {badgeLabels[product.badge]}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center p-5 sm:py-6 flex-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-caramel/80 font-medium">{product.category}</span>
          <h3 className="mt-1.5 font-serif text-xl text-chocolate">{product.name}</h3>
          <p className="mt-2 text-sm text-warm-gray font-light leading-relaxed">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-serif text-xl text-caramel">{product.price}</span>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-[14px] bg-cream text-chocolate text-sm font-medium hover:bg-caramel hover:text-white transition-all duration-300">
              <ShoppingBag size={14} />
              Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'group bg-white rounded-[22px] overflow-hidden shadow-[0_2px_20px_rgba(90,58,41,0.06)] hover:shadow-[0_8px_40px_rgba(90,58,41,0.1)] transition-all duration-500 hover:-translate-y-1',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {product.badge && (
          <span className={cn(
            'absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium backdrop-blur-sm',
            badgeStyles[product.badge]
          )}>
            {badgeLabels[product.badge]}
          </span>
        )}

        {/* Quick add overlay */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-chocolate hover:bg-caramel hover:text-white transition-all duration-300">
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <span className="text-[10px] uppercase tracking-[0.2em] text-caramel/80 font-medium">{product.category}</span>
        <h3 className="mt-1.5 font-serif text-lg lg:text-xl text-chocolate group-hover:text-caramel transition-colors duration-300">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-warm-gray font-light leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-beige/40">
          <span className="font-serif text-xl text-caramel">{product.price}</span>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-[14px] bg-cream text-chocolate text-sm font-medium hover:bg-caramel hover:text-white transition-all duration-300">
            <ShoppingBag size={14} />
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
