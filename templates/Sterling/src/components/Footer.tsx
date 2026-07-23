import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';

const practiceLinks = [
  'Corporate & M&A',
  'Litigation & Dispute',
  'Intellectual Property',
  'International Trade',
  'Regulatory & Compliance',
  'Employment Law',
  'Real Estate & Finance',
  'Healthcare & Life Sciences',
];

const firmLinks = [
  'About the Firm',
  'Our Attorneys',
  'Case Results',
  'Awards & Recognition',
  'Legal Insights',
  'Careers',
  'Pro Bono',
  'Diversity & Inclusion',
];

const resourceLinks = [
  'Client Portal',
  'Legal Resources',
  'Newsletter',
  'Press Room',
  'Privacy Policy',
  'Terms of Service',
  'Disclaimer',
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-midnight pt-20 pb-8" role="contentinfo">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Top */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-gold/60 rounded">
                <span className="font-serif text-lg font-bold text-gold">S</span>
              </div>
              <div>
                <span className="font-serif text-lg font-semibold text-ivory tracking-wide">Sterling</span>
                <span className="ml-1.5 text-xs font-light tracking-[0.2em] uppercase text-gold">&amp; Associates</span>
              </div>
            </a>
            <p className="mt-6 text-[14px] leading-relaxed text-ivory/40 max-w-sm">
              A premier law firm delivering strategic counsel and exceptional 
              legal representation to corporations and individuals worldwide since 2003.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gold/60" strokeWidth={1.5} />
                <span className="text-[13px] text-ivory/40">450 Park Avenue, 32nd Floor, New York, NY 10022</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold/60" strokeWidth={1.5} />
                <a href="tel:+12125551234" className="text-[13px] text-ivory/40 hover:text-gold transition-colors duration-300">(212) 555-1234</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold/60" strokeWidth={1.5} />
                <a href="mailto:info@sterlinglaw.com" className="text-[13px] text-ivory/40 hover:text-gold transition-colors duration-300">info@sterlinglaw.com</a>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-gold mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {practiceLinks.map((link) => (
                <li key={link}>
                  <a href="#practice-areas" className="text-[13px] text-ivory/40 hover:text-gold transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* The Firm */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-gold mb-6">The Firm</h4>
            <ul className="space-y-3">
              {firmLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-ivory/40 hover:text-gold transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-gold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-ivory/40 hover:text-gold transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-gold mb-3">Legal Updates</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 rounded-[10px] border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-ivory placeholder-ivory/30 outline-none focus:border-gold/40"
                  aria-label="Email for newsletter"
                />
                <button className="rounded-[10px] bg-gold/10 border border-gold/30 px-4 py-2.5 text-[12px] font-semibold tracking-wide uppercase text-gold hover:bg-gold hover:text-midnight transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-[12px] text-ivory/25">
            <span>© 2025 Sterling & Associates LLP. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Attorney Advertising. Prior results do not guarantee a similar outcome.</span>
          </div>
          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory/30 hover:border-gold hover:text-gold transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
