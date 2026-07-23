import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    q: 'How quickly can I get an appointment?',
    a: 'Most patients are seen within 24 hours. Same-day appointments are available for urgent, non-emergency concerns — simply call our front desk or book online.',
  },
  {
    q: 'Do you accept walk-in patients?',
    a: 'Yes. Our Urgent Care service operates on a walk-in basis 24/7 for non-life-threatening conditions. For scheduled specialties, we recommend booking ahead to minimize wait times.',
  },
  {
    q: 'What insurance plans do you accept?',
    a: 'We partner with all major providers including Blue Cross Blue Shield, UnitedHealthcare, Aetna, Cigna, Humana, and Medicare/Medicaid. Our billing team can verify your specific plan before your visit.',
  },
  {
    q: 'Can I access my medical records online?',
    a: 'Yes, every patient receives access to our secure patient portal where you can view test results, message your care team, request refills, and manage appointments.',
  },
  {
    q: 'What should I bring to my first visit?',
    a: 'Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant prior medical records. Arriving 15 minutes early helps us start on time.',
  },
  {
    q: 'Do you offer telehealth consultations?',
    a: 'Absolutely. Many of our specialties offer virtual visits for follow-ups, prescription renewals, and consultations that don\'t require an in-person exam.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-soft-gray py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-semibold text-teal">
              Frequently Asked Questions
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[44px]">
              Answers to common questions
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={0.04 * i}>
                <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-medium text-navy-dark">{item.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint text-teal">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
