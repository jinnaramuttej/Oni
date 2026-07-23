import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const footerLinks = {
  Studio: ['Our Philosophy', 'Instructors', 'The Space', 'Careers'],
  Practice: ['Classes', 'Meditation', 'Breathwork', 'Retreats', 'Schedule'],
  Connect: ['Contact', 'FAQ', 'Instagram', 'Newsletter'],
  More: ['Membership', 'Gift Cards', 'Partner Programs', 'Press'],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-ivory/70 pt-20 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="font-serif text-2xl text-ivory tracking-[0.02em]">
              stillness
            </a>
            <p className="text-ivory/40 text-sm leading-relaxed font-light mt-4">
              A sanctuary for mindful movement, meditation, and intentional living.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[0.6875rem] tracking-[0.12em] uppercase text-ivory/50 font-medium mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ivory/45 hover:text-ivory/80 transition-colors duration-300 font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-ivory/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-ivory/30 text-xs font-light">
            © {new Date().getFullYear()} Stillness Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors font-light">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors font-light">
              Terms of Service
            </a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              className="w-9 h-9 rounded-full bg-ivory/10 flex items-center justify-center text-ivory/40 hover:text-ivory hover:bg-ivory/15 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
