import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Sparkles } from "lucide-react";

interface ClassItem {
  id: string;
  name: string;
  category: "yoga" | "meditation" | "breathwork";
  description: string;
  difficulty: "Beginner Friendly" | "Intermediate" | "All Levels";
  duration: string;
  instructor: string;
}

const CLASSES_DATA: ClassItem[] = [
  // Yoga Classes
  {
    id: "vinyasa",
    name: "Vinyasa Flow",
    category: "yoga",
    description: "A dynamic, fluid practice connecting conscious breath with creative movement sequences. Cultivates strength, flexibility, and moving mindfulness.",
    difficulty: "All Levels",
    duration: "60 mins",
    instructor: "Maya Rivers",
  },
  {
    id: "yin",
    name: "Yin Yoga & Sound",
    category: "yoga",
    description: "Deep, passive floor postures held for several minutes to release deep connective tissues, paired with gentle, calming crystal bowl sound healing.",
    difficulty: "Beginner Friendly",
    duration: "75 mins",
    instructor: "Soren Kael",
  },
  {
    id: "hatha",
    name: "Hatha & Alignment",
    category: "yoga",
    description: "A structured practice focusing on precision, foundational stability, and deep breath retention. Perfect for refining your physical alignment.",
    difficulty: "Intermediate",
    duration: "60 mins",
    instructor: "Elena Rostova",
  },
  {
    id: "ashtanga",
    name: "Ashtanga Foundations",
    category: "yoga",
    description: "A structured, energetic sequence of postures synchronized with deep breathing. Builds deep internal heat, purification, and mental focus.",
    difficulty: "Intermediate",
    duration: "75 mins",
    instructor: "Elena Rostova",
  },
  {
    id: "restorative",
    name: "Restorative Sanctuary",
    category: "yoga",
    description: "Gentle, supported postures using organic bolsters, blankets, and eye pillows to trigger the parasympathetic nervous system for cellular repair.",
    difficulty: "Beginner Friendly",
    duration: "60 mins",
    instructor: "Maya Rivers",
  },

  // Meditation Programs
  {
    id: "mindfulness",
    name: "Mindfulness & Presence",
    category: "meditation",
    description: "A foundational meditation practice utilizing sensory and breath awareness to anchor the mind, quieten mental chatter, and cultivate stable presence.",
    difficulty: "All Levels",
    duration: "45 mins",
    instructor: "Soren Kael",
  },
  {
    id: "soundbath",
    name: "Sound Bath Journey",
    category: "meditation",
    description: "Vibrational acoustic therapy using custom quartz singing bowls, planetary gongs, and chimes to ease brain waves into deep meditative alpha-theta states.",
    difficulty: "All Levels",
    duration: "60 mins",
    instructor: "Maya Rivers",
  },
  {
    id: "zen",
    name: "Zen Silent Meditation",
    category: "meditation",
    description: "Traditional seated silent meditation (Zazen) with posture guidance and breath counting, followed by a brief walking meditation (Kinhin).",
    difficulty: "Intermediate",
    duration: "45 mins",
    instructor: "Soren Kael",
  },
  {
    id: "metta",
    name: "Loving-Kindness (Metta)",
    category: "meditation",
    description: "Heart-centered meditation focused on cultivating compassion, radiating gentle energy and kindness to oneself, loved ones, and the wider world.",
    difficulty: "All Levels",
    duration: "45 mins",
    instructor: "Elena Rostova",
  },

  // Breathwork Sessions
  {
    id: "pranayama",
    name: "Pranayama Breath",
    category: "breathwork",
    description: "Ancient yogic breath expansion techniques to balance vital energy channels, calm the mind, and oxygenate the brain for heightened awareness.",
    difficulty: "All Levels",
    duration: "45 mins",
    instructor: "Elena Rostova",
  },
  {
    id: "somatic",
    name: "Somatic Release",
    category: "breathwork",
    description: "Active, continuous circular breathing to bypass the analytical mind, release stored emotional tension, and access deep somatic clarity.",
    difficulty: "Intermediate",
    duration: "60 mins",
    instructor: "Soren Kael",
  },
  {
    id: "boxbreathing",
    name: "Box Breathing & Focus",
    category: "breathwork",
    description: "A highly structured, calming technique used to regulate the autonomic nervous system, decrease stress, and sharpen cognitive clarity.",
    difficulty: "All Levels",
    duration: "30 mins",
    instructor: "Maya Rivers",
  },
];

interface ClassesProps {
  onSelectBooking: (booking: { category: string; className: string; instructor: string }) => void;
}

export default function Classes({ onSelectBooking }: ClassesProps) {
  const [activeTab, setActiveTab] = useState<"all" | "yoga" | "meditation" | "breathwork">("all");

  const filteredClasses =
    activeTab === "all"
      ? CLASSES_DATA
      : CLASSES_DATA.filter((item) => item.category === activeTab);

  const handleBookClass = (item: ClassItem) => {
    onSelectBooking({
      category: item.category,
      className: item.name,
      instructor: item.instructor,
    });
  };

  return (
    <section
      id="classes"
      className="py-24 md:py-32 bg-ivory text-charcoal relative overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-stone/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
            Our Offerings
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
            Mindful practices tailored to your journey
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
            Whether you seek physical release, mental stillness, or deep somatic healing, our curated classes are held in intimate groups to ensure personalized guidance.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {(["all", "yoga", "meditation", "breathwork"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-[20px] text-xs tracking-widest uppercase font-sans transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-eucalyptus text-ivory shadow-sm"
                  : "bg-stone/20 text-charcoal/80 hover:bg-stone/40"
              }`}
            >
              {tab === "all" ? "All Offerings" : tab}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredClasses.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-ivory border border-stone/30 rounded-[24px] p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-sage/60 transition-all duration-500 transform hover:scale-[1.01] group relative overflow-hidden"
              >
                {/* Subtle light background highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] tracking-widest uppercase text-eucalyptus px-3 py-1 bg-sage/10 rounded-full font-sans">
                      {item.category}
                    </span>
                    <span className="text-xs text-charcoal/50 font-sans flex items-center">
                      <Sparkles className="w-3.5 h-3.5 text-clay/70 mr-1 stroke-[1.5]" />
                      {item.difficulty}
                    </span>
                  </div>

                  {/* Class Name */}
                  <h3 className="font-serif text-2xl font-light tracking-wide text-charcoal mb-4 group-hover:text-eucalyptus transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-charcoal/70 font-sans font-light leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer Details */}
                <div>
                  <div className="flex items-center justify-between border-t border-stone/20 pt-6 mb-6 text-xs text-charcoal/60 font-sans">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5 stroke-[1.2] text-clay" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1.5 stroke-[1.2] text-clay" />
                      <span>{item.instructor}</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handleBookClass(item)}
                    className="w-full py-3 rounded-[20px] bg-stone/20 text-charcoal hover:bg-eucalyptus hover:text-ivory font-sans text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
                  >
                    Book Class
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
