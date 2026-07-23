import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer Adams',
    age: 42,
    treatment: 'Cardiac Care',
    text: 'From my first visit, the team at MedCare made me feel completely at ease. Dr. Mitchell explained every step of my cardiac treatment with patience and clarity. The facilities are immaculate, and the nursing staff went above and beyond. I couldn\'t have asked for better care.',
    rating: 5,
    image: 'https://images.pexels.com/photos/7077368/pexels-photo-7077368.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
  {
    name: 'Robert Kim',
    age: 55,
    treatment: 'Orthopedic Surgery',
    text: 'After years of chronic knee pain, Dr. Rivera performed my joint replacement surgery at MedCare. The surgical team was outstanding, and the recovery program was carefully designed. Three months later, I\'m walking without pain for the first time in years. Thank you, MedCare!',
    rating: 5,
    image: 'https://images.pexels.com/photos/11579595/pexels-photo-11579595.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
  {
    name: 'Maria Santos',
    age: 34,
    treatment: 'Pediatric Care',
    text: 'As a mother of three, finding a trustworthy pediatrician was essential. Dr. Okafor and her team provide such warm, attentive care to my children. They always take time to address all my concerns. MedCare has become our family\'s healthcare home.',
    rating: 5,
    image: 'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-navy relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 border border-white/40 rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-white/30 rounded-full" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-teal-light text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal-light" />
            Patient Stories
            <span className="w-8 h-px bg-teal-light" />
          </span>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-5 font-heading">
            What Our Patients{' '}
            <span className="text-teal-light">Say About Us</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Real stories from real patients who trusted us with their health and wellbeing.
          </p>
        </div>

        {/* Testimonial card */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-[24px] p-8 sm:p-12 relative">
            <Quote className="absolute top-8 right-8 w-12 h-12 text-teal/20" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8 font-light">
              "{current.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-teal/30"
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-semibold text-lg">{current.name}</p>
                  <p className="text-white/50 text-sm">{current.treatment} Patient</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-teal-light' : 'w-2 bg-white/30 hover:bg-white/50'
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
