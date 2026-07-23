import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const instructors = [
  {
    name: 'Maya Chen',
    role: 'Founder & Lead Instructor',
    specialties: 'Vinyasa, Yin, Prenatal',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
    bio: 'Maya found yoga 15 years ago while recovering from burnout in corporate law. Trained in India and Bali, she brings a therapeutic, trauma-informed approach to every class.',
  },
  {
    name: 'James Okonkwo',
    role: 'Senior Instructor',
    specialties: 'Hatha, Restorative, Breathwork',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80',
    bio: 'With a background in physiotherapy and a deep love for traditional hatha, James creates classes that heal the body while calming the mind.',
  },
  {
    name: 'Sofia Rivera',
    role: 'Instructor & Wellness Coach',
    specialties: 'Power Flow, Meditation, Sound Healing',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    bio: 'Sofia is a certified yoga therapist and meditation guide whose classes blend dynamic movement with profound introspection.',
  },
  {
    name: 'Lena Park',
    role: 'Instructor & Retreat Leader',
    specialties: 'Yin, Sound Bath, Restorative',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    bio: 'Trained in traditional Korean healing arts and modern sound therapy, Lena creates deeply restorative experiences that invite profound relaxation.',
  },
];

export default function Instructors() {
  return (
    <section id="instructors" className="py-24 md:py-32 px-6 lg:px-10 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Meet Your Guides
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            Dedicated teachers who walk the path with you.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {instructors.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group text-center"
            >
              {/* Image */}
              <div className="relative mb-5 mx-auto w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-[0_8px_30px_rgba(64,64,64,0.06)] group-hover:shadow-[0_12px_40px_rgba(64,64,64,0.1)] transition-shadow duration-500">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <h3 className="font-serif text-xl text-charcoal font-light mb-1">{inst.name}</h3>
              <p className="text-eucalyptus text-sm font-medium mb-1">{inst.role}</p>
              <p className="text-[0.6875rem] tracking-[0.06em] uppercase text-charcoal/45 font-medium mb-3">
                {inst.specialties}
              </p>

              {/* Bio */}
              <div className="relative mb-4">
                <Quote size={16} className="text-sage/40 mx-auto mb-2" />
                <p className="text-charcoal/55 text-sm leading-relaxed font-light px-2">
                  {inst.bio}
                </p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-[0.6875rem] tracking-[0.05em] text-charcoal/40 hover:text-eucalyptus transition-colors duration-300 font-medium uppercase"
              >
                <span className="w-3 h-3 rounded-full bg-charcoal/20" />
                @{inst.name.toLowerCase().replace(' ', '')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
