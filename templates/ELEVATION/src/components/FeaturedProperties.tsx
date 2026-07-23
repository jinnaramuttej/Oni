import SectionHeader from './SectionHeader';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '../data';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProperties() {
  return (
    <section id="properties" className="py-24 md:py-32 bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Featured Collection"
          title="Exceptional Properties"
          description="A carefully curated selection of the finest residences available, each representing the pinnacle of architectural design and luxury living."
        />

        {/* Property Grid - Editorial Layout */}
        <div className="mt-16 md:mt-20">
          {/* Top Row: 2 large cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {featuredProperties.slice(0, 2).map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={i}
                variant="featured"
              />
            ))}
          </div>

          {/* Bottom Row: 3 cards (smaller) + 1 lifestyle panel */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8">
            {featuredProperties.slice(2, 5).map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={i + 2}
              />
            ))}
          </div>
        </div>

        {/* View All */}
        <div className="mt-12 md:mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-charcoal hover:text-gold text-[13px] font-semibold tracking-[0.1em] uppercase transition-colors group"
          >
            View All Properties
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
