import { ArrowRight, ShieldCheck, Crown, Diamond } from 'lucide-react';

const memberships = [
  {
    name: 'Essence',
    price: '$195',
    period: 'per month',
    description: 'Two signature treatments monthly, priority booking, and 15% off spa products.',
    features: ['2 Treatments / Month', 'Priority Booking', '15% Product Discount', 'Spa Lounge Access'],
    icon: ShieldCheck,
    highlight: false,
  },
  {
    name: 'Serenity',
    price: '$450',
    period: 'per month',
    description: 'Unlimited massage therapies, weekly facials, and full wellness ritual access.',
    features: ['Unlimited Massage', 'Weekly Facials', 'Full Ritual Access', 'Private Consultation', 'Guest Pass (2x/month)'],
    icon: Crown,
    highlight: true,
  },
  {
    name: 'Lumina',
    price: '$880',
    period: 'per month',
    description: 'Complete wellness immersion including all treatments, private therapist, and personal wellness plan.',
    features: ['All Treatments Included', 'Dedicated Therapist', 'Personal Wellness Plan', 'Private Suite Access', 'Unlimited Products'],
    icon: Diamond,
    highlight: false,
  },
];

export default function Memberships() {
  return (
    <section id="memberships" className="bg-cream overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-32 lg:pt-44 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">Wellness Membership</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em] text-charcoal mb-6">
            A Lifetime of <span className="italic">Well-Being</span>
          </h2>
          <p className="text-charcoal-soft text-[15px] leading-[1.8] font-light font-sans">
            Choose the rhythm that suits your life. Each membership is a commitment to your own renewal, 
            guided by our therapists and guided by nature.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {memberships.map((m) => (
            <div
              key={m.name}
              className={`relative rounded-[28px] overflow-hidden transition-all duration-700 hover:-translate-y-1 ${
                m.highlight
                  ? 'bg-charcoal text-ivory shadow-[0_30px_80px_-25px_rgba(59,59,59,0.35)] scale-[1.02] md:scale-100 md:hover:scale-[1.02] border border-charcoal/10'
                  : 'bg-ivory text-charcoal shadow-[0_20px_60px_-20px_rgba(59,59,59,0.08)] border border-stone/20 hover:border-champagne/20 hover:shadow-[0_30px_80px_-25px_rgba(59,59,59,0.14)]'
              }`}
            >
              {m.highlight && (
                <div className="absolute top-0 right-0 bg-champagne text-charcoal text-[9px] tracking-[0.2em] uppercase font-bold px-4 py-1.5 rounded-bl-[20px]">Most Popular</div>
              )}

              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${m.highlight ? 'bg-champagne text-charcoal' : 'bg-champagne/10 text-champagne'}`}>
                    <m.icon size={20} strokeWidth={1.2} />
                  </div>
                  <h3 className="font-display text-[1.5rem] tracking-tight">{m.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="font-display text-[2.75rem] leading-none tracking-[-0.03em]">{m.price}</span>
                  <span className={`text-[11px] tracking-[0.1em] ml-1 ${m.highlight ? 'text-ivory/50' : 'text-charcoal/40'}`}>{m.period}</span>
                </div>

                <p className={`text-[14px] leading-[1.75] font-light font-sans mb-8 ${m.highlight ? 'text-ivory/70' : 'text-charcoal-soft'}`}>
                  {m.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {m.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[13px] font-light font-sans">
                      <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${m.highlight ? 'bg-ivory/15 text-ivory' : 'bg-champagne/10 text-champagne'}`}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 3.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className={m.highlight ? 'text-ivory/90' : 'text-charcoal-soft'}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  className={`inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5 ${
                    m.highlight
                      ? 'bg-ivory text-charcoal hover:bg-champagne hover:shadow-[0_8px_25px_rgba(201,169,110,0.3)]'
                      : 'bg-charcoal text-ivory hover:bg-champagne hover:shadow-[0_8px_25px_rgba(201,169,110,0.3)]'
                  }`}
                >
                  Join Membership <ArrowRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
