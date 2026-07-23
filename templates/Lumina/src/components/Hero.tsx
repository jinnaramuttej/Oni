import { Shield, Cpu, Heart, ChevronDown } from 'lucide-react';

const trustBadges = [
  { icon: Shield, label: 'Certified Dentists', desc: 'Board-certified specialists' },
  { icon: Cpu, label: 'Modern Equipment', desc: 'Latest dental technology' },
  { icon: Heart, label: 'Pain-Free Care', desc: 'Gentle, comfortable treatment' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-sky-accent/30 to-teal-50/40">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sky-accent/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-teal-primary/20" />
        <div className="absolute top-2/3 right-1/3 w-3 h-3 rounded-full bg-teal-light/30" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle, #1E3A5F 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-36 lg:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-primary/10 border border-teal-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-primary animate-pulse-soft" />
                <span className="text-sm font-medium text-teal-primary">Now Accepting New Patients</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold text-navy leading-[1.08] tracking-tight">
                Your Healthiest,{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-primary to-teal-light">
                    Most Confident
                  </span>
                </span>{' '}
                Smile
              </h1>
            </div>

            <p className="animate-fade-up delay-200 text-lg sm:text-xl text-slate-text/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Experience precision dental care in a modern, welcoming environment. From routine checkups to transformative cosmetic dentistry — we craft smiles that inspire confidence.
            </p>

            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#booking"
                className="group inline-flex items-center justify-center px-8 py-4 bg-teal-primary text-white font-semibold rounded-2xl shadow-lg shadow-teal-primary/25 hover:shadow-xl hover:shadow-teal-primary/30 hover:bg-teal-600 transition-all duration-300 hover:-translate-y-0.5 text-base"
              >
                Book Appointment
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#treatments"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/70 text-navy font-semibold rounded-2xl border border-gray-200/60 hover:border-teal-primary/30 hover:bg-white shadow-sm hover:shadow-md transition-all duration-300 text-base"
              >
                Explore Treatments
              </a>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-up delay-500 pt-4">
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                {trustBadges.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-primary/10 mb-2">
                      <Icon className="w-5 h-5 text-teal-primary" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-navy">{label}</p>
                    <p className="text-[11px] text-slate-text/60 hidden sm:block">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-fade-up delay-300 relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl shadow-navy/10">
              <img
                src="https://images.pexels.com/photos/3845553/pexels-photo-3845553.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
                alt="Happy patient smiling during a dental consultation at Lumina Dental clinic"
                className="w-full h-[400px] sm:h-[500px] lg:h-[560px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 sm:-left-8 glass-strong rounded-2xl p-4 shadow-xl border border-white/40 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-primary to-teal-light flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">15,000+</p>
                  <p className="text-xs text-slate-text/60">Happy Patients</p>
                </div>
              </div>
            </div>

            {/* Rating card */}
            <div className="absolute -top-2 -right-2 sm:-right-6 glass-strong rounded-2xl p-4 shadow-xl border border-white/40">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-bold text-navy">4.9/5</p>
              <p className="text-[11px] text-slate-text/60">500+ Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-text/40 hover:text-teal-primary transition-colors animate-fade-up delay-700"
        aria-label="Scroll to learn more"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Discover</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
