import { IMAGES } from '../data/content';
import RevealSection from './RevealSection';
import AmbientAccent from './AmbientAccent';

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-ivory py-28 lg:py-40 relative overflow-hidden">
      <AmbientAccent variant="blob" className="w-96 h-96 -top-48 -right-48 opacity-30" color="bg-sage/8" />
      <AmbientAccent variant="circle" className="w-64 h-64 bottom-20 -left-32 opacity-20" color="bg-sand-dark/15" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section intro */}
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Our Philosophy</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Where Movement<br />
              <span className="italic">Meets Mindfulness</span>
            </h2>
          </div>
        </RevealSection>

        {/* Two column layout */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image */}
          <RevealSection delay={100}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={IMAGES.sunriseCliff}
                  alt="Peaceful meditation at sunrise"
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-3xl bg-sage/20 -z-10" />
            </div>
          </RevealSection>

          {/* Text content */}
          <RevealSection delay={250}>
            <div className="lg:pl-8">
              <p className="text-lg font-light leading-relaxed text-charcoal-light mb-8">
                Sōl Studio was born from a simple belief: that the practice of yoga and meditation 
                should feel like coming home. Not performance. Not competition. Just presence.
              </p>
              <p className="text-base font-light leading-relaxed text-charcoal-light/80 mb-8">
                We created a space where natural light pours through floor-to-ceiling windows, 
                where the scent of eucalyptus fills the air, and where every class is capped at 
                twelve students — because real transformation happens in intimacy, not in crowds.
              </p>
              <p className="text-base font-light leading-relaxed text-charcoal-light/80 mb-10">
                Our approach weaves together classical yoga traditions, contemporary somatic practices, 
                breathwork, and guided meditation into a holistic wellness experience that honors 
                both ancient wisdom and modern understanding.
              </p>

              {/* Values */}
              <div className="grid grid-cols-2 gap-6">
                {['Presence', 'Balance', 'Compassion', 'Growth'].map((value) => (
                  <div key={value} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-eucalyptus" />
                    <span className="text-[13px] font-light tracking-wider uppercase text-charcoal">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
