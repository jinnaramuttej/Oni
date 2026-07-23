import { useState } from 'react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { label: 'About', href: '#about' },
  {
    label: 'Treatments',
    href: '#treatments',
    submenu: [
      { label: 'Cosmetic Dentistry', href: '#treatments' },
      { label: 'Invisalign & Orthodontics', href: '#treatments' },
      { label: 'Teeth Whitening', href: '#treatments' },
      { label: 'Dental Implants', href: '#treatments' },
    ],
  },
  { label: 'Dentists', href: '#dentists' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Insurance', href: '#insurance' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const { isScrolled } = useScrollPosition();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass-strong shadow-sm border-b border-gray-100/50'
          : 'bg-transparent'
      )}
    >
      {/* Top bar */}
      <div
        className={cn(
          'transition-all duration-500 overflow-hidden',
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="hidden sm:flex items-center gap-6 text-slate-text/70">
              <span>Mon–Fri: 8AM – 7PM</span>
              <span className="w-px h-3 bg-gray-300" />
              <span>Sat: 9AM – 4PM</span>
            </div>
            <div className="flex items-center gap-4 text-slate-text/70 ml-auto">
              <a href="tel:+18005551234" className="flex items-center gap-1.5 hover:text-teal-primary transition-colors">
                <Phone className="w-3 h-3" />
                (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-primary to-teal-light flex items-center justify-center shadow-md shadow-teal-primary/20">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8 2 5 5 5 8c0 2.5 1 4 2.5 6.5S10 19 10 22c.5 0 1.5-1 2-3 .5 2 1.5 3 2 3 0-3 1-4.5 2.5-7.5S19 10.5 19 8c0-3-3-6-7-6z" />
              </svg>
            </div>
            <div>
              <span className={cn(
                'font-heading font-bold text-lg tracking-tight transition-colors',
                isScrolled ? 'text-navy' : 'text-navy'
              )}>
                Lumina
              </span>
              <span className={cn(
                'font-heading text-[10px] uppercase tracking-[0.2em] block -mt-1 transition-colors',
                isScrolled ? 'text-teal-primary' : 'text-teal-primary'
              )}>
                Dental
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.submenu && setOpenSubmenu(link.label)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <a
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1',
                    isScrolled
                      ? 'text-slate-text hover:text-navy hover:bg-gray-50'
                      : 'text-slate-text/80 hover:text-navy hover:bg-white/50'
                  )}
                >
                  {link.label}
                  {link.submenu && <ChevronDown className="w-3 h-3" />}
                </a>

                {/* Submenu */}
                {link.submenu && openSubmenu === link.label && (
                  <div className="absolute top-full left-0 pt-2 animate-slide-down">
                    <div className="glass-strong rounded-2xl shadow-xl border border-gray-100/60 py-2 min-w-[220px]">
                      {link.submenu.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-slate-text hover:text-teal-primary hover:bg-teal-50/50 transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-teal-primary text-white text-sm font-semibold rounded-2xl hover:bg-teal-600 shadow-md shadow-teal-primary/20 hover:shadow-lg hover:shadow-teal-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5 text-navy" /> : <Menu className="w-5 h-5 text-navy" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden transition-all duration-400 overflow-hidden',
          isMobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="glass-strong border-t border-gray-100/50 px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block py-3 text-base font-medium text-slate-text hover:text-teal-primary transition-colors border-b border-gray-50 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setIsMobileOpen(false)}
            className="mt-4 block text-center px-6 py-3 bg-teal-primary text-white font-semibold rounded-2xl shadow-md"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
