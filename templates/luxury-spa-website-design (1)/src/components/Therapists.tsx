import { Award, Star } from 'lucide-react';

const therapists = [
  {
    name: 'Amara Chen',
    role: 'Head Spa Therapist',
    image: '/images/therapist-portrait.jpg',
    specialties: 'Deep Tissue, Aromatherapy, Energy Work',
    experience: '15 Years',
    quote: 'Healing begins when the body feels truly safe.',
  },
  {
    name: 'Elena Moreau',
    role: 'Facial & Skin Wellness',
    image: '/images/facial-treatment.jpg',
    specialties: 'Organic Facials, Microneedling, Holistic Skin',
    experience: '12 Years',
    quote: 'Every face tells a story — my work is to help it glow.',
  },
  {
    name: 'Thomas Reed',
    role: 'Body & Movement Therapy',
    image: '/images/relaxation.jpg',
    specialties: 'Body Rituals, Stretch Therapy, Breathwork',
    experience: '10 Years',
    quote: 'Movement is medicine. Stillness is medicine. We offer both.',
  },
];

export default function Therapists() {
  return (
    <section id="therapists" className="bg-warm-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-32 lg:pt-44 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">Our Team</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em] text-charcoal mb-6">
            Meet the <span className="italic">Therapists</span>
          </h2>
          <p className="text-charcoal-soft text-[15px] leading-[1.8] font-light font-sans">
            Each therapist brings deep expertise, intuitive touch, and a genuine commitment to your well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {therapists.map((t) => (
            <div key={t.name} className="group relative bg-ivory rounded-[28px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(59,59,59,0.07)] border border-stone/10 hover:shadow-[0_30px_80px_-25px_rgba(59,59,59,0.12)] hover:-translate-y-1 transition-all duration-700">
              <div className="relative h-[380px] lg:h-[420px] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-ivory/90 text-[10px] tracking-[0.15em] uppercase font-medium mb-1">
                    <Award size={14} strokeWidth={1.5} /> <span>{t.experience} Experience</span>
                  </div>
                  <h3 className="font-display text-[1.5rem] text-ivory tracking-tight">{t.name}</h3>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-champagne font-medium">{t.role}</p>
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-[14px] text-charcoal-soft font-light italic leading-relaxed mb-5 font-display text-[1.15rem]">"{t.quote}"</p>
                <div className="flex flex-wrap gap-2">
                  {t.specialties.split(', ').map((s) => (
                    <span key={s} className="text-[9px] tracking-[0.1em] uppercase text-charcoal/50 font-medium bg-stone/20 px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-stone/20 flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className="text-champagne fill-champagne" strokeWidth={0} />
                  ))}
                  <span className="text-[10px] tracking-[0.1em] text-charcoal/40 ml-2 font-medium">Certified Expert</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
