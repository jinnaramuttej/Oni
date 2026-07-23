import { IMAGES } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';

const galleryItems = [
  { image: IMAGES.kitchen1, label: 'Culinary Spaces', span: 'col-span-1 row-span-1' },
  { image: IMAGES.bedroom, label: 'Master Suites', span: 'col-span-1 row-span-2' },
  { image: IMAGES.bathroom, label: 'Spa Retreats', span: 'col-span-1 row-span-1' },
  { image: IMAGES.interior2, label: 'Living Spaces', span: 'col-span-1 row-span-1' },
];

export default function LifestyleGallery() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text Content */}
          <div
            ref={ref}
            className={cn(
              'transition-all duration-700',
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="inline-flex items-center gap-2 text-gold text-[11px] md:text-[12px] font-semibold tracking-[0.25em] uppercase">
              <span className="w-8 h-px bg-gold" />
              The Lifestyle
            </span>
            <h2 className="mt-6 font-serif text-charcoal text-[32px] md:text-[42px] lg:text-[48px] leading-[1.1] font-light">
              Every Detail,
              <br />
              <span className="italic font-medium">Thoughtfully Crafted</span>
            </h2>
            <p className="mt-6 text-slate text-base md:text-lg leading-relaxed font-light max-w-lg">
              From bespoke kitchens designed by world-renowned chefs to spa-inspired
              bathrooms with imported marble, our properties define the art of refined living.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { value: '250+', label: 'Architect Partners' },
                { value: '15', label: 'Design Awards' },
                { value: '40+', label: 'Global Markets' },
                { value: '99%', label: 'Client Retention' },
              ].map((stat) => (
                <div key={stat.label} className="py-4 border-t border-stone/60">
                  <span className="font-serif text-2xl md:text-3xl text-charcoal font-medium">
                    {stat.value}
                  </span>
                  <p className="mt-1 text-[11px] text-slate tracking-[0.1em] uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {galleryItems.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  'group relative overflow-hidden rounded-[18px] transition-all duration-700',
                  item.span,
                  i === 1 ? 'min-h-[320px] md:min-h-[440px]' : 'min-h-[160px] md:min-h-[210px]',
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 text-white text-[12px] font-semibold tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
