import { Trophy, Users, Target, Zap, Clock, GraduationCap } from 'lucide-react';

const badges = [
  { icon: Trophy, label: 'Top Results', desc: 'Consistently ranked #1 in regional exams' },
  { icon: Users, label: 'Expert Faculty', desc: '15+ years average teaching experience' },
  { icon: Target, label: 'Small Batch Sizes', desc: 'Maximum 20 students per batch' },
  { icon: Zap, label: 'Adaptive Learning', desc: 'AI-powered personalized study plans' },
  { icon: Clock, label: 'Flexible Timings', desc: 'Morning, afternoon & weekend batches' },
  { icon: GraduationCap, label: 'Proven Outcomes', desc: '96% pass rate with distinction' },
];

export default function TrustBadges() {
  return (
    <section className="relative -mt-1 bg-white" aria-label="Trust badges">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {badges.map((badge, i) => (
            <div
              key={badge.label}
              className="group flex flex-col items-center text-center p-5 lg:p-6 rounded-2xl border border-gray-100 bg-slate-bg/50 hover:bg-white hover:shadow-card-hover hover:border-indigo-deep/10 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-indigo-deep/5 flex items-center justify-center mb-3 lg:mb-4 group-hover:bg-indigo-deep/10 transition-colors duration-300">
                <badge.icon className="h-5 w-5 lg:h-6 lg:w-6 text-indigo-deep" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-indigo-deep mb-1">{badge.label}</h3>
              <p className="text-xs lg:text-sm text-slate-text leading-snug">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
