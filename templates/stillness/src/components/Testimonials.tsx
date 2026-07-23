import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Stillness has completely transformed my relationship with myself. The space they\'ve created is genuinely unlike anything else — it feels like exhaling after holding your breath for years.',
    name: 'Elena Rodriguez',
    detail: 'Member since 2023',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    quote: 'I came for the yoga and stayed for the community. The instructors meet you exactly where you are, with zero judgment. This studio has become my sanctuary.',
    name: 'Marcus Williams',
    detail: 'Member since 2022',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    quote: 'The meditation program changed my life. I sleep better, stress less, and finally understand what it means to be present. Every session feels like a gift.',
    name: 'Amara Osei',
    detail: 'Member since 2024',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  },
  {
    quote: 'After years of trying different studios, I finally found home. The attention to detail, the intentional pacing, the beautiful space — everything whispers calm.',
    name: 'Daniel Hart',
    detail: 'Member since 2021',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 lg:px-10 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Words from Our Community
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            The stillness speaks for itself.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-white/60 rounded-[1.5rem] p-7 lg:p-9 border border-stone/20 hover:border-sage/20 transition-colors duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-sage fill-sage" />
                ))}
              </div>

              <blockquote className="text-charcoal/70 leading-relaxed font-light mb-6 text-sm lg:text-base">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-serif text-charcoal font-medium text-sm">{t.name}</p>
                  <p className="text-charcoal/40 text-xs font-light">{t.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
