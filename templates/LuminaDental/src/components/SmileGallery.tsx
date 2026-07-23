import { useState } from 'react';
import { useRevealStagger } from '../hooks/useReveal';
import { ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';

const galleryItems = [
  {
    before: 'https://images.unsplash.com/photo-1606811907839-94e3953620aa?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80&auto=format&fit=crop',
    treatment: 'Teeth Whitening',
    desc: 'Professional whitening — 6 shades brighter in one visit',
  },
  {
    before: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&q=80&auto=format&fit=crop',
    treatment: 'Dental Implants',
    desc: 'Full restoration with natural-looking titanium implants',
  },
  {
    before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da4737?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80&auto=format&fit=crop',
    treatment: 'Cosmetic Veneers',
    desc: 'Complete smile makeover with ultra-thin porcelain veneers',
  },
  {
    before: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1629909615184-74f495363b63?w=600&q=80&auto=format&fit=crop',
    treatment: 'Invisalign',
    desc: '12-month alignment with invisible clear aligners',
  },
];

export default function SmileGallery() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAfter, setShowAfter] = useState(true);
  const refs = useRevealStagger(2, { delay: 150 });

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % galleryItems.length);
    setShowAfter(true);
  };
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    setShowAfter(true);
  };

  const item = galleryItems[activeSlide];

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white" aria-label="Smile transformation gallery">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={(el) => { if (el) refs.current[0] = el; }} className="reveal max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
            <Sparkles size={14} />
            Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4">
            Real patients.{' '}
            <span className="gradient-text">real transformations.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Browse our gallery of smile makeovers. Every transformation is unique, just like every patient.
          </p>
        </div>

        {/* Gallery */}
        <div ref={(el) => { if (el) refs.current[1] = el; }} className="reveal">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Comparison */}
            <div className="relative rounded-card overflow-hidden shadow-card group">
              <div className="relative aspect-[4/3]">
                <img
                  src={showAfter ? item.after : item.before}
                  alt={`${showAfter ? 'After' : 'Before'} — ${item.treatment}`}
                  className="w-full h-full object-cover transition-opacity duration-700"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Toggle Buttons */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <button
                    onClick={() => setShowAfter(false)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      !showAfter
                        ? 'bg-white text-navy shadow-md'
                        : 'bg-black/30 backdrop-blur-sm text-white/80 hover:bg-white/20'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setShowAfter(true)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      showAfter
                        ? 'bg-teal-500 text-white shadow-md'
                        : 'bg-black/30 backdrop-blur-sm text-white/80 hover:bg-white/20'
                    }`}
                  >
                    After
                  </button>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                  aria-label="Previous transformation"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                  aria-label="Next transformation"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-4">
                <ZoomIn size={14} />
                {item.treatment}
              </div>
              <p className="text-2xl font-bold text-navy mb-3">{item.desc}</p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Our patients see visible results that speak for themselves. Each treatment plan is customized to achieve your ideal smile while maintaining a natural, beautiful appearance.
              </p>

              {/* Thumbnails */}
              <div className="flex gap-3 mb-8">
                {galleryItems.map((g, index) => (
                  <button
                    key={index}
                    onClick={() => { setActiveSlide(index); setShowAfter(true); }}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === activeSlide
                        ? 'border-teal-500 shadow-md ring-2 ring-teal-100 scale-105'
                        : 'border-gray-200 hover:border-gray-300 opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View ${g.treatment} transformation`}
                  >
                    <img
                      src={g.after}
                      alt={g.treatment}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              <a
                href="#booking"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-btn bg-navy text-white font-semibold hover:bg-navy-light transition-all duration-300 btn-press shadow-lg"
              >
                Start Your Transformation
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
