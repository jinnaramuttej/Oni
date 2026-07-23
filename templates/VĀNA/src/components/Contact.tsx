import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-ivory text-charcoal relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Side: Contact Details & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <span className="text-xs tracking-[0.3em] uppercase text-eucalyptus mb-3 block font-sans">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight">
                We welcome you home
              </h2>
              <p className="text-sm md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
                Whether you have questions about class levels, wish to tour the studio, or want to coordinate a private event, we are here to support you.
              </p>
            </div>

            {/* Direct Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-eucalyptus stroke-[1.5] mt-0.5" />
                <div className="text-sm font-sans font-light">
                  <h4 className="font-serif font-semibold text-charcoal">Vāna Studio Sanctuary</h4>
                  <p className="text-charcoal/70 mt-1">
                    108 Birchwood Grove Way, Suite 400<br />
                    Portland, Oregon 97201
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-eucalyptus stroke-[1.5] mt-0.5" />
                <div className="text-sm font-sans font-light">
                  <h4 className="font-serif font-semibold text-charcoal">Call Us</h4>
                  <p className="text-charcoal/70 mt-1">+1 (503) 555-0142</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-eucalyptus stroke-[1.5] mt-0.5" />
                <div className="text-sm font-sans font-light">
                  <h4 className="font-serif font-semibold text-charcoal">Write Us</h4>
                  <p className="text-charcoal/70 mt-1">presence@vanawellness.com</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="border-t border-stone/20 pt-8 space-y-4">
              <h4 className="font-serif text-base font-normal flex items-center">
                <Clock className="w-5 h-5 text-eucalyptus stroke-[1.5] mr-2" />
                <span>Sanctuary Hours</span>
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs tracking-wider text-charcoal/70 font-sans uppercase">
                <div>
                  <span className="block font-medium text-charcoal">Weekdays</span>
                  <span className="block text-[11px] text-charcoal/50 mt-1">06:30 AM – 21:00 PM</span>
                </div>
                <div>
                  <span className="block font-medium text-charcoal">Weekends</span>
                  <span className="block text-[11px] text-charcoal/50 mt-1">08:00 AM – 19:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Map & Newsletter */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            {/* Interactive Map Placeholder (Beautiful Sand-Colored Mock Map) */}
            <div className="relative rounded-[24px] overflow-hidden border border-stone/30 h-[300px] md:h-[380px] shadow-sm bg-sand/20 group">
              {/* Artistic map background using simple SVGs */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full text-stone" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" />
                  <line x1="40%" y1="0%" x2="40%" y2="100%" stroke="currentColor" strokeWidth="1" />
                  <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="currentColor" strokeWidth="1" />
                  <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="1" />
                  <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="currentColor" strokeWidth="1" />
                  <circle cx="40%" cy="70%" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                  <path d="M 0,150 Q 250,50 500,150 T 1000,150" fill="none" stroke="#7F9172" strokeWidth="2" opacity="0.3" />
                </svg>
              </div>

              {/* Map Marker */}
              <div className="absolute top-[70%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative">
                  {/* Pulsing ring */}
                  <div className="absolute top-0 left-0 w-8 h-8 bg-eucalyptus/30 rounded-full animate-ping -translate-x-2 -translate-y-2" />
                  {/* Pin */}
                  <div className="w-4 h-4 bg-eucalyptus rounded-full border-2 border-ivory shadow-md" />
                </div>
                {/* Marker Label */}
                <div className="bg-ivory border border-stone/30 px-3 py-1.5 rounded-[12px] shadow-md mt-2 whitespace-nowrap">
                  <span className="text-[10px] tracking-widest uppercase font-sans font-semibold text-charcoal">
                    Vāna Sanctuary
                  </span>
                </div>
              </div>

              {/* Map Controls Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 bg-ivory/90 backdrop-blur-md border border-stone/30 p-4 rounded-[16px] flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[9px] tracking-widest uppercase text-charcoal/50 font-sans block">
                    Location
                  </span>
                  <span className="text-xs text-charcoal font-sans">
                     Birchwood Grove Way, Portland
                  </span>
                </div>
                <button
                  onClick={() => window.open("https://maps.google.com", "_blank")}
                  className="px-4 py-2 rounded-[12px] bg-eucalyptus text-ivory text-[10px] tracking-wider uppercase font-sans hover:bg-sage hover:text-charcoal transition-colors duration-300 cursor-pointer"
                >
                  Get Directions
                </button>
              </div>
            </div>

            {/* Newsletter Signup ("Join the Vāna Circle") */}
            <div className="bg-sand/30 border border-stone/30 rounded-[24px] p-8 shadow-sm">
              <h4 className="font-serif text-xl font-light text-charcoal mb-2">
                Join the Vāna Circle
              </h4>
              <p className="text-xs text-charcoal/70 font-sans font-light leading-relaxed mb-6">
                Receive mindful essays, breathing techniques, notice of seasonal retreats, and early booking access for specialized workshops. We write with intention, rarely and peacefully.
              </p>

              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3"
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 rounded-[16px] bg-ivory border border-stone/30 focus:border-eucalyptus focus:outline-none text-sm font-sans transition-colors duration-300"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-[16px] bg-eucalyptus text-ivory font-sans text-xs tracking-widest uppercase hover:bg-sage hover:text-charcoal transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3 text-eucalyptus"
                  >
                    <CheckCircle className="w-5 h-5 stroke-[2]" />
                    <span className="text-xs tracking-wider uppercase font-sans font-medium">
                      Welcome to the circle. We will write soon.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
