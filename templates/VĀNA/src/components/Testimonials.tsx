import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  duration: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    quote: "Walking into Vāna feels like an immediate exhale. The natural oak wood, the subtle aroma of cedarwood, and the warm, diffused lighting take away the stress of my day before I even step onto my mat. It's a masterpiece of a studio.",
    author: "Sophia Chen",
    role: "Creative Director",
    duration: "Member for 2 years",
  },
  {
    id: "t2",
    quote: "Soren's Somatic Breathwork sessions have completely shifted my relationship with anxiety. He guides with such deep calm and safety. Vāna is not just a yoga studio; it is a profound sanctuary for self-discovery.",
    author: "David Vance",
    role: "Software Architect",
    duration: "Member for 10 months",
  },
  {
    id: "t3",
    quote: "I was intimidated by yoga as a complete beginner, but the Small Group Sessions and welcoming instructors at Vāna made me feel instantly at ease. The Hatha classes are structured with such care and precision.",
    author: "Elena Rostova", // user of the studio
    role: "Landscape Architect",
    duration: "Member for 1 year",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-stone/10 text-charcoal relative overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-stone/20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Quote Icon */}
        <Quote className="w-12 h-12 text-sage/40 mx-auto mb-8 stroke-[1]" />

        {/* Testimonial Slider */}
        <div className="min-h-[250px] md:min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-6"
            >
              <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed text-charcoal/90">
                "{TESTIMONIALS_DATA[currentIndex].quote}"
              </p>

              <div>
                <h4 className="font-sans text-sm tracking-widest uppercase text-eucalyptus font-semibold">
                  {TESTIMONIALS_DATA[currentIndex].author}
                </h4>
                <p className="text-xs text-charcoal/50 font-sans tracking-wider mt-1">
                  {TESTIMONIALS_DATA[currentIndex].role} • {TESTIMONIALS_DATA[currentIndex].duration}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center space-x-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-stone/30 text-charcoal hover:bg-eucalyptus hover:text-ivory transition-colors duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-eucalyptus" : "bg-stone/50"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-stone/30 text-charcoal hover:bg-eucalyptus hover:text-ivory transition-colors duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
