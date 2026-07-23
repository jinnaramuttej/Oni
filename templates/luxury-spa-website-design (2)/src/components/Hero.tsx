import { motion } from 'framer-motion';
import { IMAGES } from '../data/content';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <img
          src={IMAGES.hero}
          alt="Luxury spa treatment in a serene environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs font-sans font-medium tracking-[0.3em] uppercase text-champagne-light mb-6">
            Luxury Spa & Wellness
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.1] mb-6"
          >
            Where Stillness
            <br />
            <span className="italic font-light">Becomes</span> Luxury
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-white/70 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed mb-10"
          >
            Surrender to an experience crafted for the senses. Bespoke treatments,
            ancient wisdom, and modern luxury converge in a sanctuary designed for
            your complete renewal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#booking"
              className="bg-champagne text-white px-10 py-4 rounded-[20px] text-sm font-medium tracking-wide hover:bg-champagne-dark transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              Book Your Treatment
            </a>
            <a
              href="#treatments"
              className="border border-white/30 text-white px-10 py-4 rounded-[20px] text-sm font-light tracking-wide hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-8 md:gap-16 px-6"
        >
          {[
            { icon: '✦', text: 'Certified Therapists' },
            { icon: '❋', text: 'Organic Products' },
            { icon: '◇', text: 'Luxury Experience' },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2.5 text-white/50"
            >
              <span className="text-champagne-light text-xs">{badge.icon}</span>
              <span className="text-[11px] font-light tracking-[0.1em] uppercase hidden sm:inline">
                {badge.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-light tracking-[0.2em] uppercase text-white/40">
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
