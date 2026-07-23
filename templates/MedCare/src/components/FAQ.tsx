import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How do I schedule an appointment?',
    a: 'You can book an appointment online through our website, call our reception at 1-800-123-4567, or visit our clinic during operating hours. Online appointments can be booked 24/7 and are confirmed within 30 minutes during business hours.',
  },
  {
    q: 'Do you accept walk-in patients?',
    a: 'Yes, we welcome walk-in patients for general consultations and urgent care. However, we recommend scheduling an appointment to minimize wait times. Same-day appointments are available for most specialties.',
  },
  {
    q: 'What insurance plans do you accept?',
    a: 'We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Humana, Kaiser, Medicare, and MetLife. Please contact our billing department to verify your specific coverage before your visit.',
  },
  {
    q: 'What should I bring to my first appointment?',
    a: 'Please bring a valid photo ID, your insurance card, a list of current medications, any relevant medical records or test results, and a list of questions for your doctor. Arriving 15 minutes early helps us complete registration smoothly.',
  },
  {
    q: 'Do you offer telemedicine or virtual consultations?',
    a: 'Yes, we offer secure video consultations for follow-up visits, minor health concerns, medication management, and specialist consultations. Virtual visits can be booked through our online portal and are covered by most insurance plans.',
  },
  {
    q: 'What are your emergency services?',
    a: 'For life-threatening emergencies, please call 911. Our clinic provides urgent care services during operating hours. Our emergency helpline (1-800-123-4567) is available 24/7 for medical guidance and triage support.',
  },
];

export default function FAQ() {
  const [ref, inView] = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-soft-gray" aria-labelledby="faq-heading">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal" />
            FAQ
            <span className="w-8 h-px bg-teal" />
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-5 font-heading">
            Frequently Asked{' '}
            <span className="text-teal">Questions</span>
          </h2>
          <p className="text-slate-text text-lg">
            Find answers to common questions about our services, policies, and patient care.
          </p>
        </div>

        {/* Accordion */}
        <div className={`space-y-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-[var(--radius-card)] border transition-all duration-300 ${
                  isOpen ? 'border-teal/20 shadow-card' : 'border-border-light hover:border-teal/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-navy pr-4 font-heading">{faq.q}</span>
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-colors duration-200 ${
                    isOpen ? 'bg-teal text-white' : 'bg-soft-gray text-slate-text'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-slate-text leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
