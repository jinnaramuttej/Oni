import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

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
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? 'bg-ivory/85 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className={`font-serif text-2xl tracking-wide transition-colors duration-500 ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              Sōl Studio
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-10 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-light tracking-widest uppercase transition-colors duration-500 hover:opacity-70 ${
                    scrolled ? 'text-charcoal' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                className={`ml-2 rounded-full px-6 py-2.5 text-[13px] font-light tracking-widest uppercase transition-all duration-500 ${
                  scrolled
                    ? 'bg-eucalyptus text-white hover:bg-eucalyptus-dark'
                    : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
                }`}
              >
                Book
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden transition-colors duration-500 ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ivory transition-all duration-500 md:hidden flex flex-col justify-center items-center ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-8 text-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-serif text-3xl text-charcoal hover:text-eucalyptus transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-4 rounded-full bg-eucalyptus px-10 py-3.5 text-[13px] font-light tracking-widest uppercase text-white hover:bg-eucalyptus-dark transition-colors"
          >
            Book a Class
          </a>
        </div>
      </div>
    </>
  );
}
