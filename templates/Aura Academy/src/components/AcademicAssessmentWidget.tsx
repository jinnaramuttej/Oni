import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/mockData';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  BrainCircuit
} from 'lucide-react';

interface AssessmentWidgetProps {
  onClaimScholarship: (score: number) => void;
}

export const AcademicAssessmentWidget: React.FC<AssessmentWidgetProps> = ({ onClaimScholarship }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optIndex;
    setSelectedAnswers(updated);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed all questions
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-20 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-900/90 border border-indigo-400/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-amber-400" />
            3-Minute Academic Readiness Diagnostic
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Test Your Conceptual Reasoning
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Experience our diagnostic evaluation methodology. Answer 3 quick challenge questions to benchmark your aptitude and qualify for a Merit Diagnostic Scholarship.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl">
          
          {!isCompleted ? (
            <div className="space-y-6">
              {/* Question Stepper Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-bold">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  Topic: {currentQ.subject}
                </span>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className="p-4 rounded-2xl bg-slate-900 hover:bg-indigo-900/60 text-slate-200 hover:text-white border border-slate-800 hover:border-indigo-500 text-left font-semibold text-sm transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span>{option}</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-300 transition-colors" />
                  </button>
                ))}
              </div>

              {/* Step Progress Dots */}
              <div className="flex items-center justify-center gap-2 pt-4">
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentQuestionIndex
                        ? 'w-8 bg-blue-500'
                        : idx < currentQuestionIndex
                        ? 'w-2 bg-emerald-400'
                        : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Results Breakdown */
            <div className="space-y-6 text-center animate-in fade-in py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  Diagnostic Evaluation Complete
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white pt-2">
                  You Scored {calculateScore()} out of {QUIZ_QUESTIONS.length} Correct!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  {calculateScore() === 3
                    ? 'Exceptional analytical mastery! You qualify for our Tier-1 Merit Scholarship and Honors Accelerator placement.'
                    : 'Great critical thinking skills! Our 1:8 micro-batches will help bridge conceptual gaps to reach peak score targets.'}
                </p>
              </div>

              {/* Explanations List */}
              <div className="space-y-3 text-left bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Answer Breakdown & Key Explanations:
                </div>
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctIndex;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-300">Q{idx + 1}: {q.subject}</span>
                        {isCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Reviewed
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onClaimScholarship(calculateScore())}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Claim Scholarship & Consultation</span>
                </button>

                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm px-5 py-3.5 rounded-2xl border border-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>Retake Diagnostic</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
