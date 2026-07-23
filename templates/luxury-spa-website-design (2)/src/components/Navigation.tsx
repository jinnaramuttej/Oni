import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { NAV_LINKS } from '../data/content';
import { cn } from '../utils/cn';

export default function Navigation() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 80;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isScrolled
            ? 'bg-ivory/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a href="#" className="relative z-10">
              <span
                className={cn(
                  'font-serif text-2xl lg:text-[1.75rem] font-light tracking-wide transition-colors duration-500',
                  isScrolled ? 'text-charcoal' : 'text-white'
                )}
              >
                Serenité
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-[13px] font-light tracking-[0.08em] transition-colors duration-500 hover:text-champagne',
                    isScrolled ? 'text-charcoal' : 'text-white/85 hover:text-white'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Book CTA */}
            <div className="hidden lg:block">
              <a
                href="#booking"
                className={cn(
                  'text-[13px] font-medium tracking-wide px-7 py-3 rounded-[20px] transition-all duration-500',
                  isScrolled
                    ? 'bg-champagne text-white hover:bg-champagne-dark'
                    : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
                )}
              >
                Book Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  'w-6 h-px transition-all duration-500',
                  mobileOpen
                    ? 'rotate-45 translate-y-1 bg-charcoal'
                    : isScrolled
                    ? 'bg-charcoal'
                    : 'bg-white'
                )}
              />
              <span
                className={cn(
                  'w-6 h-px transition-all duration-500',
                  mobileOpen
                    ? '-rotate-45 -translate-y-0.5 bg-charcoal'
                    : isScrolled
                    ? 'bg-charcoal'
                    : 'bg-white'
                )}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ivory"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="font-serif text-3xl font-light text-charcoal hover:text-champagne transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 bg-champagne text-white px-10 py-4 rounded-[20px] text-sm font-medium tracking-wide"
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
