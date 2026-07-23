import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

const plans = [
  {
    name: 'Gentle Start',
    price: '89',
    period: '/month',
    description: 'Perfect for those beginning their wellness journey.',
    features: [
      '4 classes per month',
      'Access to meditation library',
      '1 guest pass per month',
      'Mat storage',
      '10% off workshops',
    ],
    featured: false,
  },
  {
    name: 'Steady Practice',
    price: '149',
    period: '/month',
    description: 'For dedicated practitioners seeking consistency.',
    features: [
      '12 classes per month',
      'Unlimited meditation sessions',
      '3 guest passes per month',
      'Mat & towel service',
      '15% off workshops & retreats',
      'Priority booking',
    ],
    featured: true,
  },
  {
    name: 'Full Immersion',
    price: '219',
    period: '/month',
    description: 'Complete access for those fully committed to their practice.',
    features: [
      'Unlimited classes',
      'Unlimited meditation & breathwork',
      'Unlimited guest passes',
      'Premium mat & towel service',
      '20% off workshops & retreats',
      'Private locker',
      'Monthly 1-on-1 session',
    ],
    featured: false,
  },
];

export default function Membership() {
  return (
    <section id="membership" className="py-24 md:py-32 px-6 lg:px-10 bg-sand/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Membership
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            Invest in your well-being.
          </h2>
          <p className="text-charcoal/50 mt-4 font-light max-w-lg mx-auto">
            Simple, transparent pricing. No hidden fees. Pause or cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={cn(
                'relative rounded-[1.75rem] p-8 lg:p-10 flex flex-col',
                plan.featured
                  ? 'bg-eucalyptus text-ivory shadow-[0_16px_48px_rgba(127,145,114,0.2)] scale-[1.02]'
                  : 'bg-ivory text-charcoal border border-stone/20 shadow-[0_4px_24px_rgba(64,64,64,0.03)]'
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-clay text-ivory text-[0.625rem] tracking-[0.1em] uppercase font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className={cn('font-serif text-2xl font-light mb-1', plan.featured ? 'text-ivory' : 'text-charcoal')}>
                {plan.name}
              </h3>
              <p className={cn('text-sm font-light mb-6', plan.featured ? 'text-ivory/70' : 'text-charcoal/50')}>
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="font-serif text-4xl lg:text-5xl font-light">${plan.price}</span>
                <span className={cn('text-sm font-light ml-1', plan.featured ? 'text-ivory/60' : 'text-charcoal/40')}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className={cn(
                        'shrink-0 mt-0.5',
                        plan.featured ? 'text-ivory/80' : 'text-eucalyptus'
                      )}
                    />
                    <span className={cn('text-sm font-light', plan.featured ? 'text-ivory/80' : 'text-charcoal/60')}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className={cn(
                  'block text-center py-3.5 rounded-[20px] text-sm font-medium tracking-[0.03em] transition-all duration-300',
                  plan.featured
                    ? 'bg-ivory text-eucalyptus hover:bg-ivory/90 hover:shadow-[0_4px_20px_rgba(250,248,245,0.3)]'
                    : 'bg-eucalyptus text-ivory hover:bg-sage-dark hover:shadow-[0_4px_20px_rgba(127,145,114,0.25)]'
                )}
              >
                Choose {plan.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
