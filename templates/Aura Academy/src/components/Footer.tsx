import React, { useState } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onOpenEnroll: () => void;
  onOpenParentPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnroll, onOpenParentPortal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Newsletter & Consultation Hero Card */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 border border-indigo-500/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ivy Admissions Strategy Digest</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Get Weekly SAT Practice Questions & University Tips
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Join 18,000+ parents and students receiving our free weekly SAT/AP practice problem sets and college admissions breakdowns.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            {subscribed ? (
              <div className="p-3.5 bg-emerald-500/20 text-emerald-300 rounded-2xl border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Subscribed! First SAT problem set sent to inbox.
              </div>
            ) : (
              <>
                <input
                  required
                  type="email"
                  placeholder="Enter parent or student email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-medium min-w-[280px]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md cursor-pointer shrink-0"
                >
                  <span>Subscribe Free</span>
                  <Send className="w-4 h-4 text-amber-300" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-900 via-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                AURA <span className="text-blue-500 font-sans">ACADEMY</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              America's premier coaching and tutoring institution dedicated to transforming academic potential into top 1% standardized scores, AP mastery, and Ivy League acceptances.
            </p>

            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Admissions Line: (800) 555-AURA &bull; Mon–Sun 8AM–8PM EST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>admissions@auraacademy.edu</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenEnroll}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Enroll Student Spot
              </button>
              <button
                onClick={onOpenParentPortal}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Parent Portal
              </button>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Premier Tracks</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#courses" className="hover:text-amber-300 transition-colors">Digital SAT 1600 Accelerator</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition-colors">AP Physics C & Vector Calculus</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition-colors">AP Biology & Pre-Med Track</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition-colors">USACO & AP Computer Science</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition-colors">IB Higher Level Exam Mastery</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition-colors">Middle School AMC 8 Honors</a></li>
            </ul>
          </div>

          {/* Methodology & Results */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Institution</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#methodology" className="hover:text-amber-300 transition-colors">5-Step EdTech Methodology</a></li>
              <li><a href="#educators" className="hover:text-amber-300 transition-colors">Ivy League Faculty Dossiers</a></li>
              <li><a href="#results" className="hover:text-amber-300 transition-colors">Verified Score Outcomes</a></li>
              <li><a href="#batches" className="hover:text-amber-300 transition-colors">Upcoming Batch Schedules</a></li>
              <li><a href="#tuition" className="hover:text-amber-300 transition-colors">Tuition & Scholarships</a></li>
              <li><a href="#faqs" className="hover:text-amber-300 transition-colors">Parent Guarantees & FAQs</a></li>
            </ul>
          </div>

          {/* Campuses Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campuses & Centers</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Boston Downtown Campus</strong>
                  <span>100 Beacon Street, Boston MA 02116</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Cambridge STEM Lab</strong>
                  <span>50 Kendall Square, Cambridge MA 02142</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block">Global Virtual Studio</strong>
                  <span>Live Interactive Broadcasting 24/7</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Accreditation & Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>&copy; {new Date().getFullYear()} Aura Academy Inc. Certified STEM Center & STEM Alliance Partner.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Enrollment</a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-800"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
