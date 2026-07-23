import { HeartPulse, Brain, Bone, Baby, Eye, Stethoscope, Wind, Activity } from 'lucide-react';
import Reveal from './Reveal';

const specialties = [
  { icon: HeartPulse, name: 'Cardiology', desc: 'Comprehensive heart health, diagnostics, and preventive cardiac care.' },
  { icon: Brain, name: 'Neurology', desc: 'Expert care for the brain, spine, and nervous system disorders.' },
  { icon: Bone, name: 'Orthopedics', desc: 'Joint, bone, and muscle treatment with advanced rehabilitation.' },
  { icon: Baby, name: 'Pediatrics', desc: "Gentle, attentive care for infants, children, and adolescents." },
  { icon: Eye, name: 'Ophthalmology', desc: 'Complete eye examinations, surgery, and vision correction.' },
  { icon: Stethoscope, name: 'Internal Medicine', desc: 'Whole-person primary care for adults of every age.' },
  { icon: Wind, name: 'Pulmonology', desc: 'Respiratory diagnostics and treatment for lung conditions.' },
  { icon: Activity, name: 'Endocrinology', desc: 'Hormone, metabolism, and diabetes management programs.' },
];

export default function Specialties() {
  return (
    <section id="specialties" className="bg-soft-gray py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-semibold text-teal">
              Medical Specialties
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[44px]">
              Expert care, across every specialty
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              From routine checkups to complex conditions, our specialists collaborate to give you
              a single, coordinated care plan.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((item, i) => (
            <Reveal key={item.name} delay={0.05 * (i % 4)}>
              <div className="group h-full rounded-[20px] border border-navy/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-blue transition-colors duration-300 group-hover:bg-teal">
                  <item.icon className="h-6 w-6 text-navy transition-colors duration-300 group-hover:text-white" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-dark">{item.name}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
