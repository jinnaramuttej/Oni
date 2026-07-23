import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/content';
import RevealSection from './RevealSection';

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-stone/30 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-xl font-light text-charcoal pr-8 group-hover:text-eucalyptus transition-colors">
          {question}
        </span>
        <span className="mt-1 flex-shrink-0 text-charcoal-light/50">
          {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-[300px] pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-sm font-light leading-[1.8] text-charcoal-light/75 pr-12 max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Common Questions</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Frequently Asked
            </h2>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="rounded-3xl bg-sand/40 border border-stone/20 px-8 md:px-12">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
