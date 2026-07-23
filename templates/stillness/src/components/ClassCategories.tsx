import { motion } from 'framer-motion';
import { Clock, User, BarChart2 } from 'lucide-react';

interface ClassCard {
  name: string;
  description: string;
  difficulty: string;
  duration: string;
  instructor: string;
  image: string;
}

const classes: ClassCard[] = [
  {
    name: 'Gentle Flow',
    description: 'A slow, mindful vinyasa practice connecting breath with gentle movement. Perfect for all levels seeking calm.',
    difficulty: 'All Levels',
    duration: '60 min',
    instructor: 'Maya Chen',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
  },
  {
    name: 'Hatha Restore',
    description: 'Classic hatha postures held with intention, paired with restorative poses for deep release and renewal.',
    difficulty: 'Beginner',
    duration: '75 min',
    instructor: 'James Okonkwo',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80',
  },
  {
    name: 'Sunrise Vinyasa',
    description: 'An energizing morning flow to greet the day with presence. Builds strength, flexibility, and clarity.',
    difficulty: 'Intermediate',
    duration: '60 min',
    instructor: 'Sofia Rivera',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  },
  {
    name: 'Yin & Sound',
    description: 'Deep yin stretches complemented by live sound healing with crystal bowls. A meditative journey inward.',
    difficulty: 'All Levels',
    duration: '90 min',
    instructor: 'Lena Park',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
  },
  {
    name: 'Power Align',
    description: 'A dynamic, alignment-focused practice building strength and stability through intelligent sequencing.',
    difficulty: 'Advanced',
    duration: '60 min',
    instructor: 'David Torres',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80',
  },
  {
    name: 'Prenatal Peace',
    description: 'Nurturing yoga for expecting mothers, focusing on breath, gentle movement, and connection with baby.',
    difficulty: 'Prenatal',
    duration: '60 min',
    instructor: 'Maya Chen',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
  },
];

export default function ClassCategories() {
  return (
    <section id="classes" className="py-24 md:py-32 px-6 lg:px-10 bg-white/40">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Practice With Us
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            Classes designed for every body and every moment.
          </h2>
        </motion.div>

        {/* Class grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {classes.map((cls, i) => (
            <motion.div
              key={cls.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group bg-ivory rounded-[1.5rem] overflow-hidden shadow-[0_2px_20px_rgba(64,64,64,0.04)] hover:shadow-[0_8px_40px_rgba(64,64,64,0.08)] transition-shadow duration-500"
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                <h3 className="font-serif text-xl lg:text-2xl text-charcoal font-light mb-2">
                  {cls.name}
                </h3>
                <p className="text-charcoal/55 text-sm leading-relaxed mb-5 font-light">
                  {cls.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[0.6875rem] text-charcoal/50 font-medium tracking-[0.04em] uppercase">
                    <BarChart2 size={13} className="text-sage" />
                    {cls.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[0.6875rem] text-charcoal/50 font-medium tracking-[0.04em] uppercase">
                    <Clock size={13} className="text-sage" />
                    {cls.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[0.6875rem] text-charcoal/50 font-medium tracking-[0.04em] uppercase">
                    <User size={13} className="text-sage" />
                    {cls.instructor}
                  </span>
                </div>

                <a
                  href="#booking"
                  className="inline-block w-full text-center py-3 text-sm font-medium tracking-[0.03em] text-eucalyptus border border-eucalyptus/25 rounded-[20px] hover:bg-eucalyptus hover:text-ivory transition-all duration-300"
                >
                  Book Class
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
