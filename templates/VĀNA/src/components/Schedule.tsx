import React, { useState } from "react";
import { Clock, User, CalendarDays } from "lucide-react";

interface ScheduleSlot {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string;
  name: string;
  category: "yoga" | "meditation" | "breathwork";
  instructor: string;
}

const SCHEDULE_DATA: ScheduleSlot[] = [
  // Monday
  { id: "mon-1", day: "Monday", time: "07:00 – 08:00", name: "Vinyasa Flow", category: "yoga", instructor: "Maya Rivers" },
  { id: "mon-2", day: "Monday", time: "09:30 – 10:15", name: "Mindfulness & Presence", category: "meditation", instructor: "Soren Kael" },
  { id: "mon-3", day: "Monday", time: "18:00 – 19:15", name: "Yin Yoga & Sound", category: "yoga", instructor: "Soren Kael" },
  // Tuesday
  { id: "tue-1", day: "Tuesday", time: "08:00 – 08:45", name: "Pranayama Breath", category: "breathwork", instructor: "Elena Rostova" },
  { id: "tue-2", day: "Tuesday", time: "12:00 – 13:00", name: "Hatha & Alignment", category: "yoga", instructor: "Elena Rostova" },
  { id: "tue-3", day: "Tuesday", time: "19:00 – 20:00", name: "Sound Bath Journey", category: "meditation", instructor: "Maya Rivers" },
  // Wednesday
  { id: "wed-1", day: "Wednesday", time: "07:00 – 08:00", name: "Vinyasa Flow", category: "yoga", instructor: "Maya Rivers" },
  { id: "wed-2", day: "Wednesday", time: "17:30 – 18:30", name: "Somatic Release", category: "breathwork", instructor: "Soren Kael" },
  { id: "wed-3", day: "Wednesday", time: "19:00 – 20:15", name: "Restorative Sanctuary", category: "yoga", instructor: "Maya Rivers" },
  // Thursday
  { id: "thu-1", day: "Thursday", time: "08:00 – 09:15", name: "Ashtanga Foundations", category: "yoga", instructor: "Elena Rostova" },
  { id: "thu-2", day: "Thursday", time: "12:30 – 13:15", name: "Box Breathing & Focus", category: "breathwork", instructor: "Maya Rivers" },
  { id: "thu-3", day: "Thursday", time: "18:30 – 19:15", name: "Zen Silent Meditation", category: "meditation", instructor: "Soren Kael" },
  // Friday
  { id: "fri-1", day: "Friday", time: "07:00 – 08:00", name: "Vinyasa Flow", category: "yoga", instructor: "Maya Rivers" },
  { id: "fri-2", day: "Friday", time: "09:30 – 10:30", name: "Sound Bath Journey", category: "meditation", instructor: "Maya Rivers" },
  { id: "fri-3", day: "Friday", time: "17:00 – 18:15", name: "Yin Yoga & Sound", category: "yoga", instructor: "Soren Kael" },
  // Saturday
  { id: "sat-1", day: "Saturday", time: "08:30 – 09:45", name: "Hatha & Alignment", category: "yoga", instructor: "Elena Rostova" },
  { id: "sat-2", day: "Saturday", time: "10:30 – 11:30", name: "Somatic Release", category: "breathwork", instructor: "Soren Kael" },
  { id: "sat-3", day: "Saturday", time: "16:00 – 17:00", name: "Restorative Sanctuary", category: "yoga", instructor: "Maya Rivers" },
  // Sunday
  { id: "sun-1", day: "Sunday", time: "09:00 – 10:15", name: "Yin Yoga & Sound", category: "yoga", instructor: "Soren Kael" },
  { id: "sun-2", day: "Sunday", time: "11:00 – 11:45", name: "Loving-Kindness (Metta)", category: "meditation", instructor: "Elena Rostova" },
  { id: "sun-3", day: "Sunday", time: "17:00 – 18:00", name: "Sound Bath Journey", category: "meditation", instructor: "Maya Rivers" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

interface ScheduleProps {
  onSelectBooking: (booking: { category: string; className: string; instructor: string; timeSlot?: string; day?: string }) => void;
}

export default function Schedule({ onSelectBooking }: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>("Monday");
  const [filterCategory, setFilterCategory] = useState<"all" | "yoga" | "meditation" | "breathwork">("all");

  const filteredSlots = SCHEDULE_DATA.filter((slot) => {
    const matchesDay = slot.day === selectedDay;
    const matchesCategory = filterCategory === "all" || slot.category === filterCategory;
    return matchesDay && matchesCategory;
  });

  const handleBookSlot = (slot: ScheduleSlot) => {
    onSelectBooking({
      category: slot.category,
      className: slot.name,
      instructor: slot.instructor,
      timeSlot: slot.time,
      day: slot.day,
    });
  };

  return (
    <section
      id="schedule"
      className="py-24 md:py-32 bg-stone/10 text-charcoal relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
              Weekly Schedule
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide">
              Step onto the mat this week
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {(["all", "yoga", "meditation", "breathwork"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-[20px] text-xs tracking-wider uppercase font-sans transition-all duration-300 cursor-pointer ${
                  filterCategory === cat
                    ? "bg-sage text-charcoal shadow-sm"
                    : "bg-ivory text-charcoal/70 border border-stone/20 hover:bg-stone/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex overflow-x-auto pb-4 mb-12 border-b border-stone/20 scrollbar-none scroll-smooth">
          <div className="flex space-x-2 md:space-x-4 min-w-max mx-auto lg:mx-0">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-[20px] text-xs md:text-sm tracking-widest uppercase font-sans transition-all duration-300 cursor-pointer ${
                  selectedDay === day
                    ? "bg-eucalyptus text-ivory font-medium"
                    : "text-charcoal/60 hover:text-charcoal hover:bg-stone/10"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Slots List */}
        <div className="bg-ivory border border-stone/30 rounded-[24px] overflow-hidden shadow-sm">
          {filteredSlots.length > 0 ? (
            <div className="divide-y divide-stone/20">
              {filteredSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-stone/5 transition-colors duration-300 group"
                >
                  {/* Time and Category */}
                  <div className="flex items-center space-x-6 min-w-[200px]">
                    <div className="flex items-center text-charcoal/80 font-sans text-sm md:text-base">
                      <Clock className="w-4.5 h-4.5 mr-2 text-clay stroke-[1.5]" />
                      <span>{slot.time}</span>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-eucalyptus px-2.5 py-1 bg-sage/15 rounded-full font-sans">
                      {slot.category}
                    </span>
                  </div>

                  {/* Class Name & Instructor */}
                  <div className="flex-1">
                    <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal group-hover:text-eucalyptus transition-colors duration-300 mb-1">
                      {slot.name}
                    </h3>
                    <div className="flex items-center text-xs text-charcoal/60 font-sans">
                      <User className="w-3.5 h-3.5 mr-1 text-clay stroke-[1.5]" />
                      <span>with {slot.instructor}</span>
                    </div>
                  </div>

                  {/* Booking Action */}
                  <div>
                    <button
                      onClick={() => handleBookSlot(slot)}
                      className="px-6 py-3 rounded-[20px] bg-stone/20 text-charcoal hover:bg-eucalyptus hover:text-ivory font-sans text-xs tracking-widest uppercase transition-all duration-300 w-full md:w-auto cursor-pointer"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <CalendarDays className="w-12 h-12 text-stone mx-auto mb-4 stroke-[1.2]" />
              <p className="font-serif text-xl text-charcoal/60 italic">
                No sessions scheduled for this category on {selectedDay}.
              </p>
              <button
                onClick={() => setFilterCategory("all")}
                className="mt-4 text-xs tracking-widest uppercase text-eucalyptus font-sans hover:underline cursor-pointer"
              >
                View All Sessions
              </button>
            </div>
          )}
        </div>

        {/* Small Note */}
        <p className="text-center text-xs text-charcoal/50 font-sans tracking-wide mt-8">
          * Private sessions and custom corporate packages are available upon request.{" "}
          <a href="#contact" className="text-eucalyptus hover:underline">
            Contact us
          </a>{" "}
          to coordinate.
        </p>
      </div>
    </section>
  );
}
