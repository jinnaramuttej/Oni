import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import RevealSection from './RevealSection';

export default function Contact() {
  return (
    <section id="contact" className="bg-sand py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Get in Touch</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              We'd Love to<br />
              <span className="italic">Hear From You</span>
            </h2>
          </div>
        </RevealSection>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <RevealSection delay={0}>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory">
                <MapPin size={20} strokeWidth={1.5} className="text-eucalyptus" />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">Visit Us</h3>
              <p className="text-sm font-light leading-relaxed text-charcoal-light/70">
                248 Magnolia Avenue<br />
                Studio 2B<br />
                Asheville, NC 28801
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory">
                <Phone size={20} strokeWidth={1.5} className="text-eucalyptus" />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">Call Us</h3>
              <p className="text-sm font-light leading-relaxed text-charcoal-light/70">
                (828) 555-0142<br />
                Available during studio hours
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory">
                <Mail size={20} strokeWidth={1.5} className="text-eucalyptus" />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">Email</h3>
              <p className="text-sm font-light leading-relaxed text-charcoal-light/70">
                hello@solstudio.co<br />
                We respond within 24 hours
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ivory">
                <Clock size={20} strokeWidth={1.5} className="text-eucalyptus" />
              </div>
              <h3 className="font-serif text-lg text-charcoal mb-2">Studio Hours</h3>
              <p className="text-sm font-light leading-relaxed text-charcoal-light/70">
                Mon–Fri: 6:00 AM – 9:00 PM<br />
                Sat–Sun: 7:00 AM – 2:00 PM
              </p>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
