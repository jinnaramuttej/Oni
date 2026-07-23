import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'The most transformative spa experience of my life. I felt held, heard, and profoundly renewed. The therapists here are true artisans of healing.',
    author: 'Isabella Marchetti',
    role: 'Design Director, Milan',
  },
  {
    quote: 'Every detail is considered. From the scent of the linen to the warmth of the stones — this is luxury without pretension, elegance without excess.',
    author: 'James Whitmore',
    role: 'Architect & Wellness Enthusiast',
  },
  {
    quote: 'I have visited spas across three continents. SÉRENITÉ stands alone in its ability to make you forget the world exists outside these walls.',
    author: 'Dr. Yuki Tanaka',
    role: 'Wellness Researcher, Tokyo',
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-charcoal overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-2v2h2v4h2v-4h2v-2h-2zm0-30V0h-2v4h-2v2h2v4h2V6h2V4h-2zM6 34v-4H4v4H2v2h2v4h2v-4h2v-2H6zM6 4V0H4v4H2v2h2v4h2V6h2V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-32 lg:pt-44 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">Guest Experiences</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em] text-ivory">
            Words of <span className="italic text-champagne-light">Serenity</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-ivory/5 backdrop-blur-sm rounded-[28px] p-8 lg:p-10 border border-ivory/10 hover:border-champagne/20 transition-all duration-700">
              <Quote size={32} strokeWidth={0.8} className="text-champagne/60 mb-6" />
              <blockquote className="font-display text-[1.15rem] lg:text-[1.25rem] text-ivory/90 leading-[1.7] italic mb-8">"{t.quote}"</blockquote>
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-champagne">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-.91L12 2z" />
                  </svg>
                ))}
              </div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-ivory/60 font-medium">{t.author}</div>
              <div className="text-[11px] text-ivory/30">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
    </section>
  );
}
