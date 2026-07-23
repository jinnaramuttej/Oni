import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '../utils/cn';

const testimonials = [
  {
    name: 'Jessica Thompson',
    treatment: 'Invisalign Treatment',
    rating: 5,
    text: 'From my very first consultation, the team at Lumina made me feel completely at ease. The Invisalign process was explained clearly, and Dr. Mitchell checked in regularly throughout my treatment. My smile has never looked better — and I didn\'t have to deal with metal braces!',
    avatar: 'JT',
  },
  {
    name: 'Marcus Williams',
    treatment: 'Dental Implants',
    rating: 5,
    text: 'After years of feeling self-conscious about my missing tooth, I finally decided to get an implant at Lumina. Dr. Rodriguez was incredibly thorough and gentle. The result looks completely natural — my friends can\'t even tell which tooth is the implant.',
    avatar: 'MW',
  },
  {
    name: 'Sarah & David Kim',
    treatment: 'Family Dentistry',
    rating: 5,
    text: 'We bring our entire family to Lumina — from our 5-year-old to my husband\'s parents. The staff is phenomenal with kids, and the clinic is so modern and clean. It\'s the first dental office where our daughter actually looks forward to her appointments!',
    avatar: 'SK',
  },
  {
    name: 'Elena Vasquez',
    treatment: 'Smile Makeover',
    rating: 5,
    text: 'I got veneers and whitening done, and the transformation is stunning. Dr. Chen took the time to design a smile that fits my face perfectly. The whole experience felt luxurious and professional — nothing like the dental visits I dreaded as a child.',
    avatar: 'EV',
  },
  {
    name: 'Robert Chen',
    treatment: 'Teeth Whitening',
    rating: 5,
    text: 'Quick, painless, and the results were immediately noticeable. My teeth went several shades whiter in just one session. The team was friendly and made sure I was comfortable the entire time. Highly recommend for anyone considering whitening!',
    avatar: 'RC',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal-50/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">Patient Stories</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight tracking-tight">
            What Our Patients{' '}
            <span className="text-teal-primary">Say About Us</span>
          </h2>
        </AnimatedSection>

        {/* Testimonial carousel */}
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="relative bg-light-bg rounded-[24px] p-8 sm:p-12 border border-gray-100/60">
            {/* Quote icon */}
            <div className="absolute -top-5 left-8 sm:left-12">
              <div className="w-10 h-10 rounded-xl bg-teal-primary flex items-center justify-center shadow-lg shadow-teal-primary/20">
                <Quote className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Testimonial content */}
            <div className="mt-4 transition-all duration-500">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl text-navy/90 leading-relaxed font-light italic">
                "{testimonials[activeIndex].text}"
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-primary to-teal-light flex items-center justify-center text-white font-bold text-sm">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <p className="font-heading font-bold text-navy">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-teal-primary">{testimonials[activeIndex].treatment}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === activeIndex ? 'w-8 bg-teal-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-white hover:border-teal-primary/30 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-navy" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-white hover:border-teal-primary/30 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-navy" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Additional reviews summary */}
        <AnimatedSection delay={200} className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-light-bg border border-gray-100/60">
            <div className="text-center">
              <p className="text-2xl font-bold text-navy font-heading">4.9</p>
              <p className="text-xs text-slate-text/60">Google Rating</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-navy font-heading">500+</p>
              <p className="text-xs text-slate-text/60">5-Star Reviews</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-navy font-heading">98%</p>
              <p className="text-xs text-slate-text/60">Would Recommend</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
