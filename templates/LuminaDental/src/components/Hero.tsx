import { ArrowDown, Shield, Award, Clock, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-navy" aria-label="Hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80&auto=format&fit=crop"
          alt="Modern, bright dental clinic interior"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/20" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} aria-hidden="true" />
      <div className="absolute bottom-32 left-32 w-56 h-56 rounded-full bg-aqua/10 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} aria-hidden="true" />
      <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-teal-400/5 blur-2xl" aria-hidden="true" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fadeInUp mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
              </span>
              Now accepting new patients for 2025
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-fadeInUp animation-delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.05] tracking-tight mb-6">
            Your healthiest,
            <br />
            most confident
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-aqua">
              smile awaits.
            </span>
          </h1>

          {/* Description */}
          <p className="animate-fadeInUp animation-delay-400 text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-xl font-light">
            World-class dental care in a space designed for your comfort. Advanced technology, certified specialists, and a gentle touch — every single visit.
          </p>

          {/* CTAs */}
          <div className="animate-fadeInUp animation-delay-600 flex flex-wrap gap-4 mb-16">
            <a
              href="#booking"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-btn bg-teal-500 text-white font-semibold text-base hover:bg-teal-400 transition-all duration-300 shadow-[0_8px_32px_rgba(20,184,166,0.3)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.4)] btn-press"
            >
              Book Appointment
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#treatments"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-btn bg-white/10 backdrop-blur-md text-white font-semibold text-base border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 btn-press"
            >
              Explore Treatments
            </a>
          </div>

          {/* Trust Badges */}
          <div className="animate-fadeInUp animation-delay-800 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { icon: Shield, label: 'Certified Dentists' },
              { icon: Award, label: 'Modern Equipment' },
              { icon: Heart, label: 'Pain-Free Care' },
              { icon: Clock, label: 'Flexible Hours' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5 text-white/70 group cursor-default">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                  <badge.icon size={16} className="text-teal-400" />
                </div>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors animate-fadeIn animation-delay-800"
        aria-label="Scroll to learn more"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Discover More</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <ArrowDown size={14} className="animate-bounce text-white/60" />
        </div>
      </a>
    </section>
  );
}
