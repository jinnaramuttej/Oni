import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import {
  Calendar, Clock, User, Phone, Mail, ChevronDown,
  CheckCircle2, Shield, Headphones
} from 'lucide-react';

const departments = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'Ophthalmology', 'Internal Medicine', 'Diagnostics', 'Dermatology',
  'General Checkup',
];

const benefits = [
  { icon: Calendar, text: 'Same-day appointment availability' },
  { icon: Shield, text: 'Insurance verification before visit' },
  { icon: Headphones, text: '24/7 patient support helpline' },
];

export default function Appointment() {
  const [ref, inView] = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="appointment" className="py-20 lg:py-28 bg-soft-gray" aria-labelledby="appointment-heading">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left content */}
          <div className={`lg:col-span-2 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
              <span className="w-8 h-px bg-teal" />
              Book Appointment
            </span>
            <h2 id="appointment-heading" className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-6 font-heading">
              Schedule Your{' '}
              <span className="text-teal">Visit Today</span>
            </h2>
            <p className="text-slate-text text-lg leading-relaxed mb-10">
              Book an appointment online in minutes. Our scheduling team will confirm
              your visit and prepare everything for a seamless experience.
            </p>

            {/* Benefits */}
            <div className="space-y-5">
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-mint rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-teal" />
                  </div>
                  <p className="text-slate-text font-medium">{text}</p>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="mt-10 hidden lg:block rounded-[var(--radius-card)] overflow-hidden shadow-card">
              <img
                src="https://images.pexels.com/photos/7659869/pexels-photo-7659869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                alt="Doctor consulting with a patient"
                className="w-full h-56 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-[24px] shadow-card border border-border-light p-8 sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
                  <div className="w-20 h-20 bg-mint rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy font-heading mb-3">Appointment Requested!</h3>
                  <p className="text-slate-text max-w-sm">
                    Our scheduling team will contact you within 30 minutes to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-xl font-bold text-navy font-heading mb-6">
                    Request an Appointment
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3.5 bg-soft-gray border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="(555) 123-4567"
                          className="w-full pl-11 pr-4 py-3.5 bg-soft-gray border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          className="w-full pl-11 pr-4 py-3.5 bg-soft-gray border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Department */}
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-navy mb-2">
                        Department
                      </label>
                      <div className="relative">
                        <select
                          id="department"
                          required
                          className="w-full appearance-none pl-4 pr-10 py-3.5 bg-soft-gray border border-border rounded-[var(--radius-btn)] text-navy focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Department</option>
                          {departments.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40 pointer-events-none" />
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-navy mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                        <input
                          id="date"
                          type="date"
                          required
                          className="w-full pl-11 pr-4 py-3.5 bg-soft-gray border border-border rounded-[var(--radius-btn)] text-navy focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-navy mb-2">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                        <select
                          id="time"
                          required
                          className="w-full appearance-none pl-11 pr-10 py-3.5 bg-soft-gray border border-border rounded-[var(--radius-btn)] text-navy focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                          defaultValue=""
                        >
                          <option value="" disabled>Select Time</option>
                          <option>8:00 AM - 9:00 AM</option>
                          <option>9:00 AM - 10:00 AM</option>
                          <option>10:00 AM - 11:00 AM</option>
                          <option>11:00 AM - 12:00 PM</option>
                          <option>1:00 PM - 2:00 PM</option>
                          <option>2:00 PM - 3:00 PM</option>
                          <option>3:00 PM - 4:00 PM</option>
                          <option>4:00 PM - 5:00 PM</option>
                          <option>5:00 PM - 6:00 PM</option>
                          <option>6:00 PM - 7:00 PM</option>
                          <option>7:00 PM - 8:00 PM</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      className="w-full px-4 py-3.5 bg-soft-gray border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 px-8 py-4 bg-teal text-white font-semibold rounded-[var(--radius-btn)] hover:bg-teal-dark shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 text-base"
                  >
                    Request Appointment
                  </button>

                  <p className="text-center text-xs text-slate-text/60 mt-4">
                    By submitting, you agree to our privacy policy. We'll contact you to confirm.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
