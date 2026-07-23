import { useReveal } from '../hooks/useReveal';
import { Shield, HeartHandshake, Building2, CreditCard } from 'lucide-react';

const insurancePlans = [
  { name: 'Delta Dental', logo: 'DD' },
  { name: 'Cigna Dental', logo: 'CD' },
  { name: 'Aetna', logo: 'AE' },
  { name: 'MetLife', logo: 'ML' },
  { name: 'Guardian', logo: 'GU' },
  { name: 'Humana', logo: 'HU' },
  { name: 'BlueCross BlueShield', logo: 'BC' },
  { name: 'United Healthcare', logo: 'UH' },
];

export default function Insurance() {
  const revealRef = useReveal();

  return (
    <section className="py-24 lg:py-32 bg-white" aria-label="Insurance information">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={revealRef} className="reveal">
          <div className="bg-slate-50 rounded-card p-8 lg:p-16 border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  Insurance & Payment
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-4">
                  Affordable care,{' '}
                  <span className="gradient-text">simplified.</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  We accept most major insurance plans and offer flexible payment options to ensure everyone has access to premium dental care.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Shield, title: 'Insurance Accepted', desc: 'Most major plans accepted' },
                    { icon: HeartHandshake, title: 'Payment Plans', desc: '0% financing available' },
                    { icon: Building2, title: 'Flexible Spending', desc: 'FSA & HSA accepted' },
                    { icon: CreditCard, title: 'Easy Payments', desc: 'All major cards accepted' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm">
                      <item.icon size={20} className="text-teal-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-navy text-sm">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insurance Grid */}
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Accepted Insurance</p>
                <div className="grid grid-cols-2 gap-3">
                  {insurancePlans.map((plan) => (
                    <div
                      key={plan.name}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {plan.logo}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{plan.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  Don't see your plan? Contact us — we likely accept it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
