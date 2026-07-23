import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-label="Call to action">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/20185389/pexels-photo-20185389.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1920"
          alt="Classical courthouse architecture"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-midnight/90" />
      </div>

      <div ref={ref} className={`relative z-10 mx-auto max-w-3xl px-6 lg:px-12 text-center ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="gold-line" />
          <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gold">Take the First Step</span>
          <div className="gold-line" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-ivory">
          Your Legal Strategy Begins With a <span className="text-gold">Conversation</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ivory/60 max-w-2xl mx-auto">
          Whether you are facing a complex legal challenge or seeking proactive counsel, 
          our attorneys are ready to provide the strategic guidance you need.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#consultation"
            className="group flex items-center gap-3 rounded-[14px] bg-gold px-8 py-4 text-[14px] font-semibold tracking-[0.06em] uppercase text-midnight transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
          >
            Schedule a Consultation
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+12125551234"
            className="rounded-[14px] border border-white/20 px-8 py-4 text-[14px] font-medium tracking-[0.06em] uppercase text-ivory/80 transition-all duration-300 hover:border-gold/50 hover:text-gold"
          >
            Call (212) 555-1234
          </a>
        </div>
      </div>
    </section>
  );
}
