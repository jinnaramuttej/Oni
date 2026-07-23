import { useRevealStagger } from '../hooks/useReveal';

const dentists = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Lead Dentist & Founder',
    specialty: 'Cosmetic Dentistry, Implants',
    experience: '15+ years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format&fit=crop&crop=faces',
    bio: 'Harvard School of Dental Medicine graduate specializing in aesthetic smile makeovers.',
  },
  {
    name: 'Dr. James Chen',
    role: 'Orthodontist',
    specialty: 'Invisalign, Braces',
    experience: '12+ years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop&crop=faces',
    bio: 'Board-certified orthodontist with expertise in invisible alignment systems.',
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Periodontist',
    specialty: 'Gum Health, Implants',
    experience: '10+ years',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=600&q=80&auto=format&fit=crop&crop=faces',
    bio: 'Specialist in periodontal therapy and advanced dental implant procedures.',
  },
  {
    name: 'Dr. Michael Park',
    role: 'General Dentist',
    specialty: 'Preventive Care, Whitening',
    experience: '8+ years',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80&auto=format&fit=crop&crop=faces',
    bio: 'Dedicated to providing comfortable, comprehensive preventive dental care.',
  },
];

export default function Dentists() {
  const refs = useRevealStagger(dentists.length, { delay: 150 });

  return (
    <section id="dentists" className="py-24 lg:py-32 bg-slate-50" aria-label="Meet our dentists">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Our Specialists
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
            Meet the team behind your{' '}
            <span className="gradient-text">smile</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our board-certified dentists combine expertise with genuine care to deliver exceptional results.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {dentists.map((dentist, index) => (
            <div
              key={dentist.name}
              ref={(el) => { if (el) refs.current[index] = el; }}
              className="reveal group bg-white rounded-card shadow-soft hover:shadow-card-hover border border-gray-100/80 overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dentist.image}
                  alt={dentist.name}
                  className="w-full h-full object-cover object-top img-zoom"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-sm leading-relaxed">{dentist.bio}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-navy mb-1">{dentist.name}</h3>
                <p className="text-teal-600 text-sm font-semibold mb-2">{dentist.role}</p>
                <p className="text-slate-500 text-xs">{dentist.specialty}</p>
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">{dentist.experience}</span>
                  <a
                    href="#booking"
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Book with {dentist.name.split(' ')[1]} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
