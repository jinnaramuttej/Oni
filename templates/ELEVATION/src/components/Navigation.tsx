import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { label: 'Properties', href: '#properties' },
  { label: 'Neighborhoods', href: '#neighborhoods' },
  { label: 'Our Team', href: '#team' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="Elevation Home"
            >
              <div className="flex flex-col">
                <span
                  className={cn(
                    'font-serif text-2xl md:text-[28px] font-semibold tracking-[0.02em] transition-colors duration-500',
                    scrolled ? 'text-charcoal' : 'text-white'
                  )}
                >
                  ELEVATION
                </span>
                <span
                  className={cn(
                    'text-[10px] font-sans tracking-[0.35em] uppercase transition-colors duration-500 -mt-1',
                    scrolled ? 'text-gold' : 'text-gold-light'
                  )}
                >
                  Luxury Real Estate
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-[13px] font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-300 hover:text-gold',
                    scrolled ? 'text-charcoal' : 'text-white/90'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+18005551234"
                className={cn(
                  'flex items-center gap-2 text-[13px] font-medium tracking-wide transition-colors duration-300',
                  scrolled ? 'text-slate' : 'text-white/80'
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (800) 555-1234</span>
              </a>
              <a
                href="#consultation"
                className="bg-gold hover:bg-gold-light text-white text-[12px] font-semibold tracking-[0.1em] uppercase px-6 py-3 rounded-[16px] transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                Book Consultation
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors',
                scrolled ? 'text-charcoal' : 'text-white'
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-[320px] bg-ivory shadow-2xl transition-transform duration-500',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col p-8 pt-24">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-lg font-serif font-medium text-charcoal border-b border-stone/50 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-10 space-y-4">
              <a
                href="tel:+18005551234"
                className="flex items-center gap-3 text-sm text-slate"
              >
                <Phone className="w-4 h-4 text-gold" />
                +1 (800) 555-1234
              </a>
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-charcoal text-white text-[12px] font-semibold tracking-[0.1em] uppercase px-6 py-4 rounded-[16px] hover:bg-forest transition-colors"
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
