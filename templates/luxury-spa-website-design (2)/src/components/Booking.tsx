import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import { IMAGES } from '../data/content';

export default function Booking() {
  return (
    <section id="booking" className="py-24 md:py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Form */}
          <div>
            <FadeIn>
              <span className="inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase text-champagne mb-4">
                Book Your Visit
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal leading-tight mb-4">
                Begin Your Journey
              </h2>
              <p className="text-charcoal-light text-base font-light leading-relaxed mb-10 max-w-md">
                Reserve your treatment or consultation. Our concierge team will confirm your booking and prepare a personalized welcome.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-charcoal-light tracking-wide mb-2 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your first name"
                      className="w-full px-5 py-3.5 rounded-[16px] bg-white border border-stone-light/60 text-charcoal text-sm font-light placeholder:text-stone focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-light tracking-wide mb-2 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your last name"
                      className="w-full px-5 py-3.5 rounded-[16px] bg-white border border-stone-light/60 text-charcoal text-sm font-light placeholder:text-stone focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-charcoal-light tracking-wide mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 rounded-[16px] bg-white border border-stone-light/60 text-charcoal text-sm font-light placeholder:text-stone focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-charcoal-light tracking-wide mb-2 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-3.5 rounded-[16px] bg-white border border-stone-light/60 text-charcoal text-sm font-light placeholder:text-stone focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all duration-300"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-charcoal-light tracking-wide mb-2 font-medium">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-5 py-3.5 rounded-[16px] bg-white border border-stone-light/60 text-charcoal text-sm font-light focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal-light tracking-wide mb-2 font-medium">
                      Treatment Type
                    </label>
                    <select className="w-full px-5 py-3.5 rounded-[16px] bg-white border border-stone-light/60 text-charcoal text-sm font-light focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all duration-300 appearance-none">
                      <option value="">Select treatment</option>
                      <option>Signature Journey</option>
                      <option>Massage Therapy</option>
                      <option>Facial Treatment</option>
                      <option>Body Therapy</option>
                      <option>Aromatherapy</option>
                      <option>Spa Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-charcoal-light tracking-wide mb-2 font-medium">
                    Special Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any preferences, allergies, or special requests..."
                    className="w-full px-5 py-3.5 rounded-[16px] bg-white border border-stone-light/60 text-charcoal text-sm font-light placeholder:text-stone focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne/20 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-champagne text-white py-4 rounded-[20px] text-sm font-medium tracking-wide hover:bg-champagne-dark transition-all duration-500 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Request Booking
                </motion.button>

                <p className="text-xs text-center text-stone font-light">
                  Our concierge will confirm your reservation within 2 hours
                </p>
              </form>
            </FadeIn>
          </div>

          {/* Image */}
          <FadeIn direction="right">
            <div className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl hidden lg:block">
              <img
                src={IMAGES.bath}
                alt="Relaxing spa bath experience"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
