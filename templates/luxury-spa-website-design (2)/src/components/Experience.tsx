import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import SectionLabel from './SectionLabel';
import { IMAGES } from '../data/content';

const experiences = [
  {
    title: 'Thermal Sanctuary',
    description: 'Nordic-inspired sauna chambers and cold plunge pools for deep circulation and immune renewal.',
    image: IMAGES.sauna,
  },
  {
    title: 'Hydrotherapy Suite',
    description: 'Vitality pools, rain showers, and mineral baths designed for complete aquatic restoration.',
    image: IMAGES.poolResort,
  },
  {
    title: 'Meditation Garden',
    description: 'An open-air sanctuary with flowing water, natural stone, and guided stillness sessions.',
    image: IMAGES.pool,
  },
  {
    title: 'Aromatherapy Lounge',
    description: 'A sensory cocoon of curated scents where essential oils promote emotional balance and calm.',
    image: IMAGES.aromatherapy,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 lg:py-40 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel
          label="The Experience"
          title="A Sanctuary for Every Sense"
          description="Beyond treatments, Serenité is an immersive environment designed to quiet the mind, warm the body, and elevate the spirit."
        />

        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative rounded-[24px] overflow-hidden aspect-[16/10] cursor-pointer"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                <h3 className="font-serif text-2xl md:text-[1.7rem] font-light text-white mb-2">
                  {exp.title}
                </h3>
                <p className="text-white/65 text-sm font-light leading-relaxed max-w-md">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider Banner */}
        <FadeIn className="mt-24">
          <div className="relative rounded-[24px] overflow-hidden">
            <img
              src={IMAGES.saunaModern}
              alt="Modern spa interior"
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center text-center px-6">
              <div>
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight max-w-2xl italic">
                  "Luxury is the ease of a heartbeat, the comfort of breathing,
                  the freedom of movement"
                </p>
                <span className="inline-block mt-6 text-xs tracking-[0.2em] uppercase text-white/50">
                  — Serenité Philosophy
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
