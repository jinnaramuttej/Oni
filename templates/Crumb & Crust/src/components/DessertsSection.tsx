import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { desserts } from '../data/products';

export default function DessertsSection() {
  return (
    <section className="py-20 lg:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          subtitle="Sweet Indulgences"
          title="Cookies & Desserts"
          description="From gooey cinnamon rolls to delicate tarts, our dessert collection is crafted for pure indulgence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {desserts.map((dessert, i) => (
            <ProductCard key={dessert.id} product={dessert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
