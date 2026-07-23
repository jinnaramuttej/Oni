import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Compass, ArrowRight } from "lucide-react";

interface RetreatItem {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  highlights: string[];
  image: string;
  price: string;
}

const RETREATS_DATA: RetreatItem[] = [
  {
    id: "kyoto",
    title: "Kyoto Silent Forest Sanctuary",
    location: "Arashiyama, Kyoto, Japan",
    date: "October 12 – 18, 2025",
    description: "Deeply restorative silent retreat. Immerse yourself in daily Zen meditation, morning forest bathing (Shinrin-yoku), traditional tea rituals, and gentle Yin yoga inside a historic wooden temple.",
    highlights: ["Silent Meditation", "Traditional Tea Rituals", "Forest Bathing", "Organic Shojin Ryori Cuisine"],
    image: "/images/retreat.jpg", // our fetched forest cabin image
    price: "$2,850",
  },
  {
    id: "nordic",
    title: "Nordic Winter Solstice Silence",
    location: "Lofoten Islands, Norway",
    date: "December 18 – 23, 2025",
    description: "Align with the slow rhythms of the northern winter. Silent meditation under the Northern Lights, cold plunge therapy, outdoor cedar sauna sessions, and deep somatic breathwork.",
    highlights: ["Aurora Meditation", "Cold Plunge & Sauna", "Somatic Breathwork", "Fireside Wisdom Circles"],
    image: "/images/studio-interior.jpg", // high quality backup interior
    price: "$3,200",
  },
];

export default function Retreats() {
  return (
    <section
      id="retreats"
      className="py-24 md:py-32 bg-stone/10 text-charcoal relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-sage/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-clay/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
            Wellness Retreats
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
            Immersive journeys into stillness
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
            Our premium, all-inclusive retreats offer an escape from the noise of modern life. Reconnect with nature, experience ancient mindfulness rituals, and bond with a community of intentional souls.
          </p>
        </div>

        {/* Retreats Layout */}
        <div className="space-y-16 md:space-y-24">
          {RETREATS_DATA.map((retreat, index) => (
            <motion.div
              key={retreat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div
                className={`lg:col-span-6 relative rounded-[24px] overflow-hidden shadow-md group ${
                  index % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="w-full h-[320px] md:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="lg:col-span-6 space-y-6">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs tracking-wider text-charcoal/60 font-sans">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-eucalyptus stroke-[1.5]" />
                    <span>{retreat.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-eucalyptus stroke-[1.5]" />
                    <span>{retreat.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                  {retreat.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
                  {retreat.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs uppercase tracking-widest text-eucalyptus font-sans font-medium block">
                    Retreat Highlights:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-charcoal/80 font-sans font-light">
                    {retreat.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Compass className="w-3.5 h-3.5 text-clay stroke-[1.5]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between border-t border-stone/30 pt-6 mt-8">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-charcoal/50 font-sans block">
                      All-Inclusive Pricing From
                    </span>
                    <span className="font-serif text-2xl font-light text-charcoal">
                      {retreat.price}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const subject = encodeURIComponent(`Inquiry for ${retreat.title}`);
                      window.location.href = `#booking?subject=${subject}`;
                      const el = document.getElementById("booking");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 rounded-[20px] bg-eucalyptus text-ivory font-sans text-xs tracking-widest uppercase hover:bg-sage hover:text-charcoal shadow-sm transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
