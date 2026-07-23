import { AnimatedSection } from './AnimatedSection';
import { ShieldCheck, CreditCard, FileText, HelpCircle } from 'lucide-react';

const insuranceProviders = [
  'Delta Dental', 'Aetna', 'Cigna', 'MetLife', 'United Healthcare',
  'Guardian', 'Humana', 'Blue Cross Blue Shield',
];

const paymentFeatures = [
  {
    icon: ShieldCheck,
    title: 'Insurance Accepted',
    description: 'We work with most major dental insurance providers to maximize your benefits.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Interest-free payment plans and CareCredit financing available for all treatments.',
  },
  {
    icon: FileText,
    title: 'Free Estimates',
    description: 'Receive a detailed cost breakdown before any procedure — no surprises.',
  },
  {
    icon: HelpCircle,
    title: 'Benefits Help',
    description: 'Our team will verify your insurance benefits and help you understand coverage.',
  },
];

export function Insurance() {
  return (
    <section id="insurance" className="py-24 lg:py-32 bg-light-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <AnimatedSection>
              <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">Insurance & Payment</span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight tracking-tight">
                Making Quality Care{' '}
                <span className="text-teal-primary">Accessible</span>
              </h2>
              <p className="mt-4 text-lg text-slate-text/70 leading-relaxed">
                We believe everyone deserves excellent dental care. That's why we accept most major insurance plans and offer flexible payment options.
              </p>
            </AnimatedSection>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {paymentFeatures.map((feature, index) => (
                <AnimatedSection key={feature.title} delay={index * 100}>
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100/60 card-hover">
                    <div className="w-10 h-10 rounded-xl bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-teal-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy text-sm">{feature.title}</h3>
                      <p className="text-xs text-slate-text/60 mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Insurance Providers */}
          <AnimatedSection delay={200}>
            <div className="bg-white rounded-[24px] p-8 sm:p-10 border border-gray-100/60 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-navy mb-2">Accepted Insurance</h3>
              <p className="text-sm text-slate-text/60 mb-8">We're in-network with these major providers and many more.</p>

              <div className="grid grid-cols-2 gap-3">
                {insuranceProviders.map((provider) => (
                  <div
                    key={provider}
                    className="flex items-center gap-3 p-4 rounded-xl bg-light-bg border border-gray-100/40 hover:border-teal-primary/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 text-teal-primary" />
                    </div>
                    <span className="text-sm font-medium text-navy">{provider}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-teal-50/50 border border-teal-primary/10">
                <p className="text-sm text-navy/80">
                  <span className="font-semibold">Don't see your provider?</span> Contact us — we work with many additional plans and can verify your coverage.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
