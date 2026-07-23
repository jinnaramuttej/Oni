import { AnimatedSection } from './AnimatedSection';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['123 Smile Avenue, Suite 200', 'New York, NY 10001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['(800) 555-1234', 'Emergency: (800) 555-5678'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hello@luminadental.com', 'appointments@luminadental.com'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon–Fri: 8:00 AM – 7:00 PM', 'Sat: 9:00 AM – 4:00 PM'],
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-light-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-teal-primary text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy leading-tight tracking-tight">
            We'd Love to{' '}
            <span className="text-teal-primary">Hear From You</span>
          </h2>
          <p className="mt-4 text-lg text-slate-text/70 leading-relaxed">
            Whether you have a question, need an appointment, or want directions — we're here to help.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={info.title} delay={index * 80}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100/60 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-teal-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy mb-1">{info.title}</h3>
                      {info.lines.map((line) => (
                        <p key={line} className="text-sm text-slate-text/70">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Map placeholder */}
          <AnimatedSection delay={200} className="lg:col-span-2">
            <div className="relative h-full min-h-[400px] rounded-[24px] overflow-hidden border border-gray-100/60 shadow-sm bg-gradient-to-br from-sky-accent/40 to-teal-50/40">
              {/* Stylized map representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-primary/10 flex items-center justify-center mb-4">
                    <Navigation className="w-8 h-8 text-teal-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">Lumina Dental</h3>
                  <p className="text-sm text-slate-text/60 mb-4">123 Smile Avenue, Suite 200<br />New York, NY 10001</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-primary text-white font-semibold rounded-2xl hover:bg-teal-600 shadow-md shadow-teal-primary/20 transition-all duration-300"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Decorative map grid */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
                backgroundImage: `
                  linear-gradient(to right, #1E3A5F 1px, transparent 1px),
                  linear-gradient(to bottom, #1E3A5F 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
              }} />

              {/* Decorative roads */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-teal-primary/10" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-teal-primary/10" />
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-teal-primary/10" />
                <div className="absolute top-0 bottom-0 left-2/3 w-px bg-teal-primary/10" />
              </div>

              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                <div className="w-4 h-4 rounded-full bg-teal-primary shadow-lg shadow-teal-primary/30 animate-pulse-soft" />
                <div className="w-8 h-8 rounded-full bg-teal-primary/20 absolute -top-2 -left-2 animate-ping" style={{ animationDuration: '2s' }} />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
