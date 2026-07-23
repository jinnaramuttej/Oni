import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { Building, Cpu, HeartPulse, Banknote, Plane, ShoppingBag } from 'lucide-react';

const industries = [
  { icon: Banknote, name: 'Financial Services', desc: 'Banking, investment, private equity, and insurance sectors' },
  { icon: Cpu, name: 'Technology', desc: 'Software, AI, cybersecurity, and digital platform companies' },
  { icon: HeartPulse, name: 'Healthcare', desc: 'Hospitals, pharmaceutical, biotech, and medical device firms' },
  { icon: Building, name: 'Real Estate', desc: 'Commercial development, REITs, and property management' },
  { icon: Plane, name: 'Aviation & Defense', desc: 'Airlines, aerospace manufacturers, and defense contractors' },
  { icon: ShoppingBag, name: 'Retail & Consumer', desc: 'Luxury brands, e-commerce, and consumer product companies' },
];

export default function Industries() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32 bg-ivory" aria-label="Industries served">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Industries"
          title="Sectors We Serve"
          description="We bring deep industry knowledge to deliver legal strategies that align with the unique regulatory, competitive, and operational dynamics of your sector."
        />

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <div
              key={industry.name}
              className={`group flex items-start gap-5 rounded-[16px] border border-warm-gray bg-white p-6 lg:p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-[12px] bg-gold/5 border border-gold/15 transition-colors duration-300 group-hover:bg-gold/10">
                <industry.icon size={22} className="text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-midnight">{industry.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-custom">{industry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
