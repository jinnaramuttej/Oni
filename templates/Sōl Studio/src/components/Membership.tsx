import { Check } from 'lucide-react';
import { MEMBERSHIPS } from '../data/content';
import RevealSection from './RevealSection';

export default function Membership() {
  return (
    <section id="membership" className="bg-sand py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Membership</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Invest in<br />
              <span className="italic">Your Well-being</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-charcoal-light/80">
              Choose the membership that aligns with your practice. Every option includes 
              access to our beautiful space, premium props, and our welcoming community.
            </p>
          </div>
        </RevealSection>

        <div className="grid gap-8 md:grid-cols-3 items-start">
          {MEMBERSHIPS.map((plan, i) => (
            <RevealSection key={plan.name} delay={i * 150}>
              <div
                className={`rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                  plan.featured
                    ? 'bg-charcoal text-white shadow-[0_8px_40px_rgba(0,0,0,0.15)] ring-1 ring-charcoal'
                    : 'bg-ivory shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]'
                }`}
              >
                {plan.featured && (
                  <span className="inline-block rounded-full bg-eucalyptus/20 px-4 py-1.5 text-[10px] font-light tracking-widest uppercase text-sage-light mb-4">
                    Most Popular
                  </span>
                )}

                <h3 className="font-serif text-2xl font-light mb-2">{plan.name}</h3>
                <p className={`text-sm font-light mb-6 ${plan.featured ? 'text-white/60' : 'text-charcoal-light/60'}`}>
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="font-serif text-5xl font-light">{plan.price}</span>
                  <span className={`ml-2 text-sm font-light ${plan.featured ? 'text-white/50' : 'text-charcoal-light/50'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        strokeWidth={1.5}
                        className={`mt-0.5 flex-shrink-0 ${plan.featured ? 'text-sage-light' : 'text-eucalyptus'}`}
                      />
                      <span className={`text-sm font-light ${plan.featured ? 'text-white/80' : 'text-charcoal-light/80'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-2xl py-3.5 text-[12px] font-light tracking-widest uppercase transition-all ${
                    plan.featured
                      ? 'bg-white text-charcoal hover:bg-sage-light'
                      : 'border border-stone text-charcoal hover:bg-eucalyptus hover:text-white hover:border-eucalyptus'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
