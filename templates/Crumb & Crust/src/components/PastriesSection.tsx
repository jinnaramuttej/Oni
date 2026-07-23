import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { pastries } from '../data/products';

export default function PastriesSection() {
  return (
    <section className="py-20 lg:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          subtitle="Morning Ritual"
          title="Fresh Pastries"
          description="Baked before dawn and ready by 7 AM. Our viennoiserie is crafted with imported French butter for unmistakable richness."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pastries.map((pastry, i) => (
            <ProductCard key={pastry.id} product={pastry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
