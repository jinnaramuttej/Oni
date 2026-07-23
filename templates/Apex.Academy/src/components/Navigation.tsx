import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'Subjects', href: '#subjects' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Educators', href: '#educators' },
  { label: 'Results', href: '#stats' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Apex Academy Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-deep to-blue-royal shadow-lg shadow-indigo-deep/20 group-hover:shadow-indigo-deep/30 transition-shadow duration-300">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-indigo-deep' : 'text-white'}`}>
              Apex<span className="text-amber-accent">.</span>Academy
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                  scrolled
                    ? 'text-slate-text hover:text-indigo-deep hover:bg-slate-bg'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#enrollment"
              className={`rounded-[18px] px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                scrolled
                  ? 'text-blue-royal border border-blue-royal/20 hover:bg-blue-royal/5'
                  : 'text-white border border-white/20 hover:bg-white/10'
              }`}
            >
              Sign In
            </a>
            <a
              href="#enrollment"
              className="rounded-[18px] bg-blue-royal px-6 py-2.5 text-sm font-semibold text-white shadow-button hover:shadow-button-hover hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              Enroll Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden rounded-xl p-2 transition-colors ${scrolled ? 'text-slate-text' : 'text-white'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-16 bg-white z-40 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-slate-text hover:bg-slate-bg hover:text-indigo-deep transition-colors"
            >
              {link.label}
              <ChevronRight className="h-4 w-4 opacity-40" />
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-gray-100">
            <a
              href="#enrollment"
              className="text-center rounded-[18px] border border-blue-royal/20 px-6 py-3.5 text-sm font-semibold text-blue-royal"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </a>
            <a
              href="#enrollment"
              className="text-center rounded-[18px] bg-blue-royal px-6 py-3.5 text-sm font-semibold text-white shadow-button"
              onClick={() => setMobileOpen(false)}
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
