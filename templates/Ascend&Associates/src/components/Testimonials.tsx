import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Vikram Desai',
    role: 'CEO, TechVista Solutions',
    content: 'Ascend transformed our financial operations. Their proactive tax planning saved us over ₹2.5Cr in the first year alone. The team\'s expertise in tech sector taxation is unparalleled.',
    rating: 5,
    image: 'https://images.pexels.com/photos/8278853/pexels-photo-8278853.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Founder, GreenLeaf Organics',
    content: 'From company registration to GST compliance, Ascend handled everything seamlessly. Their dedicated team made scaling from a startup to a mid-size enterprise completely stress-free.',
    rating: 5,
    image: 'https://images.pexels.com/photos/38197025/pexels-photo-38197025.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
  {
    name: 'Rohit Malhotra',
    role: 'Managing Director, Malhotra Group',
    content: 'We\'ve been with Ascend for 8 years. Their financial consulting helped us expand to three new markets with robust compliance frameworks in place from day one.',
    rating: 5,
    image: 'https://images.pexels.com/photos/10816007/pexels-photo-10816007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
  {
    name: 'Sneha Agarwal',
    role: 'CFO, NovaPharma',
    content: 'The audit team at Ascend is exceptional. Their attention to detail and deep understanding of pharmaceutical regulations gave our board complete confidence in our financial reporting.',
    rating: 5,
    image: 'https://images.pexels.com/photos/31409070/pexels-photo-31409070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Left header */}
          <div className="lg:col-span-2">
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 mb-6 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-xs font-semibold text-gold tracking-wider uppercase">Client Stories</span>
            </div>
            <h2
              className={`text-3xl lg:text-[2.5rem] font-bold text-navy leading-tight tracking-tight mb-4 transition-all duration-600 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Trusted by
              <br />
              Industry Leaders
            </h2>
            <p
              className={`text-base text-slate-text leading-relaxed mb-8 transition-all duration-600 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Our clients' success stories reflect our commitment to delivering
              exceptional financial expertise and lasting value.
            </p>

            {/* Navigation */}
            <div
              className={`flex items-center gap-3 transition-all duration-600 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="ml-3 text-sm text-slate-text">
                <span className="font-semibold text-navy">{String(active + 1).padStart(2, '0')}</span>
                <span className="mx-1">/</span>
                <span>{String(testimonials.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>

          {/* Right - Testimonial Card */}
          <div className="lg:col-span-3">
            <div
              className={`relative rounded-3xl bg-surface border border-gray-100 p-8 lg:p-10 transition-all duration-600 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Quote className="w-10 h-10 text-emerald/20 mb-6" />

              <div className="min-h-[120px]">
                <p className="text-lg lg:text-xl text-navy leading-relaxed font-medium transition-all duration-500">
                  "{testimonials[active].content}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mt-6 mb-6">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <img
                  src={testimonials[active].image}
                  alt={testimonials[active].name}
                  className="w-12 h-12 rounded-xl object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-navy">{testimonials[active].name}</div>
                  <div className="text-sm text-slate-text">{testimonials[active].role}</div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-emerald' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
