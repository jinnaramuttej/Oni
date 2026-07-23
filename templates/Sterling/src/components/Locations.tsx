import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { MapPin, Phone, Mail } from 'lucide-react';

const offices = [
  {
    city: 'New York',
    label: 'Headquarters',
    address: '450 Park Avenue, 32nd Floor\nNew York, NY 10022',
    phone: '(212) 555-1234',
    email: 'newyork@sterlinglaw.com',
    image: 'https://images.pexels.com/photos/10517352/pexels-photo-10517352.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    city: 'Washington, D.C.',
    label: 'Capitol Office',
    address: '1900 K Street NW, Suite 800\nWashington, D.C. 20006',
    phone: '(202) 555-5678',
    email: 'dc@sterlinglaw.com',
    image: 'https://images.pexels.com/photos/15452110/pexels-photo-15452110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    city: 'London',
    label: 'International',
    address: '30 St Mary Axe, Level 24\nLondon EC3A 8BF, United Kingdom',
    phone: '+44 20 7555 9012',
    email: 'london@sterlinglaw.com',
    image: 'https://images.pexels.com/photos/29937637/pexels-photo-29937637.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
];

export default function Locations() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32 bg-cream" aria-label="Office locations">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Locations"
          title="Our Offices"
          description="With strategic offices in three major global financial centers, we are positioned to serve clients wherever their legal needs arise."
        />

        <div ref={ref} className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {offices.map((office, i) => (
            <div
              key={office.city}
              className={`group rounded-[18px] overflow-hidden border border-warm-gray bg-white transition-all duration-500 hover:shadow-xl hover:shadow-black/5 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="overflow-hidden aspect-[3/2]">
                <img
                  src={office.image}
                  alt={`${office.city} office`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-serif text-xl font-semibold text-midnight">{office.city}</h3>
                  <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-gold">
                    {office.label}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-[14px] text-slate-custom whitespace-pre-line">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gold flex-shrink-0" strokeWidth={1.5} />
                    <a href={`tel:${office.phone}`} className="text-[14px] text-slate-custom hover:text-gold transition-colors duration-300">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-gold flex-shrink-0" strokeWidth={1.5} />
                    <a href={`mailto:${office.email}`} className="text-[14px] text-slate-custom hover:text-gold transition-colors duration-300">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
