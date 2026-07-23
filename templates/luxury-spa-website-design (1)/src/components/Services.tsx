import { ArrowRight, Clock, Flower2, Waves, Leaf, Sparkles, Gem } from 'lucide-react';

const treatments = [
  {
    icon: Waves,
    title: 'Signature Deep Tissue',
    duration: '90 min',
    price: '$285',
    desc: 'A profound release using warm basalt stones, targeted pressure, and organic arnica oil to dissolve chronic tension.',
    image: '/images/treatment-massage.jpg',
    tag: 'Most Requested',
  },
  {
    icon: Flower2,
    title: 'Renewal Facial Ritual',
    duration: '75 min',
    price: '$245',
    desc: 'A transformative facial combining gentle microdermabrasion with rare botanical serums and gold-infused masks.',
    image: '/images/facial-treatment.jpg',
    tag: 'Award-Winning',
  },
  {
    icon: Sparkles,
    title: 'Aromatherapy Journey',
    duration: '60 min',
    price: '$195',
    desc: 'Personalized essential oil blends guide you through a sensory pathway of relaxation, clarity, or restoration.',
    image: '/images/aromatherapy.jpg',
    tag: 'New',
  },
  {
    icon: Leaf,
    title: 'Body Renewal Ritual',
    duration: '120 min',
    price: '$320',
    desc: 'Full-body exfoliation with organic sugar and sea salt, followed by a warm clay wrap and deep hydration massage.',
    image: '/images/body-therapy.jpg',
    tag: 'Popular',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-cream relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone/60 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-sage/10 blur-[100px] -translate-y-1/3" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-32 lg:pt-44 pb-20">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">Signature Treatments</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em] text-charcoal">
              Curated <span className="italic">Experiences</span>
            </h2>
          </div>
          <p className="text-charcoal-soft text-[15px] lg:text-[16px] leading-[1.7] max-w-md font-light font-sans">
            Each treatment is a carefully composed journey, guided by master therapists who understand the language of the body.
          </p>
        </div>

        {/* Treatment cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-32">
          {treatments.map((t) => (
            <a
              key={t.title}
              href="#booking"
              className="group relative block bg-warm-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(59,59,59,0.08)] border border-stone/20 hover:shadow-[0_30px_80px_-25px_rgba(59,59,59,0.14)] hover:-translate-y-1 transition-all duration-700"
            >
              <div className="relative h-[320px] lg:h-[360px] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="inline-block bg-ivory/85 backdrop-blur-sm text-[9px] tracking-[0.2em] uppercase text-charcoal font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                    {t.tag}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4 text-ivory/90 text-[11px] tracking-[0.15em]">
                    <span className="flex items-center gap-1.5"><Clock size={13} strokeWidth={1.5} /> {t.duration}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-ivory/40" />
                    <span>{t.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center text-champagne">
                    <t.icon size={18} strokeWidth={1.2} />
                  </div>
                  <h3 className="font-display text-[1.5rem] lg:text-[1.7rem] leading-tight text-charcoal tracking-[-0.02em]">{t.title}</h3>
                </div>
                <p className="text-charcoal-soft text-[14px] lg:text-[15px] leading-[1.75] font-light font-sans mb-6">{t.desc}</p>
                <div className="flex items-center gap-2 text-champagne text-[11px] tracking-[0.15em] uppercase font-medium group-hover:gap-3 transition-all duration-300">
                  Book This Experience <ArrowRight size={14} strokeWidth={1.5} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional services */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { title: 'Wellness Rituals', icon: Gem, desc: 'Full-day immersive ceremonies combining movement, breathwork, and guided relaxation.', price: 'From $450', duration: '4-6 hours' },
            { title: 'Spa Packages', icon: Flower2, desc: 'Curated multi-treatment journeys with herbal tea rituals and spa lounge access.', price: 'From $680', duration: 'Half / Full Day' },
            { title: 'Premium Products', icon: Sparkles, desc: 'Certified organic skincare, essential oil blends, and bath rituals for home wellness.', price: 'From $48', duration: 'Retail' },
          ].map((item) => (
            <a href="#booking" key={item.title} className="group block bg-warm-white rounded-[24px] p-8 lg:p-10 border border-stone/20 hover:border-champagne/30 shadow-[0_10px_40px_-15px_rgba(59,59,59,0.06)] hover:shadow-[0_20px_60px_-20px_rgba(59,59,59,0.1)] hover:-translate-y-0.5 transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center text-champagne mb-7 group-hover:bg-champagne/15 transition-colors">
                <item.icon size={20} strokeWidth={1.2} />
              </div>
              <h3 className="font-display text-[1.35rem] leading-tight text-charcoal tracking-[-0.015em] mb-4">{item.title}</h3>
              <p className="text-charcoal-soft text-[14px] leading-[1.75] font-light font-sans mb-6">{item.desc}</p>
              <div className="flex items-center justify-between pt-5 border-t border-stone/20">
                <div className="text-[11px] tracking-[0.15em] text-charcoal/50 uppercase font-medium">{item.duration}</div>
                <div className="text-[11px] tracking-[0.12em] text-champagne font-medium">{item.price}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
