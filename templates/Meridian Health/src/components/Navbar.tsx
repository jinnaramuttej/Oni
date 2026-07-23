import { useEffect, useState } from 'react';
import { Menu, X, Phone, Stethoscope } from 'lucide-react';

const links = [
  { label: 'About', href: '#overview' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Insurance', href: '#insurance' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(22,58,95,0.08)] py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Main navigation">
        <a href="#top" className="flex items-center gap-2.5">
          <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${scrolled ? 'bg-navy' : 'bg-white/15 backdrop-blur-sm ring-1 ring-white/30'}`}>
            <Stethoscope className={`h-5 w-5 ${scrolled ? 'text-mint' : 'text-white'}`} strokeWidth={1.75} />
          </span>
          <span className={`font-display text-xl font-semibold tracking-tight ${scrolled ? 'text-navy-dark' : 'text-white'}`}>
            Meridian Health
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[15px] font-medium transition-colors duration-300 ${
                  scrolled ? 'text-slate hover:text-teal' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+18005551234"
            className={`flex items-center gap-2 text-sm font-semibold ${scrolled ? 'text-navy-dark' : 'text-white'}`}
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            (800) 555-1234
          </a>
          <a
            href="#appointment"
            className="rounded-2xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-teal-light hover:shadow-md hover:-translate-y-0.5"
          >
            Book Appointment
          </a>
        </div>

        <button
          className={`lg:hidden ${scrolled ? 'text-navy-dark' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {open && (
        <div className="mx-6 mt-4 rounded-3xl bg-white p-6 shadow-xl lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-navy-dark hover:text-teal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 border-t border-slate/10 pt-6">
            <a href="tel:+18005551234" className="flex items-center gap-2 text-sm font-semibold text-navy-dark">
              <Phone className="h-4 w-4" /> (800) 555-1234
            </a>
            <a
              href="#appointment"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-teal px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
