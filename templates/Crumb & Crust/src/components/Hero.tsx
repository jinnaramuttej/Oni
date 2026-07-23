import { ChevronDown, Sparkles, Clock, HandMetal } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/20457220/pexels-photo-20457220.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000"
          alt="Warm bakery interior with fresh pastries"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 via-chocolate/50 to-dark-brown/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/60 via-transparent to-dark-brown/20" />
      </div>

      {/* Subtle Flour Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${10 + Math.random() * 80}%`,
              bottom: `${Math.random() * 30}%`,
              animation: `floatParticle ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full py-32 lg:py-0">
        <div className="max-w-2xl">
          {/* Tagline */}
          <div className="animate-fade-up opacity-0 animation-delay-200">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
              <Sparkles size={14} className="text-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-light">
                Est. 2018 · Small Batch, Big Soul
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up opacity-0 animation-delay-300">
            <span className="block font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] tracking-tight">
              Baked with
            </span>
            <span className="block font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gold leading-[1.05] tracking-tight italic">
              heart & flour
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 lg:mt-8 text-base lg:text-lg text-white/70 leading-relaxed max-w-lg font-light animate-fade-up opacity-0 animation-delay-400">
            Every morning, our artisans craft pastries, breads, and cakes using time-honored techniques, 
            premium ingredients, and an unwavering passion for perfection.
          </p>

          {/* CTAs */}
          <div className="mt-8 lg:mt-10 flex flex-wrap gap-4 animate-fade-up opacity-0 animation-delay-500">
            <a
              href="#order"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-[20px] bg-caramel text-white font-medium text-base shadow-lg shadow-caramel/20 hover:bg-gold hover:shadow-gold/20 transition-all duration-300 hover:scale-[1.02]"
            >
              Order Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[20px] bg-white/10 backdrop-blur-sm text-white border border-white/15 font-medium text-base hover:bg-white/20 transition-all duration-300"
            >
              View Menu
            </a>
          </div>

          {/* Badges */}
          <div className="mt-12 flex flex-wrap gap-6 animate-fade-up opacity-0 animation-delay-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Clock size={14} className="text-gold" />
              </div>
              <span className="text-sm text-white/60 font-light">Fresh Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <HandMetal size={14} className="text-gold" />
              </div>
              <span className="text-sm text-white/60 font-light">Handmade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Sparkles size={14} className="text-gold" />
              </div>
              <span className="text-sm text-white/60 font-light">Custom Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up opacity-0 animation-delay-800">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-light">Discover</span>
        <ChevronDown size={20} className="text-white/40 animate-scroll-indicator" />
      </div>
    </section>
  );
}
