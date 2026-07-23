import { Search, ChevronDown, MapPin } from 'lucide-react';
import { IMAGES } from '../data';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] max-h-[1100px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Luxury modern villa illuminated at dusk"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mt-8">
          {/* Eyebrow */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 text-gold text-[11px] md:text-[12px] font-semibold tracking-[0.25em] uppercase">
              <span className="w-8 h-px bg-gold" />
              Extraordinary Living
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-200 mt-6 md:mt-8 font-serif text-white text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] font-light tracking-[-0.01em]">
            Where Architecture
            <br />
            <span className="font-medium italic">Meets Aspiration</span>
          </h1>

          {/* Description */}
          <p className="animate-fade-up delay-300 mt-6 md:mt-8 text-white/75 text-base md:text-lg leading-relaxed max-w-xl font-light">
            Discover an exclusive portfolio of the world's most exceptional
            residences, curated for those who expect nothing less than
            extraordinary.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-400 mt-8 md:mt-10 flex flex-wrap gap-4">
            <a
              href="#properties"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white text-[12px] font-semibold tracking-[0.12em] uppercase px-8 py-4 rounded-[16px] transition-all duration-300 hover:shadow-xl hover:shadow-gold/25"
            >
              Browse Properties
            </a>
            <a
              href="#consultation"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white text-[12px] font-semibold tracking-[0.12em] uppercase px-8 py-4 rounded-[16px] transition-all duration-300 hover:bg-white/10"
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="animate-fade-up delay-500 mt-12 md:mt-16 max-w-4xl">
          <div className="glass-dark rounded-[20px] p-2.5 md:p-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-5 py-3.5 bg-white/10 rounded-[14px] hover:bg-white/[0.14] transition-colors">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, or address..."
                  className="w-full bg-transparent text-white placeholder-white/50 text-sm outline-none"
                  aria-label="Search properties"
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="hidden sm:block bg-white/10 hover:bg-white/[0.14] text-white/80 text-sm px-4 py-3.5 rounded-[14px] outline-none appearance-none cursor-pointer min-w-[110px] transition-colors"
                  aria-label="Property type"
                  defaultValue=""
                >
                  <option value="" disabled className="text-charcoal">Type</option>
                  <option className="text-charcoal">Villa</option>
                  <option className="text-charcoal">Penthouse</option>
                  <option className="text-charcoal">Estate</option>
                  <option className="text-charcoal">Waterfront</option>
                </select>
                <select
                  className="hidden sm:block bg-white/10 hover:bg-white/[0.14] text-white/80 text-sm px-4 py-3.5 rounded-[14px] outline-none appearance-none cursor-pointer min-w-[110px] transition-colors"
                  aria-label="Price range"
                  defaultValue=""
                >
                  <option value="" disabled className="text-charcoal">Price</option>
                  <option className="text-charcoal">$5M - $10M</option>
                  <option className="text-charcoal">$10M - $25M</option>
                  <option className="text-charcoal">$25M - $50M</option>
                  <option className="text-charcoal">$50M+</option>
                </select>
                <button
                  className="bg-gold hover:bg-gold-light text-white px-7 py-3.5 rounded-[14px] transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline text-[12px] font-semibold tracking-[0.1em] uppercase">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="animate-fade-up delay-600 mt-10 md:mt-14 flex flex-wrap gap-8 md:gap-12">
          {[
            { label: 'Luxury Specialists', value: '25+ Years' },
            { label: 'Global Network', value: '40+ Markets' },
            { label: 'Award Winning', value: 'Top 1%' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-white font-serif text-xl md:text-2xl font-medium">
                {item.value}
              </span>
              <span className="text-white/50 text-[11px] tracking-[0.15em] uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-800">
        <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/40 animate-scroll-bounce" />
      </div>
    </section>
  );
}
