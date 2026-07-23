import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Specialists', href: '#dentists' },
    { label: 'Results', href: '#gallery' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Lumina Dental Home">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isScrolled
                ? 'bg-teal-500 text-white'
                : 'bg-white/20 backdrop-blur-sm text-white'
            }`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C9.5 2 7 4.5 7 7c0 1.5.5 3 1.5 4C9.5 13 10 16 12 18c2-2 2.5-5 3.5-7C16.5 10 17 8.5 17 7c0-2.5-2.5-5-5-5z"/>
                <path d="M12 2c-1 0-3 1.5-3 4s1 4.5 3 6.5"/>
                <path d="M12 2c1 0 3 1.5 3 4s-1 4.5-3 6.5"/>
              </svg>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-navy' : 'text-white'
            }`}>
              Lumina<span className="text-teal-500">Dental</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-teal-500 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all hover:after:w-full ${
                  isScrolled ? 'text-slate-600' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+15551234567" className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
              isScrolled ? 'text-slate-600 hover:text-teal-600' : 'text-white/90 hover:text-white'
            }`}>
              <Phone size={16} />
              (555) 123-4567
            </a>
            <a
              href="#booking"
              className={`px-6 py-2.5 rounded-btn text-sm font-semibold transition-all duration-300 btn-press ${
                isScrolled
                  ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-glow'
                  : 'bg-white text-navy hover:bg-teal-50'
              }`}
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-navy' : 'text-white'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-navy/60 transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl transition-transform duration-500 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="text-xl font-bold text-navy">
              Lumina<span className="text-teal-500">Dental</span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-500 hover:text-navy transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-600 font-medium transition-all text-base"
              >
                {link.label}
              </a>
            ))}
            <hr className="my-4 border-gray-100" />
            <a
              href="tel:+15551234567"
              className="flex items-center gap-2 py-3 px-4 text-slate-600 font-medium"
            >
              <Phone size={16} />
              (555) 123-4567
            </a>
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full text-center px-6 py-3.5 rounded-btn bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-all btn-press shadow-glow"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
