import { useInView } from '../hooks/useInView';
import { Star, Calendar, ArrowRight } from 'lucide-react';

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiology',
    experience: '18 years',
    rating: 4.9,
    reviews: 324,
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    available: true,
  },
  {
    name: 'Dr. James Chen',
    specialty: 'Neurology',
    experience: '15 years',
    rating: 4.8,
    reviews: 287,
    image: 'https://images.pexels.com/photos/15962798/pexels-photo-15962798.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    available: true,
  },
  {
    name: 'Dr. Amara Okafor',
    specialty: 'Pediatrics',
    experience: '12 years',
    rating: 4.9,
    reviews: 412,
    image: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    available: true,
  },
  {
    name: 'Dr. Michael Rivera',
    specialty: 'Orthopedics',
    experience: '20 years',
    rating: 4.7,
    reviews: 256,
    image: 'https://images.pexels.com/photos/32254658/pexels-photo-32254658.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=450',
    available: false,
  },
];

export default function Doctors() {
  const [ref, inView] = useInView();

  return (
    <section id="doctors" className="py-20 lg:py-28 bg-white" aria-labelledby="doctors-heading">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal" />
            Our Physicians
            <span className="w-8 h-px bg-teal" />
          </span>
          <h2 id="doctors-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight mb-5 font-heading">
            Meet Our{' '}
            <span className="text-teal">Expert Doctors</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Our team of board-certified physicians brings decades of combined experience,
            delivering outstanding care with warmth and dedication.
          </p>
        </div>

        {/* Doctors grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, i) => (
            <article
              key={doc.name}
              className={`group bg-white rounded-[var(--radius-card)] border border-border-light overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : '0ms' }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={doc.image}
                  alt={`${doc.name} - ${doc.specialty}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Availability badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold ${
                    doc.available
                      ? 'bg-white/95 text-teal'
                      : 'bg-white/95 text-slate-text'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-teal-light' : 'bg-gray-400'}`} />
                    {doc.available ? 'Available Today' : 'Next Available: Mon'}
                  </span>
                </div>

                {/* Book on hover */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href="#appointment"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-teal text-white text-sm font-semibold rounded-[var(--radius-btn)] hover:bg-teal-dark transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-navy font-heading mb-1">{doc.name}</h3>
                <p className="text-teal text-sm font-medium mb-3">{doc.specialty} · {doc.experience}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-navy">{doc.rating}</span>
                  </div>
                  <span className="text-xs text-slate-text">({doc.reviews} reviews)</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-navy text-navy font-semibold rounded-[var(--radius-btn)] hover:bg-navy hover:text-white transition-all duration-300"
          >
            View All Doctors
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
