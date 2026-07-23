import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const hours = [
  { day: 'Monday – Friday', time: '7:00 AM – 7:00 PM' },
  { day: 'Saturday', time: '7:00 AM – 8:00 PM' },
  { day: 'Sunday', time: '8:00 AM – 5:00 PM' },
];

export default function VisitUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="visit" className="py-20 lg:py-32 bg-cream texture-linen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Info */}
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-caramel font-medium">Visit Us</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-chocolate leading-tight">
              Our Bakery <span className="italic text-caramel">Awaits</span>
            </h2>
            <p className="mt-6 text-warm-gray font-light leading-relaxed max-w-md">
              Step inside our warm, sunlit bakery and let the aroma of freshly baked bread 
              and pastries welcome you. We'd love for you to stay awhile.
            </p>

            {/* Contact details */}
            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-caramel/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-caramel" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-chocolate">Address</span>
                  <span className="block text-sm text-warm-gray font-light mt-0.5">
                    247 Elm Street, Suite 100<br />
                    Portland, OR 97205
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-caramel/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-caramel" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-chocolate">Phone</span>
                  <a href="tel:5552345678" className="block text-sm text-warm-gray font-light mt-0.5 hover:text-caramel transition-colors">
                    (555) 234-5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-caramel/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-caramel" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-chocolate">Email</span>
                  <a href="mailto:hello@crumbandcrust.com" className="block text-sm text-warm-gray font-light mt-0.5 hover:text-caramel transition-colors">
                    hello@crumbandcrust.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-caramel" />
                <span className="text-sm font-medium text-chocolate">Hours</span>
              </div>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm max-w-xs">
                    <span className="text-warm-gray font-light">{h.day}</span>
                    <span className="text-chocolate font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map/Image */}
          <div className="relative">
            <div className="rounded-[24px] overflow-hidden shadow-[0_8px_40px_rgba(90,58,41,0.12)] h-full min-h-[400px]">
              <img
                src="https://images.pexels.com/photos/30667454/pexels-photo-30667454.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800"
                alt="Bakery display with fresh pastries"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate/30 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-[18px] bg-white/90 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-chocolate font-medium">Open Now</span>
                <span className="text-xs text-warm-gray font-light">· Closes at 7:00 PM</span>
              </div>
              <a
                href="#"
                className="mt-3 inline-flex items-center gap-2 text-sm text-caramel font-medium hover:text-chocolate transition-colors"
              >
                <MapPin size={14} />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
