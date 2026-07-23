import { ArrowUp } from 'lucide-react';

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-brown text-white/60 pt-16 lg:pt-24 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-gold">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 20C10 20 12 12 16 12C20 12 22 20 22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="16" cy="10" r="2" fill="currentColor" />
              </svg>
              <span className="font-serif text-xl text-ivory">Crumb & Crust</span>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              A flour studio crafting handmade pastries, artisan breads, 
              and celebration cakes since 2018.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors text-white/60 hover:text-gold" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors text-white/60 hover:text-gold" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-ivory mb-5 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Story', href: '#story' },
                { label: 'Menu', href: '#menu' },
                { label: 'Custom Cakes', href: '#custom' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Catering', href: '#order' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm font-light hover:text-gold transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-medium text-ivory mb-5 uppercase tracking-wider">Information</h4>
            <ul className="space-y-3">
              {['Ordering', 'Delivery', 'Allergen Info', 'Gift Cards', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-light hover:text-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-medium text-ivory mb-5 uppercase tracking-wider">Stay Connected</h4>
            <p className="text-sm font-light mb-4">
              Be the first to hear about new flavors, seasonal specials, and bakery events.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-[14px] bg-white/5 border border-white/10 text-sm text-ivory placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
              />
              <button type="submit" className="px-5 py-2.5 rounded-[14px] bg-gold text-chocolate text-sm font-medium hover:bg-ivory transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-light">
            © 2025 Crumb & Crust. All rights reserved. Baked with ❤️ in Portland, OR.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-all hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp size={16} className="text-white/40" />
          </button>
        </div>
      </div>
    </footer>
  );
}
