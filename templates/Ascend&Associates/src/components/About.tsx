import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';
import { Target, TrendingUp, Award, Handshake } from 'lucide-react';

const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 1000, suffix: '+', label: 'Businesses Served' },
  { value: 48, suffix: 'Cr+', label: 'Tax Savings Delivered' },
  { value: 98, suffix: '%', label: 'Client Retention' },
];

const values = [
  { icon: Target, title: 'Precision', desc: 'Every figure audited to perfection' },
  { icon: TrendingUp, title: 'Growth', desc: 'Strategic planning for scalable success' },
  { icon: Award, title: 'Excellence', desc: 'Industry-leading standards & practices' },
  { icon: Handshake, title: 'Trust', desc: 'Lasting partnerships built on transparency' },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-soft-blue px-4 py-1.5 mb-6 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-xs font-semibold text-navy tracking-wider uppercase">About the Firm</span>
            </div>
            <h2
              className={`text-3xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight mb-6 transition-all duration-600 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Building Financial
              <br />
              Confidence Since 2009
            </h2>
            <p
              className={`text-base lg:text-lg text-slate-text leading-relaxed transition-all duration-600 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Ascend & Associates is a full-service chartered accountancy firm that combines
              deep financial expertise with modern technology. We serve startups, SMEs, and
              large enterprises with comprehensive accounting, tax, compliance, and strategic
              advisory services.
            </p>
          </div>

          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/7876671/pexels-photo-7876671.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Team discussing financial strategies"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 lg:-left-6 rounded-2xl bg-white shadow-xl shadow-black/5 border border-gray-100 p-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                <Award className="w-6 h-6 text-emerald" />
              </div>
              <div>
                <div className="text-sm font-bold text-navy">ICAI Certified</div>
                <div className="text-xs text-slate-text">Chartered Accountants</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {values.map((v, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-100 bg-surface/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-emerald/20 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy/5 mb-4 group-hover:bg-emerald/10 transition-colors">
                <v.icon className="w-5 h-5 text-navy group-hover:text-emerald transition-colors" />
              </div>
              <h3 className="text-base font-semibold text-navy mb-1">{v.title}</h3>
              <p className="text-sm text-slate-text leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isVisible={statsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index, isVisible }: { stat: typeof stats[number]; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div
      className={`text-center p-6 rounded-2xl bg-navy/[0.02] transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl lg:text-4xl font-bold text-navy mb-2">
        {stat.suffix === 'Cr+' ? `₹${count}` : count}
        <span className="text-emerald">{stat.suffix === 'Cr+' ? 'Cr+' : stat.suffix}</span>
      </div>
      <div className="text-sm text-slate-text font-medium">{stat.label}</div>
    </div>
  );
}
