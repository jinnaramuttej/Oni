import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

const faqs = [
  {
    question: 'What should I expect at my first appointment?',
    answer: 'Your first visit includes a comprehensive oral examination, digital X-rays, and a consultation with your dentist. We\'ll discuss your dental history, concerns, and create a personalized treatment plan. The entire visit typically takes about 60–90 minutes.',
  },
  {
    question: 'Do you accept dental insurance?',
    answer: 'Yes! We\'re in-network with most major dental insurance providers including Delta Dental, Aetna, Cigna, MetLife, and many more. Our team will verify your benefits before your appointment and help you understand your coverage.',
  },
  {
    question: 'Is teeth whitening safe for sensitive teeth?',
    answer: 'Absolutely. We offer professional-grade whitening treatments specifically formulated for sensitive teeth. Our dentists will assess your sensitivity levels and customize the treatment concentration and duration for your comfort.',
  },
  {
    question: 'How long does Invisalign treatment take?',
    answer: 'Treatment duration varies by case, but most patients complete Invisalign in 6–18 months. Simple cases may take as little as 3 months. During your free consultation, we\'ll provide a personalized timeline based on your specific alignment needs.',
  },
  {
    question: 'What are your COVID-19 safety protocols?',
    answer: 'Patient safety is our top priority. We maintain enhanced sanitization procedures, HEPA air filtration, temperature screening, and follow all CDC guidelines. Our clinic exceeds industry standards for infection control.',
  },
  {
    question: 'Do you offer emergency dental services?',
    answer: 'Yes, we provide same-day emergency care for urgent dental issues including severe pain, broken teeth, infections, and trauma. Call our emergency line at (800) 555-1234 for immediate assistance, available 24/7.',
  },
  {
    question: 'What payment plans are available?',
    answer: 'We offer interest-free payment plans for treatments over $500, CareCredit financing with 0% APR for qualified applicants, and accept all major credit cards. We\'ll always provide a transparent cost estimate before any procedure.',
  },
];

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      'border border-gray-100/80 rounded-2xl overflow-hidden transition-all duration-300',
      isOpen ? 'bg-white shadow-sm' : 'bg-white/60 hover:bg-white'
    )}>
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-navy pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-teal-primary flex-shrink-0 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="px-6 pb-5 text-sm text-slate-text/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">FAQs</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight">
            Frequently Asked{' '}
            <span className="text-teal-primary">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-slate-text/70">
            Everything you need to know about your visit.
          </p>
        </AnimatedSection>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <AnimatedSection key={faq.question} delay={index * 60}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={400} className="mt-12 text-center">
          <p className="text-slate-text/60 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-teal-primary text-white font-semibold rounded-2xl hover:bg-teal-600 shadow-md shadow-teal-primary/20 transition-all duration-300"
          >
            Contact Us
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
