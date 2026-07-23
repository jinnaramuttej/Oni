import { useRevealStagger } from '../hooks/useReveal';
import { Clock, ArrowUpRight } from 'lucide-react';

const treatments = [
  {
    title: 'General Dentistry',
    desc: 'Comprehensive exams, cleanings, fillings, and preventive care to maintain your oral health year-round.',
    duration: '30–60 min',
    category: 'Essential',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Cosmetic Dentistry',
    desc: 'Veneers, bonding, and smile makeovers designed to give you the confident, beautiful smile you deserve.',
    duration: '1–3 visits',
    category: 'Aesthetic',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Dental Implants',
    desc: 'Permanent tooth replacement using titanium implants that look, feel, and function like natural teeth.',
    duration: '2–6 months',
    category: 'Restorative',
    image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Invisalign',
    desc: 'Clear, removable aligners that gradually straighten your teeth — invisible to everyone but you.',
    duration: '6–18 months',
    category: 'Orthodontics',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da4737?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Teeth Whitening',
    desc: 'Professional-grade whitening treatments that safely brighten your smile up to 8 shades in one visit.',
    duration: '45–90 min',
    category: 'Aesthetic',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Root Canal Therapy',
    desc: 'Gentle, modern root canal treatment using advanced anesthesia to save and restore damaged teeth.',
    duration: '60–90 min',
    category: 'Restorative',
    image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80&auto=format&fit=crop',
  },
];

export default function Treatments() {
  const refs = useRevealStagger(treatments.length, { delay: 100 });

  return (
    <section id="treatments" className="py-24 lg:py-32 bg-slate-50" aria-label="Our dental treatments">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Our Treatments
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
            Comprehensive care for every{' '}
            <span className="gradient-text">smile</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From routine cleanings to complete smile transformations, our treatments are designed around your unique needs.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {treatments.map((treatment, index) => (
            <div
              key={treatment.title}
              ref={(el) => { if (el) refs.current[index] = el; }}
              className="reveal group bg-white rounded-card shadow-soft hover:shadow-card-hover border border-gray-100/80 overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="w-full h-full object-cover img-zoom"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-navy shadow-sm">
                    {treatment.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy mb-2">{treatment.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{treatment.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <Clock size={14} />
                    <span>{treatment.duration}</span>
                  </div>
                  <a
                    href="#booking"
                    className="group/link inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Book Now
                    <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">Not sure which treatment is right for you?</p>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-btn bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-all duration-300 shadow-glow btn-press"
          >
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
