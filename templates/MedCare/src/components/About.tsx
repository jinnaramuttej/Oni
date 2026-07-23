import { useInView } from '../hooks/useInView';
import { Award, Heart, Users, CheckCircle2 } from 'lucide-react';

const stats = [
  { number: '25K+', label: 'Patients Treated', icon: Users },
  { number: '50+', label: 'Expert Doctors', icon: Award },
  { number: '15+', label: 'Years of Care', icon: Heart },
  { number: '98%', label: 'Satisfaction Rate', icon: CheckCircle2 },
];

const highlights = [
  'Board-certified physicians across 20+ specialties',
  'Advanced diagnostic & treatment technologies',
  'Personalized care plans for every patient',
  'Same-day appointments & walk-in services',
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="py-20 lg:py-28 bg-white" aria-labelledby="about-heading">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className={`relative transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative rounded-[24px] overflow-hidden shadow-elevated">
              <img
                src="https://images.pexels.com/photos/6129499/pexels-photo-6129499.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
                alt="Team of healthcare professionals in a modern clinic"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white rounded-[var(--radius-card)] shadow-elevated p-5 border border-border-light">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-mint rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy font-heading">A+ Rated</p>
                  <p className="text-sm text-slate-text">Healthcare Excellence</p>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-light-blue/50 rounded-[20px] -z-10" />
          </div>

          {/* Content side */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
              <span className="w-8 h-px bg-teal" />
              About Our Clinic
            </span>
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight mb-6 font-heading">
              Compassionate Care,{' '}
              <span className="text-teal">Exceptional Results</span>
            </h2>
            <p className="text-slate-text text-lg leading-relaxed mb-6">
              For over 15 years, MedCare has been the trusted healthcare partner for families across the region.
              Our team of board-certified physicians combines clinical excellence with genuine compassion
              to deliver healthcare that puts patients first.
            </p>
            <p className="text-slate-text leading-relaxed mb-8">
              We believe great healthcare starts with listening. Every patient receives a personalized care plan
              designed around their unique needs, supported by state-of-the-art diagnostic technology
              and evidence-based treatment protocols.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                  <span className="text-slate-text">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-[var(--radius-btn)] hover:bg-navy-light shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className={`mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map(({ number, label, icon: Icon }) => (
            <div
              key={label}
              className="text-center p-6 bg-soft-gray rounded-[var(--radius-card)] border border-border-light hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-mint rounded-2xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-teal" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-navy font-heading mb-1">{number}</p>
              <p className="text-sm text-slate-text">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
