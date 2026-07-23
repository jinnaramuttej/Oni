import { Clock, User, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';

const courses = [
  {
    title: 'JEE Advanced Complete',
    category: 'Engineering',
    duration: '24 months',
    level: 'Advanced',
    instructor: 'Dr. Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&q=80',
    description: 'Comprehensive IIT-JEE preparation with advanced problem solving, mock tests, and personalized mentoring.',
    rating: 4.9,
    students: 1240,
    price: '₹49,999',
    featured: true,
  },
  {
    title: 'NEET Ultimate Prep',
    category: 'Medical',
    duration: '18 months',
    level: 'Intermediate',
    instructor: 'Dr. Priya Sharma',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80',
    description: 'Complete NEET preparation covering Physics, Chemistry, and Biology with expert-led sessions.',
    rating: 4.8,
    students: 890,
    price: '₹39,999',
    featured: false,
  },
  {
    title: 'Class 10th Foundation',
    category: 'Foundation',
    duration: '12 months',
    level: 'Foundation',
    instructor: 'Prof. Anita Desai',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80',
    description: 'Build strong fundamentals for Board exams and future competitive entrance tests.',
    rating: 4.9,
    students: 2100,
    price: '₹24,999',
    featured: false,
  },
  {
    title: 'Mathematics Olympiad',
    category: 'Olympiad',
    duration: '8 months',
    level: 'Expert',
    instructor: 'Prof. Vikram Patel',
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&q=80',
    description: 'Advanced problem-solving for National and International Mathematics Olympiads.',
    rating: 4.7,
    students: 320,
    price: '₹19,999',
    featured: false,
  },
  {
    title: 'Class 12th Excellence',
    category: 'Boards',
    duration: '10 months',
    level: 'Intermediate',
    instructor: 'Dr. Meera Joshi',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80',
    description: 'Comprehensive CBSE/State Board preparation with focus on scoring 95+ percentile.',
    rating: 4.8,
    students: 1560,
    price: '₹29,999',
    featured: false,
  },
  {
    title: 'SAT & ACT Prep',
    category: 'International',
    duration: '6 months',
    level: 'All Levels',
    instructor: 'Mr. David Chen',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=500&q=80',
    description: 'Targeted preparation for SAT and ACT with practice tests and strategy sessions.',
    rating: 4.9,
    students: 480,
    price: '₹34,999',
    featured: false,
  },
];

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Engineering', 'Medical', 'Foundation', 'Olympiad', 'Boards', 'International'];

  const filteredCourses = activeFilter === 'All'
    ? courses
    : courses.filter(c => c.category === activeFilter);

  return (
    <section id="courses" className="py-20 lg:py-28 bg-slate-bg" aria-label="Popular courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-indigo-deep/5 px-4 py-1.5 text-sm font-semibold text-indigo-deep mb-4">
            Popular Courses
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
            Courses That Deliver <span className="text-blue-royal">Results</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Structured programs designed by subject experts, proven to help students achieve their academic goals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-indigo-deep text-white shadow-premium'
                  : 'bg-white text-slate-text hover:text-indigo-deep hover:shadow-card'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course, i) => (
            <article
              key={course.title}
              className={`group rounded-[20px] bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${
                course.featured ? 'ring-2 ring-amber-accent/30' : ''
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {course.featured && (
                  <div className="absolute top-4 left-4 rounded-full bg-amber-accent text-white text-xs font-bold px-3 py-1.5">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-indigo-deep px-3 py-1.5">
                  {course.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-slate-text mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{course.level}</span>
                </div>

                <h3 className="text-lg font-bold text-indigo-deep mb-2 group-hover:text-blue-royal transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-text leading-relaxed mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Instructor */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-bg mb-4">
                  <User className="h-4 w-4 text-indigo-deep flex-shrink-0" />
                  <span className="text-sm font-medium text-indigo-deep">{course.instructor}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-amber-accent fill-amber-accent" />
                      <span className="text-sm font-bold text-indigo-deep">{course.rating}</span>
                      <span className="text-xs text-slate-text">({course.students})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-indigo-deep">{course.price}</span>
                    <a
                      href="#enrollment"
                      className="flex items-center gap-1 rounded-[18px] bg-blue-royal px-4 py-2 text-sm font-semibold text-white shadow-button hover:shadow-button-hover hover:bg-blue-600 transition-all duration-300 group/btn"
                    >
                      Enroll
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <a
            href="#courses"
            className="group inline-flex items-center gap-2 rounded-[18px] border-2 border-indigo-deep/10 px-8 py-3.5 text-base font-semibold text-indigo-deep hover:border-indigo-deep/20 hover:bg-indigo-deep/5 transition-all duration-300"
          >
            View All Courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
