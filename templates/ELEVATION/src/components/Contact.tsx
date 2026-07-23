import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const offices = [
  {
    city: 'New York',
    address: '432 Park Avenue, Suite 78\nNew York, NY 10022',
    phone: '+1 (212) 555-0190',
    email: 'newyork@elevation.com',
  },
  {
    city: 'Los Angeles',
    address: '9255 Sunset Boulevard\nWest Hollywood, CA 90069',
    phone: '+1 (310) 555-0234',
    email: 'losangeles@elevation.com',
  },
  {
    city: 'London',
    address: '24 Mayfair Place\nLondon W1J 8AJ',
    phone: '+44 20 7946 0958',
    email: 'london@elevation.com',
  },
];

export default function Contact() {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-3 text-gold text-[11px] md:text-[12px] font-semibold tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-gold" />
            Get in Touch
            <span className="w-8 h-px bg-gold" />
          </span>
          <h2 className="mt-6 font-serif text-charcoal text-[32px] md:text-[42px] lg:text-[52px] leading-[1.1] font-light">
            Our Offices
          </h2>
          <p className="mt-6 text-slate text-base md:text-lg leading-relaxed font-light">
            Visit us at one of our global locations or reach out to begin a confidential conversation.
          </p>
        </div>

        <div
          ref={ref}
          className="mt-16 md:mt-20 grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {offices.map((office, i) => (
            <div
              key={office.city}
              className={cn(
                'p-8 md:p-10 rounded-[20px] border border-stone/50 hover:border-gold/30 transition-all duration-700 hover:shadow-[0_8px_32px_rgba(0,0,0,0.05)] group',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <h3 className="font-serif text-2xl md:text-[28px] text-charcoal font-medium">
                {office.city}
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-slate font-light whitespace-pre-line leading-relaxed">
                    {office.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href={`tel:${office.phone}`} className="text-[14px] text-slate font-light hover:text-gold transition-colors">
                    {office.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                  <a href={`mailto:${office.email}`} className="text-[14px] text-slate font-light hover:text-gold transition-colors">
                    {office.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-[14px] text-slate font-light">
                    Mon - Sat: 9:00 AM - 7:00 PM
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
