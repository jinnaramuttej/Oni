import { ArrowRight, Sparkles, Shield, Zap, Heart } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-label="Call to action">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-600 to-navy" />
      <div className="absolute inset-0 pattern-dots opacity-5" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-semibold mb-6">
            <Sparkles size={14} />
            Why Choose Lumina
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            A better dental experience,{' '}
            <span className="text-teal-200">designed around you.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            We've reimagined what a dental visit should feel like. From our welcoming reception to our advanced treatment rooms, every detail is crafted for your comfort and confidence.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Shield, title: 'Safety First', desc: 'Hospital-grade sterilization and safety protocols.' },
              { icon: Zap, title: 'Latest Tech', desc: '3D imaging, laser dentistry, and AI diagnostics.' },
              { icon: Heart, title: 'Gentle Care', desc: 'Sedation options and anxiety-free environment.' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={22} />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="#booking"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-btn bg-white text-navy font-semibold text-base hover:bg-teal-50 transition-all duration-300 shadow-lg btn-press"
          >
            Book Your Visit Today
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
