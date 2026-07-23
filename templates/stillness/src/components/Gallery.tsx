import { motion } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80', alt: 'Sunrise yoga practice', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1593810450967-f9df42719f0d?w=400&q=80', alt: 'Meditation in natural light', span: '' },
  { src: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&q=80', alt: 'Wooden studio interior', span: '' },
  { src: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&q=80', alt: 'Yin yoga session', span: '' },
  { src: 'https://images.unsplash.com/photo-1603988360871-3077e38c6a47?w=400&q=80', alt: 'Indoor plants and yoga mats', span: '' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', alt: 'Group mindfulness', span: 'col-span-2' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 px-6 lg:px-10 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Our Space
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            A glimpse inside the stillness.
          </h2>
        </motion.div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5 auto-rows-[180px] md:auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-[1.25rem] group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
