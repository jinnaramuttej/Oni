import {
  Phone, Mail, MapPin, Clock,
  ArrowUp, Heart
} from 'lucide-react';

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Find a Doctor', href: '#doctors' },
  { label: 'Book Appointment', href: '#appointment' },
  { label: 'Patient Testimonials', href: '#testimonials' },
  { label: 'Health Blog', href: '#blog' },
];

const services = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'Ophthalmology', 'Internal Medicine', 'Diagnostics', 'Dermatology',
];

const legal = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Patient Rights', href: '#' },
  { label: 'HIPAA Compliance', href: '#' },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: TwitterIcon, href: '#', label: 'Twitter' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-dark text-white/70" aria-label="Footer">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-teal to-teal-light rounded-[12px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white font-heading tracking-tight">
                Med<span className="text-teal-light">Care</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Delivering compassionate, world-class healthcare with expert physicians and modern facilities
              since 2010.
            </p>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-light flex-shrink-0" />
                1-800-123-4567
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-light flex-shrink-0" />
                care@medclinic.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-light flex-shrink-0" />
                123 Healthcare Blvd, NY
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-light flex-shrink-0" />
                Mon–Sat: 8AM – 8PM
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm hover:text-teal-light transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5">Our Specialties</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm hover:text-teal-light transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-5">Legal</h4>
            <ul className="space-y-2.5 mb-8">
              {legal.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm hover:text-teal-light transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold font-heading mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-teal/20 hover:border-teal/30 text-white/60 hover:text-teal-light transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} MedCare Healthcare Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-white/40 flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for patient care
            </p>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-teal/20 hover:border-teal/30 text-white/60 hover:text-teal-light transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
