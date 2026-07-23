import { SectionWrapper } from './SectionWrapper';
import { KolamDivider } from './KolamDivider';
import { Users, Cake, Star, Utensils } from 'lucide-react';

const services = [
  {
    icon: Utensils,
    title: 'Wedding Catering',
    desc: 'Elaborate traditional menus served on banana leaves for weddings and engagement ceremonies.',
  },
  {
    icon: Users,
    title: 'Family Gatherings',
    desc: 'Customized menus for family occasions—naming ceremonies, house warmings, and milestones.',
  },
  {
    icon: Star,
    title: 'Corporate Events',
    desc: 'Professional catering for corporate gatherings with authentic South Indian cuisine.',
  },
  {
    icon: Cake,
    title: 'Festival Celebrations',
    desc: 'Special festival menus for Pongal, Onam, Ugadi, and Vishu celebrations.',
  },
];

export function Catering() {
  return (
    <SectionWrapper id="catering" className="py-20 md:py-28 px-6 texture-overlay" bg="ivory-dark">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="section-subtitle">Celebrations & Events</span>
            <h2 className="section-title text-3xl md:text-4xl mt-3 mb-3">
              Bring Amritham to Your <span className="italic text-terracotta">Celebrations</span>
            </h2>
            <KolamDivider className="justify-start mb-6" />

            <p className="text-warm-gray leading-relaxed mb-8">
              From intimate family gatherings to grand wedding feasts, our catering 
              team brings the full Amritham experience to your doorstep. Authentic 
              recipes, traditional serving style, and the warmth of home-cooked food 
              for up to 2,000 guests.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-warm-white rounded-xl p-5 card-hover border border-brass/8"
                >
                  <s.icon size={22} className="text-terracotta mb-3" strokeWidth={1.5} />
                  <h4 className="font-serif text-base text-brown-dark font-semibold mb-1">{s.title}</h4>
                  <p className="text-warm-gray text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary">
              Enquire About Catering
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/36799071/pexels-photo-36799071.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=700"
                alt="Family gathering with traditional food"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-terracotta/15 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
