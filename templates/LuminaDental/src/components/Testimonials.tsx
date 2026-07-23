import { useState, useEffect } from 'react';
import { useRevealStagger } from '../hooks/useReveal';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer Walsh',
    role: 'Cosmetic Patient',
    text: 'I was terrified of dentists my whole life. The team at Lumina completely changed that. They were patient, gentle, and my veneers look absolutely incredible. I can\'t stop smiling!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'David Thompson',
    role: 'Invisalign Patient',
    text: 'Six months into my Invisalign treatment and the results are remarkable. Dr. Chen explained everything clearly, and the whole process has been seamless. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'Maria Santos',
    role: 'Implant Patient',
    text: 'After years of hesitation, I finally got dental implants at Lumina. The technology they use is incredible — virtually painless and the results are so natural. Life-changing experience.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'Robert Kim',
    role: 'Family Patient',
    text: 'Our whole family comes to Lumina. The kids actually look forward to dental visits now. The clinic feels more like a spa than a dentist office. Outstanding care every single time.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'Amanda Lee',
    role: 'Whitening Patient',
    text: 'The teeth whitening results were beyond what I expected. Professional, comfortable, and my smile is now 6 shades brighter. The best investment I\'ve made in myself.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const refs = useRevealStagger(2, { delay: 150 });

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-navy relative overflow-hidden" aria-label="Patient testimonials">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-aqua/5 blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={(el) => { if (el) refs.current[0] = el; }} className="reveal max-w-2xl mb-16 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-teal-300 text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            Patient Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Trusted by{' '}
            <span className="text-teal-400">thousands</span>
            {' '}of happy patients
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Real stories from real patients who chose Lumina for their dental care.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div ref={(el) => { if (el) refs.current[1] = el; }} className="reveal max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-card border border-white/10 p-8 lg:p-12 transition-all duration-500">
            <Quote size={32} className="text-teal-500/40 mb-6" />
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 font-light min-h-[80px]">
              {t.text}
            </p>
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                loading="lazy"
              />
              <div>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-white/50 text-sm">{t.role}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === active ? 'w-8 bg-teal-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-white/10">
          {[
            { value: '2,500+', label: 'Happy Patients' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '15+', label: 'Years Experience' },
            { value: '4.9', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
