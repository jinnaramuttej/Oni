import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    'Treatments': [
      'General Dentistry',
      'Cosmetic Dentistry',
      'Dental Implants',
      'Invisalign',
      'Teeth Whitening',
      'Root Canal',
    ],
    'Company': [
      'About Us',
      'Our Team',
      'Careers',
      'Press',
      'Blog',
      'Contact',
    ],
    'Patients': [
      'New Patients',
      'Insurance',
      'Financing',
      'FAQs',
      'Privacy Policy',
      'Terms of Service',
    ],
  };

  return (
    <footer className="bg-navy text-white" role="contentinfo">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Ready for a healthier smile?
              </h3>
              <p className="text-white/60 text-lg">
                Book your appointment today and join the Lumina family.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#booking"
                className="px-8 py-4 rounded-btn bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-all duration-300 shadow-glow btn-press"
              >
                Book Appointment
              </a>
              <a
                href="tel:+15551234567"
                className="px-8 py-4 rounded-btn bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 btn-press"
              >
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C9.5 2 7 4.5 7 7c0 1.5.5 3 1.5 4C9.5 13 10 16 12 18c2-2 2.5-5 3.5-7C16.5 10 17 8.5 17 7c0-2.5-2.5-5-5-5z"/>
                  <path d="M12 2c-1 0-3 1.5-3 4s1 4.5 3 6.5"/>
                  <path d="M12 2c1 0 3 1.5 3 4s-1 4.5-3 6.5"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Lumina<span className="text-teal-400">Dental</span>
              </span>
            </div>
            <p className="text-white/50 leading-relaxed mb-6 max-w-sm">
              Premium dental care in a modern, comfortable environment. Your smile deserves the best — and that's exactly what we deliver.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[
                { label: 'Facebook', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { label: 'Instagram', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg> },
                { label: 'Twitter', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: 'LinkedIn', svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-teal-500 hover:text-white transition-all duration-300"
                >
                  {social.svg}
                </a>
              ))}
            </div>
            <div className="space-y-2">
              <a href="tel:+15551234567" className="flex items-center gap-2 text-white/50 hover:text-teal-400 transition-colors text-sm">
                <Phone size={14} /> (555) 123-4567
              </a>
              <a href="mailto:hello@luminadental.com" className="flex items-center gap-2 text-white/50 hover:text-teal-400 transition-colors text-sm">
                <Mail size={14} /> hello@luminadental.com
              </a>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin size={14} className="flex-shrink-0" /> 350 Fifth Avenue, Suite 4200, NYC
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-teal-400 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {currentYear} Lumina Dental. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            Crafted with <Heart size={12} className="text-teal-500" /> for healthier smiles
          </p>
        </div>
      </div>
    </footer>
  );
}
