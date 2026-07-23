import { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { KolamDivider } from './KolamDivider';
import { CalendarDays, Clock, Users, Phone, Check } from 'lucide-react';

export function Reservation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <SectionWrapper id="reserve" className="py-20 md:py-28 px-6" bg="ivory-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-subtitle">Book Your Experience</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Reserve Your <span className="italic text-terracotta">Table</span>
          </h2>
          <KolamDivider />
          <p className="text-warm-gray max-w-xl mx-auto leading-relaxed mt-4">
            We recommend reservations for weekends and holidays. 
            Walk-ins are welcome subject to availability.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-warm-white rounded-2xl p-8 shadow-sm border border-brass/10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-leaf/10 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-leaf" />
                  </div>
                  <h3 className="font-serif text-2xl text-brown-dark mb-2">Reservation Received!</h3>
                  <p className="text-warm-gray">We'll confirm your booking via phone shortly. Thank you!</p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-brass/15 text-brown-dark placeholder:text-warm-gray-light focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-brass/15 text-brown-dark placeholder:text-warm-gray-light focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1.5">
                        <CalendarDays size={14} className="inline mr-1" />
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-brass/15 text-brown-dark focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1.5">
                        <Clock size={14} className="inline mr-1" />
                        Time
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-brass/15 text-brown-dark focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm"
                      >
                        <option value="">Select time</option>
                        <option>7:00 AM</option>
                        <option>8:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>7:00 PM</option>
                        <option>8:00 PM</option>
                        <option>9:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-dark mb-1.5">
                        <Users size={14} className="inline mr-1" />
                        Guests
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-brass/15 text-brown-dark focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm"
                      >
                        <option value="">How many?</option>
                        <option>1-2 guests</option>
                        <option>3-4 guests</option>
                        <option>5-6 guests</option>
                        <option>7-10 guests</option>
                        <option>10+ guests</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-brown-dark mb-1.5">Special Requests</label>
                    <textarea
                      rows={3}
                      placeholder="Any dietary requirements or special occasion?"
                      className="w-full px-4 py-3 rounded-xl bg-ivory border border-brass/15 text-brown-dark placeholder:text-warm-gray-light focus:outline-none focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 transition-all text-sm resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Confirm Reservation
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-warm-white rounded-2xl p-6 border border-brass/10">
              <h4 className="font-serif text-lg text-brown-dark font-semibold mb-4">Quick Booking</h4>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 bg-terracotta/5 rounded-xl p-4 group hover:bg-terracotta/10 transition-colors mb-3"
              >
                <div className="w-10 h-10 rounded-full bg-terracotta/15 flex items-center justify-center">
                  <Phone size={18} className="text-terracotta" />
                </div>
                <div>
                  <span className="text-sm text-brown-dark font-medium block">Call Us Directly</span>
                  <span className="text-terracotta font-semibold">+91 98765 43210</span>
                </div>
              </a>
              <p className="text-xs text-warm-gray-light">
                For same-day reservations, please call us directly.
              </p>
            </div>

            <div className="bg-warm-white rounded-2xl p-6 border border-brass/10">
              <h4 className="font-serif text-lg text-brown-dark font-semibold mb-3">Good to Know</h4>
              <ul className="space-y-3 text-sm text-warm-gray">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mt-1.5 flex-shrink-0" />
                  We hold reservations for 15 minutes past booking time
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mt-1.5 flex-shrink-0" />
                  Groups of 10+ can enjoy a private dining area
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mt-1.5 flex-shrink-0" />
                  High chairs available for children
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mt-1.5 flex-shrink-0" />
                  Wheelchair accessible entrance and restrooms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
