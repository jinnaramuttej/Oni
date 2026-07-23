import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../utils/cn';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const scheduleData: Record<string, { time: string; class: string; instructor: string; level: string; duration: string }[]> = {
  Monday: [
    { time: '6:30 AM', class: 'Sunrise Vinyasa', instructor: 'Sofia Rivera', level: 'Intermediate', duration: '60 min' },
    { time: '9:00 AM', class: 'Gentle Flow', instructor: 'Maya Chen', level: 'All Levels', duration: '60 min' },
    { time: '12:00 PM', class: 'Power Align', instructor: 'David Torres', level: 'Advanced', duration: '60 min' },
    { time: '5:30 PM', class: 'Hatha Restore', instructor: 'James Okonkwo', level: 'Beginner', duration: '75 min' },
    { time: '7:00 PM', class: 'Yin & Sound', instructor: 'Lena Park', level: 'All Levels', duration: '90 min' },
  ],
  Tuesday: [
    { time: '7:00 AM', class: 'Power Align', instructor: 'David Torres', level: 'Advanced', duration: '60 min' },
    { time: '9:30 AM', class: 'Prenatal Peace', instructor: 'Maya Chen', level: 'Prenatal', duration: '60 min' },
    { time: '12:00 PM', class: 'Guided Mindfulness', instructor: 'Sofia Rivera', level: 'All Levels', duration: '30 min' },
    { time: '5:30 PM', class: 'Gentle Flow', instructor: 'Maya Chen', level: 'All Levels', duration: '60 min' },
    { time: '7:30 PM', class: 'Sleep & Restore', instructor: 'Lena Park', level: 'All Levels', duration: '45 min' },
  ],
  Wednesday: [
    { time: '6:30 AM', class: 'Sunrise Vinyasa', instructor: 'Sofia Rivera', level: 'Intermediate', duration: '60 min' },
    { time: '9:00 AM', class: 'Hatha Restore', instructor: 'James Okonkwo', level: 'Beginner', duration: '75 min' },
    { time: '12:00 PM', class: 'Breathwork Session', instructor: 'James Okonkwo', level: 'All Levels', duration: '45 min' },
    { time: '5:30 PM', class: 'Yin & Sound', instructor: 'Lena Park', level: 'All Levels', duration: '90 min' },
    { time: '7:00 PM', class: 'Inner Clarity', instructor: 'Sofia Rivera', level: 'All Levels', duration: '60 min' },
  ],
  Thursday: [
    { time: '7:00 AM', class: 'Gentle Flow', instructor: 'Maya Chen', level: 'All Levels', duration: '60 min' },
    { time: '9:30 AM', class: 'Prenatal Peace', instructor: 'Maya Chen', level: 'Prenatal', duration: '60 min' },
    { time: '12:00 PM', class: 'Guided Mindfulness', instructor: 'Lena Park', level: 'All Levels', duration: '45 min' },
    { time: '5:30 PM', class: 'Power Align', instructor: 'David Torres', level: 'Advanced', duration: '60 min' },
    { time: '7:00 PM', class: 'Sunrise Vinyasa', instructor: 'Sofia Rivera', level: 'Intermediate', duration: '60 min' },
  ],
  Friday: [
    { time: '6:30 AM', class: 'Hatha Restore', instructor: 'James Okonkwo', level: 'Beginner', duration: '75 min' },
    { time: '12:00 PM', class: 'Gentle Flow', instructor: 'Maya Chen', level: 'All Levels', duration: '60 min' },
    { time: '5:30 PM', class: 'Yin & Sound', instructor: 'Lena Park', level: 'All Levels', duration: '90 min' },
    { time: '7:00 PM', class: 'Sleep & Restore', instructor: 'Lena Park', level: 'All Levels', duration: '45 min' },
  ],
  Saturday: [
    { time: '8:00 AM', class: 'Sunrise Vinyasa', instructor: 'Sofia Rivera', level: 'Intermediate', duration: '60 min' },
    { time: '10:00 AM', class: 'Power Align', instructor: 'David Torres', level: 'Advanced', duration: '60 min' },
    { time: '11:30 AM', class: 'Breathwork Session', instructor: 'James Okonkwo', level: 'All Levels', duration: '60 min' },
    { time: '2:00 PM', class: 'Gentle Flow', instructor: 'Maya Chen', level: 'All Levels', duration: '60 min' },
  ],
  Sunday: [
    { time: '9:00 AM', class: 'Gentle Flow', instructor: 'Maya Chen', level: 'All Levels', duration: '60 min' },
    { time: '10:30 AM', class: 'Yin & Sound', instructor: 'Lena Park', level: 'All Levels', duration: '90 min' },
    { time: '4:00 PM', class: 'Guided Mindfulness', instructor: 'Sofia Rivera', level: 'All Levels', duration: '45 min' },
    { time: '6:00 PM', class: 'Sleep & Restore', instructor: 'Lena Park', level: 'All Levels', duration: '45 min' },
  ],
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Monday');

  const classes = scheduleData[activeDay] || [];

  return (
    <section id="schedule" className="py-24 md:py-32 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Weekly Schedule
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15] max-w-2xl mx-auto">
            Find your rhythm.
          </h2>
        </motion.div>

        {/* Day tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={cn(
                'px-5 py-2.5 text-sm rounded-[20px] transition-all duration-300 font-medium tracking-[0.03em]',
                activeDay === day
                  ? 'bg-eucalyptus text-ivory shadow-[0_2px_12px_rgba(127,145,114,0.25)]'
                  : 'text-charcoal/50 hover:text-charcoal hover:bg-stone/30'
              )}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule table */}
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {classes.map((cls, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 p-5 sm:p-6 bg-ivory rounded-[1.25rem] border border-stone/20 hover:border-sage/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="font-serif text-xl text-eucalyptus min-w-[5rem]">{cls.time}</span>
                <div>
                  <h4 className="font-serif text-lg text-charcoal font-medium leading-tight">{cls.class}</h4>
                  <p className="text-charcoal/50 text-sm font-light">with {cls.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-5 pl-0 sm:pl-4">
                <span className="text-[0.6875rem] tracking-[0.05em] uppercase text-charcoal/45 font-medium">
                  {cls.level}
                </span>
                <span className="text-[0.6875rem] tracking-[0.05em] uppercase text-charcoal/35">
                  {cls.duration}
                </span>
                <a
                  href="#booking"
                  className="px-4 py-2 text-sm font-medium tracking-[0.03em] text-eucalyptus border border-eucalyptus/30 rounded-[20px] hover:bg-eucalyptus hover:text-ivory transition-all duration-300 ml-auto"
                >
                  Book
                </a>
              </div>
            </div>
          ))}

          {classes.length === 0 && (
            <p className="text-center text-charcoal/40 py-12 font-light">No classes scheduled for this day.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
