import { SectionWrapper } from './SectionWrapper';
import { Flame, Leaf, Heart, Sun } from 'lucide-react';

const principles = [
  {
    icon: Flame,
    title: 'Stone-Ground Fresh',
    description: 'Batter ground on traditional wet grinders every morning before dawn. No shortcuts, no preservatives.',
  },
  {
    icon: Leaf,
    title: 'Farm to Plate',
    description: 'Vegetables from local farmers, rice from Cauvery delta fields, coconuts from Kerala groves.',
  },
  {
    icon: Heart,
    title: 'Recipes with Soul',
    description: 'Every dish follows time-honored family recipes. Each spice blend is hand-prepared in our kitchen.',
  },
  {
    icon: Sun,
    title: 'Cooked with Care',
    description: 'Slow-simmered sambars, hand-pressed dosas, and chutneys made fresh for every service.',
  },
];

export function Philosophy() {
  return (
    <SectionWrapper className="py-20 md:py-28 px-6 texture-overlay" bg="ivory-dark">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="section-subtitle">Chef's Philosophy</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            The Way <span className="italic text-terracotta">Amma</span> Made It
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto leading-relaxed">
            Our kitchen follows one simple rule—if it's not good enough 
            for our family, it's not good enough for yours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => (
            <div
              key={p.title}
              className="bg-warm-white rounded-2xl p-8 card-hover text-center"
            >
              <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-5">
                <p.icon size={24} className="text-terracotta" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-brown-dark font-semibold mb-3">{p.title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="font-serif text-xl sm:text-2xl text-brown italic max-w-3xl mx-auto leading-relaxed">
            "Good food is not about technique alone. It's about the love you stir into 
            the pot, the patience of slow cooking, and the joy of watching someone 
            take their first bite."
          </blockquote>
          <p className="text-terracotta font-medium mt-4 text-sm">
            — Padma Lakshmi Rao, Founder
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
