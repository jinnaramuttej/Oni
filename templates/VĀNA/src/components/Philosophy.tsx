import React from "react";
import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="py-24 md:py-32 bg-ivory text-charcoal relative overflow-hidden paper-texture"
    >
      {/* Background Soft Organic Curves */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg
          className="absolute right-0 top-10 w-96 h-96 text-stone"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 80 C 40 10, 60 10, 90 80"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <path
            d="M20 75 C 45 20, 55 20, 80 75"
            stroke="currentColor"
            strokeWidth="0.25"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute left-10 bottom-10 w-72 h-72 text-stone"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 50 C 30 20, 70 20, 90 50"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide max-w-2xl leading-tight">
            Designed for stillness. Engineered for modern life.
          </h2>
        </div>

        {/* Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-charcoal/80 font-sans font-light leading-relaxed text-base md:text-lg"
            >
              <p>
                At Vāna, we believe true wellness lies in the harmony between
                simplicity and presence. Inspired by the Japanese art of{" "}
                <span className="italic font-serif text-charcoal font-normal">
                  Ma
                </span>{" "}
                (the negative space that gives shape to life) and the
                Scandinavian concept of{" "}
                <span className="italic font-serif text-charcoal font-normal">
                  Hygge
                </span>{" "}
                (cozy, warm contentment), we have designed a sanctuary where
                you can step away from the clutter of daily demands.
              </p>
              <p>
                Our physical space honors natural raw materials—unfinished oak,
                textured limestone, linen drapery, and soft moss accents. It is
                an architectural breath of fresh air, bathed in natural diffused
                daylight, bringing the peacefulness of nature indoors.
              </p>
              <p>
                We do not promise quick fixes or performance-driven achievements.
                Instead, we offer an invitation to slow down, practice with
                intention, and cultivate a deep, resonant peace that carries
                into your everyday life.
              </p>
            </motion.div>

            {/* Botanical decorative illustration inline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="pt-4 flex items-center space-x-4"
            >
              <svg
                className="w-12 h-12 text-sage stroke-[1]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C12 2 12 10 4 12C12 14 12 22 12 22C12 22 12 14 20 12C12 10 12 2 12 2Z" />
                <path d="M12 7C12 7 10 12 7 12C10 12 12 12 12 17C12 17 14 12 17 12C14 12 12 12 12 7Z" />
              </svg>
              <div>
                <h4 className="font-serif text-charcoal text-base font-normal tracking-wide">
                  Intentional Spaces, Guided Growth
                </h4>
                <p className="text-xs text-charcoal/60 font-sans tracking-wide">
                  Every material, scent, and sound is chosen with purpose.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Beautiful Studio Interior Image with Floating Card */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[24px] overflow-hidden shadow-md group"
            >
              <img
                src="/images/studio-interior.jpg"
                alt="Vāna Minimalist Wooden Yoga Studio"
                className="w-full h-[380px] md:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </motion.div>

            {/* Floating Warm Sand Colored Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -left-4 md:-left-8 bg-sand p-6 md:p-8 rounded-[20px] shadow-lg max-w-xs md:max-w-sm border border-stone/30"
            >
              <p className="font-serif text-base md:text-lg italic text-charcoal/90 leading-relaxed mb-4">
                "In the middle of movement and chaos, keep stillness inside of you."
              </p>
              <span className="text-xs uppercase tracking-widest text-eucalyptus font-sans block">
                — Deepak Chopra
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
