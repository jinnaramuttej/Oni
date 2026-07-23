import { Wind, Waves, Sun } from 'lucide-react';
import { IMAGES } from '../data/content';
import RevealSection from './RevealSection';

export default function Breathwork() {
  const programs = [
    {
      icon: Wind,
      title: 'Pranayama Foundations',
      description: 'Learn classical breathing techniques that calm the nervous system and cultivate inner steadiness.',
    },
    {
      icon: Waves,
      title: 'Somatic Breathwork',
      description: 'Release stored tension through conscious connected breathing and gentle movement integration.',
    },
    {
      icon: Sun,
      title: 'Morning Energetics',
      description: 'Start each day with invigorating breath patterns designed to awaken clarity and vital energy.',
    },
  ];

  return (
    <section className="bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text content */}
          <RevealSection>
            <div>
              <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Breathwork & Meditation</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-tight mb-8">
                The Art of<br />
                <span className="italic">Conscious Breathing</span>
              </h2>
              <p className="text-base font-light leading-relaxed text-charcoal-light/80 mb-10">
                Breathwork is the bridge between body and mind. Our programs guide you through 
                ancient and modern breathing practices that reduce anxiety, improve focus, and 
                cultivate a profound sense of calm that you carry into every moment of your life.
              </p>

              <div className="space-y-8">
                {programs.map((program, i) => (
                  <RevealSection key={program.title} delay={i * 100}>
                    <div className="flex gap-5">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-sand">
                        <program.icon size={20} strokeWidth={1.5} className="text-eucalyptus" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-charcoal mb-1">{program.title}</h3>
                        <p className="text-sm font-light leading-relaxed text-charcoal-light/70">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Image */}
          <RevealSection delay={200}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={IMAGES.meditation}
                  alt="Breathwork practice in studio"
                  className="w-full h-[560px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              {/* Accent shape */}
              <div className="absolute -top-6 -left-6 w-40 h-40 rounded-3xl bg-sage/15 -z-10" />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
