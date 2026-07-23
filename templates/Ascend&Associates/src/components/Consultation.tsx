import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Send, Phone, Clock, CheckCircle2 } from 'lucide-react';

const benefits = [
  'Free 30-minute initial consultation',
  'Personalized financial assessment',
  'Actionable recommendations',
  'No obligation to proceed',
];

export default function Consultation() {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consultation" className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-blue/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-xs font-semibold text-white/70 tracking-wider uppercase">Book a Consultation</span>
            </div>
            <h2
              className={`text-3xl lg:text-[2.75rem] font-bold text-white leading-tight tracking-tight mb-6 transition-all duration-600 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Let's Build Your
              <br />
              Financial Future
            </h2>
            <p
              className={`text-base lg:text-lg text-white/60 leading-relaxed mb-10 transition-all duration-600 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Schedule a complimentary consultation with our chartered accountants.
              We'll review your financial landscape and identify opportunities
              for growth and optimization.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-light flex-shrink-0" />
                  <span className="text-[15px] text-white/80">{b}</span>
                </div>
              ))}
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-6 transition-all duration-600 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="w-5 h-5 text-emerald-light" />
                </div>
                <div>
                  <div className="text-xs text-white/50">Call Us</div>
                  <div className="text-sm font-semibold text-white">+1 (234) 567-890</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Clock className="w-5 h-5 text-emerald-light" />
                </div>
                <div>
                  <div className="text-xs text-white/50">Business Hours</div>
                  <div className="text-sm font-semibold text-white">Mon–Sat, 9AM–6PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/10 p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald/20 mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-light" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-white/60">
                    We've received your request. A member of our team will
                    reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-transparent transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-transparent transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white/70 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-transparent transition-all appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%23999' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="" className="text-gray-800">Select a service</option>
                      <option value="tax" className="text-gray-800">Tax Planning & Filing</option>
                      <option value="accounting" className="text-gray-800">Accounting & Bookkeeping</option>
                      <option value="gst" className="text-gray-800">GST Services</option>
                      <option value="registration" className="text-gray-800">Business Registration</option>
                      <option value="payroll" className="text-gray-800">Payroll Management</option>
                      <option value="consulting" className="text-gray-800">Financial Consulting</option>
                      <option value="audit" className="text-gray-800">Audit & Assurance</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-white/60 mb-2 uppercase tracking-wider">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald/20 transition-all duration-300 hover:bg-emerald-light hover:shadow-emerald/30 hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    Schedule Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
