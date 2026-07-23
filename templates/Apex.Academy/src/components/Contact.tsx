import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white" aria-label="Contact information">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-indigo-deep/5 px-4 py-1.5 text-sm font-semibold text-indigo-deep mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep tracking-tight mb-4">
            We're Here to <span className="text-blue-royal">Help</span>
          </h2>
          <p className="text-slate-text text-lg leading-relaxed">
            Have questions? Our team is ready to assist you with enrollment, course selection, and anything else.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: MapPin,
              title: 'Visit Us',
              lines: ['123 Education Hub, Knowledge Park', 'New Delhi, India 110001'],
            },
            {
              icon: Phone,
              title: 'Call Us',
              lines: ['+91 98765 43210', '+91 11 2345 6789'],
            },
            {
              icon: Mail,
              title: 'Email Us',
              lines: ['admissions@apexacademy.in', 'support@apexacademy.in'],
            },
            {
              icon: Clock,
              title: 'Office Hours',
              lines: ['Mon - Sat: 8:00 AM - 9:00 PM', 'Sunday: 9:00 AM - 5:00 PM'],
            },
          ].map((contact) => (
            <div
              key={contact.title}
              className="group rounded-[20px] bg-slate-bg p-6 hover:bg-white hover:shadow-card-hover border border-transparent hover:border-gray-100 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-deep/5 flex items-center justify-center mb-4 group-hover:bg-blue-royal/10 transition-colors">
                <contact.icon className="h-5 w-5 text-indigo-deep group-hover:text-blue-royal transition-colors" />
              </div>
              <h3 className="text-base font-bold text-indigo-deep mb-2">{contact.title}</h3>
              {contact.lines.map((line) => (
                <p key={line} className="text-sm text-slate-text">{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mt-12 rounded-[20px] overflow-hidden bg-slate-bg h-64 lg:h-80 flex items-center justify-center border border-gray-100">
          <div className="text-center">
            <MapPin className="h-10 w-10 text-indigo-deep/30 mx-auto mb-3" />
            <p className="text-sm text-slate-text font-medium">Interactive Map — Campus Location</p>
            <p className="text-xs text-slate-text/60 mt-1">123 Education Hub, Knowledge Park, New Delhi</p>
          </div>
        </div>

        {/* Social */}
        <div className="mt-12 flex items-center justify-center gap-4">
          {[
            { label: 'Facebook', href: '#', emoji: 'f' },
            { label: 'X/Twitter', href: '#', emoji: '𝕏' },
            { label: 'Instagram', href: '#', emoji: 'ig' },
            { label: 'LinkedIn', href: '#', emoji: 'in' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="w-12 h-12 rounded-xl bg-slate-bg flex items-center justify-center text-slate-text font-bold text-xs hover:bg-indigo-deep hover:text-white transition-all duration-300 hover:-translate-y-1"
            >
              {social.emoji}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
