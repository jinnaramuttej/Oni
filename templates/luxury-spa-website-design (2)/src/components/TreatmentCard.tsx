import { motion } from 'framer-motion';
import { IMAGES } from '../data/content';

interface TreatmentCardProps {
  name: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  index?: number;
}

export default function TreatmentCard({
  name,
  duration,
  price,
  description,
  image,
  index = 0,
}: TreatmentCardProps) {
  const imgSrc = IMAGES[image as keyof typeof IMAGES] || image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-white rounded-[24px] overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-700 border border-stone-light/50"
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-7 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-serif text-xl md:text-[1.35rem] font-light text-charcoal leading-snug">
            {name}
          </h3>
          <span className="font-serif text-xl text-champagne font-light shrink-0">
            ${price}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <svg className="w-3.5 h-3.5 text-stone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="text-xs text-charcoal-light tracking-wide">{duration}</span>
        </div>

        <p className="text-sm text-charcoal-light font-light leading-relaxed mb-6">
          {description}
        </p>

        <a
          href="#booking"
          className="inline-flex items-center gap-2 text-champagne text-sm font-medium tracking-wide group-hover:gap-3 transition-all duration-500"
        >
          Reserve
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
