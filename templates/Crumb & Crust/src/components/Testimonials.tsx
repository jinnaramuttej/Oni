import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/products';
import SectionHeading from './SectionHeading';

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          subtitle="Kind Words"
          title="What Our Guests Say"
          description="We pour love into every creation, and it means the world when our customers feel it."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={cn(
        'relative bg-cream rounded-[22px] p-8 lg:p-10 transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Quote icon */}
      <Quote size={28} className="text-caramel/20 mb-4" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Text */}
      <p className="text-chocolate/80 font-light leading-relaxed text-sm lg:text-base italic">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="mt-6 pt-6 border-t border-beige/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-caramel/10 flex items-center justify-center">
            <span className="font-serif text-sm text-caramel">{testimonial.name[0]}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-chocolate">{testimonial.name}</span>
            <span className="block text-xs text-warm-gray font-light">{testimonial.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
