import { BookOpen, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-indigo-deep text-white" role="contentinfo">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">Ready to Transform Your Future?</h3>
              <p className="text-white/60 text-base lg:text-lg">Join 15,000+ students who chose Apex Academy.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#enrollment"
                className="rounded-[18px] bg-white text-indigo-deep px-8 py-4 text-base font-semibold shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Enroll Now
              </a>
              <a
                href="#contact"
                className="rounded-[18px] border border-white/20 text-white px-8 py-4 text-base font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Apex<span className="text-amber-accent">.</span>Academy
              </span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              Empowering students with expert mentorship, personalized learning, and proven methodologies since 2008.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              New Delhi, India
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Courses', 'Subjects', 'Educators', 'Results', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-5">Programs</h4>
            <ul className="space-y-3">
              {['JEE Advanced', 'NEET Prep', 'Board Exams', 'Olympiads', 'SAT/ACT', 'Foundation'].map((link) => (
                <li key={link}>
                  <a href="#courses" className="text-sm text-white/50 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-5">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-4 w-4 flex-shrink-0" />
                admissions@apexacademy.in
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                123 Education Hub, Knowledge Park, New Delhi 110001
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Apex Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-xl bg-blue-royal text-white shadow-button flex items-center justify-center transition-all duration-500 hover:-translate-y-1 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
