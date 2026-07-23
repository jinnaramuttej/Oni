import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { THERAPISTS, IMAGES } from '../data/content';

export default function Therapists() {
  return (
    <section id="therapists" className="py-24 md:py-32 lg:py-40 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel
          label="Our Therapists"
          title="Masters of Their Craft"
          description="Each therapist brings decades of study, an intuitive touch, and a genuine passion for healing. They are the heart of the Serenité experience."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8 md:gap-10">
          {THERAPISTS.map((therapist, i) => {
            const imgSrc = IMAGES[therapist.image as keyof typeof IMAGES];
            return (
              <motion.div
                key={therapist.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group text-center"
              >
                <div className="aspect-[3/4] rounded-[24px] overflow-hidden mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                  <img
                    src={imgSrc}
                    alt={therapist.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1">
                  {therapist.name}
                </h3>
                <p className="text-champagne text-sm font-medium tracking-wide mb-2">
                  {therapist.title}
                </p>
                <p className="text-charcoal-light text-sm font-light">
                  {therapist.specialty}
                </p>
                <p className="text-stone text-xs mt-1">{therapist.experience} experience</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
