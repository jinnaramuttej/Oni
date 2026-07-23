import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  ShieldCheck,
  ChevronDown,
  Star
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnroll
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number>(0);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {course.category}
            </span>
            <span className="bg-indigo-800/80 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
              {course.gradeLevel}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              Ratio: {course.batchRatio}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
            {course.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300 border-t border-slate-800/80 pt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{course.duration} ({course.hoursPerWeek})</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{course.nextBatchDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-300">{course.avgScoreIncrease}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          
          {/* Key Highlights Grid */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              What Student Will Master
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Card */}
          <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-5 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center gap-5">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-md">
                  Lead Faculty
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {course.instructor.rating} ({course.instructor.studentsTaught}+ Alumni)
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{course.instructor.name}</h4>
              <p className="text-xs font-semibold text-slate-600">{course.instructor.title} &bull; {course.instructor.almaMater}</p>
              <p className="text-xs text-slate-500 leading-relaxed pt-1">{course.instructor.bio}</p>
            </div>
          </div>

          {/* Syllabus Modules Accordion */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Comprehensive Syllabus Architecture
            </h3>
            <div className="space-y-3">
              {course.syllabus.map((mod, idx) => {
                const isOpen = openModuleIndex === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenModuleIndex(isOpen ? -1 : idx)}
                      className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-slate-800 text-sm cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-md">
                          {mod.weeks}
                        </span>
                        <span>{mod.title}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white space-y-2 border-t border-slate-100">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Topics Covered:</div>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {mod.topics.map((t, tidx) => (
                            <li key={tidx} className="text-xs font-medium text-slate-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                              {t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tuition & Satisfaction Guarantee */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Risk-Free Diagnostic Guarantee</span>
              </div>
              <div className="text-xl font-extrabold text-white">
                ${course.priceMonthly} <span className="text-xs text-slate-400 font-normal">/ month (All materials included)</span>
              </div>
              <div className="text-xs text-slate-400">
                Only {course.seatsLeft} seat reservations left for {course.nextBatchDate}.
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onEnroll(course.id);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg transition-all cursor-pointer text-sm shrink-0"
            >
              <span>Enroll In This Batch</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
