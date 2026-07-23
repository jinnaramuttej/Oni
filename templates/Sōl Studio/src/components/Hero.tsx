import { ChevronDown, Award, Users, Heart } from 'lucide-react';
import { IMAGES } from '../data/content';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Yoga practice at sunrise with mountain backdrop"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="max-w-3xl">
          {/* Small tag */}
          <p
            className="mb-6 text-[11px] font-light tracking-[0.35em] uppercase text-white/70 animate-fade-up opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Yoga · Meditation · Mindful Living
          </p>

          {/* Main headline */}
          <h1
            className="font-serif text-5xl font-light leading-[1.15] tracking-wide sm:text-6xl lg:text-7xl animate-fade-up opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Find Your Stillness,<br />
            <span className="italic font-light text-white/90">Reclaim Your Peace</span>
          </h1>

          {/* Supporting text */}
          <p
            className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-white/75 sm:text-lg animate-fade-up opacity-0"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            A sanctuary for mindful movement, guided meditation, and intentional 
            living — where every breath brings you closer to balance.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up opacity-0"
            style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}
          >
            <a
              href="#booking"
              className="rounded-full bg-white/95 px-10 py-4 text-[13px] font-medium tracking-widest uppercase text-charcoal shadow-lg shadow-black/10 transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]"
            >
              Book Your First Class
            </a>
            <a
              href="#classes"
              className="rounded-full border border-white/30 px-10 py-4 text-[13px] font-light tracking-widest uppercase text-white transition-all hover:bg-white/10 hover:border-white/50"
            >
              Explore Classes
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="mt-14 flex flex-wrap items-center justify-center gap-8 animate-fade-up opacity-0"
            style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-2.5 text-white/60">
              <Award size={16} strokeWidth={1.5} />
              <span className="text-[11px] font-light tracking-wider uppercase">Certified Instructors</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/60">
              <Heart size={16} strokeWidth={1.5} />
              <span className="text-[11px] font-light tracking-wider uppercase">Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/60">
              <Users size={16} strokeWidth={1.5} />
              <span className="text-[11px] font-light tracking-wider uppercase">Small Group Sessions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-light tracking-[0.3em] uppercase text-white/40">Scroll</span>
        <div className="animate-scroll-indicator">
          <ChevronDown size={18} strokeWidth={1.5} className="text-white/40" />
        </div>
      </div>
    </section>
  );
}
