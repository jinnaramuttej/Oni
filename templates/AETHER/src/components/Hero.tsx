import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center px-8 relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-[12vw] font-black leading-[0.9] tracking-tighter text-white"
      >
        FEARLESS<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">CREATIVITY.</span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-12 flex gap-6"
      >
        <button className="px-8 py-4 bg-white text-[#0A0A0A] font-bold rounded-full hover:scale-105 transition-transform">
          Start a Project
        </button>
        <button className="px-8 py-4 border border-white text-white font-bold rounded-full hover:bg-white hover:text-[#0A0A0A] transition-all">
          View Our Work
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
