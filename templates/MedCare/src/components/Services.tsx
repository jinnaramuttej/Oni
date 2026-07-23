import { useInView } from '../hooks/useInView';
import {
  Heart, Brain, Bone, Baby, Eye, Stethoscope,
  Activity, Pill, ArrowRight, Users
} from 'lucide-react';

const specialties = [
  {
    icon: Heart,
    name: 'Cardiology',
    desc: 'Advanced heart care with cutting-edge diagnostics and interventional procedures for all cardiac conditions.',
    doctors: 8,
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: Brain,
    name: 'Neurology',
    desc: 'Expert neurological care for brain, spine, and nervous system disorders using latest treatment protocols.',
    doctors: 6,
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: Bone,
    name: 'Orthopedics',
    desc: 'Comprehensive musculoskeletal care from joint replacements to sports medicine and rehabilitation.',
    doctors: 7,
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: Baby,
    name: 'Pediatrics',
    desc: 'Gentle, compassionate care for children from newborns through adolescents with family-centered approach.',
    doctors: 9,
    color: 'bg-pink-50 text-pink-500',
  },
  {
    icon: Eye,
    name: 'Ophthalmology',
    desc: 'Complete eye care services including LASIK, cataract surgery, and routine vision examinations.',
    doctors: 4,
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Stethoscope,
    name: 'Internal Medicine',
    desc: 'Primary healthcare for adults covering preventive care, chronic disease management, and wellness.',
    doctors: 12,
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Activity,
    name: 'Diagnostics',
    desc: 'State-of-the-art imaging, laboratory, and diagnostic services for accurate and timely results.',
    doctors: 5,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Pill,
    name: 'Dermatology',
    desc: 'Expert skin care treatments for medical, cosmetic, and surgical dermatological conditions.',
    doctors: 5,
    color: 'bg-emerald-50 text-emerald-600',
  },
];

export default function Services() {
  const [ref, inView] = useInView();

  return (
    <section id="services" className="py-20 lg:py-28 bg-soft-gray" aria-labelledby="services-heading">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal" />
            Medical Specialties
            <span className="w-8 h-px bg-teal" />
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight mb-5 font-heading">
            Comprehensive Healthcare{' '}
            <span className="text-teal">Services</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            From preventive care to specialized treatments, our expert medical team provides
            comprehensive healthcare services tailored to your needs.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {specialties.map(({ icon: Icon, name, desc, doctors, color }, i) => (
            <article
              key={name}
              className={`group bg-white rounded-[var(--radius-card)] border border-border-light p-6 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : '0ms' }}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${color} transition-transform duration-300 group-hover:scale-105`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2 font-heading group-hover:text-teal transition-colors">
                {name}
              </h3>
              <p className="text-sm text-slate-text leading-relaxed mb-5">
                {desc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border-light">
                <span className="flex items-center gap-1.5 text-xs text-slate-text">
                  <Users className="w-3.5 h-3.5 text-teal" />
                  {doctors} Doctors
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-teal group-hover:gap-2 transition-all duration-300">
                  Book Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View all link */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-teal transition-colors duration-200"
          >
            View All 20+ Specialties
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
