import { ArrowUp } from 'lucide-react';

const footerLinks = {
  Properties: ['Featured Listings', 'New Developments', 'Waterfront Estates', 'Penthouses', 'International'],
  Services: ['Buyer Advisory', 'Seller Services', 'Property Valuation', 'Investment Consulting', 'Relocation'],
  Company: ['About Us', 'Our Team', 'Careers', 'Press', 'Contact'],
  Resources: ['Market Reports', 'Buying Guide', 'Selling Guide', 'Blog', 'FAQ'],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-20 md:pt-24 pb-8">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-12 md:gap-8 pb-16 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-[28px] font-semibold text-white tracking-[0.02em]">
                ELEVATION
              </span>
              <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-gold -mt-1">
                Luxury Real Estate
              </span>
            </div>
            <p className="mt-6 text-[14px] text-white/40 font-light leading-relaxed max-w-xs">
              Representing the finest properties worldwide with integrity, discretion, and an unwavering commitment to excellence.
            </p>
            <div className="mt-6 flex gap-4">
              {['LinkedIn', 'Instagram', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[11px] text-white/30 hover:text-gold tracking-[0.1em] uppercase transition-colors"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-semibold text-gold tracking-[0.15em] uppercase mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-white/40 hover:text-white font-light transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-[11px] text-white/25">
            <span>&copy; 2025 Elevation Luxury Real Estate. All rights reserved.</span>
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/50 transition-colors">Accessibility</a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full border border-white/15 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-white/40 group-hover:text-gold transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
