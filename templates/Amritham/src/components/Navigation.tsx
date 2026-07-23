import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Catering', href: '#catering' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-[0_2px_20px_rgba(92,59,40,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center border border-terracotta/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6 2 10c0 2.5 1.5 5 3 6.5V22l3-2 4 1 4-1 3 2v-5.5c1.5-1.5 3-4 3-6.5 0-4-4.48-8-10-8z" fill="#B55A30" fillOpacity="0.8"/>
                  <path d="M8 10c0-1 .5-2 2-3s2.5-1 2-1" stroke="#F9F6F0" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <span className={`font-serif text-xl font-semibold tracking-wide transition-colors duration-500 ${
                  scrolled ? 'text-brown-dark' : 'text-warm-white'
                }`}>
                  Amritham
                </span>
                <span className={`block text-[9px] tracking-[0.3em] uppercase transition-colors duration-500 ${
                  scrolled ? 'text-terracotta' : 'text-warm-white/70'
                }`}>
                  South Indian Kitchen
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-terracotta ${
                    scrolled ? 'text-brown' : 'text-warm-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reserve"
                className="btn-primary text-sm py-2.5 px-6"
              >
                Reserve a Table
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-brown-dark' : 'text-warm-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-brown-dark/95 backdrop-blur-sm transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-ivory text-2xl font-serif font-medium hover:text-turmeric transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reserve"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4"
          >
            Reserve a Table
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-ivory/70 mt-2 text-sm"
          >
            <Phone size={16} />
            +91 98765 43210
          </a>
        </div>
      </div>
    </>
  );
}
