import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Attorneys', href: '#attorneys' },
  { label: 'Results', href: '#results' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-midnight/95 backdrop-blur-md shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12" aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#"
            className={`flex items-center gap-3 py-5 transition-colors duration-300 ${
              scrolled ? 'text-ivory' : 'text-white'
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center border border-gold/60 rounded">
              <span className="font-serif text-lg font-bold text-gold">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-semibold tracking-wide">Sterling</span>
              <span className="ml-1.5 text-xs font-light tracking-[0.2em] uppercase text-gold">&amp; Associates</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:text-gold ${
                  scrolled ? 'text-ivory/80' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+12125551234"
              className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                scrolled ? 'text-ivory/70' : 'text-white/70'
              } hover:text-gold`}
            >
              <Phone size={14} strokeWidth={1.5} />
              <span className="text-[13px] tracking-wide">(212) 555-1234</span>
            </a>
            <a
              href="#consultation"
              className="rounded-[14px] border border-gold bg-gold/10 px-6 py-2.5 text-[13px] font-medium tracking-[0.06em] uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-midnight"
            >
              Free Consultation
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-midnight/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-serif text-ivory/90 tracking-wide hover:text-gold transition-colors duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="tel:+12125551234"
              className="flex items-center gap-2 text-ivory/60 hover:text-gold transition-colors"
            >
              <Phone size={16} />
              <span className="tracking-wide">(212) 555-1234</span>
            </a>
            <a
              href="#consultation"
              onClick={() => setMobileOpen(false)}
              className="rounded-[14px] border border-gold bg-gold px-8 py-3 text-sm font-medium tracking-[0.08em] uppercase text-midnight"
            >
              Free Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
