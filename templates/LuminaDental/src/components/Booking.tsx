import { useReveal } from '../hooks/useReveal';
import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM',
];

const treatments = [
  'General Checkup & Cleaning',
  'Cosmetic Consultation',
  'Teeth Whitening',
  'Invisalign Consultation',
  'Dental Implants',
  'Emergency Visit',
  'Other',
];

export default function Booking() {
  const revealRef = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', treatment: '', notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-24 lg:py-32 bg-slate-50" aria-label="Book appointment">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-card shadow-card p-12 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-navy mb-3">Appointment Requested!</h3>
            <p className="text-slate-600 leading-relaxed">
              Thank you, {formData.name}! We'll confirm your appointment for <strong>{formData.date}</strong> at <strong>{formData.time}</strong> via email shortly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 lg:py-32 bg-slate-50" aria-label="Book appointment">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={revealRef} className="reveal">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                Book Now
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
                Schedule your <span className="gradient-text">visit</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                Choose a convenient time and we'll have everything ready for you. New patients receive a complimentary consultation.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Clock, label: 'Working Hours', value: 'Mon–Fri: 8am–6pm\nSat: 9am–3pm' },
                  { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
                  { icon: Mail, label: 'Email', value: 'hello@luminadental.com' },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <info.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">{info.label}</p>
                      <p className="text-slate-500 text-sm whitespace-pre-line">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-card p-8 lg:p-10 border border-gray-100">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="name" name="name" type="text" required
                        value={formData.name} onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full pl-10 pr-4 py-3 rounded-btn-sm border border-gray-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="john@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-btn-sm border border-gray-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="phone" name="phone" type="tel" required
                        value={formData.phone} onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 rounded-btn-sm border border-gray-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Treatment */}
                  <div>
                    <label htmlFor="treatment" className="block text-sm font-semibold text-slate-700 mb-2">
                      Treatment
                    </label>
                    <div className="relative">
                      <MessageSquare size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        id="treatment" name="treatment" required
                        value={formData.treatment} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-btn-sm border border-gray-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all bg-white appearance-none text-slate-700"
                      >
                        <option value="">Select treatment</option>
                        {treatments.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="date" name="date" type="date" required
                        value={formData.date} onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-btn-sm border border-gray-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-sm font-semibold text-slate-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      id="time" name="time" required
                      value={formData.time} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-btn-sm border border-gray-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all bg-white appearance-none text-slate-700"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    id="notes" name="notes" rows={3}
                    value={formData.notes} onChange={handleChange}
                    placeholder="Any concerns or questions..."
                    className="w-full px-4 py-3 rounded-btn-sm border border-gray-200 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-btn bg-teal-500 text-white font-semibold text-base hover:bg-teal-600 transition-all duration-300 shadow-glow hover:shadow-lg btn-press"
                >
                  Confirm Appointment
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  We'll send a confirmation email within 30 minutes during business hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
