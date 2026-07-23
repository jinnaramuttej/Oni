import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Award, Users, ShieldCheck } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Fullscreen Background Photo with soft natural light */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-yoga.jpg"
          alt="Peaceful morning yoga during sunrise"
          className="w-full h-full object-cover opacity-60 scale-105"
          style={{ transformOrigin: "center" }}
        />
        {/* Soft natural diffused gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/50 to-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/30" />
      </div>

      {/* Floating Ambient Decorative Motion (extremely subtle) */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-sage/10 blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] rounded-full bg-clay/10 blur-[120px]"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-ivory pt-24 flex flex-col items-center">
        {/* Small subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.3em] uppercase text-sand mb-6"
        >
          A Sanctuary for Mindful Living
        </motion.span>

        {/* Large Calming Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.15] max-w-4xl mb-8"
        >
          Slow down, breathe, and <span className="italic">reconnect</span>
        </motion.h1>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-ivory/80 font-sans font-light tracking-wide max-w-2xl leading-relaxed mb-12"
        >
          Vāna brings together Japanese minimalism and Scandinavian warmth to create a deeply intentional space. Through yoga, meditation, and somatic breathwork, we invite you to find balance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-20"
        >
          <button
            onClick={() => onNavigate("booking")}
            className="w-full sm:w-auto px-8 py-4 rounded-[20px] bg-sage text-charcoal font-sans text-xs tracking-widest uppercase hover:bg-ivory hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
          >
            Book Your First Class
          </button>
          <button
            onClick={() => onNavigate("classes")}
            className="w-full sm:w-auto px-8 py-4 rounded-[20px] bg-transparent border border-ivory/30 text-ivory font-sans text-xs tracking-widest uppercase hover:bg-ivory/10 transition-all duration-500 cursor-pointer"
          >
            Explore Classes
          </button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-ivory/10 pt-8 w-full max-w-3xl text-ivory/70"
        >
          <div className="flex items-center justify-center space-x-3">
            <Award className="w-5 h-5 text-sand stroke-[1.2]" />
            <span className="text-xs tracking-wider uppercase font-sans">
              Certified Instructors
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Users className="w-5 h-5 text-sand stroke-[1.2]" />
            <span className="text-xs tracking-wider uppercase font-sans">
              Beginner Friendly
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-sand stroke-[1.2]" />
            <span className="text-xs tracking-wider uppercase font-sans">
              Small Group Sessions
            </span>
          </div>
        </motion.div>
      </div>

      {/* Gentle Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/40 mb-2 font-sans font-light">
          Scroll to Begin
        </span>
        <motion.button
          onClick={() => onNavigate("philosophy")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-ivory/60 hover:text-sand transition-colors cursor-pointer"
        >
          <ArrowDown className="w-4 h-4 stroke-[1.5]" />
        </motion.button>
      </div>
    </section>
  );
}
