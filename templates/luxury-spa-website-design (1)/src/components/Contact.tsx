import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative bg-ivory overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-32 lg:pt-44 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">Visit Us</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.025em] text-charcoal mb-8">
              Find Your <span className="italic">Sanctuary</span>
            </h2>
            <div className="w-14 h-[1px] bg-champagne/40 mb-10" />
            <p className="text-charcoal-soft text-[15px] leading-[1.8] font-light font-sans mb-12 max-w-md">
              Located in the heart of a preserved natural reserve, SÉRENITÉ is accessible yet 
              feels worlds away. We welcome you to visit and experience our space in person.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Location', value: '128 Serenity Lane, Lake District, CA 95472' },
                { icon: Phone, label: 'Phone', value: '+1 (707) 482-9100' },
                { icon: Mail, label: 'Email', value: 'welcome@serenite-wellness.com' },
                { icon: Clock, label: 'Hours', value: 'Mon — Sun: 7:00 AM — 10:00 PM' },
              ].map((item) => (
                <div key={item.label} className="flex gap-5">
                  <div className="w-11 h-11 rounded-full bg-champagne/10 flex items-center justify-center text-champagne shrink-0">
                    <item.icon size={18} strokeWidth={1.2} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-charcoal/40 font-medium mb-0.5">{item.label}</div>
                    <div className="text-[14px] text-charcoal font-light font-sans">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_80px_-25px_rgba(59,59,59,0.1)] h-[480px] lg:h-auto min-h-[480px]">
            <img
              src="/images/hero-spa.jpg"
              alt="Luxury spa wellness retreat"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-ivory/90 backdrop-blur-md rounded-[20px] p-6 shadow-lg">
                <h4 className="font-display text-[1.1rem] text-charcoal mb-3">Private Consultations</h4>
                <p className="text-[13px] text-charcoal-soft font-light leading-relaxed mb-4">Not sure which treatment is right for you? Our therapists offer complimentary 15-minute wellness consultations.</p>
                <a href="#booking" className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-champagne font-medium hover:text-rose-wood transition-colors">Book Consultation →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
