import { SectionWrapper } from './SectionWrapper';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const images = [
  {
    src: 'https://images.pexels.com/photos/9575086/pexels-photo-9575086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
    alt: 'Fresh spices on wooden spoons',
    label: 'Fresh Spices',
  },
  {
    src: 'https://images.pexels.com/photos/20422128/pexels-photo-20422128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
    alt: 'Steaming idli with sambar',
    label: 'Morning Idlis',
  },
  {
    src: 'https://images.pexels.com/photos/30296301/pexels-photo-30296301.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
    alt: 'Colorful Indian spice display',
    label: 'Spice Heritage',
  },
  {
    src: 'https://images.pexels.com/photos/37708443/pexels-photo-37708443.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
    alt: 'Chef preparing food in kitchen',
    label: 'Our Kitchen',
  },
  {
    src: 'https://images.pexels.com/photos/20422132/pexels-photo-20422132.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
    alt: 'Traditional vada with chutneys',
    label: 'Crispy Vadas',
  },
  {
    src: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
    alt: 'Turmeric and chili powder',
    label: 'Pure Ingredients',
  },
];

export function SpiceGallery() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <SectionWrapper className="py-20 md:py-24 px-6" bg="ivory">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-subtitle">A Visual Journey</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Flavors in <span className="italic text-terracotta">Every Frame</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-2 md:grid-cols-3 gap-4 stagger-children ${isVisible ? 'visible' : ''}`}
        >
          {images.map((img) => (
            <div
              key={img.label}
              className="relative group rounded-2xl overflow-hidden aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 text-ivory font-serif text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
