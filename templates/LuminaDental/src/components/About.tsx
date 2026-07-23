import { useReveal } from '../hooks/useReveal';
import { CheckCircle2, Star, Users, Zap } from 'lucide-react';

export default function About() {
  const revealRef = useReveal();
  const revealRef2 = useReveal({ delay: 200 });

  return (
    <section id="about" className="py-24 lg:py-32 bg-white" aria-label="About our clinic">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Side */}
          <div ref={revealRef} className="reveal relative">
            <div className="relative rounded-card overflow-hidden shadow-card">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80&auto=format&fit=crop"
                alt="Dentist consulting with patient in modern clinic"
                className="w-full h-[480px] lg:h-[560px] object-cover img-zoom"
                loading="lazy"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white rounded-card shadow-card p-6 border border-gray-100 max-w-[240px]">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex -space-x-2.5">
                  {['S', 'M', 'J', 'A'].map((letter, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold" style={{ backgroundColor: ['#14b8a6', '#1e3a5f', '#7dd3c7', '#e0f2fe'][i], color: i === 1 ? '#fff' : '#134e4a' }}>
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-navy">2,500+</span>
              </div>
              <div className="flex items-center gap-0.5 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-semibold text-navy ml-1.5">4.9</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Patient satisfaction rating</p>
            </div>

            {/* Decorative */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-teal-50 -z-10" aria-hidden="true" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-sky-light -z-10" aria-hidden="true" />
          </div>

          {/* Content Side */}
          <div ref={revealRef2} className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              About Lumina Dental
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-[1.1] mb-6">
              Where precision meets{' '}
              <span className="gradient-text">compassionate care</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              At Lumina Dental, we believe exceptional dental care begins with understanding. Our team of board-certified specialists combines decades of experience with cutting-edge technology.
            </p>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              From your first consultation to your final follow-up, every detail is designed around your comfort, your schedule, and your smile goals.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: CheckCircle2, title: 'Board-Certified Specialists', desc: 'Advanced certifications in every field.' },
                { icon: Zap, title: 'Latest Technology', desc: '3D imaging, laser dentistry & digital impressions.' },
                { icon: Users, title: 'Family-Friendly', desc: 'Comprehensive care for all ages.' },
                { icon: Star, title: 'Transparent Pricing', desc: 'Clear estimates before every procedure.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-btn bg-navy text-white font-semibold hover:bg-navy-light transition-all duration-300 btn-press shadow-lg"
              >
                Schedule a Consultation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#treatments"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-btn bg-white text-navy font-semibold border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-300 btn-press"
              >
                View Treatments
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
