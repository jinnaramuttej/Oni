import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { PACKAGES } from '../data/content';
import { cn } from '../utils/cn';

export default function Packages() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel
          label="Spa Packages"
          title="Complete Wellness Journeys"
          description="Immersive packages designed for those who seek more than a treatment — an entire day of restoration, nourishment, and renewal."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={cn(
                'relative rounded-[24px] p-8 md:p-10 transition-all duration-500',
                pkg.popular
                  ? 'bg-charcoal text-white shadow-[0_8px_40px_rgba(0,0,0,0.15)]'
                  : 'bg-white border border-stone-light/50 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-champagne text-white text-[10px] font-medium tracking-[0.15em] uppercase px-5 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="text-center mb-8">
                <h3 className={cn(
                  'font-serif text-2xl font-light mb-1',
                  pkg.popular ? 'text-white' : 'text-charcoal'
                )}>
                  {pkg.name}
                </h3>
                <p className={cn(
                  'text-xs tracking-wide',
                  pkg.popular ? 'text-white/50' : 'text-charcoal-light'
                )}>
                  {pkg.duration}
                </p>
              </div>

              <div className="text-center mb-8">
                <span className={cn(
                  'font-serif text-5xl font-light',
                  pkg.popular ? 'text-champagne-light' : 'text-champagne'
                )}>
                  ${pkg.price}
                </span>
                <span className={cn(
                  'text-xs ml-1',
                  pkg.popular ? 'text-white/40' : 'text-charcoal-light'
                )}>
                  per person
                </span>
              </div>

              <div className={cn(
                'border-t pt-8 space-y-4',
                pkg.popular ? 'border-white/10' : 'border-stone-light'
              )}>
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <svg
                      className={cn('w-4 h-4 mt-0.5 shrink-0', pkg.popular ? 'text-champagne-light' : 'text-champagne')}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span className={cn(
                      'text-sm font-light',
                      pkg.popular ? 'text-white/75' : 'text-charcoal-light'
                    )}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#booking"
                className={cn(
                  'mt-10 block w-full text-center py-4 rounded-[20px] text-sm font-medium tracking-wide transition-all duration-500',
                  pkg.popular
                    ? 'bg-champagne text-white hover:bg-champagne-light shadow-lg'
                    : 'border border-champagne text-champagne hover:bg-champagne hover:text-white'
                )}
              >
                Reserve Package
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
