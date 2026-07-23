import { useState } from 'react';
import { useScrollPosition } from '../hooks/useScrollAnimation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Custom Cakes', href: '#custom' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit Us', href: '#visit' },
];

export default function Navigation() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 60;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(90,58,41,0.06)]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={cn(
            'flex items-center justify-between transition-all duration-500',
            isScrolled ? 'h-16 lg:h-18' : 'h-20 lg:h-24'
          )}>
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className={cn(
                'transition-all duration-500',
                isScrolled ? 'text-chocolate' : 'text-white'
              )}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="transition-transform duration-300 group-hover:scale-105">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 20C10 20 12 12 16 12C20 12 22 20 22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="16" cy="10" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'font-serif text-xl lg:text-2xl tracking-wide transition-colors duration-500',
                  isScrolled ? 'text-chocolate' : 'text-white'
                )}>
                  Crumb & Crust
                </span>
                <span className={cn(
                  'text-[9px] uppercase tracking-[0.3em] -mt-0.5 transition-colors duration-500',
                  isScrolled ? 'text-warm-gray' : 'text-white/70'
                )}>
                  Flour Studio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-sm font-light tracking-wide transition-colors duration-300 hover:opacity-100',
                    isScrolled
                      ? 'text-chocolate/70 hover:text-caramel'
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#order"
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-[18px] text-sm font-medium transition-all duration-300',
                  isScrolled
                    ? 'bg-caramel text-white hover:bg-chocolate shadow-sm'
                    : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 border border-white/20'
                )}
              >
                <ShoppingBag size={16} />
                Order Now
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors',
                isScrolled ? 'text-chocolate' : 'text-white'
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ivory transition-all duration-500 lg:hidden flex flex-col',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex-1 flex flex-col justify-center items-center gap-8 px-6 pt-20">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl text-chocolate hover:text-caramel transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex items-center gap-2 px-8 py-3.5 rounded-[20px] bg-caramel text-white text-lg font-medium shadow-lg hover:bg-chocolate transition-all"
          >
            <ShoppingBag size={20} />
            Order Now
          </a>
        </div>
      </div>
    </>
  );
}
