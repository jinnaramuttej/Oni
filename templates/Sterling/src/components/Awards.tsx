import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';

const awards = [
  { year: '2024', title: 'Top 50 Law Firm', org: 'American Lawyer Magazine' },
  { year: '2024', title: 'Best M&A Practice', org: 'Chambers & Partners' },
  { year: '2023', title: 'Litigation Firm of the Year', org: 'National Law Journal' },
  { year: '2023', title: 'Best IP Practice', org: 'Managing IP Awards' },
  { year: '2022', title: 'Elite Trial Lawyers', org: 'Benchmark Litigation' },
  { year: '2022', title: 'Band 1 Corporate', org: 'Chambers USA' },
];

const publications = [
  'The Wall Street Journal', 'Financial Times', 'Bloomberg Law', 'The American Lawyer', 'Forbes', 'Reuters Legal',
];

export default function Awards() {
  const { ref, isInView } = useInView();
  const { ref: pubRef, isInView: pubInView } = useInView();

  return (
    <section className="py-24 lg:py-32 bg-navy" aria-label="Awards and recognitions">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Recognition"
          title="Awards & Accolades"
          description="Our commitment to excellence has been recognized by the most prestigious institutions in the legal profession."
          light
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <div
              key={i}
              className={`group rounded-[16px] border border-white/8 bg-white/[0.03] p-7 transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.06] ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-gold/60">{award.year}</span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ivory">{award.title}</h3>
              <p className="mt-1.5 text-[13px] text-ivory/50">{award.org}</p>
            </div>
          ))}
        </div>

        {/* Publications */}
        <div ref={pubRef} className={`mt-20 ${pubInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className="text-center text-[12px] font-semibold tracking-[0.2em] uppercase text-ivory/30 mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {publications.map((pub) => (
              <span
                key={pub}
                className="text-[15px] font-serif font-medium text-ivory/25 tracking-wide transition-colors duration-300 hover:text-gold/60"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
