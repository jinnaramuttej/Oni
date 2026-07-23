import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Search, BarChart3, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Discovery',
    description: 'We begin with a comprehensive assessment of your financial landscape, understanding your business goals, challenges, and growth trajectory.',
  },
  {
    icon: BarChart3,
    step: '02',
    title: 'Analysis',
    description: 'Our experts analyze your financial data, identify optimization opportunities, and benchmark your performance against industry standards.',
  },
  {
    icon: Settings,
    step: '03',
    title: 'Strategy',
    description: 'We design a tailored financial roadmap with actionable strategies for tax efficiency, compliance, and sustainable business growth.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Execution',
    description: 'Our team implements solutions with precision, provides ongoing support, and continuously monitors outcomes to ensure lasting results.',
  },
];

export default function Process() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-1.5 mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs font-semibold text-emerald tracking-wider uppercase">Our Process</span>
          </div>
          <h2
            className={`text-3xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight mb-4 transition-all duration-600 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            A Proven Methodology
            <br />
            for Financial Success
          </h2>
          <p
            className={`text-base lg:text-lg text-slate-text leading-relaxed transition-all duration-600 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our structured four-step approach ensures every engagement delivers
            measurable impact and lasting value for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative text-center transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${250 + i * 120}ms` }}
            >
              {/* Step circle */}
              <div className="relative inline-flex mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow relative z-10">
                  <step.icon className="w-7 h-7 text-navy" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-emerald text-[11px] font-bold text-white z-20">
                  {step.step}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-navy mb-3">{step.title}</h3>
              <p className="text-sm text-slate-text leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
