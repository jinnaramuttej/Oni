import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                scrolled ? 'bg-navy' : 'bg-white/15 backdrop-blur-sm'
              }`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.8" />
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                  scrolled ? 'text-navy' : 'text-white'
                }`}>
                  Ascend
                </span>
                <span className={`text-lg font-light tracking-tight transition-colors duration-300 ${
                  scrolled ? 'text-slate-text' : 'text-white/70'
                }`}>
                  &Associates
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-[13px] font-medium tracking-wide rounded-lg transition-all duration-200 ${
                    scrolled
                      ? 'text-slate-600 hover:text-navy hover:bg-gray-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+1234567890"
                className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${
                  scrolled ? 'text-slate-600 hover:text-navy' : 'text-white/80 hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </a>
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-emerald/20 transition-all duration-200 hover:bg-emerald-light hover:shadow-emerald/30 hover:-translate-y-0.5"
              >
                Book Consultation
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled ? 'text-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="text-lg font-semibold text-navy">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[15px] font-medium text-slate-700 rounded-xl hover:bg-surface hover:text-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-2xl bg-emerald px-5 py-3 text-sm font-semibold text-white"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
