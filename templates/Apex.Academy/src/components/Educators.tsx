import { Star, BookOpen, Award } from 'lucide-react';

const educators = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Head of Physics',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    experience: '18 years',
    specialization: 'JEE Advanced Physics',
    achievement: '50+ IIT selections',
    bio: 'PhD from IIT Delhi. Passionate about making physics intuitive through real-world applications.',
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Head of Biology',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    experience: '15 years',
    specialization: 'NEET Biology',
    achievement: '30+ AIIMS selections',
    bio: 'Former AIIMS faculty. Known for her visual teaching approach and detailed note compilations.',
  },
  {
    name: 'Prof. Vikram Patel',
    role: 'Head of Mathematics',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    experience: '20 years',
    specialization: 'Mathematics Olympiad',
    achievement: 'Gold Medal Coach',
    bio: 'IMO gold medalist. Creates innovative problem-solving frameworks that students love.',
  },
  {
    name: 'Dr. Meera Joshi',
    role: 'Head of Chemistry',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    experience: '12 years',
    specialization: 'Organic Chemistry',
    achievement: '98% Pass Rate',
    bio: 'IIT Bombay alumna. Transforms complex organic chemistry mechanisms into memorable stories.',
  },
  {
    name: 'Mr. David Chen',
    role: 'SAT/ACT Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    experience: '10 years',
    specialization: 'SAT & ACT Prep',
    achievement: '1550+ Average Score',
    bio: 'Harvard-educated test prep specialist. Students consistently score 150+ points higher.',
  },
  {
    name: 'Prof. Anita Desai',
    role: 'Foundation Head',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    experience: '22 years',
    specialization: 'Board Excellence',
    achievement: '100% Topper Record',
    bio: 'Veteran educator who has shaped thousands of young minds. Believes every student can excel.',
  },
];

export default function Educators() {
  return (
    <section id="educators" className="py-20 lg:py-28 bg-white" aria-label="Meet the educators">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-amber-accent/10 px-4 py-1.5 text-sm font-semibold text-amber-accent mb-4">
            Meet the Educators
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
            Learn From the <span className="text-blue-royal">Best</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Our educators bring decades of expertise, a passion for teaching, and a commitment to every student's success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {educators.map((educator) => (
            <article
              key={educator.name}
              className="group rounded-[20px] bg-slate-bg hover:bg-white hover:shadow-card-hover border border-transparent hover:border-gray-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={educator.image}
                  alt={educator.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/60 via-transparent to-transparent" />

                {/* Achievement badge */}
                <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-accent" />
                  <span className="text-xs font-semibold text-indigo-deep">{educator.achievement}</span>
                </div>

                {/* Bottom overlay content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{educator.name}</h3>
                  <p className="text-sm text-white/80">{educator.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-slate-text leading-relaxed mb-4">{educator.bio}</p>

                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-deep/5 px-3 py-1.5 text-xs font-semibold text-indigo-deep">
                    <BookOpen className="h-3 w-3" />
                    {educator.specialization}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-accent/10 px-3 py-1.5 text-xs font-semibold text-amber-accent">
                    <Star className="h-3 w-3" />
                    {educator.experience}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
