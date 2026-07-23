import RevealSection from './RevealSection';

const stats = [
  { number: '12', label: 'Students per Class', suffix: 'max' },
  { number: '2,000', label: 'Hours of Teaching', suffix: '+' },
  { number: '8', label: 'Years of Practice', suffix: '' },
  { number: '500', label: 'Community Members', suffix: '+' },
];

export default function Stats() {
  return (
    <section className="bg-sand py-20 lg:py-24 border-y border-stone/20">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <RevealSection key={stat.label} delay={i * 100}>
              <div className="text-center">
                <p className="font-serif text-4xl lg:text-5xl font-light text-charcoal">
                  {stat.number}<span className="text-eucalyptus text-2xl">{stat.suffix}</span>
                </p>
                <p className="mt-2 text-[11px] font-light tracking-widest uppercase text-charcoal-light/60">
                  {stat.label}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
