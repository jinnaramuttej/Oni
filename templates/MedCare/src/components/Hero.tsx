import { ArrowRight, Search, Shield, Clock, Building2, ChevronDown } from 'lucide-react';

const trustBadges = [
  { icon: Shield, label: 'Licensed Doctors', desc: '50+ Board Certified' },
  { icon: Clock, label: 'Same-Day Appointments', desc: 'Walk-ins Welcome' },
  { icon: Building2, label: 'Modern Facilities', desc: 'State-of-the-Art' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden" aria-label="Hero">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000"
          alt="Doctor engaging in a positive consultation with a patient"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
      </div>

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border border-white/30 rounded-full" />
        <div className="absolute bottom-40 right-40 w-96 h-96 border border-white/20 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-white/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-16 pb-24 lg:pt-8 lg:pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-pill text-white/90 text-sm font-medium mb-8 animate-fade-up opacity-0">
            <span className="w-2 h-2 bg-teal-light rounded-full animate-pulse-soft" />
            Trusted by 25,000+ Patients
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-white leading-[1.08] tracking-tight mb-6 animate-fade-up opacity-0 stagger-1 font-heading">
            Your Health,{' '}
            <span className="relative">
              <span className="text-teal-light">Our Priority</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C60 2 180 2 298 8" stroke="rgba(20,184,166,0.4)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-xl animate-fade-up opacity-0 stagger-2">
            Experience compassionate, world-class healthcare from board-certified physicians
            who put your wellbeing first. Modern facilities, personalized care, exceptional outcomes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up opacity-0 stagger-3">
            <a
              href="#appointment"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-teal text-white font-semibold rounded-[var(--radius-btn)] hover:bg-teal-dark shadow-elevated hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-base"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#doctors"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/25 text-white font-semibold rounded-[var(--radius-btn)] hover:bg-white/20 transition-all duration-300 text-base"
            >
              <Search className="w-5 h-5" />
              Find a Doctor
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up opacity-0 stagger-4">
            {trustBadges.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-[var(--radius-card)] hover:bg-white/12 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-teal-light" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-white/60 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs font-medium tracking-wider uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-scroll-indicator" />
      </div>
    </section>
  );
}
