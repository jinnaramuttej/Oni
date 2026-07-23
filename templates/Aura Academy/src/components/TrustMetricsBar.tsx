import React from 'react';
import { TRUST_METRICS } from '../data/mockData';
import { TrendingUp, Award, Users, DollarSign, ShieldCheck } from 'lucide-react';

export const TrustMetricsBar: React.FC = () => {
  const icons = [TrendingUp, Award, Users, DollarSign];

  return (
    <section id="metrics" className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {TRUST_METRICS.map((metric, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
              
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono mb-1">
                {metric.value}
                <span className="text-blue-600 font-sans text-2xl font-bold">{metric.suffix}</span>
              </div>

              <div className="font-semibold text-slate-800 text-sm mb-0.5">
                {metric.label}
              </div>

              <div className="text-xs text-slate-500 font-normal">
                {metric.subtext}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
