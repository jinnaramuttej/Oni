import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';

export default function BrandStory() {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <section id="story" className="py-20 lg:py-32 bg-ivory texture-paper">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images side */}
          <div
            ref={leftRef}
            className={cn(
              'relative transition-all duration-700',
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-[24px] overflow-hidden shadow-[0_8px_40px_rgba(90,58,41,0.12)]">
                <img
                  src="https://images.pexels.com/photos/3756050/pexels-photo-3756050.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700"
                  alt="Baker rolling dough with care"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {/* Floating accent image */}
              <div className="absolute -bottom-6 -right-6 lg:-right-10 w-40 lg:w-52 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(90,58,41,0.15)] border-4 border-ivory">
                <img
                  src="https://images.pexels.com/photos/5964559/pexels-photo-5964559.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=350"
                  alt="Chef carefully slicing cake"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-2 border-caramel/15" />
            </div>
          </div>

          {/* Text side */}
          <div
            ref={rightRef}
            className={cn(
              'transition-all duration-700 delay-200',
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-caramel font-medium">Our Story</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-chocolate leading-tight">
              Where every crumb <br />
              <span className="italic text-caramel">tells a story</span>
            </h2>
            
            <div className="mt-8 space-y-5">
              <p className="text-warm-gray font-light leading-relaxed">
                Founded in 2018, Crumb & Crust was born from a simple belief: the best baked goods 
                are made by hand, with patience, and with the finest ingredients nature has to offer.
              </p>
              <p className="text-warm-gray font-light leading-relaxed">
                Our head baker trained in the patisseries of Paris and Lyon before bringing 
                those time-honored French techniques to our warm, neighborhood kitchen. Every morning 
                begins at 4 AM with the mixing of sourdough starters, the laminating of croissant 
                dough, and the careful selection of seasonal fruits and single-origin chocolates.
              </p>
              <p className="text-warm-gray font-light leading-relaxed">
                We believe that baking is more than a craft — it's an act of love. From birthday 
                celebrations to quiet Sunday mornings, we're honored to be part of your moments.
              </p>
            </div>

            {/* Philosophy pillars */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { number: '4AM', label: 'We start\nbaking' },
                { number: '48hr', label: 'Sourdough\nferment' },
                { number: '100%', label: 'Natural\ningredients' },
              ].map((item) => (
                <div key={item.number} className="text-center lg:text-left">
                  <span className="font-serif text-2xl lg:text-3xl text-caramel">{item.number}</span>
                  <p className="mt-1 text-xs text-warm-gray font-light whitespace-pre-line">{item.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#menu"
              className="mt-10 inline-flex items-center gap-2 text-sm text-caramel font-medium hover:text-chocolate transition-colors group"
            >
              Explore Our Creations
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
