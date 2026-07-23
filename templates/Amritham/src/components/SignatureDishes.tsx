import { SectionWrapper } from './SectionWrapper';
import { KolamDividerWide } from './KolamDivider';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const dishes = [
  {
    name: 'Mysore Masala Dosa',
    description: 'Crispy golden dosa smeared with our secret red chutney, filled with spiced potato masala, served with fresh coconut chutney and sambar.',
    price: '₹180',
    tag: 'Bestseller',
    image: 'https://images.pexels.com/photos/20422121/pexels-photo-20422121.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
  },
  {
    name: 'Chettinad Chicken',
    description: 'Aromatic chicken slow-cooked with freshly ground Chettinad spices, curry leaves, and coconut. Bold, smoky, and deeply satisfying.',
    price: '₹340',
    tag: 'Chef\'s Special',
    image: 'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
  },
  {
    name: 'Kerala Appam & Stew',
    description: 'Lacy, fermented rice hoppers paired with a gentle coconut milk stew loaded with vegetables and warm spices.',
    price: '₹220',
    tag: 'Traditional',
    image: 'https://images.pexels.com/photos/20422129/pexels-photo-20422129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
  },
  {
    name: 'Bisi Bele Bath',
    description: 'Karnataka\'s iconic one-pot comfort food—rice, lentils, and vegetables simmered with a special spice powder, topped with ghee-roasted cashews.',
    price: '₹200',
    tag: 'Comfort Food',
    image: 'https://images.pexels.com/photos/20408455/pexels-photo-20408455.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
  },
  {
    name: 'Hyderabadi Dum Biryani',
    description: 'Fragrant basmati rice layered with slow-cooked meat, saffron, fried onions, and mint—sealed and steamed in the dum tradition.',
    price: '₹380',
    tag: 'Signature',
    image: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
  },
  {
    name: 'Traditional Meals',
    description: 'A complete South Indian thali served on a banana leaf with rice, sambar, rasam, kootu, poriyal, papad, payasam, and more.',
    price: '₹320',
    tag: 'Full Meal',
    image: 'https://images.pexels.com/photos/8818667/pexels-photo-8818667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400',
  },
];

export function SignatureDishes() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <SectionWrapper id="specialties" className="py-20 md:py-28 px-6" bg="ivory-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-subtitle">From Our Kitchen</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Signature <span className="italic text-terracotta">Dishes</span>
          </h2>
          <KolamDividerWide className="mb-4" />
          <p className="text-warm-gray max-w-xl mx-auto leading-relaxed">
            Each dish tells a story of tradition, patience, and love for authentic flavors
          </p>
        </div>

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${isVisible ? 'visible' : ''}`}
        >
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="bg-warm-white rounded-2xl overflow-hidden card-hover border border-brass/8"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-52 object-cover img-hover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-terracotta/90 text-warm-white text-xs font-medium px-3 py-1 rounded-lg backdrop-blur-sm">
                  {dish.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-lg text-brown-dark font-semibold leading-snug">
                    {dish.name}
                  </h3>
                  <span className="text-terracotta font-serif text-lg font-semibold whitespace-nowrap">
                    {dish.price}
                  </span>
                </div>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#menu" className="btn-secondary">
            View Full Menu
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
