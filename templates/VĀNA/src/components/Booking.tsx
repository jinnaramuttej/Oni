import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Leaf, Sparkles, X } from "lucide-react";

interface BookingProps {
  bookingState: {
    category: string;
    className: string;
    instructor: string;
    timeSlot?: string;
    day?: string;
  };
  onClearBookingState: () => void;
}

const CATEGORIES_TO_CLASSES: Record<string, string[]> = {
  yoga: [
    "Vinyasa Flow",
    "Yin Yoga & Sound",
    "Hatha & Alignment",
    "Ashtanga Foundations",
    "Restorative Sanctuary",
  ],
  meditation: [
    "Mindfulness & Presence",
    "Sound Bath Journey",
    "Zen Silent Meditation",
    "Loving-Kindness (Metta)",
  ],
  breathwork: [
    "Pranayama Breath",
    "Somatic Release",
    "Box Breathing & Focus",
  ],
};

const INSTRUCTORS = ["Maya Rivers", "Soren Kael", "Elena Rostova"];

export default function Booking({ bookingState, onClearBookingState }: BookingProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "yoga",
    className: "Vinyasa Flow",
    instructor: "Maya Rivers",
    date: "",
    timeSlot: "08:00 – 09:15",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [breathCounter, setBreathCounter] = useState(4);

  // Sync state from props (e.g. when user clicks "Book Class" or "Book Session")
  useEffect(() => {
    if (bookingState.className) {
      setFormData((prev) => ({
        ...prev,
        category: bookingState.category || "yoga",
        className: bookingState.className,
        instructor: bookingState.instructor || "Maya Rivers",
        timeSlot: bookingState.timeSlot || "08:00 – 09:15",
        date: bookingState.day
          ? getNextDateForDay(bookingState.day)
          : getTodayString(),
      }));
    }
  }, [bookingState]);

  // Helper to get next calendar date for a weekday
  const getNextDateForDay = (dayName: string) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const targetDay = daysOfWeek.indexOf(dayName);
    if (targetDay === -1) return getTodayString();

    const today = new Date();
    const resultDate = new Date(today);
    const currentDay = today.getDay();

    let steps = targetDay - currentDay;
    if (steps <= 0) steps += 7; // next week's day

    resultDate.setDate(today.getDate() + steps);
    return resultDate.toISOString().split("T")[0];
  };

  const getTodayString = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Set default class when category changes
  const handleCategoryChange = (cat: string) => {
    const classes = CATEGORIES_TO_CLASSES[cat] || [];
    setFormData((prev) => ({
      ...prev,
      category: cat,
      className: classes[0] || "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      handleCategoryChange(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitted(true);
  };

  // Mindful breathing exercise cycle in the success modal
  useEffect(() => {
    if (!isSubmitted) return;

    const interval = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev === 1) {
          // transition phase
          setBreathPhase((current) => {
            if (current === "Inhale") return "Hold";
            if (current === "Hold") return "Exhale";
            return "Inhale";
          });
          return 4; // 4-second box breathing cycle
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, breathPhase]);

  const handleCloseModal = () => {
    setIsSubmitted(false);
    onClearBookingState();
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "yoga",
      className: "Vinyasa Flow",
      instructor: "Maya Rivers",
      date: "",
      timeSlot: "08:00 – 09:15",
      notes: "",
    });
  };

  return (
    <section
      id="booking"
      className="py-24 md:py-32 bg-ivory text-charcoal relative overflow-hidden paper-texture"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Form Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
              Reservations
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
              Begin your path to presence
            </h2>
            <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
              Reserving your space in our intimate classes is the first step of your practice. Select your preferred style, date, and practitioner below.
            </p>

            <div className="space-y-4 pt-4 border-t border-stone/20">
              <div className="flex items-start space-x-3">
                <Leaf className="w-5 h-5 text-eucalyptus stroke-[1.5] mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold">Intimate Group Sizes</h4>
                  <p className="text-xs text-charcoal/60 font-sans">
                    Capped at 12 participants for personalized attention.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-eucalyptus stroke-[1.5] mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold">All Equipment Provided</h4>
                  <p className="text-xs text-charcoal/60 font-sans">
                    Premium cork mats, linen bolsters, and herbal tea.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-sand/30 border border-stone/30 rounded-[24px] p-8 md:p-10 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Emily Thorne"
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g., emily@domain.com"
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Row 2: Phone and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g., +1 (555) 019-2834"
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Practice Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300 cursor-pointer"
                    >
                      <option value="yoga">Yoga Practice</option>
                      <option value="meditation">Meditation Program</option>
                      <option value="breathwork">Breathwork Session</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Class Name and Instructor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Select Class *
                    </label>
                    <select
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300 cursor-pointer"
                    >
                      {(CATEGORIES_TO_CLASSES[formData.category] || []).map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Preferred Guide *
                    </label>
                    <select
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300 cursor-pointer"
                    >
                      {INSTRUCTORS.map((ins) => (
                        <option key={ins} value={ins}>
                          {ins}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Date and Time Slot */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={getTodayString()}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300 cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                      Time Slot *
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300 cursor-pointer"
                    >
                      <option value="07:00 – 08:00">07:00 – 08:00 (Early Morning)</option>
                      <option value="08:00 – 09:15">08:00 – 09:15 (Morning Flow)</option>
                      <option value="09:30 – 10:30">09:30 – 10:30 (Mid-morning)</option>
                      <option value="12:00 – 13:00">12:00 – 13:00 (Noon Alignment)</option>
                      <option value="17:00 – 18:15">17:00 – 18:15 (Late Afternoon)</option>
                      <option value="18:30 – 19:15">18:30 – 19:15 (Evening Meditation)</option>
                      <option value="19:00 – 20:15">19:00 – 20:15 (Night Restoration)</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Notes */}
                <div className="space-y-2">
                  <label className="text-xs tracking-wider uppercase text-charcoal/70 font-sans font-medium">
                    Special Requests or Intentions (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Let us know if you have any physical injuries, are pregnant, or would like to share your intention for the practice..."
                    className="w-full px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-[20px] bg-eucalyptus text-ivory font-sans text-xs tracking-widest uppercase hover:bg-sage hover:text-charcoal shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer"
                >
                  Book Your First Class
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Gorgeous Mindfulness Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-charcoal/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-ivory rounded-[32px] border border-stone/30 p-8 md:p-12 max-w-xl w-full text-center relative shadow-2xl"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>

              {/* Success Header */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-eucalyptus stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-charcoal mb-2">
                  Your sanctuary is reserved
                </h3>
                <p className="text-xs text-charcoal/60 font-sans tracking-wide">
                  A confirmation email has been sent to <span className="font-medium text-charcoal">{formData.email}</span>
                </p>
              </div>

              {/* Mindful Breath Animation Container */}
              <div className="bg-sand/40 border border-stone/20 rounded-[24px] p-6 md:p-8 mb-8 flex flex-col items-center">
                <span className="text-[10px] tracking-[0.2em] uppercase text-eucalyptus font-sans font-semibold mb-6 block">
                  A Moment of Presence
                </span>

                {/* Circle that expands and contracts based on breathPhase */}
                <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                  {/* Breathing Circle */}
                  <div
                    className={`absolute rounded-full transition-all duration-[4000ms] ease-in-out ${
                      breathPhase === "Inhale"
                        ? "w-36 h-36 bg-sage/35"
                        : breathPhase === "Hold"
                        ? "w-36 h-36 bg-eucalyptus/30 scale-105"
                        : "w-20 h-20 bg-sage/20 scale-90"
                    }`}
                  />
                  {/* Text inside */}
                  <span className="relative font-serif text-lg font-light text-charcoal tracking-wider">
                    {breathPhase}
                  </span>
                </div>

                {/* Counter indicator */}
                <span className="text-xs text-charcoal/50 font-sans tracking-widest uppercase">
                  {breathCounter}s
                </span>
                <p className="text-xs text-charcoal/60 font-sans font-light mt-4 max-w-xs leading-relaxed">
                  Take a slow breath with us. Practice this 4-second box breath to align your mind with your body.
                </p>
              </div>

              {/* Details of booking */}
              <div className="border-t border-stone/20 pt-6 text-xs text-charcoal/70 font-sans space-y-2 text-left max-w-xs mx-auto mb-8">
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Class:</span>
                  <span className="font-medium">{formData.className}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Guide:</span>
                  <span className="font-medium">{formData.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/50">Date &amp; Time:</span>
                  <span className="font-medium">
                    {formData.date} at {formData.timeSlot}
                  </span>
                </div>
              </div>

              {/* Return Button */}
              <button
                onClick={handleCloseModal}
                className="px-8 py-3 rounded-[20px] bg-eucalyptus text-ivory font-sans text-xs tracking-widest uppercase hover:bg-sage hover:text-charcoal transition-all duration-300 w-full cursor-pointer"
              >
                Return to Sanctuary
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
