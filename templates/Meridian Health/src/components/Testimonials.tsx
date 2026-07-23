import { Star, Quote } from 'lucide-react';
import Reveal from './Reveal';

const testimonials = [
  {
    name: 'Rebecca Holt',
    role: 'Patient since 2019',
    image: '/images/patient-1.jpg',
    quote:
      "From the first phone call to my follow-up visit, I felt genuinely cared for. Dr. Whitfield explained everything clearly and never made me feel rushed.",
  },
  {
    name: 'Marcus Delgado',
    role: 'Patient since 2021',
    image: '/images/patient-2.jpg',
    quote:
      'The same-day appointment saved me a trip to the ER. The facility is spotless and the entire staff treats you like family, not a case number.',
  },
  {
    name: 'Sofia Alvarez',
    role: 'Patient since 2022',
    image: '/images/patient-3.jpg',
    quote:
      "My daughter used to dread doctor visits. Dr. Nandan changed that completely — patient, warm, and brilliant at what she does.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-soft-gray py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-semibold text-teal">
              Patient Stories
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[44px]">
              Trusted by thousands of families
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.08 * i}>
              <div className="flex h-full flex-col rounded-[20px] border border-navy/8 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Quote className="h-8 w-8 text-mint" strokeWidth={1.5} fill="currentColor" />
                <p className="mt-5 flex-1 text-[15px] leading-relaxed text-slate">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-1 text-teal">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-teal" />
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-navy/8 pt-5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-navy-dark">{t.name}</p>
                    <p className="text-xs text-slate">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
