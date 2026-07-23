import { SectionWrapper } from './SectionWrapper';
import { KolamDividerWide } from './KolamDivider';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Venkatesh',
    location: 'Bengaluru',
    text: 'Walking into Amritham feels like visiting my grandmother\'s home in Thanjavur. The sambar has that exact same depth of flavor—something you simply can\'t replicate without years of practice and genuine love for cooking.',
    rating: 5,
  },
  {
    name: 'Raghav Nair',
    location: 'Kochi',
    text: 'As a Keralite living in Bengaluru, I was skeptical. But their appam and stew transported me straight back to my mother\'s kitchen. The coconut milk stew is perfection. This place understands Kerala cuisine.',
    rating: 5,
  },
  {
    name: 'Ananya Reddy',
    location: 'Hyderabad',
    text: 'The banana leaf meal here is an experience, not just a lunch. Every dish complemented the next perfectly. The attentive servers who keep coming back to refill your plate—that\'s real South Indian hospitality.',
    rating: 5,
  },
  {
    name: 'Dr. Suresh Kumar',
    location: 'Chennai',
    text: 'I\'ve been coming here for 15 years. The filter coffee alone is worth the visit—perfect ratio, perfect temperature, served in proper tumbler-davara. The consistency over the years speaks volumes about their dedication.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <SectionWrapper className="py-20 md:py-28 px-6" bg="brown">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-turmeric text-xs tracking-[0.2em] uppercase font-semibold">
            From Our Family Table
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory font-medium mt-3 mb-4 leading-tight">
            Stories from Our <span className="italic text-turmeric-light">Guests</span>
          </h2>
          <KolamDividerWide />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-7 border border-ivory/10 card-hover"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-turmeric fill-turmeric" />
                ))}
              </div>

              <p className="text-ivory/85 leading-relaxed mb-6 italic font-light">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/30 flex items-center justify-center text-ivory font-serif font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <span className="text-ivory font-medium text-sm block">{t.name}</span>
                  <span className="text-ivory/50 text-xs">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate rating */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-warm-white/10 rounded-xl px-6 py-3 border border-ivory/10">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-turmeric fill-turmeric" />
              ))}
            </div>
            <span className="text-ivory/80 text-sm">
              <strong className="text-ivory">4.8</strong> average from 2,400+ reviews
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
