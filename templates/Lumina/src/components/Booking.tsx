import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

const treatmentOptions = [
  'General Checkup',
  'Teeth Whitening',
  'Invisalign Consultation',
  'Dental Implants',
  'Cosmetic Dentistry',
  'Emergency Visit',
  'Pediatric Dentistry',
  'Other',
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM',
];

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-gradient-to-br from-navy via-navy-dark to-navy relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-teal-primary/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection>
              <span className="text-teal-light text-sm font-semibold tracking-wider uppercase">Book an Appointment</span>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
                Your Perfect Smile{' '}
                <span className="text-teal-light">Starts Here</span>
              </h2>
              <p className="mt-4 text-lg text-white/60 leading-relaxed">
                Schedule your visit online in just a few steps. Choose your preferred time, and we'll confirm within 2 hours.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="space-y-4">
                {[
                  { icon: Calendar, text: 'Same-day appointments available' },
                  { icon: Clock, text: 'Evening & weekend hours' },
                  { icon: CheckCircle2, text: 'Insurance verification included' },
                  { icon: Phone, text: 'Free initial consultation' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-teal-light" />
                    </div>
                    <span className="text-white/70 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/80 text-sm">
                  <span className="text-teal-light font-semibold">Need immediate help?</span>
                  <br />Call us at <a href="tel:+18005551234" className="text-teal-light hover:text-teal-primary font-semibold transition-colors">(800) 555-1234</a>
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Booking Form */}
          <AnimatedSection delay={100} className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-[24px] p-8 sm:p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-teal-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-teal-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy mb-3">Appointment Requested!</h3>
                <p className="text-slate-text/70 mb-6 max-w-sm mx-auto">
                  We've received your booking request. Our team will confirm your appointment via email within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-teal-primary text-white font-semibold rounded-2xl hover:bg-teal-600 transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-6 sm:p-10 shadow-2xl">
                <h3 className="font-heading text-xl font-bold text-navy mb-6">Schedule Your Visit</h3>

                <div className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="name">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="John Smith"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-light-bg text-navy text-sm focus:outline-none focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="phone">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="(555) 123-4567"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-light-bg text-navy text-sm focus:outline-none focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="email">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-light-bg text-navy text-sm focus:outline-none focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Treatment type */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="treatment">Treatment Type</label>
                    <select
                      id="treatment"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-light-bg text-navy text-sm focus:outline-none focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a treatment</option>
                      {treatmentOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Preferred Time</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {timeSlots.slice(0, 10).map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={cn(
                            'px-3 py-2 rounded-xl text-xs font-medium border transition-all',
                            selectedTime === slot
                              ? 'bg-teal-primary text-white border-teal-primary shadow-md shadow-teal-primary/20'
                              : 'bg-light-bg border-gray-200 text-slate-text hover:border-teal-primary/30'
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="message">Additional Notes <span className="text-slate-text/40 font-normal">(optional)</span></label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-text/40" />
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="Any concerns or preferences we should know about..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-light-bg text-navy text-sm focus:outline-none focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/10 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-teal-primary text-white font-semibold rounded-2xl hover:bg-teal-600 shadow-lg shadow-teal-primary/25 hover:shadow-xl hover:shadow-teal-primary/30 transition-all duration-300 hover:-translate-y-0.5 text-base"
                  >
                    Request Appointment
                  </button>

                  <p className="text-xs text-slate-text/50 text-center">
                    By submitting, you agree to our privacy policy. We'll confirm within 2 hours.
                  </p>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
