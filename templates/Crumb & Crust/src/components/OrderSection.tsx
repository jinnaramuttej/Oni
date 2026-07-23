import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { ShoppingBag, Phone, Clock, Truck } from 'lucide-react';

export default function OrderSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="order" className="py-20 lg:py-32 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            'relative rounded-[28px] lg:rounded-[36px] overflow-hidden transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/30667453/pexels-photo-30667453.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400"
              alt="Warm bakery setting"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-chocolate/90 via-chocolate/80 to-chocolate/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-medium">Order Online</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight">
                Fresh to your door,<br />
                <span className="italic text-gold">baked with love</span>
              </h2>
              <p className="mt-6 text-white/60 font-light leading-relaxed">
                Order online for pickup or local delivery. All items are baked fresh on the day 
                of your order, packed with care, and ready to brighten your table.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Clock, label: 'Same-Day Pickup', desc: 'Order before 10 AM' },
                  { icon: Truck, label: 'Local Delivery', desc: 'Within 10 miles' },
                  { icon: Phone, label: 'Call to Order', desc: '(555) 234-5678' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-[16px] bg-white/5 backdrop-blur-sm border border-white/5">
                    <item.icon size={18} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="block text-sm text-ivory font-medium">{item.label}</span>
                      <span className="block text-xs text-white/40 font-light mt-0.5">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-[20px] bg-gold text-chocolate font-medium text-sm hover:bg-ivory transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  <ShoppingBag size={16} />
                  Start Your Order
                </a>
                <a
                  href="tel:5552345678"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-[20px] bg-white/10 text-ivory border border-white/15 font-medium text-sm hover:bg-white/20 transition-all duration-300"
                >
                  <Phone size={16} />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
