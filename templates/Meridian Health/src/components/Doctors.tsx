import { Star, Calendar } from 'lucide-react';
import Reveal from './Reveal';

const doctors = [
  {
    name: 'Dr. James Whitfield',
    role: 'Senior Cardiologist',
    image: '/images/doctor-1.jpg',
    rating: '4.9',
    availability: 'Available today',
  },
  {
    name: 'Dr. Amara Osei',
    role: 'Internal Medicine',
    image: '/images/doctor-2.jpg',
    rating: '5.0',
    availability: 'Available tomorrow',
  },
  {
    name: 'Dr. Elena Marsh',
    role: 'Cardiology & Wellness',
    image: '/images/doctor-3.jpg',
    rating: '4.8',
    availability: 'Available today',
  },
  {
    name: 'Dr. Priya Nandan',
    role: 'Pediatrics',
    image: '/images/doctor-4.jpg',
    rating: '5.0',
    availability: 'Next slot: Thu',
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-semibold text-teal">
                Meet the Doctors
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[44px]">
                Physicians who take the time to know you
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="#appointment"
              className="hidden shrink-0 rounded-2xl border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy-dark transition-all duration-300 hover:border-teal hover:text-teal sm:inline-block"
            >
              View all 150+ specialists
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc, i) => (
            <Reveal key={doc.name} delay={0.06 * i}>
              <div className="group overflow-hidden rounded-[20px] border border-navy/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={doc.image}
                    alt={`Portrait of ${doc.name}, ${doc.role}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-navy-dark">{doc.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-semibold text-navy-dark">
                      <Star className="h-3.5 w-3.5 fill-teal text-teal" />
                      {doc.rating}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-slate">{doc.role}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-teal">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    {doc.availability}
                  </div>
                  <a
                    href="#appointment"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-soft-gray py-2.5 text-sm font-semibold text-navy-dark transition-colors duration-300 group-hover:bg-navy group-hover:text-white"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Visit
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
