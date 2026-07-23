import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Building, ShoppingBag, Cpu, Stethoscope, GraduationCap, Factory, Plane, Landmark } from 'lucide-react';

const industries = [
  { icon: Cpu, name: 'Technology & SaaS', clients: '200+' },
  { icon: ShoppingBag, name: 'Retail & E-Commerce', clients: '150+' },
  { icon: Stethoscope, name: 'Healthcare', clients: '80+' },
  { icon: Building, name: 'Real Estate', clients: '120+' },
  { icon: Factory, name: 'Manufacturing', clients: '95+' },
  { icon: GraduationCap, name: 'Education', clients: '60+' },
  { icon: Plane, name: 'Travel & Hospitality', clients: '45+' },
  { icon: Landmark, name: 'Financial Services', clients: '110+' },
];

export default function Industries() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs font-semibold text-navy tracking-wider uppercase">Industries We Serve</span>
          </div>
          <h2
            className={`text-3xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight mb-4 transition-all duration-600 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Expertise Across
            <br />
            Diverse Sectors
          </h2>
          <p
            className={`text-base lg:text-lg text-slate-text leading-relaxed transition-all duration-600 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Deep sector knowledge enables us to provide tailored financial solutions
            that address industry-specific challenges and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {industries.map((ind, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-gray-100 bg-surface/30 p-6 text-center transition-all duration-500 hover:bg-white hover:shadow-lg hover:shadow-black/[0.04] hover:border-emerald/15 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${200 + i * 60}ms` }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/[0.04] mx-auto mb-4 group-hover:bg-emerald/10 transition-colors duration-300">
                <ind.icon className="w-6 h-6 text-navy group-hover:text-emerald transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-semibold text-navy mb-1">{ind.name}</h3>
              <p className="text-xs text-slate-text">{ind.clients} clients</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
