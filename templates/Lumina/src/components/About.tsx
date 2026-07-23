import { AnimatedSection } from './AnimatedSection';
import { Award, Users, Clock, Sparkles } from 'lucide-react';

const stats = [
  { number: '15+', label: 'Years Experience', icon: Award },
  { number: '15K+', label: 'Happy Patients', icon: Users },
  { number: '98%', label: 'Patient Satisfaction', icon: Sparkles },
  { number: '24/7', label: 'Emergency Care', icon: Clock },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-teal-50/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <AnimatedSection>
            <div className="relative">
              <div className="rounded-[24px] overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/5355920/pexels-photo-5355920.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900"
                  alt="Modern bright dental treatment room at Lumina Dental with advanced equipment"
                  className="w-full h-[400px] lg:h-[480px] object-cover img-zoom"
                  loading="lazy"
                />
              </div>
              {/* Overlapping accent card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-primary to-teal-light flex items-center justify-center">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy font-heading">ADA</p>
                    <p className="text-sm text-slate-text/60">Accredited Clinic</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content side */}
          <div className="space-y-8">
            <AnimatedSection delay={100}>
              <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">About Our Clinic</span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight tracking-tight">
                Where Precision Meets{' '}
                <span className="text-teal-primary">Patient Comfort</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <p className="text-lg text-slate-text/80 leading-relaxed">
                At Lumina Dental, we believe exceptional dental care begins with a genuine connection. Our state-of-the-art clinic combines cutting-edge technology with a warm, welcoming atmosphere — because your comfort matters as much as your clinical outcome.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <p className="text-base text-slate-text/70 leading-relaxed">
                Founded by a team of board-certified specialists, we've built a practice where innovation drives every procedure — from routine cleanings to complex restorative work. Every detail of our clinic is designed around the patient experience.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {stats.map(({ number, label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 p-4 rounded-2xl bg-light-bg border border-gray-100/60">
                    <div className="w-10 h-10 rounded-xl bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-teal-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-navy font-heading">{number}</p>
                      <p className="text-xs text-slate-text/60">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
