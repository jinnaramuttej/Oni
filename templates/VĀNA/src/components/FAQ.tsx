import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "I am a complete beginner. Which class should I start with?",
    answer: "We welcome practitioners of all levels. For those brand new to yoga, we highly recommend our 'Restorative Sanctuary' or 'Yin Yoga & Sound' classes. For meditation, 'Mindfulness & Presence' is a wonderful starting point. Our instructors always offer modifications to suit your comfort and experience.",
  },
  {
    question: "What do I need to bring to my first class?",
    answer: "We provide everything you need for a comfortable practice: premium eco-friendly mats, organic cotton bolsters, blocks, linen eye pillows, and clean towels. Simply wear comfortable, breathable clothing. We recommend arriving 15 minutes early to settle in and enjoy a cup of herbal tea.",
  },
  {
    question: "How small are the small group sessions?",
    answer: "To ensure safety, deep personal guidance, and a peaceful atmosphere, our standard studio classes are limited to a maximum of 12 practitioners. Our workshops are limited to 15, and meditation programs are limited to 10.",
  },
  {
    question: "What is your cancellation policy for classes and workshops?",
    answer: "We ask that you cancel your reservation at least 12 hours before the scheduled class time so that we can offer the mat to someone on our waitlist. Cancellations made within 12 hours will be charged in full or deduct one class from your pass.",
  },
  {
    question: "Do you offer private sessions or corporate wellness programs?",
    answer: "Yes, we offer custom private sessions for individuals, duos, and private groups. We also design bespoke corporate mindfulness and somatic release programs for companies seeking to cultivate well-being and clarity for their teams. Please use our booking form or email us directly to coordinate.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-stone/10 text-charcoal relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
            Frequently asked questions
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
            Everything you need to know to prepare for your journey into stillness at Vāna.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-ivory border border-stone/30 rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="font-serif text-lg md:text-xl font-light text-charcoal group-hover:text-eucalyptus transition-colors duration-300">
                    {item.question}
                  </span>
                  <div className="ml-4 flex-shrink-0 w-8 h-8 rounded-full border border-stone/30 flex items-center justify-center text-charcoal group-hover:bg-eucalyptus group-hover:text-ivory transition-all duration-300">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-8 md:px-8 md:pb-10 border-t border-stone/10 pt-4">
                        <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
