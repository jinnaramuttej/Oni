import React, { useState } from 'react';
import { COURSES } from '../data/coursesData';
import { Course, Category } from '../types';
import { 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Flame,
  Search
} from 'lucide-react';

interface CourseExplorerProps {
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (courseId: string) => void;
}

export const CourseExplorer: React.FC<CourseExplorerProps> = ({ 
  onSelectCourse, 
  onEnrollCourse 
}) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  const categories: (Category | 'All')[] = [
    'All',
    'SAT / ACT Test Prep',
    'STEM & Olympiads',
    'University & Medical Prep',
    'AP & IB Diploma',
    'Foundational Honors'
  ];

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesGrade = selectedGrade === 'All' || course.gradeLevel.includes(selectedGrade);
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesGrade && matchesSearch;
  });

  return (
    <section id="courses" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Rigorous Curriculum & Accelerator Tracks
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Popular Premier Courses
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Small 1:8 micro-batches led by world-class Ivy League mentors with proven track records of peak standardized score increases and top-tier admissions.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="space-y-6 mb-12">
          
          {/* Search and Grade Selector */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses, topics or mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Grade Filter Pills */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Grade:</span>
              {['All', 'Middle School', 'High School', 'Senior Prep'].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedGrade === grade
                      ? 'bg-indigo-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Course Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-[20px] overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Header & Badges */}
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={course.featuredImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30">
                      {course.category}
                    </span>
                    {course.popular && (
                      <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Flame className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Popular</span>
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Info: Level & Ratio */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-medium text-white">
                    <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                      {course.level}
                    </span>
                    <span className="bg-emerald-500/90 text-slate-950 font-extrabold px-2.5 py-1 rounded-lg">
                      {course.batchRatio}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                      {course.gradeLevel}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                    {course.subtitle}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-1">
                    {course.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Instructor Ribbon */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-300"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{course.instructor.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{course.instructor.almaMater}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-indigo-700">{course.avgScoreIncrease}</div>
                      <div className="text-[10px] text-slate-400">Avg Lift</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    {course.seatsLeft} Seats Left
                  </span>
                  <span className="font-extrabold text-slate-900 text-base">
                    ${course.priceMonthly}<span className="text-xs font-normal text-slate-500">/mo</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    <span>View Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEnrollCourse(course.id)}
                    className="w-full inline-flex items-center justify-center gap-1 bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching courses found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Try adjusting your search filters or browse all programs to find the right track.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchTerm('');
                setSelectedGrade('All');
              }}
              className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
