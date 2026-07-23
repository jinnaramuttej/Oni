import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { MEMBERSHIPS } from '../data/content';
import { cn } from '../utils/cn';

export default function Membership() {
  return (
    <section id="membership" className="py-24 md:py-32 lg:py-40 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel
          label="Membership"
          title="An Ongoing Commitment to You"
          description="For those who embrace wellness as a way of life. Exclusive memberships offering priority access, curated benefits, and a deeper relationship with your wellbeing."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {MEMBERSHIPS.map((mem, i) => (
            <motion.div
              key={mem.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={cn(
                'relative rounded-[24px] p-8 md:p-10 transition-all duration-500',
                mem.popular
                  ? 'bg-gradient-to-b from-champagne/10 to-champagne/5 border-2 border-champagne/30 shadow-[0_8px_40px_rgba(201,169,110,0.12)]'
                  : 'bg-white border border-stone-light/50 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
              )}
            >
              {mem.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-champagne text-white text-[10px] font-medium tracking-[0.15em] uppercase px-5 py-1.5 rounded-full">
                  Recommended
                </span>
              )}

              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                  {mem.tier}
                </h3>
              </div>

              <div className="text-center mb-8">
                <span className="font-serif text-5xl font-light text-champagne">
                  ${mem.monthly}
                </span>
                <span className="text-xs text-charcoal-light ml-1">/month</span>
              </div>

              <div className="border-t border-stone-light pt-8 space-y-4">
                {mem.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-champagne"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span className="text-sm font-light text-charcoal-light">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#booking"
                className={cn(
                  'mt-10 block w-full text-center py-4 rounded-[20px] text-sm font-medium tracking-wide transition-all duration-500',
                  mem.popular
                    ? 'bg-champagne text-white hover:bg-champagne-dark shadow-md'
                    : 'border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white'
                )}
              >
                Join {mem.tier}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
