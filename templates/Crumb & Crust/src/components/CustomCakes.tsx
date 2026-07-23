import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';
import { Heart, Palette, MessageCircle, Truck } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Consultation',
    desc: 'Share your vision, theme, and flavor preferences in a complimentary tasting session.',
  },
  {
    icon: Palette,
    title: 'Design',
    desc: 'Our designers create a custom sketch and flavor profile tailored to your celebration.',
  },
  {
    icon: Heart,
    title: 'Handcraft',
    desc: 'Your cake is baked, filled, and decorated by hand with premium ingredients.',
  },
  {
    icon: Truck,
    title: 'Delivery',
    desc: 'Carefully packaged and delivered to your venue, ready to dazzle your guests.',
  },
];

export default function CustomCakes() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="custom" className="py-20 lg:py-32 bg-light-beige texture-linen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Image Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-[20px] overflow-hidden shadow-md">
                  <img
                    src="https://images.pexels.com/photos/18565655/pexels-photo-18565655.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400"
                    alt="Wedding cake with roses"
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-[20px] overflow-hidden shadow-md">
                  <img
                    src="https://images.pexels.com/photos/7525107/pexels-photo-7525107.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=350&w=400"
                    alt="Decorating a cake"
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="rounded-[20px] overflow-hidden shadow-md">
                  <img
                    src="https://images.pexels.com/photos/28259729/pexels-photo-28259729.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400"
                    alt="Three-tier wedding cake"
                    loading="lazy"
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-[20px] overflow-hidden shadow-md">
                  <img
                    src="https://images.pexels.com/photos/7711164/pexels-photo-7711164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400"
                    alt="Marble icing cake with flowers"
                    loading="lazy"
                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.25em] text-caramel font-medium">Bespoke Creations</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-chocolate leading-tight">
              Custom Celebration <br />
              <span className="italic text-caramel">& Wedding Cakes</span>
            </h2>
            <p className="mt-6 text-warm-gray font-light leading-relaxed">
              From intimate birthday gatherings to grand wedding receptions, our master bakers 
              and cake designers collaborate with you to create an edible masterpiece that 
              perfectly reflects your style and taste.
            </p>

            <div className="mt-10 space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-caramel/10 flex items-center justify-center">
                    <step.icon size={18} className="text-caramel" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-chocolate">{step.title}</h4>
                    <p className="mt-1 text-sm text-warm-gray font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#order"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-[20px] bg-caramel text-white font-medium text-sm shadow-lg shadow-caramel/15 hover:bg-chocolate transition-all duration-300 hover:scale-[1.02]"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
