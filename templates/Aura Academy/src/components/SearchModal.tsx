import React, { useState } from 'react';
import { COURSES } from '../data/coursesData';
import { Course } from '../types';
import { Search, X, ChevronRight, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectCourse }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = COURSES.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    c.instructor.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search SAT prep, Calculus, AP Biology, faculty..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-semibold text-slate-900 focus:outline-none placeholder-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          {results.map((course) => (
            <div
              key={course.id}
              onClick={() => {
                onSelectCourse(course);
                onClose();
              }}
              className="p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase">{course.category}</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </div>
                  <div className="text-xs text-slate-500">{course.instructor.name} &bull; {course.duration}</div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          ))}

          {results.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No matching programs or mentors found for "{query}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
