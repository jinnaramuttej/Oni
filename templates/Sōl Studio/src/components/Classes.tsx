import { Clock, User, Signal } from 'lucide-react';
import { CLASSES } from '../data/content';
import RevealSection from './RevealSection';

export default function Classes() {
  return (
    <section id="classes" className="bg-sand py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Our Offerings</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Classes Designed for<br />
              <span className="italic">Every Stage of Practice</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-charcoal-light/80">
              From gentle flows to dynamic sequences, guided meditation to transformative breathwork — 
              find the practice that speaks to where you are today.
            </p>
          </div>
        </RevealSection>

        {/* Class cards grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map((cls, i) => (
            <RevealSection key={cls.name} delay={i * 100}>
              <div className="group bg-ivory rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={cls.image}
                    alt={cls.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                  {/* Category badge */}
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[10px] font-medium tracking-widest uppercase text-charcoal">
                    {cls.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-serif text-2xl font-light text-charcoal mb-3">{cls.name}</h3>
                  <p className="text-sm font-light leading-relaxed text-charcoal-light/75 mb-5">
                    {cls.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-charcoal-light/60">
                    <div className="flex items-center gap-1.5">
                      <Signal size={13} strokeWidth={1.5} />
                      <span className="text-[11px] font-light tracking-wider uppercase">{cls.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} strokeWidth={1.5} />
                      <span className="text-[11px] font-light tracking-wider uppercase">{cls.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={13} strokeWidth={1.5} />
                      <span className="text-[11px] font-light tracking-wider uppercase">{cls.instructor}</span>
                    </div>
                  </div>

                  {/* Book button */}
                  <button className="w-full rounded-2xl border border-stone py-3 text-[12px] font-light tracking-widest uppercase text-charcoal transition-all hover:bg-eucalyptus hover:text-white hover:border-eucalyptus">
                    Book Class
                  </button>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
