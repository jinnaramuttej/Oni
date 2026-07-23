import { useInView } from '../hooks/useInView';
import { ArrowRight, Building2, Gavel, ShieldCheck, Globe, FileText, Users, Landmark, HeartPulse } from 'lucide-react';
import SectionHeader from './SectionHeader';

const practices = [
  {
    icon: Building2,
    title: 'Corporate & M&A',
    description: 'Strategic counsel for mergers, acquisitions, joint ventures, and complex corporate transactions across domestic and international markets.',
  },
  {
    icon: Gavel,
    title: 'Litigation & Dispute',
    description: 'Aggressive courtroom advocacy and sophisticated dispute resolution for high-stakes commercial, civil, and securities litigation.',
  },
  {
    icon: ShieldCheck,
    title: 'Intellectual Property',
    description: 'Comprehensive IP protection including patents, trademarks, trade secrets, and technology licensing for innovative enterprises.',
  },
  {
    icon: Globe,
    title: 'International Trade',
    description: 'Expert guidance on cross-border transactions, international compliance, trade regulations, and foreign investment structures.',
  },
  {
    icon: FileText,
    title: 'Regulatory & Compliance',
    description: 'Proactive regulatory strategy, government investigations, compliance programs, and enforcement defense across all sectors.',
  },
  {
    icon: Users,
    title: 'Employment Law',
    description: 'Executive employment agreements, workplace investigations, discrimination defense, and complex labor dispute resolution.',
  },
  {
    icon: Landmark,
    title: 'Real Estate & Finance',
    description: 'Sophisticated real estate transactions, development projects, financing structures, and commercial leasing arrangements.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare & Life Sciences',
    description: 'Regulatory compliance, licensing, clinical trial agreements, and litigation defense for healthcare organizations and biotech firms.',
  },
];

export default function PracticeAreas() {
  const { ref, isInView } = useInView();

  return (
    <section id="practice-areas" className="py-24 lg:py-32 bg-cream" aria-label="Practice areas">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Practice Areas"
          title="Comprehensive Legal Expertise"
          description="Our attorneys bring decades of combined experience across the full spectrum of corporate and commercial law, delivering strategic solutions tailored to each client's unique objectives."
        />

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ${isInView ? '' : 'opacity-0'}`}
        >
          {practices.map((practice, i) => (
            <div
              key={practice.title}
              className={`group relative rounded-[18px] border border-warm-gray bg-white p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1 ${
                isInView ? 'animate-fade-up' : ''
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[14px] border border-gold/20 bg-gold/5 transition-colors duration-300 group-hover:bg-gold/10">
                <practice.icon size={24} className="text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-midnight mb-3">{practice.title}</h3>
              <p className="text-[14px] leading-relaxed text-slate-custom mb-6">{practice.description}</p>
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.04em] uppercase text-gold opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                Consult Now
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              {/* Bottom gold accent on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gold/0 transition-all duration-500 group-hover:bg-gold/40 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
