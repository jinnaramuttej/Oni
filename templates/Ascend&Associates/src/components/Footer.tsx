import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Accounting & Bookkeeping', href: '#services' },
    { label: 'Tax Planning & Filing', href: '#services' },
    { label: 'GST Services', href: '#services' },
    { label: 'Business Registration', href: '#services' },
    { label: 'Payroll Management', href: '#services' },
    { label: 'Financial Consulting', href: '#services' },
    { label: 'Audit & Assurance', href: '#services' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Industries', href: '#about' },
    { label: 'Careers', href: '#' },
    { label: 'Blog & Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ],
  resources: [
    { label: 'Tax Calculator', href: '#' },
    { label: 'GST Guide', href: '#' },
    { label: 'Business Setup Checklist', href: '#' },
    { label: 'Compliance Calendar', href: '#' },
    { label: 'Financial Templates', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-dark pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald/20 via-emerald/10 to-transparent border border-emerald/20 p-8 lg:p-12 mb-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
              Ready to Optimize Your Finances?
            </h3>
            <p className="text-white/60 text-sm lg:text-base max-w-lg">
              Join 1,000+ businesses that trust Ascend & Associates for their financial growth.
            </p>
          </div>
          <a
            href="#consultation"
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald/20 transition-all duration-300 hover:bg-emerald-light hover:-translate-y-0.5 whitespace-nowrap flex-shrink-0"
          >
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" opacity="0.8" />
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-base font-semibold text-white">Ascend</span>
                <span className="text-base font-light text-white/50">&Associates</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              Premium chartered accountancy firm delivering financial expertise that drives business growth since 2009.
            </p>
            <div className="flex gap-3">
              {['X', 'In', 'Fb'].map((s, i) => (
                <button
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/40 text-xs font-semibold hover:bg-white/10 hover:text-white transition-all"
                  aria-label={`Social media ${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-5">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 Ascend & Associates. All rights reserved. ICAI Registration No. 12345W
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
