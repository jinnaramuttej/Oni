import { AnimatedSection } from './AnimatedSection';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-[28px] overflow-hidden">
            {/* Background image */}
            <img
              src="https://images.pexels.com/photos/38055774/pexels-photo-38055774.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400"
              alt="Modern dental office interior"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/60" />

            <div className="relative px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
              <div className="max-w-xl">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
                  Ready to Transform{' '}
                  <span className="text-teal-light">Your Smile?</span>
                </h2>
                <p className="mt-4 text-lg text-white/70 leading-relaxed">
                  Schedule your complimentary consultation today and discover what modern dental care feels like.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#booking"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-teal-primary text-white font-semibold rounded-2xl hover:bg-teal-600 shadow-lg shadow-teal-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="tel:+18005551234"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Call (800) 555-1234
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
