import React, { useState } from 'react';
import { INSTRUCTORS } from '../data/coursesData';
import { Instructor } from '../types';
import { 
  Star, 
  GraduationCap, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface EducatorsProps {
  onBookInstructor: (instructorName: string) => void;
}

export const EducatorsSection: React.FC<EducatorsProps> = ({ onBookInstructor }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<Instructor | null>(null);

  const educatorsList = Object.values(INSTRUCTORS);

  return (
    <section id="educators" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-amber-600" />
            World-Class Mentorship
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Master Educators
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Our faculty consists of former university researchers, Olympiad gold medalists, and test-prep pioneers who bring passionate mentorship to every session.
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {educatorsList.map((faculty) => (
            <div
              key={faculty.id}
              className="group bg-slate-50 rounded-[20px] p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Profile Image Container */}
                <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                  <img
                    src={faculty.avatar}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-amber-400 text-slate-950 p-1 rounded-md text-[10px] font-extrabold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-slate-950" />
                    <span>{faculty.rating}</span>
                  </div>
                </div>

                {/* Faculty Names & Credentials */}
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {faculty.name}
                  </h3>
                  <div className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                    {faculty.almaMater}
                  </div>
                  <p className="text-xs text-slate-500 font-medium pt-0.5">
                    {faculty.title} &bull; {faculty.experienceYears} Yrs Exp
                  </p>
                </div>

                {/* Short Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed text-center">
                  {faculty.bio}
                </p>

                {/* Specialty Pills */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                  {faculty.specialties.slice(0, 3).map((spec, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-200/60 mt-4 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedFaculty(faculty)}
                  className="w-full text-center bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs py-2.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  View Dossier
                </button>
                <button
                  onClick={() => onBookInstructor(faculty.name)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  <span>Request Orientation Call</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Faculty Detail Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 animate-in fade-in">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <img
                src={selectedFaculty.avatar}
                alt={selectedFaculty.name}
                className="w-28 h-28 rounded-2xl object-cover shadow-lg border-2 border-white shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Senior Faculty Member</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">{selectedFaculty.name}</h3>
                <div className="text-sm font-bold text-blue-600">{selectedFaculty.title}</div>
                <div className="text-xs text-slate-500 font-medium">
                  Alma Mater: <strong className="text-slate-800">{selectedFaculty.almaMater}</strong> &bull; {selectedFaculty.experienceYears} Years Teaching Excellence
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Teaching Philosophy & Background</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedFaculty.bio}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subject Mastery Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFaculty.specialties.map((spec, idx) => (
                    <span key={idx} className="bg-indigo-50 border border-indigo-100 text-indigo-900 font-semibold text-xs px-3 py-1 rounded-xl">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Students Taught</div>
                  <div className="text-lg font-extrabold text-amber-400 font-mono">{selectedFaculty.studentsTaught}+ High Achievers</div>
                </div>
                <button
                  onClick={() => {
                    const name = selectedFaculty.name;
                    setSelectedFaculty(null);
                    onBookInstructor(name);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Book 1-on-1 Orientation
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
