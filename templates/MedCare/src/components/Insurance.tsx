import { useInView } from '../hooks/useInView';
import { Shield, CheckCircle2 } from 'lucide-react';

const insurancePartners = [
  'Aetna', 'Blue Cross', 'Cigna', 'United Health',
  'Humana', 'Kaiser', 'Medicare', 'MetLife',
];

export default function Insurance() {
  const [ref, inView] = useInView();

  return (
    <section className="py-16 lg:py-20 bg-white border-t border-border-light" aria-label="Insurance Partners">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal" />
            Insurance
            <span className="w-8 h-px bg-teal" />
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy font-heading mb-3">
            We Accept Major Insurance Plans
          </h2>
          <p className="text-slate-text max-w-lg mx-auto">
            We work with most major insurance providers. Contact us to verify your coverage before your visit.
          </p>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {insurancePartners.map((partner) => (
            <div
              key={partner}
              className="flex flex-col items-center justify-center p-5 bg-soft-gray rounded-[var(--radius-card)] border border-border-light hover:shadow-card hover:border-teal/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-navy/5 rounded-xl flex items-center justify-center mb-2 group-hover:bg-teal/10 transition-colors">
                <Shield className="w-5 h-5 text-navy/40 group-hover:text-teal transition-colors" />
              </div>
              <span className="text-sm font-semibold text-navy text-center">{partner}</span>
            </div>
          ))}
        </div>

        <div className={`flex items-center justify-center gap-2 mt-8 text-sm text-slate-text transition-all duration-700 delay-300 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <CheckCircle2 className="w-4 h-4 text-teal" />
          Don't see your insurance? <a href="#contact" className="text-teal font-semibold hover:underline">Contact us</a> for verification.
        </div>
      </div>
    </section>
  );
}
