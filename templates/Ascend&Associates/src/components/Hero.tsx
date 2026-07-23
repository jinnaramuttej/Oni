import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight, ChevronDown, ShieldCheck, Clock, Users } from 'lucide-react';

const trustBadges = [
  { icon: ShieldCheck, label: 'Certified CAs', sublabel: 'ICAI Registered' },
  { icon: Clock, label: '15+ Years', sublabel: 'Of Excellence' },
  { icon: Users, label: '1,000+', sublabel: 'Businesses Served' },
];

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/7693706/pexels-photo-7693706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Business professionals reviewing analytics"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/85 to-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent" />
      </div>

      {/* Subtle geometric overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-[13px] font-medium text-white/90 tracking-wide">
              Trusted by 1,000+ businesses across industries
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.08] tracking-tight text-white mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Smarter Financial
            <br />
            Decisions Start{' '}
            <span className="relative">
              <span className="relative z-10">Here</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-emerald/30 rounded-sm -z-0" />
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl mb-10 font-light transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Expert chartered accountants delivering precision-driven tax planning,
            compliance, and financial strategy that fuels sustainable business growth.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#consultation"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald px-8 py-4 text-[15px] font-semibold text-white shadow-2xl shadow-emerald/25 transition-all duration-300 hover:bg-emerald-light hover:shadow-emerald/40 hover:-translate-y-0.5"
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30"
            >
              Explore Services
            </a>
          </div>

          {/* Trust Badges */}
          <div
            className={`flex flex-col sm:flex-row gap-6 sm:gap-10 transition-all duration-700 delay-[400ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/5">
                  <badge.icon className="w-5 h-5 text-emerald-light" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{badge.label}</div>
                  <div className="text-xs text-white/50">{badge.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Stats Card */}
        <div
          className={`hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 w-72 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-3 w-3 rounded-full bg-emerald" />
              <span className="text-xs font-medium text-white/70 tracking-wider uppercase">Client Growth</span>
            </div>
            {/* Mini chart */}
            <div className="flex items-end gap-1.5 h-20">
              {[35, 45, 38, 55, 48, 62, 58, 72, 68, 80, 75, 92].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald/60 to-emerald-light/40 transition-all duration-500"
                  style={{
                    height: `${h}%`,
                    transitionDelay: isVisible ? `${600 + i * 50}ms` : '0ms',
                    opacity: isVisible ? 1 : 0,
                  }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">₹48Cr+</div>
                <div className="text-xs text-white/50">Tax savings delivered</div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-emerald/20 px-2.5 py-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 8L6 4L10 8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs font-semibold text-emerald-light">+24%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[11px] font-medium text-white/40 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/40 animate-bounce" />
      </div>
    </section>
  );
}
