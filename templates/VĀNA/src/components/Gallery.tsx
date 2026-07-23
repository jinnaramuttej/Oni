import React from "react";
import { motion } from "framer-motion";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  span: string;
  caption: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/tea-ritual.jpg",
    alt: "Mindful tea ceremony ritual",
    span: "md:col-span-8 md:row-span-2",
    caption: "Post-practice organic herbal tea rituals",
  },
  {
    id: "g2",
    src: "/images/meditation.jpg",
    alt: "Meditation with singing bowls",
    span: "md:col-span-4 md:row-span-1",
    caption: "Tibetan singing bowl acoustic therapies",
  },
  {
    id: "g3",
    src: "/images/studio-interior.jpg",
    alt: "Sunlight diffusing through wooden studio",
    span: "md:col-span-4 md:row-span-1",
    caption: "Sun-drenched, natural oak studio floors",
  },
  {
    id: "g4",
    src: "/images/hero-yoga.jpg",
    alt: "Sunrise outdoor yoga practice",
    span: "md:col-span-6 md:row-span-1",
    caption: "Sunrise outdoor decks overlooking misty mountains",
  },
  {
    id: "g5",
    src: "/images/retreat.jpg",
    alt: "Minimalist wooden retreat cabin",
    span: "md:col-span-6 md:row-span-1",
    caption: "Secluded nature retreat sanctuaries",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-24 md:py-32 bg-ivory text-charcoal relative overflow-hidden paper-texture"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
            Studio Gallery
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
            Glimpses of our sanctuary
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
            A visual journey through Vāna. Every corner is crafted with natural elements to nourish your senses and encourage deep, intentional presence.
          </p>
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[250px] md:auto-rows-[300px]">
          {GALLERY_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${item.span} group relative rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500`}
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              />

              {/* Elegant Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-ivory">
                <p className="font-serif text-lg italic font-light">
                  {item.caption}
                </p>
                <span className="text-[10px] tracking-widest uppercase text-sand mt-1 font-sans">
                  Vāna Sanctuary
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
