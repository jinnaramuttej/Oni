import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Trophy, TrendingUp, Users } from 'lucide-react';

const stats = [
  { icon: GraduationCap, value: 15000, suffix: '+', label: 'Students Mentored', color: 'text-blue-royal' },
  { icon: Trophy, value: 96, suffix: '%', label: 'Overall Pass Rate', color: 'text-amber-accent' },
  { icon: TrendingUp, value: 40, suffix: '%', label: 'Avg. Score Improvement', color: 'text-emerald-success' },
  { icon: Users, value: 50, suffix: '+', label: 'Expert Educators', color: 'text-indigo-deep' },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-20 lg:py-28 bg-white" aria-label="Performance statistics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-emerald-success/10 px-4 py-1.5 text-sm font-semibold text-emerald-success mb-4">
            Our Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
            Numbers That <span className="text-blue-royal">Speak</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Measurable outcomes that demonstrate our commitment to academic excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-[20px] bg-slate-bg p-6 lg:p-8 text-center hover:bg-white hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-gray-100"
            >
              <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-white shadow-card group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 lg:h-7 lg:w-7 ${stat.color}`} />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-indigo-deep mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-slate-text">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'JEE Advanced Selection Rate', value: 87, color: 'bg-blue-royal' },
            { label: 'NEET Qualification Rate', value: 94, color: 'bg-emerald-success' },
            { label: 'Board Exam 90%+ Score', value: 91, color: 'bg-amber-accent' },
          ].map((bar) => (
            <div key={bar.label} className="bg-slate-bg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-indigo-deep">{bar.label}</span>
                <span className="text-sm font-bold text-blue-royal">{bar.value}%</span>
              </div>
              <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${bar.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
