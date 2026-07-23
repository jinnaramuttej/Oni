import { Atom, Beaker, Calculator, BookOpen, Globe, Brain } from 'lucide-react';

const subjects = [
  {
    icon: Atom,
    name: 'Physics',
    description: 'Mechanics, Thermodynamics, Electromagnetism, Modern Physics',
    topics: 42,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=80',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Beaker,
    name: 'Chemistry',
    description: 'Organic, Inorganic, Physical Chemistry & Lab Experiments',
    topics: 38,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Calculator,
    name: 'Mathematics',
    description: 'Algebra, Calculus, Geometry, Trigonometry & Statistics',
    topics: 56,
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&q=80',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: BookOpen,
    name: 'Biology',
    description: 'Botany, Zoology, Genetics, Ecology & Human Physiology',
    topics: 45,
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Globe,
    name: 'English & Communication',
    description: 'Grammar, Literature, Writing Skills & Verbal Ability',
    topics: 28,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: Brain,
    name: 'Reasoning & Aptitude',
    description: 'Logical Reasoning, Data Interpretation & Quantitative',
    topics: 35,
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=80',
    color: 'from-rose-500 to-red-400',
  },
];

export default function Subjects() {
  return (
    <section id="subjects" className="py-20 lg:py-28 bg-white" aria-label="Subjects offered">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-blue-royal/5 px-4 py-1.5 text-sm font-semibold text-blue-royal mb-4">
            Subjects We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
            Comprehensive Subject Coverage
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            From foundational concepts to advanced problem-solving, we cover every subject with depth and clarity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="group relative rounded-[20px] overflow-hidden bg-slate-bg hover:bg-white hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 border border-transparent hover:border-gray-100"
            >
              {/* Top image strip */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <subject.icon className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-indigo-deep mb-2">{subject.name}</h3>
                <p className="text-sm text-slate-text leading-relaxed mb-4">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-text bg-slate-bg px-3 py-1.5 rounded-full group-hover:bg-indigo-deep/5 transition-colors">
                    {subject.topics} Topics
                  </span>
                  <a
                    href="#courses"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-royal group-hover:gap-2.5 transition-all duration-300"
                  >
                    Explore
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
