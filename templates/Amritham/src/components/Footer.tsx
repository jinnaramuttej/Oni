import { KolamDividerWide } from './KolamDivider';

export function Footer() {
  return (
    <footer className="bg-brown-dark text-ivory pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center border border-terracotta/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6 2 10c0 2.5 1.5 5 3 6.5V22l3-2 4 1 4-1 3 2v-5.5c1.5-1.5 3-4 3-6.5 0-4-4.48-8-10-8z" fill="#B55A30" fillOpacity="0.6"/>
                </svg>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold text-ivory">Amritham</span>
                <span className="block text-[9px] tracking-[0.3em] uppercase text-ivory/50">
                  South Indian Kitchen
                </span>
              </div>
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed">
              Authentic South Indian cuisine rooted in family tradition, 
              served with warmth since 1987.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-turmeric mb-4 tracking-wide">Quick Links</h5>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Story', href: '#story' },
                { label: 'Menu', href: '#menu' },
                { label: 'Specialties', href: '#specialties' },
                { label: 'Catering', href: '#catering' },
                { label: 'Reserve a Table', href: '#reserve' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ivory/60 text-sm hover:text-turmeric transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-turmeric mb-4 tracking-wide">Our Cuisines</h5>
            <ul className="space-y-2.5">
              {['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana'].map((c) => (
                <li key={c} className="text-ivory/60 text-sm">{c}</li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-turmeric mb-4 tracking-wide">Opening Hours</h5>
            <ul className="space-y-2.5 text-ivory/60 text-sm">
              <li>Breakfast: 6:30 – 11:00 AM</li>
              <li>Lunch: 12:00 – 3:30 PM</li>
              <li>Tiffin: 4:00 – 6:00 PM</li>
              <li>Dinner: 7:00 – 10:30 PM</li>
              <li className="text-leaf-light font-medium pt-1">Open all 7 days</li>
            </ul>
          </div>
        </div>

        <KolamDividerWide className="mb-8 opacity-50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-xs">
            © 2024 Amritham South Indian Kitchen. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-ivory/40 text-xs hover:text-ivory/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-ivory/40 text-xs hover:text-ivory/70 transition-colors">Terms</a>
            <a href="#" className="text-ivory/40 text-xs hover:text-ivory/70 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
