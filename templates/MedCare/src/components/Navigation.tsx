import { useState, useEffect } from 'react';
import { Phone, Menu, X, Clock, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Health Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
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
      {/* Top bar */}
      <div
        className={`hidden lg:block transition-all duration-500 ${
          scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
        }`}
      >
        <div className="bg-navy text-white/90">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-light" />
                Mon–Sat: 8:00 AM – 8:00 PM
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-light" />
                123 Healthcare Blvd, Medical District
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+18001234567" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-teal-light" />
                Emergency: 1-800-123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-border-light'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group" aria-label="MedCare Home">
              <div className="w-10 h-10 bg-gradient-to-br from-teal to-navy rounded-[12px] flex items-center justify-center shadow-soft group-hover:shadow-card transition-shadow duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-navy font-heading tracking-tight">
                  Med<span className="text-teal">Care</span>
                </span>
                <span className="hidden sm:block text-[10px] text-slate-text/60 font-medium tracking-wider uppercase -mt-0.5">
                  Healthcare Clinic
                </span>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-text hover:text-navy rounded-[var(--radius-btn)] hover:bg-soft-gray transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-navy hover:text-teal transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">1-800-123-4567</span>
              </a>
              <a
                href="#appointment"
                className="px-6 py-2.5 bg-teal text-white text-sm font-semibold rounded-[var(--radius-btn)] hover:bg-teal-dark shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
              >
                Book Appointment
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy rounded-[12px] hover:bg-soft-gray transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-elevated overflow-y-auto animate-slide-in-right">
            <div className="p-6 pt-20">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3.5 text-base font-medium text-navy hover:bg-soft-gray rounded-[var(--radius-btn)] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border space-y-4">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-text"
                >
                  <Phone className="w-4 h-4 text-teal" />
                  1-800-123-4567
                </a>
                <a
                  href="#appointment"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-6 py-3.5 bg-teal text-white font-semibold rounded-[var(--radius-btn)] hover:bg-teal-dark transition-colors"
                >
                  Book Appointment
                </a>
              </div>
              <div className="mt-6 px-4 space-y-2 text-sm text-slate-text/70">
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal" />
                  Mon–Sat: 8:00 AM – 8:00 PM
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal" />
                  123 Healthcare Blvd
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
