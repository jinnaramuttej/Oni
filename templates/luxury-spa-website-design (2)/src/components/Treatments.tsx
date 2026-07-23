import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './SectionLabel';
import TreatmentCard from './TreatmentCard';
import { TREATMENTS } from '../data/content';
import { cn } from '../utils/cn';

const CATEGORIES = [
  { key: 'signature', label: 'Signature' },
  { key: 'massage', label: 'Massage' },
  { key: 'facial', label: 'Facial' },
  { key: 'body', label: 'Body' },
  { key: 'aromatherapy', label: 'Aromatherapy' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

export default function Treatments() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('signature');

  const treatments = TREATMENTS[activeCategory];

  return (
    <section id="treatments" className="py-24 md:py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel
          label="Our Treatments"
          title="Curated for Your Renewal"
          description="Each treatment is a composition — thoughtfully designed, beautifully executed, and deeply personal. Discover the ritual that speaks to you."
        />

        {/* Category Tabs */}
        <div className="mt-14 flex items-center justify-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                'px-6 py-2.5 rounded-full text-sm font-light tracking-wide transition-all duration-500 cursor-pointer',
                activeCategory === cat.key
                  ? 'bg-champagne text-white shadow-sm'
                  : 'text-charcoal-light hover:text-charcoal hover:bg-white/60'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatment Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {treatments.map((treatment, i) => (
              <TreatmentCard key={treatment.name} {...treatment} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
