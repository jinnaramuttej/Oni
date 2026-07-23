import { Heart } from 'lucide-react';

const footerLinks = {
  Treatments: [
    { label: 'Cosmetic Dentistry', href: '#treatments' },
    { label: 'Invisalign', href: '#treatments' },
    { label: 'Teeth Whitening', href: '#treatments' },
    { label: 'Dental Implants', href: '#treatments' },
    { label: 'Preventive Care', href: '#treatments' },
    { label: 'Family Dentistry', href: '#treatments' },
  ],
  'Quick Links': [
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#dentists' },
    { label: 'Smile Gallery', href: '#gallery' },
    { label: 'Patient Reviews', href: '#testimonials' },
    { label: 'Insurance', href: '#insurance' },
    { label: 'FAQs', href: '#faqs' },
  ],
  Contact: [
    { label: '(800) 555-1234', href: 'tel:+18005551234' },
    { label: 'hello@luminadental.com', href: 'mailto:hello@luminadental.com' },
    { label: '123 Smile Avenue, Suite 200', href: '#contact' },
    { label: 'New York, NY 10001', href: '#contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy relative overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-primary to-teal-light flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8 2 5 5 5 8c0 2.5 1 4 2.5 6.5S10 19 10 22c.5 0 1.5-1 2-3 .5 2 1.5 3 2 3 0-3 1-4.5 2.5-7.5S19 10.5 19 8c0-3-3-6-7-6z" />
                </svg>
              </div>
              <div>
                <span className="font-heading font-bold text-lg tracking-tight text-white">Lumina</span>
                <span className="font-heading text-[10px] uppercase tracking-[0.2em] block -mt-1 text-teal-light">Dental</span>
              </div>
            </a>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-xs">
              Premium dental care crafted around your comfort. Advanced technology meets genuine compassion.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <button
                  key={social}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-primary/20 hover:border-teal-primary/30 transition-all"
                  aria-label={social}
                >
                  <span className="text-xs text-white/40 font-bold">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-white/40 hover:text-teal-light transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Lumina Dental. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-teal-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-light transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-light transition-colors">HIPAA Compliance</a>
          </div>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-teal-primary" /> for healthy smiles
          </p>
        </div>
      </div>
    </footer>
  );
}
