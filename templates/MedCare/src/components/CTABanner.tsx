import { useInView } from '../hooks/useInView';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTABanner() {
  const [ref, inView] = useInView();

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden" aria-label="Call to Action">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-blue/30 via-transparent to-mint/30" />

      <div ref={ref} className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-gradient-to-br from-navy to-navy-light rounded-[28px] p-10 sm:p-16 shadow-elevated relative overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-white rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 border-2 border-white rounded-full" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Ready to Take the Next Step{' '}
              <span className="text-teal-light">for Your Health?</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Schedule your appointment today and experience the MedCare difference.
              Our team of expert physicians is ready to provide you with personalized,
              compassionate care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#appointment"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-teal text-white font-semibold rounded-[var(--radius-btn)] hover:bg-teal-dark shadow-elevated hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-base"
              >
                Book Your Appointment
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+18001234567"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 border border-white/25 text-white font-semibold rounded-[var(--radius-btn)] hover:bg-white/20 transition-all duration-300 text-base"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
