import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, User, Users, ArrowRight } from 'lucide-react';

const classOptions = ['Gentle Flow', 'Hatha Restore', 'Sunrise Vinyasa', 'Yin & Sound', 'Power Align', 'Prenatal Peace'];
const instructorOptions = ['Maya Chen', 'James Okonkwo', 'Sofia Rivera', 'Lena Park', 'David Torres'];
const timeOptions = ['6:30 AM', '7:00 AM', '9:00 AM', '9:30 AM', '12:00 PM', '5:30 PM', '7:00 PM', '7:30 PM'];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    class: '',
    instructor: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canNext = () => {
    if (step === 1) return formData.class && formData.instructor;
    if (step === 2) return formData.date && formData.time;
    if (step === 3) return formData.name && formData.email;
    return true;
  };

  return (
    <section id="booking" className="py-24 md:py-32 px-6 lg:px-10 bg-sand/30">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-[0.75rem] uppercase tracking-[0.2em] text-eucalyptus font-medium mb-4">
            Begin Your Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-charcoal font-light tracking-[-0.01em] leading-[1.15]">
            Book your first class.
          </h2>
          <p className="text-charcoal/50 mt-3 font-light">
            First class is on us. No commitment required.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  s <= step ? 'bg-eucalyptus text-ivory' : 'bg-stone/60 text-charcoal/40'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`w-10 h-px ${s < step ? 'bg-eucalyptus' : 'bg-stone/40'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-ivory rounded-[1.75rem] p-7 lg:p-10 border border-stone/20 shadow-[0_4px_24px_rgba(64,64,64,0.03)]">
          {/* Step 1: Class & Instructor */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-3">
                  <User size={15} className="text-eucalyptus" />
                  Select Class
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {classOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleChange('class', c)}
                      className={`text-left px-4 py-3 rounded-[16px] text-sm transition-all duration-300 border ${
                        formData.class === c
                          ? 'bg-eucalyptus text-ivory border-eucalyptus'
                          : 'bg-white border-stone/20 text-charcoal/60 hover:border-sage/40'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-3">
                  <Users size={15} className="text-eucalyptus" />
                  Preferred Instructor
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {instructorOptions.map((inst) => (
                    <button
                      key={inst}
                      onClick={() => handleChange('instructor', inst)}
                      className={`text-left px-4 py-3 rounded-[16px] text-sm transition-all duration-300 border ${
                        formData.instructor === inst
                          ? 'bg-eucalyptus text-ivory border-eucalyptus'
                          : 'bg-white border-stone/20 text-charcoal/60 hover:border-sage/40'
                      }`}
                    >
                      {inst}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-3">
                  <Calendar size={15} className="text-eucalyptus" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-5 py-3.5 rounded-[16px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-charcoal mb-3">
                  <Clock size={15} className="text-eucalyptus" />
                  Select Time
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {timeOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleChange('time', t)}
                      className={`px-3 py-2.5 rounded-[16px] text-xs transition-all duration-300 border ${
                        formData.time === t
                          ? 'bg-eucalyptus text-ivory border-eucalyptus'
                          : 'bg-white border-stone/20 text-charcoal/60 hover:border-sage/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-3.5 rounded-[16px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-3.5 rounded-[16px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-5 py-3.5 rounded-[16px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Notes (optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any injuries, concerns, or preferences we should know about..."
                  rows={3}
                  className="w-full px-5 py-3.5 rounded-[16px] border border-stone/20 bg-white text-charcoal text-sm focus:outline-none focus:border-eucalyptus/50 transition-colors placeholder:text-charcoal/30 resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone/20">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-sm font-medium text-charcoal/50 hover:text-charcoal transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => canNext() && setStep(step + 1)}
                disabled={!canNext()}
                className={`inline-flex items-center gap-2 px-7 py-3 text-sm font-medium rounded-[20px] transition-all duration-300 ${
                  canNext()
                    ? 'bg-eucalyptus text-ivory hover:bg-sage-dark shadow-[0_4px_16px_rgba(127,145,114,0.2)]'
                    : 'bg-stone/30 text-charcoal/30 cursor-not-allowed'
                }`}
              >
                Continue
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => alert('Thank you! We\'ll be in touch shortly to confirm your first class.')}
                disabled={!canNext()}
                className={`inline-flex items-center gap-2 px-7 py-3 text-sm font-medium rounded-[20px] transition-all duration-300 ${
                  canNext()
                    ? 'bg-eucalyptus text-ivory hover:bg-sage-dark shadow-[0_4px_16px_rgba(127,145,114,0.2)]'
                    : 'bg-stone/30 text-charcoal/30 cursor-not-allowed'
                }`}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
