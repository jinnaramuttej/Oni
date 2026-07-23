import { Syringe, ScanLine, FlaskConical, ShieldPlus, HeartHandshake, Ambulance } from 'lucide-react';
import Reveal from './Reveal';

const services = [
  {
    icon: Syringe,
    name: 'Preventive Care',
    desc: 'Annual physicals, vaccinations, and screenings to catch concerns early.',
    doctors: '32 doctors available',
  },
  {
    icon: ScanLine,
    name: 'Diagnostic Imaging',
    desc: 'On-site MRI, CT, X-ray, and ultrasound with rapid, accurate results.',
    doctors: '18 doctors available',
  },
  {
    icon: FlaskConical,
    name: 'Laboratory Services',
    desc: 'Full-service testing with same-day results for most panels.',
    doctors: '14 doctors available',
  },
  {
    icon: ShieldPlus,
    name: 'Chronic Disease Management',
    desc: 'Ongoing, personalized care plans for long-term health conditions.',
    doctors: '27 doctors available',
  },
  {
    icon: HeartHandshake,
    name: 'Family Medicine',
    desc: 'Coordinated care for every generation, from infants to seniors.',
    doctors: '41 doctors available',
  },
  {
    icon: Ambulance,
    name: 'Urgent Care',
    desc: 'Walk-in treatment for non-life-threatening injuries and illness.',
    doctors: 'Open now · 24/7',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-navy-dark py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-teal blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-mint ring-1 ring-white/10">
              Healthcare Services
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-white sm:text-[44px]">
              Comprehensive care under one roof
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Every service is built around continuity — your records, history, and care team
              stay connected across every visit.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={0.05 * (i % 3)}>
              <div className="group flex h-full flex-col rounded-[20px] bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:ring-teal/30 hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/15">
                  <s.icon className="h-6 w-6 text-mint" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.name}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-white/65">{s.desc}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs font-medium text-white/50">{s.doctors}</span>
                  <a href="#appointment" className="text-sm font-semibold text-mint hover:text-white">
                    Book →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
