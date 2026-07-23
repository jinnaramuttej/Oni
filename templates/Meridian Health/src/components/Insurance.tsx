import { ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';

const partners = [
  'Blue Cross Blue Shield',
  'UnitedHealthcare',
  'Aetna',
  'Cigna',
  'Humana',
  'Kaiser Permanente',
  'Medicare',
  'Medicaid',
];

export default function Insurance() {
  return (
    <section id="insurance" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[20px] bg-light-blue px-8 py-14 sm:px-14">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-teal">
                  <ShieldCheck className="h-4 w-4" />
                  Insurance Partners
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display text-3xl font-medium leading-tight text-navy-dark sm:text-4xl">
                  We work with your coverage, not against it
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 text-lg leading-relaxed text-slate">
                  Meridian Health partners with all major insurance providers and offers transparent
                  self-pay pricing. Our billing team verifies your benefits before every visit — no
                  surprises, ever.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <a
                  href="#contact"
                  className="mt-8 inline-flex rounded-2xl bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-teal hover:-translate-y-0.5"
                >
                  Verify My Insurance
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                {partners.map((p) => (
                  <div
                    key={p}
                    className="flex h-20 items-center justify-center rounded-2xl bg-white px-4 text-center text-sm font-semibold text-navy-dark shadow-sm ring-1 ring-navy/5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
