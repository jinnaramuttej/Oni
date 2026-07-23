import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-transparent mix-blend-difference"
    >
      <a href="#" className="text-2xl font-black tracking-tighter text-white">AETHER</a>
      <div className="flex gap-8 text-sm uppercase tracking-widest text-white">
        {['Work', 'Services', 'About', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-purple-400 transition-colors">
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
