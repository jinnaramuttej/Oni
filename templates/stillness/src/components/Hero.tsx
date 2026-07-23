import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-transparent to-ivory/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/40 via-transparent to-ivory/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1800&q=80"
          alt="Peaceful sunrise yoga practice"
          className="w-full h-full object-cover object-center scale-[1.02]"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="font-sans text-[0.75rem] lg:text-xs uppercase tracking-[0.22em] text-eucalyptus mb-6 font-medium">
            Find your stillness
          </p>

          <h1 className="font-serif text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.1] text-charcoal font-light mb-6 max-w-3xl mx-auto tracking-[-0.01em]">
            Where breath<br className="hidden sm:block" /> meets being
          </h1>

          <p className="text-base lg:text-lg text-charcoal/60 font-light max-w-xl mx-auto leading-relaxed mb-10 tracking-[0.01em]">
            A sanctuary for mindful movement, meditation, and intentional living — 
            guiding you home to your calmest, most centered self.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="px-8 py-3.5 text-sm font-medium tracking-[0.04em] text-ivory bg-eucalyptus hover:bg-sage-dark rounded-[20px] transition-all duration-300 shadow-[0_4px_20px_rgba(127,145,114,0.25)] hover:shadow-[0_6px_28px_rgba(127,145,114,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Your First Class
            </a>
            <a
              href="#classes"
              className="px-8 py-3.5 text-sm font-medium tracking-[0.04em] text-eucalyptus border border-eucalyptus/30 hover:border-eucalyptus/60 rounded-[20px] transition-all duration-300 hover:bg-eucalyptus/[0.04]"
            >
              Explore Classes
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-1">
            {['Certified Instructors', 'Beginner Friendly', 'Small Group Sessions'].map((item) => (
              <span
                key={item}
                className="text-[0.6875rem] tracking-[0.08em] uppercase text-charcoal/50 font-medium flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-sage" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[0.625rem] tracking-[0.2em] uppercase text-charcoal/40 font-medium">
          Scroll
        </span>
        <ChevronDown size={14} className="text-charcoal/30 animate-pulse-gentle" />
      </motion.div>

      {/* Ambient decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent z-10" />
    </section>
  );
}
