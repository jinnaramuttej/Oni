import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Send, Phone, Clock, Shield } from 'lucide-react';

export default function Consultation() {
  const { ref, isInView } = useInView();
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', practice: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry. A member of our team will contact you within 24 hours.');
  };

  return (
    <section id="consultation" className="py-24 lg:py-32 bg-cream" aria-label="Schedule consultation">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div ref={ref} className={`grid lg:grid-cols-5 gap-12 lg:gap-16 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          {/* Left Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-line" />
              <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gold">Get Started</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight text-midnight">
              Schedule Your <span className="text-gold">Confidential</span> Consultation
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-custom">
              Every engagement begins with a thorough understanding of your situation. 
              Our initial consultation is complimentary and held in strict confidence.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gold/5 border border-gold/15">
                  <Phone size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[14px] font-semibold text-charcoal">Immediate Assistance</span>
                  <span className="text-[13px] text-slate-custom">Call (212) 555-1234</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gold/5 border border-gold/15">
                  <Clock size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[14px] font-semibold text-charcoal">Response Time</span>
                  <span className="text-[13px] text-slate-custom">Within 24 business hours</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px] bg-gold/5 border border-gold/15">
                  <Shield size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[14px] font-semibold text-charcoal">Attorney-Client Privilege</span>
                  <span className="text-[13px] text-slate-custom">All communications are confidential</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="rounded-[20px] border border-warm-gray bg-white p-8 lg:p-10 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-semibold tracking-wide text-charcoal mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[12px] border border-warm-gray bg-ivory px-4 py-3.5 text-[14px] text-charcoal placeholder-slate-custom/40 outline-none transition-all duration-300 focus:border-gold/50 focus:ring-2 focus:ring-gold/10"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold tracking-wide text-charcoal mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[12px] border border-warm-gray bg-ivory px-4 py-3.5 text-[14px] text-charcoal placeholder-slate-custom/40 outline-none transition-all duration-300 focus:border-gold/50 focus:ring-2 focus:ring-gold/10"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[13px] font-semibold tracking-wide text-charcoal mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-warm-gray bg-ivory px-4 py-3.5 text-[14px] text-charcoal placeholder-slate-custom/40 outline-none transition-all duration-300 focus:border-gold/50 focus:ring-2 focus:ring-gold/10"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="practice" className="block text-[13px] font-semibold tracking-wide text-charcoal mb-2">Practice Area *</label>
                  <select
                    id="practice"
                    name="practice"
                    value={formState.practice}
                    onChange={handleChange}
                    required
                    className="w-full rounded-[12px] border border-warm-gray bg-ivory px-4 py-3.5 text-[14px] text-charcoal outline-none transition-all duration-300 focus:border-gold/50 focus:ring-2 focus:ring-gold/10 appearance-none"
                  >
                    <option value="">Select Practice Area</option>
                    <option>Corporate & M&A</option>
                    <option>Litigation & Dispute</option>
                    <option>Intellectual Property</option>
                    <option>International Trade</option>
                    <option>Regulatory & Compliance</option>
                    <option>Employment Law</option>
                    <option>Real Estate & Finance</option>
                    <option>Healthcare & Life Sciences</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="block text-[13px] font-semibold tracking-wide text-charcoal mb-2">Brief Description *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-[12px] border border-warm-gray bg-ivory px-4 py-3.5 text-[14px] text-charcoal placeholder-slate-custom/40 outline-none transition-all duration-300 focus:border-gold/50 focus:ring-2 focus:ring-gold/10 resize-none"
                  placeholder="Please provide a brief overview of your legal matter..."
                />
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-[12px] text-slate-custom/60 leading-relaxed max-w-sm">
                  By submitting, you agree to our privacy policy. All information is protected by attorney-client privilege.
                </p>
                <button
                  type="submit"
                  className="group flex items-center gap-3 rounded-[14px] bg-gold px-8 py-4 text-[14px] font-semibold tracking-[0.06em] uppercase text-midnight transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 flex-shrink-0"
                >
                  Submit Inquiry
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
