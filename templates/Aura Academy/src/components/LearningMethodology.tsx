import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '../data/mockData';
import { 
  Cpu, 
  TrendingUp, 
  Shield, 
  CheckCircle2
} from 'lucide-react';

export const LearningMethodology: React.FC = () => {
  const [activeSimTab, setActiveSimTab] = useState<'mastery' | 'predicted' | 'feedback'>('mastery');

  return (
    <section id="methodology" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-amber-400" />
            Adaptive EdTech & Master Mentorship Framework
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Engineered For Measurable Outperformance
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We replace passive lectures with data-driven micro-learning, personalized diagnostic profiling, and 1-on-1 expert accountability.
          </p>
        </div>

        {/* Grid: 5-Step Steps on Left + Interactive Dashboard Preview on Right */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Steps Timeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {METHODOLOGY_STEPS.map((stepItem) => (
              <div 
                key={stepItem.step}
                className="group p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md shadow-blue-900/30 font-mono">
                    {stepItem.step}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
                        {stepItem.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {stepItem.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed pt-1">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Simulated Student Analytics Dashboard (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl relative">
              
              {/* Dashboard Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <div className="text-xs font-bold text-slate-300">Live AI Analytics Simulator</div>
                    <div className="text-[11px] text-slate-500">Student ID: #AU-8842 &bull; SAT Honors Track</div>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  On Track: 1560 Target
                </span>
              </div>

              {/* Tab Selector Buttons */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900 rounded-xl mb-6 text-xs font-bold">
                <button
                  onClick={() => setActiveSimTab('mastery')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeSimTab === 'mastery'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Skill Mastery
                </button>
                <button
                  onClick={() => setActiveSimTab('predicted')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeSimTab === 'predicted'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Score Predictor
                </button>
                <button
                  onClick={() => setActiveSimTab('feedback')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    activeSimTab === 'feedback'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tutor Digest
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="space-y-4 min-h-[260px]">
                {activeSimTab === 'mastery' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Real-Time Conceptual Competency Matrix
                    </div>

                    {/* Subject Row 1 */}
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-200">Advanced Algebra & Quadratics</span>
                        <span className="text-emerald-400 font-mono">96% Mastery</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-400 h-2 rounded-full w-[96%]" />
                      </div>
                    </div>

                    {/* Subject Row 2 */}
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-200">Rhetorical Synthesis & Inference</span>
                        <span className="text-blue-400 font-mono">92% Mastery</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-[92%]" />
                      </div>
                    </div>

                    {/* Subject Row 3 */}
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-200">Vectors & Circular Trigonometry</span>
                        <span className="text-amber-400 font-mono">88% Mastery (+14% this week)</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-amber-400 h-2 rounded-full w-[88%]" />
                      </div>
                    </div>
                  </div>
                )}

                {activeSimTab === 'predicted' && (
                  <div className="space-y-4 animate-in fade-in text-center py-2">
                    <div className="p-5 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl border border-indigo-500/30">
                      <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                        Current Predictive SAT Score
                      </div>
                      <div className="text-5xl font-extrabold font-mono text-white mb-2 tracking-tight">
                        1570 <span className="text-emerald-400 text-lg font-sans">/ 1600</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+280 Points from Initial Diagnostic (1290)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Math Module</div>
                        <div className="text-lg font-bold text-white font-mono">790 / 800</div>
                        <div className="text-[10px] text-emerald-400">Top 1st Percentile</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Reading & Writing</div>
                        <div className="text-lg font-bold text-white font-mono">780 / 800</div>
                        <div className="text-[10px] text-emerald-400">Top 1st Percentile</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSimTab === 'feedback' && (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img className="w-6 h-6 rounded-full object-cover" src="https://images.pexels.com/photos/1546912/pexels-photo-1546912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100" alt="Marcus Vance" />
                          <span className="text-xs font-bold text-amber-300">Marcus Vance (Lead Tutor)</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Yesterday, 4:15 PM</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        “Outstanding performance on Sunday’s proctored mock exam! Julian eliminated timing issues on Module 2 math. Assigned 3 targeting sets for trigonometry precision before next session.”
                      </p>
                    </div>

                    <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-500/30 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                      <div className="text-xs text-blue-200">
                        Parent SMS Digest dispatched to (617) 555-0192 &bull; <strong>Verified Delivered</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  SSL Encrypted Parent Portal
                </span>
                <span className="font-mono text-amber-400">AURA Tech Core v4.2</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
