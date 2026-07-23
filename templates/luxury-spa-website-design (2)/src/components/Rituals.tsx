import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import { IMAGES } from '../data/content';

const rituals = [
  {
    time: 'Morning',
    name: 'Dawn Awakening',
    description: 'Begin with guided breathwork, warm herbal elixir, and a gentle full-body dry brush to stimulate circulation.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    time: 'Midday',
    name: 'Deep Restoration',
    description: 'A two-hour combination of thermal bathing, signature massage, and meditation to release accumulated tension.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    time: 'Afternoon',
    name: 'Renewal Hour',
    description: 'Purifying facial treatment paired with scalp massage and warm oil therapy for skin and spirit renewal.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    time: 'Evening',
    name: 'Twilight Surrender',
    description: 'Close your day with candlelit aromatherapy, sound healing, and a calming cup of chamomile with gold flakes.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
];

export default function Rituals() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-warm-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, currentColor 35px, currentColor 36px)',
          color: '#C9A96E',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div>
            <FadeIn>
              <span className="inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase text-champagne mb-4">
                Wellness Rituals
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight mb-6">
                A Day of Intentional Living
              </h2>
              <p className="text-charcoal-light text-base font-light leading-relaxed mb-12 max-w-md">
                Our curated daily rituals guide you through a transformative journey from dawn to dusk,
                honoring the body's natural rhythms and cycles.
              </p>
            </FadeIn>

            <div className="space-y-8">
              {rituals.map((ritual, i) => (
                <motion.div
                  key={ritual.time}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center shrink-0 text-champagne group-hover:bg-champagne group-hover:text-white transition-all duration-500">
                    {ritual.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-champagne">
                      {ritual.time}
                    </span>
                    <h3 className="font-serif text-xl font-light text-charcoal mt-0.5 mb-1.5">
                      {ritual.name}
                    </h3>
                    <p className="text-sm text-charcoal-light font-light leading-relaxed">
                      {ritual.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image grid */}
          <FadeIn direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-[20px] overflow-hidden">
                  <img
                    src={IMAGES.nature}
                    alt="Wellness in nature"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-square rounded-[20px] overflow-hidden">
                  <img
                    src={IMAGES.oils}
                    alt="Essential oils"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-[20px] overflow-hidden">
                  <img
                    src={IMAGES.spaCandles}
                    alt="Spa ambiance"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-[3/4] rounded-[20px] overflow-hidden">
                  <img
                    src={IMAGES.facial1}
                    alt="Facial treatment"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
