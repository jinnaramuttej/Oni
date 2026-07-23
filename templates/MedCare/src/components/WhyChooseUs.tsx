import { useInView } from '../hooks/useInView';
import {
  Microscope, HeartPulse, UserCheck, ShieldCheck,
  Clock3, Zap
} from 'lucide-react';

const features = [
  {
    icon: HeartPulse,
    title: 'Patient-Centered Care',
    desc: 'Every treatment plan is tailored to your unique health needs, preferences, and goals.',
  },
  {
    icon: Microscope,
    title: 'Advanced Technology',
    desc: 'State-of-the-art diagnostic equipment and treatment technologies for precise results.',
  },
  {
    icon: UserCheck,
    title: 'Expert Physicians',
    desc: 'Board-certified doctors with extensive experience across 20+ medical specialties.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Accredited',
    desc: 'Nationally accredited facility meeting the highest standards of healthcare quality.',
  },
  {
    icon: Clock3,
    title: 'Minimal Wait Times',
    desc: 'Streamlined scheduling and efficient processes ensure you spend less time waiting.',
  },
  {
    icon: Zap,
    title: 'Quick Results',
    desc: 'Fast turnaround on lab work, imaging, and diagnostics with digital result delivery.',
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView();

  return (
    <section className="py-20 lg:py-28 bg-soft-gray relative overflow-hidden" aria-labelledby="why-heading">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-light-blue/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-mint/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal" />
            Why MedCare
            <span className="w-8 h-px bg-teal" />
          </span>
          <h2 id="why-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight mb-5 font-heading">
            Why Patients{' '}
            <span className="text-teal">Trust Us</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Experience the difference that comes from a healthcare team genuinely
            committed to your wellbeing.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`group relative bg-white rounded-[var(--radius-card)] border border-border-light p-7 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

              <div className="w-14 h-14 bg-mint rounded-2xl flex items-center justify-center mb-5 group-hover:bg-teal/15 transition-colors duration-300">
                <Icon className="w-7 h-7 text-teal" />
              </div>
              <h3 className="text-lg font-bold text-navy font-heading mb-2 group-hover:text-teal transition-colors">
                {title}
              </h3>
              <p className="text-sm text-slate-text leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
