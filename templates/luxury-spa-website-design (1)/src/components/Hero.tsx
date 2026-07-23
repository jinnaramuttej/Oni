import { ArrowDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-spa.jpg"
          alt="Luxury spa wellness retreat"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/20 to-charcoal/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 to-transparent" />
      </div>

      {/* Decorative line accent */}
      <div className="absolute top-32 left-10 lg:left-20 w-[1px] h-32 bg-gradient-to-b from-transparent via-champagne/40 to-transparent hidden lg:block" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-28 lg:pb-36 px-6 lg:px-20 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          {/* Trust badges */}
          <div className="flex items-center gap-6 mb-10 opacity-0 animate-fade-up [animation-delay:0.2s]">
            <div className="flex items-center gap-2.5 bg-ivory/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <Sparkles size={14} className="text-champagne" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.2em] uppercase text-ivory/90 font-medium">Certified Therapists</span>
            </div>
            <div className="hidden sm:flex items-center gap-2.5 bg-ivory/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-ivory/90 font-medium">Organic Products</span>
            </div>
            <div className="hidden md:flex items-center gap-2.5 bg-ivory/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-ivory/90 font-medium">Luxury Experience</span>
            </div>
          </div>

          <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.03em] text-ivory font-normal mb-8 opacity-0 animate-fade-up [animation-delay:0.4s]">
            <span className="italic text-champagne-light/90">Renew</span> Your <br />
            <span className="italic">Inner Harmony</span>
          </h1>

          <p className="text-ivory/80 text-base lg:text-xl font-light leading-[1.7] max-w-xl mb-12 opacity-0 animate-fade-up [animation-delay:0.6s] font-sans tracking-tight">
            A sanctuary of stillness where ancient healing traditions meet modern luxury. 
            Experience the art of profound relaxation, tailored exclusively to you.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up [animation-delay:0.8s]">
            <a
              href="#booking"
              className="inline-flex items-center gap-3 rounded-full bg-ivory text-charcoal px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-champagne transition-all duration-500 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_35px_rgba(201,169,110,0.4)] hover:-translate-y-0.5"
            >
              Book Your Treatment
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-3 rounded-full border border-ivory/30 text-ivory px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-ivory/10 hover:border-ivory/50 transition-all duration-500 backdrop-blur-sm"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#philosophy"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 group"
        aria-label="Scroll to explore"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-ivory/60 font-medium group-hover:text-ivory/90 transition-colors">Discover</span>
        <div className="w-[1px] h-12 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/3 bg-champagne/70 animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
        <ArrowDown size={14} className="text-ivory/40 group-hover:text-champagne transition-colors animate-[bounce_1.5s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
