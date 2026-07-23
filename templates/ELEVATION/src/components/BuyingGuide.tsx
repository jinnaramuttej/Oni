import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { Search, FileText, Key, Handshake, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'We begin with an in-depth consultation to understand your vision, preferences, and investment goals.',
  },
  {
    icon: FileText,
    title: 'Curation',
    description: 'Our team curates a bespoke selection of properties, including off-market opportunities exclusive to our network.',
  },
  {
    icon: Handshake,
    title: 'Negotiation',
    description: 'Expert negotiation ensures you secure the best terms while navigating complex international transactions.',
  },
  {
    icon: Key,
    title: 'Acquisition',
    description: 'From closing to post-purchase concierge services, we manage every detail of your transition.',
  },
];

export default function BuyingGuide() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 bg-forest relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-3 text-gold-light text-[11px] md:text-[12px] font-semibold tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-gold-light" />
            The Journey
            <span className="w-8 h-px bg-gold-light" />
          </span>
          <h2 className="mt-6 font-serif text-white text-[32px] md:text-[42px] lg:text-[52px] leading-[1.1] font-light">
            Your Path to Extraordinary
          </h2>
          <p className="mt-6 text-white/50 text-base md:text-lg leading-relaxed font-light">
            Our proven four-step process ensures a seamless acquisition experience, from initial consultation to handing you the keys.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-16 md:mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={cn(
                'relative p-8 rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-700 hover:border-gold/30 hover:bg-white/10 group',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Step Number */}
              <span className="absolute top-6 right-6 font-serif text-3xl text-white/10 font-medium">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-6 group-hover:bg-gold/25 transition-colors">
                <step.icon className="w-5 h-5 text-gold" />
              </div>

              <h3 className="font-serif text-xl text-white font-medium">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] text-white/50 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <a
            href="#consultation"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-white text-[12px] font-semibold tracking-[0.12em] uppercase px-8 py-4 rounded-[16px] transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 group"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
