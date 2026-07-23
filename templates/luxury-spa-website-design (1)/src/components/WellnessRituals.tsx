export default function WellnessRituals() {
  const rituals = [
    { name: 'Morning Renewal', time: '7:00 AM', desc: 'Sunrise yoga, herbal infusion, and a restorative facial to begin your day with clarity.' },
    { name: 'Midday Retreat', time: '2:00 PM', desc: 'A deep tissue massage followed by a warm stone bath and guided breathwork session.' },
    { name: 'Evening Ceremony', time: '6:30 PM', desc: 'Candlelit aromatherapy ritual, body polish, and meditation in our garden sanctuary.' },
  ];

  return (
    <section id="rituals" className="relative bg-ivory overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone/50 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 py-32 lg:py-48">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left content */}
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">The Experience</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] tracking-[-0.025em] text-charcoal mb-10">
              Wellness <span className="italic">Rituals</span>
            </h2>
            <div className="w-14 h-[1px] bg-champagne/40 mb-10" />
            <p className="text-charcoal-soft text-[15px] leading-[1.85] font-light font-sans mb-12">
              Our rituals are designed as complete journeys through the day. Each ceremony combines 
              multiple treatments with mindful transitions — herbal tea, guided breathwork, and quiet 
              moments in our garden sanctuary.
            </p>

            <div className="space-y-8">
              {rituals.map((r) => (
                <div key={r.name} className="group relative pl-7 border-l border-stone/30 hover:border-champagne/40 transition-colors duration-500">
                  <div className="absolute -left-[3px] top-0 w-[6px] h-[6px] rounded-full bg-champagne/40 group-hover:bg-champagne transition-colors duration-500" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-champagne font-medium block mb-2">{r.time}</span>
                  <h4 className="font-display text-[1.2rem] text-charcoal mb-2 tracking-[-0.01em]">{r.name}</h4>
                  <p className="text-[14px] text-charcoal-soft font-light leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(59,59,59,0.12)]">
              <img
                src="/images/wellness-ritual.jpg"
                alt="Luxury spa wellness ritual ceremony"
                className="w-full h-[440px] lg:h-[680px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-transparent" />

              <div className="absolute bottom-10 left-8 right-8">
                <div className="bg-ivory/90 backdrop-blur-md rounded-[20px] p-8 shadow-[0_15px_40px_-15px_rgba(59,59,59,0.2)] max-w-lg">
                  <h3 className="font-display text-[1.5rem] text-charcoal mb-3 tracking-tight">The Full-Day Journey</h3>
                  <p className="text-[14px] text-charcoal-soft leading-relaxed font-light font-sans mb-5">
                    Combine all three rituals with spa lounge access, gourmet wellness cuisine, and 
                    private garden meditation for a transformative day of renewal.
                  </p>
                  <a href="#booking" className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase text-champagne font-medium hover:text-rose-wood transition-colors">
                    Reserve Full-Day Experience <span className="text-lg leading-none">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
