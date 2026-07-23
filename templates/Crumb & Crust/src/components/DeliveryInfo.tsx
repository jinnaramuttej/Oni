import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { Truck, Gift, Shield, Leaf } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Local Delivery',
    desc: 'Complimentary delivery on orders over $50 within 10 miles of our bakery.',
  },
  {
    icon: Gift,
    title: 'Gift Packaging',
    desc: 'Beautiful kraft and ribbon packaging available for all gift orders.',
  },
  {
    icon: Shield,
    title: 'Freshness Guaranteed',
    desc: 'Every item baked on the day of your order. We never sell day-old goods.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    desc: 'Local farms, organic flour, free-range eggs, and eco-friendly packaging.',
  },
];

export default function DeliveryInfo() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div
        ref={ref}
        className={cn(
          'mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 lg:p-8 rounded-[20px] bg-ivory/60 hover:bg-ivory transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-caramel/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-caramel" />
              </div>
              <h3 className="font-serif text-lg text-chocolate">{f.title}</h3>
              <p className="mt-2 text-sm text-warm-gray font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
