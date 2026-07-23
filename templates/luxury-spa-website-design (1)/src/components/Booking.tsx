import { CalendarDays, Clock } from 'lucide-react';

export default function Booking() {
  return (
    <section id="booking" className="relative bg-ivory overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-champagne/5 -translate-y-1/3 translate-x-1/4 blur-[80px]" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-20 pt-32 lg:pt-44 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Information */}
          <div className="lg:pt-8">
            <span className="text-[10px] tracking-[0.35em] uppercase text-champagne font-medium block mb-6">Begin Your Journey</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.025em] text-charcoal mb-6">
              Book Your <span className="italic">Treatment</span>
            </h2>
            <div className="w-14 h-[1px] bg-champagne/40 mb-8" />
            <p className="text-charcoal-soft text-[15px] leading-[1.8] font-light font-sans mb-10 max-w-md">
              Our therapists will guide you through a brief consultation to select the perfect 
              treatment for your needs. Appointments are available seven days a week.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: CalendarDays, title: 'Flexible Scheduling', desc: 'Book online or by phone with 48-hour confirmation.' },
                { icon: Clock, title: 'Extended Hours', desc: 'Open from 7:00 AM to 10:00 PM, every day of the year.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="w-11 h-11 rounded-full bg-champagne/10 flex items-center justify-center text-champagne shrink-0">
                    <item.icon size={18} strokeWidth={1.2} />
                  </div>
                  <div>
                    <h4 className="font-display text-[1.1rem] text-charcoal tracking-tight mb-1">{item.title}</h4>
                    <p className="text-[13px] text-charcoal-soft font-light font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-warm-white rounded-[28px] p-8 lg:p-12 shadow-[0_25px_70px_-25px_rgba(59,59,59,0.08)] border border-stone/15">
            <h3 className="font-display text-[1.5rem] text-charcoal tracking-tight mb-2">Reserve Your Appointment</h3>
            <p className="text-[13px] text-charcoal-soft font-light mb-8">Complete the form and our concierge will confirm within two hours.</p>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Booking request submitted. Our team will contact you shortly.'); }}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/60 font-medium mb-2">Full Name</label>
                  <input id="name" type="text" placeholder="Your name" className="w-full rounded-xl bg-ivory border border-stone/20 px-5 py-3.5 text-[14px] text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-champagne/50 transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/60 font-medium mb-2">Email</label>
                  <input id="email" type="email" placeholder="email@example.com" className="w-full rounded-xl bg-ivory border border-stone/20 px-5 py-3.5 text-[14px] text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-champagne/50 transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="service" className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/60 font-medium mb-2">Service</label>
                  <select id="service" className="w-full rounded-xl bg-ivory border border-stone/20 px-5 py-3.5 text-[14px] text-charcoal focus:outline-none focus:border-champagne/50 transition-colors appearance-none" defaultValue="">
                    <option value="">Select service</option>
                    <option>Signature Deep Tissue</option>
                    <option>Renewal Facial Ritual</option>
                    <option>Aromatherapy Journey</option>
                    <option>Body Renewal Ritual</option>
                    <option>Full-Day Wellness Journey</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/60 font-medium mb-2">Preferred Date</label>
                  <input id="date" type="date" className="w-full rounded-xl bg-ivory border border-stone/20 px-5 py-3.5 text-[14px] text-charcoal focus:outline-none focus:border-champagne/50 transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] tracking-[0.2em] uppercase text-charcoal/60 font-medium mb-2">Special Requests</label>
                <textarea id="message" rows={3} placeholder="Any preferences or health considerations..." className="w-full rounded-xl bg-ivory border border-stone/20 px-5 py-3.5 text-[14px] text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-champagne/50 transition-colors resize-none" />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-charcoal text-ivory px-8 py-4 text-[12px] tracking-[0.18em] uppercase font-medium hover:bg-champagne transition-all duration-500 shadow-[0_8px_30px_rgba(59,59,59,0.15)] hover:shadow-[0_10px_35px_rgba(201,169,110,0.25)] hover:-translate-y-0.5"
              >
                Confirm Booking Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
