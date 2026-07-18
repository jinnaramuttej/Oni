import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  PhoneCall, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenEnroll: (courseId?: string) => void;
  onOpenSearch: () => void;
  onOpenParentPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenEnroll, 
  onOpenSearch, 
  onOpenParentPortal 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Courses', href: '#courses' },
    { name: 'Methodology', href: '#methodology' },
    { name: 'Educators', href: '#educators' },
    { name: 'Results', href: '#results' },
    { name: 'Batches', href: '#batches' },
    { name: 'Tuition', href: '#tuition' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      {/* Top Reassurance Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Fall 2025 Honors Batches Now Open
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              Avg. SAT Boost: <strong className="text-white">+240 Points</strong> &bull; 98.6% Top-20 Acceptance Rate
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenParentPortal}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Parent Portal</span>
            </button>
            <span className="text-slate-700">|</span>
            <a 
              href="tel:18005552025" 
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-200"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">(800) 555-AURA</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'glass-panel shadow-md py-3 border-b border-slate-200/80' 
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-900 via-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-900/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-mono flex items-center gap-1">
                AURA <span className="text-blue-600 font-sans font-semibold text-lg">ACADEMY</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 -mt-1">
                Ivy-Grade Coaching & Tutoring
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/60 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-indigo-700 hover:bg-slate-100 rounded-full transition-colors"
              title="Search courses and schedules"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenEnroll()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-indigo-900 text-white font-semibold text-sm px-5 py-2.5 rounded-2xl shadow-md hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-indigo-400/30"
            >
              <span>Enroll Now</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-indigo-700 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnroll();
                }}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-colors"
              >
                Enroll Now & Free Consultation
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenParentPortal();
                }}
                className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Parent Portal Sign In
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
