import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const, delay: i * 0.15 },
  }),
};

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(64,64,64,0.06)]">
              <img
                src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80"
                alt="Serene yoga studio with natural light"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-sage/15 -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-clay/10 -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium"
            >
              Our Philosophy
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-charcoal font-light tracking-[-0.01em]"
            >
              A space to slow down, breathe deeply, and remember who you are.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-charcoal/60 leading-relaxed font-light text-base lg:text-lg"
            >
              Stillness was born from a simple belief: that in our fast, noisy world, 
              everyone deserves a sanctuary. Our studio blends the wisdom of traditional 
              yoga with modern mindfulness practices, creating an environment where 
              every breath feels like coming home.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-charcoal/60 leading-relaxed font-light text-base lg:text-lg"
            >
              We honor the ancient roots of yoga while embracing a contemporary, 
              accessible approach. No judgment. No competition. Just presence.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="flex gap-8 pt-4">
              {[
                { value: '12+', label: 'Years of Practice' },
                { value: '50+', label: 'Weekly Classes' },
                { value: '3K+', label: 'Community Members' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl lg:text-3xl text-eucalyptus font-light">
                    {stat.value}
                  </p>
                  <p className="text-[0.6875rem] tracking-[0.06em] uppercase text-charcoal/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
