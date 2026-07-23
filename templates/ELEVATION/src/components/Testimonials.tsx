import { useState } from 'react';
import { testimonials } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isInView } = useInView();

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[activeIndex];

  return (
    <section className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 relative z-10">
        <div
          ref={ref}
          className={cn(
            'max-w-4xl mx-auto text-center transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Quote Icon */}
          <Quote className="w-10 h-10 text-gold/30 mx-auto mb-8" />

          {/* Testimonial Text */}
          <blockquote className="font-serif text-white text-xl md:text-2xl lg:text-[28px] leading-[1.5] font-light italic">
            "{active.text}"
          </blockquote>

          {/* Attribution */}
          <div className="mt-8 md:mt-10">
            <p className="font-serif text-lg md:text-xl text-gold font-medium">
              {active.name}
            </p>
            <p className="mt-1 text-[13px] text-white/50 font-light">
              {active.role}
            </p>
            <p className="mt-2 text-[12px] text-gold/60 font-semibold tracking-[0.1em] uppercase">
              {active.property}
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 text-white/60" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === activeIndex
                      ? 'w-8 bg-gold'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
