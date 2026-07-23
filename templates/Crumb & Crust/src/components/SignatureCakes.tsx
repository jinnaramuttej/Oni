import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { signatureCakes } from '../data/products';

export default function SignatureCakes() {
  return (
    <section id="menu" className="py-20 lg:py-32 bg-cream texture-linen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Creations"
          title="Signature Cakes"
          description="Each cake is a masterpiece of flavor and design, handcrafted to make your celebrations unforgettable."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {signatureCakes.map((cake, i) => (
            <ProductCard key={cake.id} product={cake} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
