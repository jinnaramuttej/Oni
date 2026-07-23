import { SectionWrapper } from './SectionWrapper';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

const hours = [
  { day: 'Breakfast', time: '6:30 AM – 11:00 AM' },
  { day: 'Lunch', time: '12:00 PM – 3:30 PM' },
  { day: 'Evening Tiffin', time: '4:00 PM – 6:00 PM' },
  { day: 'Dinner', time: '7:00 PM – 10:30 PM' },
];

export function Location() {
  return (
    <SectionWrapper id="contact" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-subtitle">Find Us</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Visit <span className="italic text-terracotta">Amritham</span>
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto leading-relaxed">
            Located in the heart of Bengaluru, we're easy to find and always ready to welcome you
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map placeholder */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg bg-ivory-dark border border-brass/10 min-h-[360px] relative">
            <img
              src="https://images.pexels.com/photos/279768/pexels-photo-279768.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900"
              alt="Amritham restaurant interior"
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-brown-dark/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-warm-white/95 backdrop-blur-sm rounded-2xl p-8 text-center max-w-sm mx-4">
                <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-3">
                  <MapPin size={22} className="text-terracotta" />
                </div>
                <h3 className="font-serif text-xl text-brown-dark font-semibold mb-2">Amritham Kitchen</h3>
                <p className="text-warm-gray text-sm leading-relaxed mb-4">
                  No. 42, 4th Cross Road, Jayanagar 4th Block,
                  Bengaluru, Karnataka – 560041
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-terracotta font-medium text-sm hover:text-terracotta-dark transition-colors"
                >
                  <Navigation size={14} />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            {/* Hours */}
            <div className="bg-warm-white rounded-2xl p-6 border border-brass/10">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-terracotta" strokeWidth={1.5} />
                <h4 className="font-serif text-lg text-brown-dark font-semibold">Hours</h4>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between">
                    <span className="text-sm text-warm-gray font-medium">{h.day}</span>
                    <span className="text-sm text-brown-dark">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-brass/10">
                <span className="text-xs text-leaf font-medium">● Open Now</span>
                <span className="text-xs text-warm-gray ml-2">Open all 7 days</span>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-warm-white rounded-2xl p-6 border border-brass/10">
              <h4 className="font-serif text-lg text-brown-dark font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm text-brown hover:text-terracotta transition-colors"
                >
                  <Phone size={16} className="text-terracotta" strokeWidth={1.5} />
                  +91 98765 43210
                </a>
                <a
                  href="tel:+918012345678"
                  className="flex items-center gap-3 text-sm text-brown hover:text-terracotta transition-colors"
                >
                  <Phone size={16} className="text-terracotta" strokeWidth={1.5} />
                  +91 80 1234 5678
                </a>
                <a
                  href="mailto:hello@amritham.in"
                  className="flex items-center gap-3 text-sm text-brown hover:text-terracotta transition-colors"
                >
                  <Mail size={16} className="text-terracotta" strokeWidth={1.5} />
                  hello@amritham.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
