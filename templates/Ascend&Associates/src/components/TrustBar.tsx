import { useScrollAnimation } from '../hooks/useScrollAnimation';

const logos = [
  'TechVista',
  'GreenLeaf',
  'NovaPharm',
  'Malhotra Group',
  'ZenithAI',
  'BluePeak',
  'UrbanCore',
  'Meridian',
];

export default function TrustBar() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-white border-b border-gray-50">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <p
          className={`text-center text-xs font-semibold text-slate-text/50 uppercase tracking-[0.2em] mb-10 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Trusted by forward-thinking companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${100 + i * 60}ms` }}
            >
              <span className="text-lg font-bold tracking-tight text-gray-200 hover:text-gray-400 transition-colors duration-300 select-none">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
