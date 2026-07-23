import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Head Office',
    lines: ['1205 Corporate Tower, MG Road', 'Bangalore, Karnataka 560001'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+1 (234) 567-890', '+1 (234) 567-891'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['hello@ascendca.com', 'support@ascendca.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Monday – Friday: 9AM – 6PM', 'Saturday: 10AM – 2PM'],
  },
];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 rounded-full bg-soft-blue px-4 py-1.5 mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs font-semibold text-navy tracking-wider uppercase">Get in Touch</span>
          </div>
          <h2
            className={`text-3xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight mb-4 transition-all duration-600 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Contact Information
          </h2>
          <p
            className={`text-base lg:text-lg text-slate-text leading-relaxed transition-all duration-600 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Reach out to our team for any inquiries. We're here to help
            you navigate your financial journey with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className={`group rounded-[20px] border border-gray-100 bg-surface/30 p-6 text-center transition-all duration-500 hover:bg-white hover:shadow-lg hover:shadow-black/[0.04] hover:border-emerald/15 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${250 + i * 80}ms` }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/[0.04] mx-auto mb-5 group-hover:bg-emerald/10 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-navy group-hover:text-emerald transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-semibold text-navy mb-3">{item.title}</h3>
              {item.lines.map((line, j) => (
                <p key={j} className="text-sm text-slate-text leading-relaxed">{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div
          className={`mt-12 rounded-3xl overflow-hidden border border-gray-100 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="relative aspect-[21/6] bg-surface overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3183126/pexels-photo-3183126.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=1400"
              alt="Our collaborative team environment"
              className="w-full h-full object-cover opacity-60"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-navy/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg mx-auto mb-3">
                  <MapPin className="w-5 h-5 text-emerald" />
                </div>
                <p className="text-sm font-semibold text-white">Bangalore, India</p>
                <p className="text-xs text-white/70">Corporate Tower, MG Road</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
