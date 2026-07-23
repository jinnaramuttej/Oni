import SectionHeader from './SectionHeader';
import PropertyCard from './PropertyCard';
import { soldProperties } from '../data';

export default function RecentlySold() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Track Record"
          title="Recently Sold"
          description="A selection of recently completed transactions, demonstrating our expertise in marketing and negotiating the world's most significant properties."
        />

        <div className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6 md:gap-8">
          {soldProperties.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={i}
              variant="sold"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
