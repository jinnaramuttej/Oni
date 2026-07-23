import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link2, Mail } from 'lucide-react';

const team = [
  {
    name: 'Rajesh Sharma',
    role: 'Founding Partner & CA',
    specialty: 'Tax Strategy & Corporate Advisory',
    image: 'https://images.pexels.com/photos/10816007/pexels-photo-10816007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400',
    experience: '20+ years',
  },
  {
    name: 'Priya Mehta',
    role: 'Senior Partner & CA',
    specialty: 'Audit & Compliance',
    image: 'https://images.pexels.com/photos/38197025/pexels-photo-38197025.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400',
    experience: '15+ years',
  },
  {
    name: 'Arjun Patel',
    role: 'Partner & CS',
    specialty: 'Business Consulting',
    image: 'https://images.pexels.com/photos/13111213/pexels-photo-13111213.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400',
    experience: '12+ years',
  },
  {
    name: 'Neha Kapoor',
    role: 'Associate Partner & CA',
    specialty: 'GST & Indirect Tax',
    image: 'https://images.pexels.com/photos/31409070/pexels-photo-31409070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=400',
    experience: '10+ years',
  },
];

export default function Team() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="team" className="py-24 lg:py-32 bg-surface">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-emerald/10 px-4 py-1.5 mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs font-semibold text-emerald tracking-wider uppercase">Meet the Experts</span>
          </div>
          <h2
            className={`text-3xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight mb-4 transition-all duration-600 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Led by Experience,
            <br />
            Driven by Results
          </h2>
          <p
            className={`text-base lg:text-lg text-slate-text leading-relaxed transition-all duration-600 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our leadership team brings together decades of combined experience across
            taxation, audit, compliance, and financial strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className={`group rounded-[20px] bg-white border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.06] hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${250 + i * 100}ms` }}
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social links overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors" aria-label={`${member.name} LinkedIn`}>
                    <Link2 className="w-4 h-4" />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors" aria-label={`Email ${member.name}`}>
                    <Mail className="w-4 h-4" />
                  </button>
                </div>

                {/* Experience badge */}
                <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1">
                  <span className="text-[11px] font-semibold text-navy">{member.experience}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-semibold text-navy mb-0.5">{member.name}</h3>
                <p className="text-sm text-emerald font-medium mb-1">{member.role}</p>
                <p className="text-xs text-slate-text">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
