import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Experience', href: '#philosophy' },
    { label: 'Treatments', href: '#services' },
    { label: 'Therapists', href: '#therapists' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Booking', href: '#booking' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'bg-ivory/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(201,169,110,0.08)] py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <nav className="mx-auto max-w-[1400px] px-6 lg:px-12 flex items-center justify-between">
          <a href="#" className="font-display text-[1.55rem] leading-none tracking-[0.22em] text-charcoal uppercase font-normal">
            SÉRENITÉ
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] tracking-[0.18em] uppercase font-sans font-medium text-charcoal/70 hover:text-champagne transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="#booking"
            className="hidden md:inline-flex rounded-full bg-charcoal text-ivory px-6 py-2.5 text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-champagne transition-all duration-500 shadow-[0_4px_20px_rgba(59,59,59,0.2)] hover:shadow-[0_6px_30px_rgba(201,169,110,0.25)]"
          >
            Book Treatment
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-charcoal p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-cream/98 backdrop-blur-3xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-12">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl text-charcoal hover:text-champagne transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMobileOpen(false)}
            className="mt-4 rounded-full bg-charcoal text-ivory px-8 py-3.5 text-sm tracking-[0.14em] uppercase font-medium"
          >
            Book Treatment
          </a>
        </div>
      </div>
    </>
  );
}
