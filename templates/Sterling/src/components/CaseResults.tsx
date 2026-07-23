import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';

const results = [
  { amount: '$480M', type: 'Settlement', area: 'Securities Fraud', description: 'Landmark class action settlement for institutional investors against a Fortune 100 financial institution.' },
  { amount: '$215M', type: 'Verdict', area: 'Patent Infringement', description: 'Jury verdict in federal court protecting our client\'s innovative medical device technology portfolio.' },
  { amount: '$168M', type: 'Settlement', area: 'Corporate M&A', description: 'Successfully negotiated settlement resolving complex post-merger integration disputes across three jurisdictions.' },
  { amount: '$92M', type: 'Recovery', area: 'Real Estate', description: 'Multi-property commercial real estate dispute recovery involving international investment consortium.' },
  { amount: '$78M', type: 'Verdict', area: 'Employment', description: 'Class action verdict defending a technology company against systematic discrimination allegations.' },
  { amount: '$54M', type: 'Settlement', area: 'Trade Secrets', description: 'Favorable resolution protecting proprietary algorithms and trade secrets for a leading AI company.' },
];

export default function CaseResults() {
  const { ref, isInView } = useInView();

  return (
    <section id="results" className="py-24 lg:py-32 bg-midnight" aria-label="Case results">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Track Record"
          title="Landmark Case Results"
          description="Our record speaks for itself. Below are select results that demonstrate the caliber of our advocacy and the outcomes we achieve for our clients."
          light
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result, i) => (
            <div
              key={i}
              className={`group rounded-[18px] border border-white/8 bg-white/[0.03] p-8 transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.06] ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl lg:text-4xl font-bold text-gold">{result.amount}</span>
                <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-gold">
                  {result.type}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-ivory mb-3">{result.area}</h3>
              <p className="text-[14px] leading-relaxed text-ivory/50">{result.description}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-gold/20 to-transparent" />
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-[13px] text-ivory/40 italic">
          Past results do not guarantee future outcomes. Each case is unique and evaluated on its merits.
        </p>
      </div>
    </section>
  );
}
