import React from "react";
import { motion } from "framer-motion";
import { Instagram, Compass } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
  image: string;
  specialties: string[];
}

const INSTRUCTORS_DATA: Instructor[] = [
  {
    id: "maya",
    name: "Maya Rivers",
    role: "Lead Yoga & Sound Practitioner",
    bio: "With over 12 years of teaching across Japan, India, and Bali, Maya fuses gentle structural alignment with meditative soundscapes. She believes that yoga is not about flexibility of the body, but flexibility of the mind.",
    quote: "The breath is the bridge between the physical and the spiritual. By tuning into it, we tune into ourselves.",
    image: "/images/instructor-1.jpg",
    specialties: ["Vinyasa Flow", "Restorative Yoga", "Sound Bath Therapy"],
  },
  {
    id: "soren",
    name: "Soren Kael",
    role: "Meditation & Somatic Guide",
    bio: "Soren spent three years studying Zen meditation in Kyoto before returning to share somatic release techniques. His sessions focus on emotional integration, quietening the mind, and finding peace in silence.",
    quote: "Stillness is not the absence of sound, but the presence of deep listening.",
    image: "/images/instructor-2.jpg",
    specialties: ["Zen Meditation", "Somatic Breathwork", "Yin Yoga"],
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Pranayama & Hatha Acharya",
    bio: "Elena holds a Master's degree in Yogic Sciences from Rishikesh. Her teaching is rooted in the rich traditions of classical Hatha, integrating ancient Pranayama (breath control) with modern biomechanics.",
    quote: "To control the breath is to calm the storm within. We practice on the mat to live with clarity off the mat.",
    image: "/images/instructor-3.jpg",
    specialties: ["Classical Hatha", "Pranayama Breathwork", "Ashtanga Foundations"],
  },
];

export default function Instructors() {
  return (
    <section
      id="instructors"
      className="py-24 md:py-32 bg-ivory text-charcoal relative overflow-hidden paper-texture"
    >
      {/* Subtle organic line illustration in background */}
      <div className="absolute top-0 right-10 opacity-15 pointer-events-none">
        <svg
          className="w-[400px] h-[400px] text-stone"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0 C 40 30, 10 40, 50 100 C 90 40, 60 30, 50 0"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
            Our Guides
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
            Meet our mindful practitioners
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
            Our instructors are lifelong students of mindfulness, holding deep respect for the lineages they teach. They are here to support your practice with patience, safety, and deep compassion.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {INSTRUCTORS_DATA.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Photo Container */}
              <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                {/* Overlay Quote on Hover */}
                <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-8 text-ivory">
                  <p className="font-serif italic text-base md:text-lg mb-4 leading-relaxed">
                    "{guide.quote}"
                  </p>
                  <span className="text-xs uppercase tracking-widest text-sand font-sans">
                    — {guide.name}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="font-serif text-2xl font-light tracking-wide text-charcoal mb-1">
                {guide.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-eucalyptus font-sans mb-4">
                {guide.role}
              </p>

              {/* Specialties Badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                {guide.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] tracking-wider uppercase text-charcoal/60 px-2.5 py-1 bg-stone/20 rounded-full font-sans"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Short Bio */}
              <p className="text-sm text-charcoal/70 font-sans font-light leading-relaxed mb-6">
                {guide.bio}
              </p>

              {/* Social Link */}
              <a
                href="#instagram"
                className="flex items-center space-x-2 text-xs uppercase tracking-widest text-clay hover:text-eucalyptus transition-colors duration-300 font-sans font-medium"
              >
                <Instagram className="w-4 h-4 stroke-[1.5]" />
                <span>Connect on Social</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
