import { motion } from 'framer-motion';

const services = [
  { title: 'Branding', desc: 'Crafting unforgettable identities.' },
  { title: 'Digital Design', desc: 'Immersive user experiences.' },
  { title: 'Motion Graphics', desc: 'Storytelling through movement.' },
];

const Services = () => {
  return (
    <section className="px-8 py-24 bg-[#161616]">
      <h2 className="text-6xl font-black mb-16">Our Craft</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="border-t border-gray-700 pt-8"
          >
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-400">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
