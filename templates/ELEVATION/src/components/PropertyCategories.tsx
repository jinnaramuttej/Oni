import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { propertyCategories } from '../data';
import { Waves, Building2, Landmark, Home, TreePine, Mountain } from 'lucide-react';
import SectionHeader from './SectionHeader';

const categoryIcons = [Waves, Building2, Landmark, Home, TreePine, Mountain];

export default function PropertyCategories() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Property Types"
          title="Explore by Category"
          description="From waterfront estates to modern penthouses, find the property type that matches your lifestyle."
        />

        <div
          ref={ref}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {propertyCategories.map((cat, i) => {
            const Icon = categoryIcons[i];
            return (
              <a
                key={cat.name}
                href="#"
                className={cn(
                  'group relative flex flex-col items-center text-center p-6 md:p-8 rounded-[20px] border border-stone/50 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1',
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-stone-light flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-forest group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="mt-4 font-serif text-base md:text-lg font-medium text-charcoal leading-tight">
                  {cat.name}
                </h3>
                <span className="mt-2 text-[12px] text-slate">
                  {cat.count} properties
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
