import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { PRODUCTS, IMAGES } from '../data/content';

export default function Products() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel
          label="The Collection"
          title="Premium Skincare"
          description="Extend the spa experience into your daily ritual. Our curated skincare line uses the same organic botanicals and pure extracts from our treatment rooms."
        />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((product, i) => {
            const imgSrc = IMAGES[product.image as keyof typeof IMAGES];
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-square rounded-[20px] overflow-hidden bg-white mb-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] text-champagne tracking-[0.15em] uppercase font-medium">
                  {product.category}
                </span>
                <h3 className="font-serif text-lg font-light text-charcoal mt-1 mb-1">
                  {product.name}
                </h3>
                <span className="text-sm text-charcoal-light font-light">${product.price}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
