import { AnimatedSection } from './AnimatedSection';
import { ExternalLink, GraduationCap } from 'lucide-react';

const dentists = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Lead Cosmetic Dentist',
    specialty: 'Veneers, Smile Design & Cosmetic Procedures',
    education: 'NYU College of Dentistry',
    image: 'https://images.pexels.com/photos/37458054/pexels-photo-37458054.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
  },
  {
    name: 'Dr. James Rodriguez',
    role: 'Orthodontics Specialist',
    specialty: 'Invisalign, Braces & Alignment Therapy',
    education: 'Columbia University',
    image: 'https://images.pexels.com/photos/37458046/pexels-photo-37458046.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
  },
  {
    name: 'Dr. Emily Chen',
    role: 'Implant & Restorative',
    specialty: 'Dental Implants, Crowns & Bridges',
    education: 'UCLA School of Dentistry',
    image: 'https://images.pexels.com/photos/32205053/pexels-photo-32205053.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
  },
  {
    name: 'Dr. Michael & Team',
    role: 'General Dentistry',
    specialty: 'Preventive Care, Cleanings & Family Dentistry',
    education: 'Harvard School of Dental Medicine',
    image: 'https://images.pexels.com/photos/37458097/pexels-photo-37458097.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
  },
];

export function Dentists() {
  return (
    <section id="dentists" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">Our Team</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight tracking-tight">
            Meet Your{' '}
            <span className="text-teal-primary">Dental Experts</span>
          </h2>
          <p className="mt-4 text-lg text-slate-text/70 leading-relaxed">
            Our board-certified specialists bring decades of combined experience, advanced training, and a genuine passion for patient care.
          </p>
        </AnimatedSection>

        {/* Dentist Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {dentists.map((dentist, index) => (
            <AnimatedSection key={dentist.name} delay={index * 100}>
              <div className="group bg-white rounded-[20px] overflow-hidden border border-gray-100/80 shadow-sm card-hover">
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dentist.image}
                    alt={`${dentist.name}, ${dentist.role} at Lumina Dental`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-lg font-bold text-white">{dentist.name}</h3>
                    <p className="text-sm text-teal-light font-medium">{dentist.role}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <p className="text-sm text-slate-text/70 leading-relaxed">{dentist.specialty}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-text/50">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {dentist.education}
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <a href="#booking" className="text-sm font-semibold text-teal-primary hover:text-teal-600 transition-colors">
                      Book with {dentist.name.split(' ')[1]}
                    </a>
                    <button className="w-8 h-8 rounded-lg bg-light-bg flex items-center justify-center hover:bg-teal-50 transition-colors" aria-label={`View ${dentist.name}'s LinkedIn`}>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-text/40" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
