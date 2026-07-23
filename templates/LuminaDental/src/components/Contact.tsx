import { useReveal } from '../hooks/useReveal';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export default function Contact() {
  const revealRef = useReveal();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-50" aria-label="Contact and location">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={revealRef} className="reveal">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              Find Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
              Visit our{' '}
              <span className="gradient-text">clinic</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Conveniently located in the heart of downtown with ample parking and easy public transit access.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2 rounded-card overflow-hidden shadow-card h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lumina Dental clinic location"
                className="rounded-card"
              />
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: 'Address',
                  lines: ['350 Fifth Avenue, Suite 4200', 'New York, NY 10118'],
                },
                {
                  icon: Navigation,
                  title: 'Getting Here',
                  lines: ['Steps from Penn Station', 'Parking garage on 34th St'],
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  lines: ['(555) 123-4567', '(555) 123-4568 (fax)'],
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['hello@luminadental.com', 'appointments@luminadental.com'],
                },
                {
                  icon: Clock,
                  title: 'Hours',
                  lines: ['Mon–Fri: 8:00 AM – 6:00 PM', 'Saturday: 9:00 AM – 3:00 PM'],
                },
              ].map((info) => (
                <div
                  key={info.title}
                  className="bg-white rounded-card p-5 shadow-soft border border-gray-100 flex items-start gap-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <info.icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-1">{info.title}</p>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-slate-500 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
