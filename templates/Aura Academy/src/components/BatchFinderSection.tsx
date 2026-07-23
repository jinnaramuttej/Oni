import React, { useState } from 'react';
import { UPCOMING_BATCHES } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Flame,
  Filter
} from 'lucide-react';

interface BatchFinderProps {
  onReserveSeat: (batchTitle: string) => void;
}

export const BatchFinderSection: React.FC<BatchFinderProps> = ({ onReserveSeat }) => {
  const [selectedMode, setSelectedMode] = useState<string>('All');

  const filteredBatches = UPCOMING_BATCHES.filter((batch) => 
    selectedMode === 'All' || batch.mode === selectedMode
  );

  return (
    <section id="batches" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 border border-indigo-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-indigo-600" />
            Immediate Start Options
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Upcoming Honors Batches
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Micro-batches are capped strictly at 6 to 8 students to maintain absolute personalized attention and rapid feedback loops.
          </p>

          {/* Format filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Format:</span>
            </div>
            {['All', 'Hybrid Flex', 'In-Person Campus', 'Live Interactive Online'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  selectedMode === mode
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Batches Table / Cards Matrix */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredBatches.map((b) => {
            const seatsLeft = b.totalSeats - b.seatsOccupied;
            const fillPercentage = Math.round((b.seatsOccupied / b.totalSeats) * 100);

            return (
              <div 
                key={b.id}
                className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Mode & Grade Pill Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-indigo-900 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {b.mode}
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
                      {b.gradeLevel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {b.courseTitle}
                  </h3>

                  {/* Schedule details */}
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-600 font-medium pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{b.days} &bull; Starts <strong>{b.startDate}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span>{b.timing}</span>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{b.location} &bull; Lead: <strong>{b.instructorName}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Seat Meter & Reservation CTA */}
                <div className="pt-4 border-t border-slate-200/80 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        Batch Capacity Progress
                      </span>
                      <span className={`flex items-center gap-1 font-mono ${seatsLeft <= 2 ? 'text-red-600 font-extrabold' : 'text-emerald-700 font-extrabold'}`}>
                        {seatsLeft <= 2 && <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />}
                        {seatsLeft} Seats Remaining ({b.seatsOccupied}/{b.totalSeats} Enrolled)
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          fillPercentage > 75 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Includes complimentary 1-on-1 orientation call</span>
                    </div>

                    <button
                      onClick={() => onReserveSeat(b.courseTitle)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <span>Reserve Seat Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
