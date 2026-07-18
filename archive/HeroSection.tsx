import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  Star,
  Zap,
  GraduationCap
} from 'lucide-react';

interface HeroProps {
  onOpenEnroll: () => void;
  onExploreCourses: () => void;
  onTakeQuiz: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ 
  onOpenEnroll, 
  onExploreCourses,
  onTakeQuiz
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-8 pb-20 lg:pt-12 lg:pb-32">
      {/* Ambient background lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2.5 bg-indigo-900/80 border border-indigo-400/30 px-4 py-2 rounded-full backdrop-blur-md shadow-inner text-amber-300 text-xs sm:text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Zap className="w-4 h-4 text-amber-400" />
              <span>America’s Premier STEM & Standardized Test Center</span>
            </div>

            {/* Inspiring Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Transforming Academic Ambition Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-emerald-400">
                Ivy-League Excellence
              </span>
            </h1>

            {/* Short Value Proposition */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Personalized micro-batch mentoring, master educators from Stanford & MIT, and adaptive diagnostic algorithms engineered to unlock confidence, mastery, and guaranteed score gains for Grades 6–12.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenEnroll}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-blue-400/40"
              >
                <span>Enroll Now & Claim Free Consultation</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-base px-7 py-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>Explore Courses & Batches</span>
              </button>

              <button
                onClick={onTakeQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-base px-5 py-4 rounded-2xl border border-amber-500/30 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Diagnostic Quiz</span>
              </button>
            </div>

            {/* Key Trust Highlights Bullet Row */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">99.4% Pass Rate</div>
                  <div className="text-slate-400 text-xs">Top 5% Exam Scores</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">1:8 Small Batches</div>
                  <div className="text-slate-400 text-xs">Max Individual Focus</div>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Ivy-League Faculty</div>
                  <div className="text-slate-400 text-xs">Ph.D. & Expert Mentors</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Column: Engaged classroom, mentorship, floating outcome cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/80 border border-slate-700/60 group">
                <img
                  src="https://images.pexels.com/photos/8199603/pexels-photo-8199603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900"
                  alt="Engaged student learning with mentor in modern library setting"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-panel-dark p-4 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow">
                        SAT
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-300">Target SAT Score Goal</div>
                        <div className="text-base font-extrabold text-white">1550 – 1600 Perfect Track</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.98 Rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Top Floating Score Badge */}
              <div className="absolute -top-6 -left-6 sm:-left-8 glass-panel-dark p-4 rounded-2xl border border-emerald-500/30 shadow-xl shadow-emerald-950/30 animate-float hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Verified SAT Gain</div>
                    <div className="text-lg font-extrabold text-white flex items-center gap-1">
                      <span>+290 Pts</span>
                      <span className="text-emerald-400 text-xs font-normal">Average Lift</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Right Mentor Badge */}
              <div className="absolute -bottom-6 -right-6 sm:-right-8 glass-panel-dark p-4 rounded-2xl border border-blue-500/30 shadow-xl shadow-blue-950/30 animate-float-slow hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-indigo-900 object-cover" src="https://images.pexels.com/photos/34761515/pexels-photo-34761515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200" alt="Dr Chen" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-indigo-900 object-cover" src="https://images.pexels.com/photos/1546912/pexels-photo-1546912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200" alt="Marcus Vance" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-indigo-900 object-cover" src="https://images.pexels.com/photos/17050931/pexels-photo-17050931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200" alt="Dr Sharma" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-semibold">150+ Top Tier Educators</div>
                    <div className="text-xs text-amber-300 font-mono font-bold">Harvard, MIT, Stanford</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Target Universities Acceptance Marquee Bar */}
        <div className="mt-16 pt-10 border-t border-slate-800/80">
          <p className="text-center text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
            Our Alumni Are Currently Thriving At World-Class Institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all text-slate-300 font-extrabold text-sm sm:text-base tracking-wider font-mono">
            <span className="hover:text-blue-400 transition-colors cursor-default">HARVARD</span>
            <span className="hover:text-amber-300 transition-colors cursor-default">M.I.T.</span>
            <span className="hover:text-red-400 transition-colors cursor-default">STANFORD</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">COLUMBIA</span>
            <span className="hover:text-emerald-400 transition-colors cursor-default">PRINCETON</span>
            <span className="hover:text-amber-400 transition-colors cursor-default">OXFORD</span>
            <span className="hover:text-indigo-400 transition-colors cursor-default">CALTECH</span>
          </div>
        </div>

        {/* Smooth Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#metrics"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-full bg-slate-800/50 border border-slate-700/50"
          >
            <span>Discover Our Impact & Methodology</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
