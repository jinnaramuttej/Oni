import { ArrowRight, ChevronDown, Shield, Award, Lock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5673478/pexels-photo-5673478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Legal professionals collaborating in a modern boardroom"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/80 to-midnight/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-midnight/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="animate-fade-up mb-8 flex items-center gap-3">
            <div className="gold-line" />
            <span className="text-[13px] font-medium tracking-[0.2em] uppercase text-gold">
              Established 2003 · New York
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-200 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-semibold leading-[1.08] text-white">
            Trusted Legal
            <br />
            <span className="text-gold">Excellence</span> for
            <br />
            Complex Matters
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up delay-400 mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            Sterling & Associates delivers strategic counsel and exceptional
            representation across corporate, litigation, and regulatory matters.
            Our commitment to precision, discretion, and results has earned the
            trust of Fortune 500 companies and distinguished individuals worldwide.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-500 mt-10 flex flex-wrap gap-4">
            <a
              href="#consultation"
              className="group flex items-center gap-3 rounded-[14px] bg-gold px-8 py-4 text-[14px] font-semibold tracking-[0.06em] uppercase text-midnight transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
            >
              Schedule a Consultation
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#practice-areas"
              className="flex items-center gap-3 rounded-[14px] border border-white/20 px-8 py-4 text-[14px] font-medium tracking-[0.06em] uppercase text-white/90 transition-all duration-300 hover:border-gold/50 hover:text-gold"
            >
              Explore Practice Areas
            </a>
          </div>

          {/* Trust Badges */}
          <div className="animate-fade-up delay-700 mt-16 flex flex-wrap gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                <Shield size={18} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[15px] font-semibold text-white">20+ Years</span>
                <span className="text-[12px] tracking-wide text-white/50 uppercase">Experience</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                <Award size={18} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[15px] font-semibold text-white">Award Winning</span>
                <span className="text-[12px] tracking-wide text-white/50 uppercase">Legal Team</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                <Lock size={18} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[15px] font-semibold text-white">Confidential</span>
                <span className="text-[12px] tracking-wide text-white/50 uppercase">Client Privilege</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">Scroll</span>
        <ChevronDown size={18} className="animate-scroll-indicator text-gold/60" />
      </div>
    </section>
  );
}
