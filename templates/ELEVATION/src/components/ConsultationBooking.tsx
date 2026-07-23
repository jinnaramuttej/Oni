import { useState } from 'react';
import { IMAGES } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { Calendar, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ConsultationBooking() {
  const { ref, isInView } = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="consultation" className="py-24 md:py-32 bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div
          ref={ref}
          className={cn(
            'grid lg:grid-cols-2 gap-10 md:gap-16 items-center rounded-[24px] overflow-hidden bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)] transition-all duration-700',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Image Side */}
          <div className="relative h-64 lg:h-full min-h-[400px] lg:min-h-[600px]">
            <img
              src={IMAGES.interior3}
              alt="Luxury interior"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-charcoal/20 lg:bg-gradient-to-t lg:from-charcoal/50 lg:to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
                Private Consultation
              </span>
              <h3 className="mt-3 font-serif text-white text-2xl md:text-3xl font-light leading-tight">
                Let us find your
                <br />
                <span className="italic font-medium">perfect residence</span>
              </h3>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12 lg:pr-16">
            <span className="inline-flex items-center gap-2 text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
              <span className="w-6 h-px bg-gold" />
              Schedule Today
            </span>
            <h2 className="mt-4 font-serif text-charcoal text-[28px] md:text-[36px] leading-[1.15] font-light">
              Book a Consultation
            </h2>
            <p className="mt-3 text-[14px] text-slate font-light leading-relaxed">
              Connect with one of our luxury property advisors for a
              personalized, confidential discussion about your real estate goals.
            </p>

            {submitted ? (
              <div className="mt-8 p-8 rounded-[16px] bg-forest/5 border border-forest/20 text-center">
                <CheckCircle2 className="w-10 h-10 text-forest mx-auto mb-4" />
                <h3 className="font-serif text-xl text-charcoal font-medium">
                  Thank You
                </h3>
                <p className="mt-2 text-sm text-slate font-light">
                  A member of our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-11 pr-4 py-3.5 rounded-[14px] border border-stone/60 bg-ivory/50 text-sm text-charcoal placeholder-slate/40 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full pl-11 pr-4 py-3.5 rounded-[14px] border border-stone/60 bg-ivory/50 text-sm text-charcoal placeholder-slate/40 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full pl-11 pr-4 py-3.5 rounded-[14px] border border-stone/60 bg-ivory/50 text-sm text-charcoal placeholder-slate/40 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
                    <select
                      className="w-full pl-11 pr-4 py-3.5 rounded-[14px] border border-stone/60 bg-ivory/50 text-sm text-slate/60 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Preferred Time</option>
                      <option>Morning (9am - 12pm)</option>
                      <option>Afternoon (12pm - 5pm)</option>
                      <option>Evening (5pm - 8pm)</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate/40" />
                  <textarea
                    placeholder="Tell us about your ideal property..."
                    rows={3}
                    className="w-full pl-11 pr-4 py-3.5 rounded-[14px] border border-stone/60 bg-ivory/50 text-sm text-charcoal placeholder-slate/40 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-charcoal hover:bg-forest text-white text-[12px] font-semibold tracking-[0.12em] uppercase py-4 rounded-[16px] transition-all duration-300 hover:shadow-lg"
                >
                  Request Consultation
                </button>

                <p className="text-[11px] text-slate/50 text-center font-light">
                  Your information is kept strictly confidential. We respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
