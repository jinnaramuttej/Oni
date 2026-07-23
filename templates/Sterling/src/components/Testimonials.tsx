import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Sterling & Associates demonstrated extraordinary skill in navigating our $2.3 billion acquisition. Their strategic foresight and meticulous attention to regulatory nuances were instrumental in closing the deal ahead of schedule.',
    name: 'Richard Thornton',
    title: 'CEO, Meridian Capital Group',
    rating: 5,
  },
  {
    quote: 'In twenty years of business, I have never encountered a legal team with such dedication and competence. They protected our intellectual property portfolio across twelve jurisdictions with precision and unwavering commitment.',
    name: 'Dr. Sarah Mitchell',
    title: 'CTO, NovaTech Solutions',
    rating: 5,
  },
  {
    quote: 'When facing a complex securities investigation, Sterling\'s litigation team was decisive, strategic, and brilliantly effective. They secured a complete dismissal and restored our firm\'s reputation. Exceptional in every regard.',
    name: 'Jonathan Park',
    title: 'Managing Director, Atlas Financial',
    rating: 5,
  },
  {
    quote: 'Their employment law team resolved a sensitive executive dispute with the utmost discretion and professionalism. The outcome exceeded our expectations while preserving critical business relationships.',
    name: 'Catherine Wells',
    title: 'CHRO, Prestige Hospitality Group',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref, isInView } = useInView();

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-cream" aria-label="Client testimonials">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Testimonials"
          title="Client Perspectives"
          description="The trust our clients place in us is the ultimate measure of our success. Here is what they say about working with Sterling & Associates."
        />

        <div ref={ref} className={`mx-auto max-w-4xl ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="relative rounded-[20px] border border-warm-gray bg-white p-8 lg:p-14 shadow-sm">
            {/* Quote Icon */}
            <Quote size={48} className="absolute top-8 right-8 text-gold/10" strokeWidth={1} />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg key={i} className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote Text */}
            <blockquote className="font-serif text-xl lg:text-2xl leading-relaxed text-midnight italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <cite className="block not-italic font-serif text-lg font-semibold text-midnight">{t.name}</cite>
                <span className="mt-1 block text-[13px] text-gold font-medium">{t.title}</span>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-gray bg-ivory transition-all duration-300 hover:border-gold hover:bg-gold/5"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} className="text-charcoal" />
                </button>
                <span className="text-[13px] font-medium text-slate-custom tabular-nums">
                  {current + 1} / {testimonials.length}
                </span>
                <button
                  onClick={next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-gray bg-ivory transition-all duration-300 hover:border-gold hover:bg-gold/5"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} className="text-charcoal" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-gold' : 'w-2 bg-warm-gray hover:bg-gold/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
