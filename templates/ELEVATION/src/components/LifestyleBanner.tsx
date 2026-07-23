import { IMAGES } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';

export default function LifestyleBanner() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={IMAGES.waterfront2}
          alt="Luxury seaside villa with infinity pool"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      <div
        ref={ref}
        className={cn(
          'relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 text-center transition-all duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <span className="inline-flex items-center gap-3 text-gold-light text-[11px] md:text-[12px] font-semibold tracking-[0.25em] uppercase">
          <span className="w-8 h-px bg-gold-light" />
          The Art of Living
          <span className="w-8 h-px bg-gold-light" />
        </span>
        <blockquote className="mt-8 font-serif text-white text-[28px] md:text-[40px] lg:text-[52px] leading-[1.15] font-light max-w-4xl mx-auto italic">
          "A home should be a sanctuary that reflects the beauty of the life you have built."
        </blockquote>
        <div className="mt-8 flex justify-center gap-16 md:gap-24">
          {[
            { value: '$4.2B+', label: 'Total Sales Volume' },
            { value: '1,200+', label: 'Properties Sold' },
            { value: '98%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl text-gold font-medium">
                {stat.value}
              </span>
              <span className="mt-1 text-white/50 text-[10px] md:text-[11px] tracking-[0.15em] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
