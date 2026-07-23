import { TESTIMONIALS } from '../data/content';
import RevealSection from './RevealSection';

export default function Testimonials() {
  return (
    <section className="bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Kind Words</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              From Our<br />
              <span className="italic">Community</span>
            </h2>
          </div>
        </RevealSection>

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <RevealSection key={i} delay={i * 150}>
              <div className="rounded-3xl bg-sand/50 border border-stone/20 p-8 h-full flex flex-col">
                {/* Quote mark */}
                <span className="font-serif text-6xl leading-none text-sage/40 mb-4">"</span>

                <p className="text-sm font-light leading-[1.8] text-charcoal-light/80 flex-grow mb-6">
                  {testimonial.text}
                </p>

                <div className="border-t border-stone/20 pt-5">
                  <p className="font-serif text-lg text-charcoal">{testimonial.author}</p>
                  <p className="text-[11px] font-light tracking-wider uppercase text-charcoal-light/50 mt-1">
                    {testimonial.detail}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
