import { useInView } from '../hooks/useInView';
import {
  MapPin, Phone, Mail, Clock, ExternalLink,
  Send
} from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Visit Us',
    primary: '123 Healthcare Boulevard',
    secondary: 'Medical District, NY 10001',
  },
  {
    icon: Phone,
    label: 'Call Us',
    primary: '1-800-123-4567',
    secondary: '+1 (212) 555-0199',
  },
  {
    icon: Mail,
    label: 'Email Us',
    primary: 'care@medclinic.com',
    secondary: 'appointments@medclinic.com',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    primary: 'Mon–Fri: 8:00 AM – 8:00 PM',
    secondary: 'Sat: 9:00 AM – 5:00 PM',
  },
];

export default function Contact() {
  const [ref, inView] = useInView();

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white" aria-labelledby="contact-heading">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-px bg-teal" />
            Get In Touch
            <span className="w-8 h-px bg-teal" />
          </span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-5 font-heading">
            Contact{' '}
            <span className="text-teal">Our Clinic</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Have questions? We're here to help. Reach out through any of the channels below
            or send us a message directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info cards */}
          <div className={`transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, primary, secondary }) => (
                <div
                  key={label}
                  className="p-5 bg-soft-gray rounded-[var(--radius-card)] border border-border-light hover:shadow-card hover:border-teal/20 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 bg-mint rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal/15 transition-colors">
                    <Icon className="w-5 h-5 text-teal" />
                  </div>
                  <p className="text-sm font-semibold text-navy/50 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-semibold text-navy">{primary}</p>
                  <p className="text-sm text-slate-text">{secondary}</p>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-[var(--radius-card)] overflow-hidden shadow-card border border-border-light h-56 bg-light-blue relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-teal mx-auto mb-2" />
                  <p className="text-navy font-semibold font-heading">MedCare Clinic</p>
                  <p className="text-sm text-slate-text mb-3">123 Healthcare Blvd, Medical District</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              {/* Decorative map grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-4 h-full">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="border border-teal/30" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-soft-gray rounded-[24px] p-8 sm:p-10 border border-border-light">
              <h3 className="text-xl font-bold text-navy font-heading mb-6">Send Us a Message</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-navy mb-2">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full px-4 py-3.5 bg-white border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-navy mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="w-full px-4 py-3.5 bg-white border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-navy mb-2">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3.5 bg-white border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-navy mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3.5 bg-white border border-border rounded-[var(--radius-btn)] text-navy placeholder-slate-text/40 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-navy text-white font-semibold rounded-[var(--radius-btn)] hover:bg-navy-light shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
