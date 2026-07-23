import { motion } from 'framer-motion';
import { Headphones, Moon, Sparkles } from 'lucide-react';

const programs = [
  {
    icon: <Headphones size={22} />,
    title: 'Guided Mindfulness',
    description:
      'Weekly guided sessions exploring body scans, loving-kindness, and present-moment awareness. Available in-studio and online.',
    duration: '30–45 min',
    color: 'bg-sage/15 text-eucalyptus',
  },
  {
    icon: <Moon size={22} />,
    title: 'Sleep & Restore',
    description:
      'Evening meditation designed to quiet the mind and prepare the body for deep, restorative sleep. Includes yoga nidra.',
    duration: '45 min',
    color: 'bg-clay/15 text-clay',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Inner Clarity',
    description:
      'A structured program blending meditation, journaling, and silent reflection to cultivate mental clarity and emotional balance.',
    duration: '8-week program',
    color: 'bg-moss/15 text-moss',
  },
];

export default function MeditationPrograms() {
  return (
    <section id="meditation" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium">
              Meditation
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-charcoal font-light tracking-[-0.01em]">
              The art of doing nothing, beautifully.
            </h2>
            <p className="text-charcoal/60 leading-relaxed font-light text-base lg:text-lg max-w-lg">
              Our meditation programs are crafted to meet you where you are — whether 
              you're a curious beginner or a seasoned practitioner seeking deeper stillness.
            </p>

            <div className="space-y-5 pt-4">
              {programs.map((prog, i) => (
                <motion.div
                  key={prog.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  className="flex gap-5 items-start"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${prog.color}`}>
                    {prog.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-lg text-charcoal font-medium">{prog.title}</h3>
                      <span className="text-[0.625rem] tracking-[0.08em] uppercase text-charcoal/40 font-medium bg-stone/30 px-2 py-0.5 rounded-full">
                        {prog.duration}
                      </span>
                    </div>
                    <p className="text-charcoal/55 text-sm leading-relaxed font-light">{prog.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(64,64,64,0.06)]">
              <img
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
                alt="Peaceful meditation in natural light"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-sand/40 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
