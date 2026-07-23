import React from 'react';
import { Building2, MapPin, CheckCircle2 } from 'lucide-react';

export const CampusShowcase: React.FC = () => {
  const facilities = [
    {
      title: 'Advanced STEM & Quantum Labs',
      description: 'Equipped with digital oscilloscopes, optics benches, and Python computational stations for hands-on experiments.',
      image: 'https://images.pexels.com/photos/8199610/pexels-photo-8199610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700',
      badge: 'Boston Innovation Campus'
    },
    {
      title: 'Acoustic Focus Pods & Quiet Study Suites',
      description: 'Dedicated noise-isolated study pods available 7 days a week for uninterrupted diagnostic practice.',
      image: 'https://images.pexels.com/photos/16420352/pexels-photo-16420352.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700',
      badge: 'Cambridge Learning Hub'
    },
    {
      title: 'Multi-Camera Hybrid Broadcast Classrooms',
      description: 'Ultra-HD smart whiteboards and ceiling audio arrays allow hybrid students to participate as if in room.',
      image: 'https://images.pexels.com/photos/9159039/pexels-photo-9159039.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700',
      badge: 'Global Virtual Studio'
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-blue-600" />
            Modern Learning Environments
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Designed For Focus & Collaboration
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Our state-of-the-art physical campuses and high-definition virtual studios foster deep intellectual immersion.
          </p>
        </div>

        {/* Facility Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => (
            <div 
              key={idx}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    {fac.badge}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Open 7 Days a Week for Enrolled Students</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
