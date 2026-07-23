import FadeIn from './FadeIn';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40 bg-beige/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Visit */}
          <FadeIn>
            <div>
              <span className="inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase text-champagne mb-4">
                Visit Us
              </span>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-6">
                Our Sanctuary
              </h3>
              <div className="space-y-4 text-sm font-light text-charcoal-light leading-relaxed">
                <p>
                  42 Tranquil Lane<br />
                  Pacific Heights<br />
                  San Francisco, CA 94115
                </p>
                <div className="pt-2">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-champagne shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    +1 (415) 555-0187
                  </p>
                  <p className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-champagne shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    hello@serenite-spa.com
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Hours */}
          <FadeIn delay={0.1}>
            <div>
              <span className="inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase text-champagne mb-4">
                Hours
              </span>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-6">
                Opening Times
              </h3>
              <div className="space-y-3 text-sm font-light text-charcoal-light">
                <div className="flex justify-between items-center py-2 border-b border-stone-light/50">
                  <span>Monday — Friday</span>
                  <span>9:00 am — 9:00 pm</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-light/50">
                  <span>Saturday</span>
                  <span>8:00 am — 10:00 pm</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-stone-light/50">
                  <span>Sunday</span>
                  <span>9:00 am — 8:00 pm</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Holidays</span>
                  <span>By appointment</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Map placeholder */}
          <FadeIn delay={0.2}>
            <div>
              <span className="inline-block text-xs font-sans font-semibold tracking-[0.25em] uppercase text-champagne mb-4">
                Getting Here
              </span>
              <h3 className="font-serif text-2xl font-light text-charcoal mb-6">
                Location
              </h3>
              <div className="aspect-[4/3] rounded-[20px] overflow-hidden bg-stone-light/40 border border-stone-light/60 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-champagne mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p className="text-xs text-charcoal-light font-light">
                      Pacific Heights, San Francisco
                    </p>
                    <a href="#" className="inline-block mt-3 text-xs text-champagne font-medium tracking-wide hover:text-champagne-dark transition-colors duration-300">
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
