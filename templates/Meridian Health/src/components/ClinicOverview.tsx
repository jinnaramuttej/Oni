import { HeartPulse, Users, Award, Building } from 'lucide-react';
import Reveal from './Reveal';

const stats = [
  { icon: Users, value: '48,000+', label: 'Patients cared for annually' },
  { icon: Award, value: '150+', label: 'Board-certified specialists' },
  { icon: Building, value: '6', label: 'Modern facility locations' },
  { icon: HeartPulse, value: '27 yrs', label: 'Serving our community' },
];

export default function ClinicOverview() {
  return (
    <section id="overview" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-[20px] shadow-xl shadow-navy/10">
                <img
                  src="/images/clinic-overview.jpg"
                  alt="Bright, spacious reception area at Meridian Health clinic"
                  className="h-[460px] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 -right-6 hidden w-56 rounded-[20px] bg-white p-5 shadow-xl ring-1 ring-navy/5 sm:block">
                <p className="font-display text-3xl font-semibold text-navy-dark">4.9/5</p>
                <p className="mt-1 text-sm text-slate">from 12,400+ verified patient reviews</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-semibold text-teal">
                Who we are
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[44px]">
                A clinic built around the person, not just the patient.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-slate">
                For over two decades, Meridian Health has combined rigorous clinical expertise with an
                unwavering commitment to compassionate care. Our physicians take the time to listen,
                our facilities are designed for comfort, and our technology exists to serve — never
                replace — the human relationship between doctor and patient.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-start gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-blue">
                      <stat.icon className="h-5 w-5 text-navy" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-display text-2xl font-semibold text-navy-dark">{stat.value}</p>
                      <p className="text-sm text-slate">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
