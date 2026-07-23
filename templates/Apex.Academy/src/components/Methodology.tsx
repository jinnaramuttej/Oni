import { Lightbulb, Users, BarChart3, BookOpen, Target, Award } from 'lucide-react';

const methods = [
  {
    icon: BookOpen,
    title: 'Conceptual Foundation',
    description: 'We build strong fundamentals before advancing to complex problem-solving. Every concept is taught with real-world analogies and visual aids.',
    step: '01',
  },
  {
    icon: Users,
    title: 'Interactive Sessions',
    description: 'Live, two-way learning with real-time doubt clearing. Students actively participate through polls, quizzes, and collaborative problem-solving.',
    step: '02',
  },
  {
    icon: Target,
    title: 'Personalized Roadmaps',
    description: 'Each student gets a customized learning path based on diagnostic assessments, identifying strengths and areas needing focus.',
    step: '03',
  },
  {
    icon: BarChart3,
    title: 'Continuous Assessment',
    description: 'Weekly tests, monthly exams, and detailed performance analytics help track progress and adjust strategies in real-time.',
    step: '04',
  },
  {
    icon: Lightbulb,
    title: 'Smart Revision System',
    description: 'Spaced repetition and active recall techniques ensure long-term retention. Our revision framework is backed by cognitive science.',
    step: '05',
  },
  {
    icon: Award,
    title: 'Performance Coaching',
    description: 'One-on-one mentoring sessions to develop exam temperament, time management, and confidence. Every student is mentored to excellence.',
    step: '06',
  },
];

export default function Methodology() {
  return (
    <section id="methodology" className="py-20 lg:py-28 bg-slate-bg" aria-label="Learning methodology">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt="Students engaged in interactive learning session"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-deep/10 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 rounded-2xl bg-white shadow-premium p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-success/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-emerald-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-deep">94%</div>
                  <div className="text-xs text-slate-text font-medium">Concept Retention</div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-accent/10 rounded-2xl -z-10" aria-hidden="true" />
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block rounded-full bg-indigo-deep/5 px-4 py-1.5 text-sm font-semibold text-indigo-deep mb-4">
              Our Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
              How We Transform <span className="text-blue-royal">Learning</span>
            </h2>
            <p className="text-slate-text text-lg leading-relaxed mb-12">
              Our six-step methodology is designed to maximize understanding, retention, and exam performance through evidence-based pedagogical practices.
            </p>

            <div className="space-y-6">
              {methods.map((method) => (
                <div
                  key={method.title}
                  className="group flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-card transition-all duration-300"
                >
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-deep/5 flex items-center justify-center group-hover:bg-blue-royal/10 transition-colors">
                      <method.icon className="h-5 w-5 text-indigo-deep group-hover:text-blue-royal transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-indigo-deep/30">{method.step}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-indigo-deep mb-1">{method.title}</h3>
                    <p className="text-sm text-slate-text leading-relaxed">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
