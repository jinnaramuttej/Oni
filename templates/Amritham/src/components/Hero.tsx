import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] max-h-[900px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8818657/pexels-photo-8818657.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Traditional South Indian thali served with love"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown-dark/70 via-brown-dark/50 to-brown-dark/80" />
        {/* Subtle warm tint */}
        <div className="absolute inset-0 bg-terracotta/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Small decorative element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-px bg-turmeric/60" />
          <span className="text-turmeric text-xs tracking-[0.3em] uppercase font-medium">
            Est. 1987 · Bengaluru
          </span>
          <span className="w-8 h-px bg-turmeric/60" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-white font-medium leading-[1.1] mb-6">
          Where Every Meal{' '}
          <span className="italic text-turmeric-light">Feels</span>
          <br />
          Like Coming Home
        </h1>

        <p className="text-warm-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Authentic recipes passed down through three generations, prepared with fresh ingredients
          and served with the warmth of a South Indian home. Every dish carries the heritage of
          Karnataka, Tamil Nadu, Kerala, Andhra Pradesh & Telangana.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#reserve" className="btn-warm">
            Reserve a Table
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-warm-white/30 text-warm-white rounded-xl text-sm font-medium hover:bg-warm-white/10 transition-all duration-300"
          >
            Explore Menu
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-warm-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={20} className="text-warm-white/50" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
