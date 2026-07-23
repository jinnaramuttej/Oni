import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80 relative overflow-hidden">
      {/* Subtle top decorative line */}
      <div className="absolute top-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-24 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#" className="font-display text-[1.6rem] tracking-[0.22em] text-ivory uppercase font-normal block mb-6">SÉRENITÉ</a>
            <p className="text-[14px] text-ivory/50 font-light leading-relaxed font-sans max-w-xs">
              A sanctuary of stillness where ancient healing traditions meet modern luxury wellness.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-ivory/30 font-medium mb-6">Experience</h4>
            <ul className="space-y-3">
              {['Our Philosophy', 'Treatments', 'Wellness Rituals', 'Therapists', 'Memberships'].map((item) => (
                <li key={item}><a href="#" className="text-[13px] text-ivory/60 hover:text-champagne transition-colors font-light font-sans">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-ivory/30 font-medium mb-6">Treatments</h4>
            <ul className="space-y-3">
              {['Deep Tissue', 'Facial Rituals', 'Aromatherapy', 'Body Renewal', 'Spa Packages'].map((item) => (
                <li key={item}><a href="#" className="text-[13px] text-ivory/60 hover:text-champagne transition-colors font-light font-sans">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:col-start-11">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-ivory/30 font-medium mb-6">Contact</h4>
            <ul className="space-y-3 text-[13px] text-ivory/60 font-light font-sans">
              <li>128 Serenity Lane</li>
              <li>Lake District, CA 95472</li>
              <li className="pt-2"><a href="#" className="hover:text-champagne transition-colors">welcome@serenite-wellness.com</a></li>
              <li><a href="#" className="hover:text-champagne transition-colors">+1 (707) 482-9100</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] text-ivory/20 tracking-[0.1em] font-light font-sans">© 2026 SÉRENITÉ WELLNESS RETREAT. ALL RIGHTS RESERVED.</p>
          <a href="#" className="group flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-ivory/25 hover:text-champagne transition-colors font-medium">
            Back to Top <ArrowUpRight size={14} strokeWidth={1.2} className="group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
}
