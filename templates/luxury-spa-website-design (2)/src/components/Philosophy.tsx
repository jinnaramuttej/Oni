import FadeIn from './FadeIn';
import SectionLabel from './SectionLabel';
import { IMAGES } from '../data/content';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 lg:py-40 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionLabel
          label="Our Philosophy"
          title="The Art of Intentional Stillness"
          description="At Serenité, we believe wellness is not indulgence — it is essential. Our approach weaves ancient healing traditions with contemporary science, creating experiences that honor your body's innate wisdom."
        />

        <div className="mt-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Composition */}
          <FadeIn direction="left" className="relative">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden">
                <img
                  src={IMAGES.spaSetup}
                  alt="Serene spa environment with warm candles and natural elements"
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-1000"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 md:w-56 md:h-56 rounded-[20px] overflow-hidden shadow-2xl border-4 border-ivory hidden md:block">
                <img
                  src={IMAGES.pool}
                  alt="Zen water feature"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>

          {/* Text Content */}
          <div className="lg:pl-4">
            <FadeIn delay={0.1}>
              <div className="space-y-8">
                {[
                  {
                    number: '01',
                    title: 'Presence Over Performance',
                    text: 'Every treatment begins with a moment of stillness. We create space for your body to communicate its needs before our therapists begin their work.',
                  },
                  {
                    number: '02',
                    title: 'Nature as Guide',
                    text: 'Our formulations draw from the earth — volcanic minerals, botanical extracts, and essential oils sourced from ethical growers across five continents.',
                  },
                  {
                    number: '03',
                    title: 'Bespoke Journeys',
                    text: 'No two bodies are alike. Each visit begins with a personal consultation, ensuring your treatment is precisely calibrated to your moment in life.',
                  },
                ].map((item, i) => (
                  <FadeIn key={item.number} delay={0.15 * (i + 1)}>
                    <div className="flex gap-6">
                      <span className="text-champagne font-serif text-lg font-light mt-0.5 shrink-0">
                        {item.number}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal mb-2">
                          {item.title}
                        </h3>
                        <p className="text-charcoal-light text-sm leading-relaxed font-light">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
