import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { galleryImages } from '../data/products';
import SectionHeading from './SectionHeading';

export default function Gallery() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-cream texture-paper">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          subtitle="Behind the Counter"
          title="Our Gallery"
          description="A glimpse into our kitchen, our process, and the moments we cherish."
        />

        <div
          ref={ref}
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {galleryImages.map((img, i) => {
            const isLarge = i === 0 || i === 5;
            return (
              <div
                key={i}
                className={cn(
                  'group rounded-[16px] lg:rounded-[20px] overflow-hidden cursor-pointer',
                  isLarge ? 'col-span-2 row-span-2' : ''
                )}
              >
                <div className="relative w-full h-full aspect-square overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/20 transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
