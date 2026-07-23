import { INSTRUCTORS } from '../data/content';
import RevealSection from './RevealSection';
import AmbientAccent from './AmbientAccent';

export default function Instructors() {
  return (
    <section id="instructors" className="bg-ivory py-28 lg:py-40 relative overflow-hidden">
      <AmbientAccent variant="blob" className="w-80 h-80 top-20 -left-40 opacity-20" color="bg-moss/10" />
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <RevealSection>
          <div className="text-center mb-20">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Our Teachers</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Guided by<br />
              <span className="italic">Experienced Hands</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-charcoal-light/80">
              Our instructors bring decades of combined experience, authentic lineage training, 
              and a deep commitment to your personal growth.
            </p>
          </div>
        </RevealSection>

        {/* Instructor cards */}
        <div className="grid gap-10 md:grid-cols-3">
          {INSTRUCTORS.map((instructor, i) => (
            <RevealSection key={instructor.name} delay={i * 150}>
              <div className="group text-center">
                {/* Photo */}
                <div className="relative mx-auto mb-8 w-64 h-80 overflow-hidden rounded-3xl">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
                </div>

                {/* Info */}
                <h3 className="font-serif text-2xl font-light text-charcoal mb-1">{instructor.name}</h3>
                <p className="text-[12px] font-light tracking-wider uppercase text-eucalyptus mb-4">{instructor.title}</p>
                <p className="text-sm font-light leading-relaxed text-charcoal-light/75 mb-5 max-w-xs mx-auto">
                  {instructor.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-2">
                  {instructor.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-sand px-4 py-1.5 text-[10px] font-light tracking-wider uppercase text-charcoal-light"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
