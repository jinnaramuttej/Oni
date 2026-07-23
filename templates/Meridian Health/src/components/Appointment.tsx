import { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, Stethoscope, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';

const specialtyOptions = [
  'Primary Care',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Ophthalmology',
  'Internal Medicine',
];

export default function Appointment() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="appointment" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-semibold text-teal">
                Book an Appointment
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[40px]">
                Your next appointment is minutes away
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-lg leading-relaxed text-slate">
                Tell us what you need and we'll match you with the right specialist. Most requests
                are confirmed within two hours during business hours.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 overflow-hidden rounded-[20px] shadow-lg shadow-navy/10">
                <img
                  src="/images/appointment.jpg"
                  alt="A physician carefully documenting a patient consultation"
                  className="h-72 w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-4 rounded-[20px] bg-light-blue p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Phone className="h-5 w-5 text-navy" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-dark">Prefer to call?</p>
                  <p className="text-sm text-slate">(800) 555-1234 · Mon–Sat, 7am–8pm</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <div className="rounded-[20px] border border-navy/10 bg-soft-gray p-8 shadow-sm sm:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint">
                      <CheckCircle2 className="h-8 w-8 text-teal" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-navy-dark">
                      Request received
                    </h3>
                    <p className="mt-3 max-w-sm text-slate">
                      Thank you. A member of our care team will confirm your appointment within
                      2 business hours via phone or email.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 rounded-2xl bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal"
                    >
                      Book another visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="fullname" className="mb-2 block text-sm font-semibold text-navy-dark">
                        Full name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate/60" />
                        <input
                          id="fullname"
                          required
                          type="text"
                          placeholder="Jane Doe"
                          className="w-full rounded-xl border border-navy/12 bg-white py-3.5 pl-11 pr-4 text-sm text-navy-dark placeholder:text-slate/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy-dark">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate/60" />
                        <input
                          id="email"
                          required
                          type="email"
                          placeholder="jane@email.com"
                          className="w-full rounded-xl border border-navy/12 bg-white py-3.5 pl-11 pr-4 text-sm text-navy-dark placeholder:text-slate/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-navy-dark">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate/60" />
                        <input
                          id="phone"
                          required
                          type="tel"
                          placeholder="(555) 000-0000"
                          className="w-full rounded-xl border border-navy/12 bg-white py-3.5 pl-11 pr-4 text-sm text-navy-dark placeholder:text-slate/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="specialty" className="mb-2 block text-sm font-semibold text-navy-dark">
                        Specialty
                      </label>
                      <div className="relative">
                        <Stethoscope className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate/60" />
                        <select
                          id="specialty"
                          required
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-navy/12 bg-white py-3.5 pl-11 pr-4 text-sm text-navy-dark focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                        >
                          <option value="" disabled>Select specialty</option>
                          {specialtyOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="date" className="mb-2 block text-sm font-semibold text-navy-dark">
                        Preferred date
                      </label>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate/60" />
                        <input
                          id="date"
                          required
                          type="date"
                          className="w-full rounded-xl border border-navy/12 bg-white py-3.5 pl-11 pr-4 text-sm text-navy-dark focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="time" className="mb-2 block text-sm font-semibold text-navy-dark">
                        Preferred time
                      </label>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate/60" />
                        <select
                          id="time"
                          required
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-navy/12 bg-white py-3.5 pl-11 pr-4 text-sm text-navy-dark focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                        >
                          <option value="" disabled>Select time slot</option>
                          <option>Morning (8am – 12pm)</option>
                          <option>Afternoon (12pm – 4pm)</option>
                          <option>Evening (4pm – 8pm)</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="w-full rounded-2xl bg-teal py-4 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-teal-light hover:shadow-md"
                      >
                        Confirm Appointment Request
                      </button>
                      <p className="mt-4 text-center text-xs text-slate/70">
                        By submitting, you agree to be contacted regarding your appointment. No payment required.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
