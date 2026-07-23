import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';


const faqs = [
  {
    question: 'I\'ve never done yoga before. Is Stillness right for me?',
    answer: 'Absolutely. We specialize in making yoga accessible to everyone, regardless of experience level. Our Gentle Flow and Hatha Restore classes are specifically designed for beginners, and our instructors offer personalized guidance and modifications throughout every session.',
  },
  {
    question: 'What should I bring to my first class?',
    answer: 'Just yourself and comfortable clothing you can move freely in. We provide premium mats, blocks, straps, blankets, and bolsters at no extra charge. We also have filtered water, herbal tea, and fresh towels available for all members.',
  },
  {
    question: 'How do I book a class?',
    answer: 'You can book directly through our website using the booking section below, download our app, or call the studio. We recommend booking in advance as our classes are intentionally small and fill up quickly.',
  },
  {
    question: 'Can I pause or cancel my membership?',
    answer: 'Yes, you can pause your membership for up to 3 months per year at no cost, or cancel anytime with 30 days\' notice. No questions asked, no hidden fees. We want your practice to feel like a gift, never an obligation.',
  },
  {
    question: 'Do you offer private sessions?',
    answer: 'Yes, all of our instructors are available for private 1-on-1 or small group sessions. These can be tailored to specific goals, injuries, or simply deepening your practice at your own pace. Contact us for rates and availability.',
  },
  {
    question: 'What makes Stillness different from other studios?',
    answer: 'We prioritize depth over scale. Our classes are intentionally small (max 15 students), our instructors are among the most experienced in the city, and our space is designed as a true sanctuary — not a fitness center. Every detail, from the lighting to the scent to the music, is curated for calm.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Questions & Answers
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15]">
            You might be wondering.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-ivory rounded-[1.25rem] border border-stone/20 overflow-hidden"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
                >
                  <span className="font-serif text-base lg:text-lg text-charcoal font-medium pr-4">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-charcoal/40">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 lg:px-6 pb-5 lg:pb-6 text-charcoal/55 leading-relaxed font-light text-sm lg:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
