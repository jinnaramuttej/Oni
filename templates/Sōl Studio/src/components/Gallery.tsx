import { GALLERY_IMAGES } from '../data/content';
import RevealSection from './RevealSection';

const heightClasses = [
  'h-72 md:h-[360px]',  // 0 - tall
  'h-52 md:h-64',       // 1
  'h-52 md:h-64',       // 2
  'h-52 md:h-64',       // 3
  'h-52 md:h-64',       // 4
  'h-72 md:h-[360px]',  // 5 - tall
];

export default function Gallery() {
  return (
    <section className="bg-sand py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-[11px] font-light tracking-[0.35em] uppercase text-eucalyptus mb-4">Our Space</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              A Glimpse Inside<br />
              <span className="italic">the Studio</span>
            </h2>
          </div>
        </RevealSection>

        {/* Organic gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
          {GALLERY_IMAGES.map((img, i) => (
            <RevealSection
              key={i}
              delay={i * 80}
              className={i === 0 ? 'md:row-span-2' : ''}
            >
              <div className={`group overflow-hidden rounded-2xl ${i === 0 ? 'h-72 md:h-full min-h-[320px]' : heightClasses[i]}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
