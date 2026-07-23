import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Users, 
  Calendar
} from 'lucide-react';

interface TuitionCalculatorProps {
  onOpenEnroll: () => void;
}

export const TuitionCalculator: React.FC<TuitionCalculatorProps> = ({ onOpenEnroll }) => {
  const [gradeLevel, setGradeLevel] = useState<string>('High School (Grades 9-10)');
  const [format, setFormat] = useState<'micro' | 'private' | 'hybrid'>('micro');
  const [subjectCount, setSubjectCount] = useState<number>(2);

  // Fee calculation logic
  const baseRate = format === 'private' ? 280 : format === 'micro' ? 190 : 160;
  const totalMonthly = Math.round(baseRate * subjectCount * 0.9); // 10% multi-subject bundle savings

  return (
    <section id="tuition" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-blue-600" />
            Transparent Investment & Financial Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tuition & Scholarship Calculator
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            No hidden fees or surprise costs. Select your student’s grade and program goals for an instant tuition quote.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Grade Level Selection */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                1. Select Student Grade Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Middle School (Grades 6-8)', 'High School (Grades 9-10)', 'Senior Prep (Grades 11-12)'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGradeLevel(g)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                      gradeLevel === g
                        ? 'bg-indigo-900 text-white border-indigo-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Learning Format */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                2. Select Preferred Learning Format
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setFormat('micro')}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    format === 'micro'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm mb-1">
                    <span>Micro-Batch (1:8)</span>
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Interactive peer learning & full mentor attention</div>
                </button>

                <button
                  onClick={() => setFormat('private')}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    format === 'private'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm mb-1">
                    <span>1-on-1 Private</span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Bespoke curriculum paced solely to student</div>
                </button>

                <button
                  onClick={() => setFormat('hybrid')}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    format === 'hybrid'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/20'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm mb-1">
                    <span>Hybrid Masterclass</span>
                    <Calendar className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Campus lab sessions + live virtual studio flexibility</div>
                </button>
              </div>
            </div>

            {/* Step 3: Number of Subjects Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  3. Number of Subjects / Prep Modules
                </label>
                <span className="text-xs font-extrabold text-indigo-900 bg-indigo-50 border border-indigo-100 px-3 py-0.5 rounded-full">
                  {subjectCount} {subjectCount === 1 ? 'Subject Track' : 'Subject Tracks'} (10% Bundle Discount Applied)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                value={subjectCount}
                onChange={(e) => setSubjectCount(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
                <span>1 Subject</span>
                <span>2 Subjects</span>
                <span>3 Subjects</span>
                <span>4 Subjects (Comprehensive Ivy Prep)</span>
              </div>
            </div>

          </div>

          {/* Pricing Quote Display Box (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                <Award className="w-4 h-4" />
                Estimated Tuition Summary
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-md border border-emerald-500/30">
                Guaranteed Score Growth
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                ${totalMonthly}
                <span className="text-sm font-sans font-normal text-slate-400"> / month</span>
              </div>
              <div className="text-xs text-slate-300">
                Covers {subjectCount} subjects in {format === 'private' ? '1-on-1 Private Mentorship' : format === 'micro' ? '1:8 Micro-Batch Format' : 'Hybrid Flex Campus'} for {gradeLevel}.
              </div>
            </div>

            {/* Included Perks */}
            <div className="space-y-2 text-xs font-semibold text-slate-300 border-t border-slate-800 pt-4">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Included in Monthly Tuition:</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2,500+ Digital SAT/AP Proctored Item Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited 1-on-1 Faculty Office Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Parent Portal App & Weekly Performance Digest</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Guaranteed 150+ Point SAT Score Lift</span>
              </div>
            </div>

            <button
              onClick={onOpenEnroll}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              <span>Apply For Batch & Scholarship</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <div className="text-center">
              <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Merit Financial Aid & Need-Based Grants Available
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
