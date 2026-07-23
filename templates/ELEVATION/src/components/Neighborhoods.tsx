import { neighborhoods } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { MapPin, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function Neighborhoods() {
  const { ref, isInView } = useInView();

  return (
    <section id="neighborhoods" className="py-24 md:py-32 bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Luxury Neighborhoods"
          title="Premier Locations"
          description="Explore the most sought-after neighborhoods where prestige, privacy, and architectural excellence converge."
        />

        <div
          ref={ref}
          className="mt-16 md:mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {neighborhoods.map((hood, i) => (
            <a
              key={hood.name}
              href="#"
              className={cn(
                'group relative rounded-[20px] overflow-hidden aspect-[3/4] transition-all duration-700',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <img
                src={hood.image}
                alt={hood.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="flex items-center gap-2 text-gold text-[11px] tracking-[0.15em] uppercase font-medium">
                  <MapPin className="w-3 h-3" />
                  {hood.location}
                </div>
                <h3 className="mt-2 font-serif text-2xl md:text-[28px] font-medium text-white leading-tight">
                  {hood.name}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-white/60 text-[12px]">
                    <span className="text-white font-medium">{hood.properties}</span> properties from{' '}
                    <span className="text-gold">{hood.priceFrom}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
