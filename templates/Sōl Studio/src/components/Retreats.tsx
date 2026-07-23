import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { RETREATS } from '../data/content';
import RevealSection from './RevealSection';

export default function Retreats() {
  return (
    <section className="bg-sand py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Beyond the Studio</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Wellness Retreats<br />
              <span className="italic">In Nature's Embrace</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-charcoal-light/80">
              Step away from the everyday and immerse yourself in transformative 
              multi-day experiences that nurture body, mind, and spirit.
            </p>
          </div>
        </RevealSection>

        <div className="grid gap-8 md:grid-cols-2">
          {RETREATS.map((retreat, i) => (
            <RevealSection key={retreat.title} delay={i * 150}>
              <div className="group relative overflow-hidden rounded-3xl h-[420px] cursor-pointer">
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif text-3xl font-light mb-3">{retreat.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-white/75 mb-4 max-w-md">
                    {retreat.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-5 mb-5 text-white/60">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} strokeWidth={1.5} />
                      <span className="text-[11px] font-light tracking-wider uppercase">{retreat.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} strokeWidth={1.5} />
                      <span className="text-[11px] font-light tracking-wider uppercase">{retreat.dates}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                    <span className="text-[12px] font-light tracking-widest uppercase">Learn More</span>
                    <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
