import React, { useState } from 'react';
import { SUCCESS_STORIES } from '../data/mockData';
import { 
  Trophy, 
  Quote, 
  Sparkles, 
  Play, 
  X, 
  GraduationCap, 
  TrendingUp,
  Star
} from 'lucide-react';

export const SuccessStoriesSection: React.FC = () => {
  const [activeStoryFilter, setActiveStoryFilter] = useState<string>('All');
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

  const filters = ['All', 'Ivy Acceptance', 'SAT/ACT Boost', 'AP 5s', 'Olympiad Gold'];

  const filteredStories = SUCCESS_STORIES.filter((story) => 
    activeStoryFilter === 'All' || story.category === activeStoryFilter
  );

  return (
    <section id="results" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-emerald-600" />
            Inspiring Student Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Proof Of Academic Excellence
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Read how ambitious students achieved peak SAT scores, cleared AP exams with 5s, and gained admission into Ivy League and world-class universities.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveStoryFilter(f)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeStoryFilter === f
                    ? 'bg-indigo-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Corner Badge */}
              <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>{story.badge}</span>
              </div>

              <div className="space-y-6">
                
                {/* Student Avatar + Score Improvement Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                  <img
                    src={story.avatar}
                    alt={story.studentName}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-slate-100 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-bold text-slate-900">{story.studentName}</h3>
                    <div className="text-xs font-semibold text-slate-500">{story.school}</div>
                    <div className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Admitted: {story.admittedUniversity}</span>
                    </div>
                  </div>
                </div>

                {/* Score Comparison Visual Box */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-inner">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {story.scoreImprovement.exam} Starting
                    </div>
                    <div className="text-base font-extrabold text-slate-300 font-mono">
                      {story.scoreImprovement.before}
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Final Verified Score
                    </div>
                    <div className="text-xl font-extrabold text-white font-mono">
                      {story.scoreImprovement.after}
                    </div>
                  </div>
                </div>

                {/* Quotes */}
                <div className="space-y-3 relative">
                  <Quote className="w-8 h-8 text-indigo-200 absolute -top-2 -left-2 opacity-50" />
                  <p className="text-slate-700 text-sm leading-relaxed relative z-10 italic pl-4 border-l-2 border-indigo-500">
                    "{story.quote}"
                  </p>

                  {story.parentQuote && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-medium">
                      <strong className="text-slate-700 font-bold block mb-0.5">Parent Perspective:</strong>
                      "{story.parentQuote}"
                    </p>
                  )}
                </div>

              </div>

              {/* Action */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <button
                  onClick={() => setVideoModalUrl(story.studentName)}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Play className="w-3 h-3 fill-blue-700" />
                  </div>
                  <span>Watch 90s Video Interview</span>
                </button>

                <span className="text-slate-400 font-mono">Verified Score Certificate</span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video Story Placeholder Modal */}
      {videoModalUrl && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 text-white relative shadow-2xl border border-slate-800 animate-in fade-in">
            <button
              onClick={() => setVideoModalUrl(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Video Story & Advisory Transcript</span>
              </div>

              <h3 className="text-xl font-extrabold text-white">
                How {videoModalUrl} Scored in Top 1% & Built an Ivy-Ready Portfolio
              </h3>

              <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center group cursor-pointer shadow-inner">
                <img
                  src="https://images.pexels.com/photos/8199558/pexels-photo-8199558.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700"
                  alt="Student interview video preview"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-slate-300">
                  02:14 High Definition
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                Discover the exact weekly study routines, practice test review methodologies, and faculty mentoring sessions that helped {videoModalUrl} achieve score perfection.
              </p>

              <button
                onClick={() => setVideoModalUrl(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Close Video Player
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
