import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CheckCircle2 } from 'lucide-react';

const expertisePoints = [
  'Deep industry knowledge across 20+ sectors',
  'Proactive tax optimization strategies',
  'Technology-driven financial workflows',
  'Dedicated relationship managers',
  'Real-time financial reporting dashboards',
  'Seamless compliance management',
];

export default function Expertise() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="expertise" className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-xs font-semibold text-white/70 tracking-wider uppercase">Financial Expertise</span>
            </div>
            <h2
              className={`text-3xl lg:text-[2.75rem] font-bold text-white leading-tight tracking-tight mb-6 transition-all duration-600 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Why Leading Businesses
              <br />
              Choose Ascend
            </h2>
            <p
              className={`text-base lg:text-lg text-white/60 leading-relaxed mb-10 transition-all duration-600 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              We combine decades of chartered accountancy expertise with cutting-edge
              financial technology to deliver insights that drive smarter decisions and
              stronger growth.
            </p>

            <div className="space-y-4">
              {expertisePoints.map((point, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-light flex-shrink-0" />
                  <span className="text-[15px] text-white/80 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <a
              href="#consultation"
              className={`inline-flex items-center gap-3 mt-10 rounded-2xl bg-emerald px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald/20 transition-all duration-300 hover:bg-emerald-light hover:-translate-y-0.5 ${
                isVisible ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-4'
              }`}
            >
              Speak With an Expert
            </a>
          </div>

          {/* Right - Dashboard-inspired card */}
          <div
            className={`transition-all duration-800 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://images.pexels.com/photos/7947999/pexels-photo-7947999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200"
                  alt="Financial analytics dashboard on laptop"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating dashboard card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-5 max-w-[220px]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-emerald" />
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Revenue</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">₹2.4Cr</div>
                <div className="text-xs text-white/50">Annual savings avg.</div>
                <div className="mt-3 flex items-end gap-1 h-10">
                  {[30, 45, 35, 55, 48, 65, 58, 78].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald/60 to-emerald-light/40"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Compliance badge */}
              <div className="absolute -top-4 -left-4 lg:-left-6 rounded-2xl bg-white shadow-xl shadow-black/10 p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">100%</div>
                  <div className="text-[11px] text-slate-text">Compliance Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
