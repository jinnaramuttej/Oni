import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';
import { TESTIMONIALS } from '../data/content';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-charcoal relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        <FadeIn>
          <div className="text-center">
            <span className="inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase text-champagne mb-4">
              Testimonials
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
              Voices of Serenity
            </h2>
          </div>
        </FadeIn>

        <div className="mt-16 relative min-h-[280px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1.5 mb-8">
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-champagne" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-relaxed max-w-3xl mx-auto italic">
                "{TESTIMONIALS[current].text}"
              </blockquote>

              <div className="mt-8">
                <p className="text-white font-medium text-sm tracking-wide">
                  {TESTIMONIALS[current].author}
                </p>
                <p className="text-white/40 text-xs mt-1 tracking-wide">
                  {TESTIMONIALS[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-500 rounded-full cursor-pointer ${
                  i === current
                    ? 'w-8 h-1.5 bg-champagne'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
