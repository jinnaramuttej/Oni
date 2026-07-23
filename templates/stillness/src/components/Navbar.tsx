import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { label: 'Studio', href: '#philosophy' },
  { label: 'Classes', href: '#classes' },
  { label: 'Meditation', href: '#meditation' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Membership', href: '#membership' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-ivory/80 backdrop-blur-xl shadow-[0_1px_20px_rgba(64,64,64,0.05)] border-b border-stone/30'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl lg:text-[1.65rem] tracking-[0.02em] text-charcoal hover:text-eucalyptus transition-colors duration-300"
          >
            stillness
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-[0.8125rem] font-light tracking-[0.03em] text-charcoal/70 hover:text-eucalyptus transition-colors duration-300 relative after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:bg-eucalyptus/40 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="ml-4 px-6 py-2.5 text-[0.8125rem] font-medium tracking-[0.03em] text-ivory bg-eucalyptus rounded-[20px] hover:bg-sage-dark transition-all duration-300 shadow-[0_2px_12px_rgba(127,145,114,0.2)] hover:shadow-[0_4px_20px_rgba(127,145,114,0.3)]"
            >
              Book a Class
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-charcoal/70 hover:text-charcoal transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 top-16 bg-ivory/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-400',
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-start pt-8 gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-base font-light tracking-[0.04em] text-charcoal/70 hover:text-eucalyptus transition-colors duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMobileOpen(false)}
            className="mt-6 px-8 py-3 text-sm font-medium tracking-[0.03em] text-ivory bg-eucalyptus rounded-[20px] hover:bg-sage-dark transition-all duration-300"
          >
            Book a Class
          </a>
        </div>
      </div>
    </header>
  );
}
