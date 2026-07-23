import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do you accept new patients?',
    a: 'Absolutely! We warmly welcome new patients. Simply book an appointment online or call us, and we\'ll take care of the rest. New patients receive a complimentary consultation and digital X-ray.',
  },
  {
    q: 'What should I expect at my first visit?',
    a: 'Your first visit includes a comprehensive oral exam, digital X-rays, a professional cleaning, and a personalized treatment discussion. We\'ll take time to understand your goals and create a plan that works for you. Expect about 60–90 minutes.',
  },
  {
    q: 'Is teeth whitening safe?',
    a: 'Yes! Our professional whitening treatments use FDA-approved solutions that are both safe and effective. Unlike store-bought products, our treatments are supervised by dentists to ensure optimal results without sensitivity.',
  },
  {
    q: 'How long do dental implants last?',
    a: 'With proper care, dental implants can last a lifetime. The titanium post integrates with your jawbone, creating a permanent foundation. The crown may need replacement after 10–15 years due to normal wear.',
  },
  {
    q: 'Do you offer sedation for anxious patients?',
    a: 'Yes, we offer several sedation options including nitrous oxide (laughing gas), oral sedation, and IV sedation for patients with dental anxiety. Your comfort is our top priority.',
  },
  {
    q: 'What payment options do you offer?',
    a: 'We accept most major insurance plans, FSA/HSA accounts, and all major credit cards. We also offer flexible 0% financing plans through CareCredit for treatments over $500.',
  },
  {
    q: 'How often should I visit the dentist?',
    a: 'We recommend visiting every 6 months for routine checkups and cleanings. However, depending on your oral health needs, we may suggest more frequent visits.',
  },
  {
    q: 'Do you treat children?',
    a: 'Yes! We provide comprehensive dental care for patients of all ages, including children. Our team is trained to make dental visits fun and comfortable for kids.',
  },
];

export default function FAQ() {
  const revealRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-white" aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={revealRef} className="reveal">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
              Common{' '}
              <span className="gradient-text">questions</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Everything you need to know about our practice. Can't find your answer? Give us a call.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-card border transition-all duration-300 ${
                  openIndex === index
                    ? 'border-teal-200 bg-teal-50/50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-navy pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-teal-500' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 mb-4">Still have questions?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-btn bg-navy text-white font-semibold hover:bg-navy-light transition-all duration-300 btn-press"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
