import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

const retreats = [
  {
    title: 'Coastal Silence',
    location: 'Big Sur, California',
    date: 'June 12–16, 2026',
    capacity: '12 guests',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    description: 'Five days of yoga, meditation, and ocean immersion on the dramatic California coastline.',
  },
  {
    title: 'Mountain Stillness',
    location: 'Swiss Alps, Switzerland',
    date: 'August 20–26, 2026',
    capacity: '10 guests',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'A week-long alpine retreat combining mountain hikes with restorative yoga and breathwork.',
  },
  {
    title: 'Forest Awakening',
    location: 'Kyoto, Japan',
    date: 'October 5–12, 2026',
    capacity: '8 guests',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=800&q=80',
    description: 'An intimate Japanese forest bathing and zen meditation retreat in ancient temple grounds.',
  },
];

export default function Retreats() {
  return (
    <section id="retreats" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Wellness Retreats
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            Step away to come home to yourself.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {retreats.map((retreat, i) => (
            <motion.div
              key={retreat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group bg-ivory rounded-[1.5rem] overflow-hidden border border-stone/20 hover:border-sage/30 transition-all duration-500 hover:shadow-[0_12px_48px_rgba(64,64,64,0.06)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="p-6 lg:p-7">
                <h3 className="font-serif text-xl text-charcoal font-light mb-2">{retreat.title}</h3>
                <p className="text-charcoal/55 text-sm leading-relaxed font-light mb-5">{retreat.description}</p>

                <div className="flex flex-col gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 text-[0.6875rem] text-charcoal/50 font-medium tracking-[0.03em]">
                    <MapPin size={13} className="text-sage" />
                    {retreat.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[0.6875rem] text-charcoal/50 font-medium tracking-[0.03em]">
                    <Calendar size={13} className="text-sage" />
                    {retreat.date}
                  </span>
                  <span className="inline-flex items-center gap-2 text-[0.6875rem] text-charcoal/50 font-medium tracking-[0.03em]">
                    <Users size={13} className="text-sage" />
                    {retreat.capacity}
                  </span>
                </div>

                <a
                  href="#contact"
                  className="inline-block text-sm font-medium tracking-[0.03em] text-eucalyptus hover:text-sage-dark transition-colors duration-300"
                >
                  Request Details →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
