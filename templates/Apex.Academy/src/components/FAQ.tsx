import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What age group or grade levels do you cater to?',
    answer: 'We offer programs for students from Class 6 through Class 12, as well as dedicated programs for competitive exams like JEE, NEET, Olympiads, and SAT/ACT. Our foundation programs start from Class 6 to build strong early fundamentals.',
  },
  {
    question: 'How large are the batches?',
    answer: 'We maintain small batch sizes of 15-20 students to ensure personalized attention. This allows our educators to understand each student\'s learning style, address individual doubts, and provide targeted guidance.',
  },
  {
    question: 'Do you offer online classes?',
    answer: 'Yes! We offer both offline (in-person) and online interactive sessions. Our online platform features live classes with screen sharing, real-time doubt clearing, recorded sessions for revision, and an interactive dashboard for progress tracking.',
  },
  {
    question: 'What is your refund and transfer policy?',
    answer: 'We offer a 7-day no-questions-asked refund policy. After that, students can transfer to another batch or take a break and resume later within the same academic year. We want every student to feel comfortable with their enrollment decision.',
  },
  {
    question: 'How do you track student progress?',
    answer: 'We use a comprehensive assessment system including weekly chapter tests, monthly full-length mock exams, and quarterly performance reviews. Parents receive monthly progress reports, and students get detailed analytics on our platform showing strengths, weaknesses, and improvement trends.',
  },
  {
    question: 'What makes Apex Academy different from other coaching centers?',
    answer: 'Our differentiation lies in three areas: (1) Expert faculty with 15+ years average experience, (2) Personalized learning roadmaps for each student, and (3) Our six-step methodology backed by cognitive science. Combined with our 96% pass rate and consistent top results, we deliver measurable outcomes that speak for themselves.',
  },
  {
    question: 'Can I attend a trial class before enrolling?',
    answer: 'Absolutely! We encourage all prospective students to attend our free demo class. This gives you a firsthand experience of our teaching methodology, class atmosphere, and interaction with educators. Book your demo class through our enrollment form.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-indigo-deep/5 px-4 py-1.5 text-sm font-semibold text-indigo-deep mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
            Common <span className="text-blue-royal">Questions</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Everything you need to know about enrolling and learning with us.
          </p>
        </div>

        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-[20px] border border-gray-100 bg-slate-bg/50 overflow-hidden transition-all duration-300 hover:border-indigo-deep/10"
              role="listitem"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-semibold text-indigo-deep pr-4">{faq.question}</span>
                {openIndex === i ? (
                  <ChevronUp className="h-5 w-5 text-indigo-deep flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-text flex-shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-sm text-slate-text leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
