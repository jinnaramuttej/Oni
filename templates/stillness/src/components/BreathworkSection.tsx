import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

const sessions = [
  {
    title: 'Pranayama Foundations',
    description: 'Learn classic breathwork techniques including alternate nostril breathing, ujjayi, and kapalabhati.',
    level: 'Beginner',
    sessions: '4 sessions',
  },
  {
    title: 'The Wim Hof Experience',
    description: 'Guided breathwork inspired by the Wim Hof Method, combining rhythmic breathing with cold exposure.',
    level: 'Intermediate',
    sessions: '6 sessions',
  },
  {
    title: 'Transformational Breath',
    description: 'A deep, connected breathing practice to release stored emotions and access expanded states of awareness.',
    level: 'All Levels',
    sessions: 'Ongoing',
  },
];

export default function BreathworkSection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-10 bg-gradient-to-b from-white/40 to-ivory">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sage/10 text-eucalyptus mb-6">
            <Wind size={24} />
          </div>
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Breathwork
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-charcoal font-light tracking-[-0.01em] max-w-2xl mx-auto">
            Your breath is the bridge between body and mind.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {sessions.map((session, i) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-ivory rounded-[1.5rem] p-7 lg:p-8 border border-stone/30 hover:border-sage/30 transition-colors duration-500 text-center group"
            >
              <h3 className="font-serif text-xl text-charcoal font-light mb-3">{session.title}</h3>
              <p className="text-charcoal/55 text-sm leading-relaxed font-light mb-6">{session.description}</p>

              <div className="flex items-center justify-center gap-4 text-[0.6875rem] tracking-[0.06em] uppercase text-charcoal/50 font-medium">
                <span className="px-3 py-1 rounded-full bg-sage/10 text-eucalyptus">{session.level}</span>
                <span>{session.sessions}</span>
              </div>

              <a
                href="#booking"
                className="inline-block mt-6 text-sm font-medium tracking-[0.03em] text-eucalyptus hover:text-sage-dark transition-colors duration-300"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
