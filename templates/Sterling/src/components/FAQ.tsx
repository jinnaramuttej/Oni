import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What types of cases does Sterling & Associates handle?',
    a: 'We provide comprehensive legal services across corporate law, mergers and acquisitions, complex litigation, intellectual property, regulatory compliance, employment law, real estate, and healthcare law. Our attorneys are experienced in representing Fortune 500 corporations, emerging companies, and high-net-worth individuals.',
  },
  {
    q: 'How is the initial consultation structured?',
    a: 'Our complimentary initial consultation typically lasts 30-60 minutes. A senior attorney will review the key facts of your situation, discuss potential legal strategies, outline expected timelines, and provide a transparent assessment of fees and costs. All consultations are held in strict confidence.',
  },
  {
    q: 'What are your fee arrangements?',
    a: 'We offer flexible fee structures tailored to each engagement, including hourly rates, flat fees for defined matters, contingency arrangements for certain litigation, and blended rate structures for ongoing relationships. Fee arrangements are discussed transparently during your initial consultation.',
  },
  {
    q: 'Do you handle cases outside of New York?',
    a: 'Yes. While headquartered in New York, we maintain offices in Washington D.C. and London, and regularly represent clients across all 50 states and in international jurisdictions. Our attorneys are admitted in multiple state and federal courts.',
  },
  {
    q: 'How do you ensure client confidentiality?',
    a: 'Confidentiality is paramount to our practice. All communications are protected by attorney-client privilege. We employ enterprise-grade data security, secure document management systems, and strict internal protocols to safeguard all client information.',
  },
  {
    q: 'What distinguishes Sterling & Associates from other firms?',
    a: 'Our distinguishing factors include senior partner involvement in every matter, a proven track record of landmark results, deep industry expertise, global reach with boutique attention, and an unwavering commitment to achieving the best possible outcomes for our clients.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32 bg-ivory" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="FAQ"
          title="Common Questions"
          description="Answers to the questions prospective clients most frequently ask about our firm, services, and engagement process."
        />

        <div ref={ref} className={`mx-auto max-w-3xl ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border-b border-warm-gray ${i === 0 ? 'border-t' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="font-serif text-lg font-semibold text-midnight pr-8 group-hover:text-gold transition-colors duration-300">
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-gold transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-[15px] leading-relaxed text-slate-custom pr-12">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
