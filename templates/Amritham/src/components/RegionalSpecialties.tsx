import { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { KolamDivider } from './KolamDivider';

const regions = [
  {
    name: 'Karnataka',
    tagline: 'The Heartland',
    description: 'Rich, aromatic, and deeply comforting—Karnataka cuisine balances sweet, sour, and spicy flavors with earthy ingredients like jaggery, tamarind, and freshly ground masalas.',
    dishes: ['Bisi Bele Bath', 'Ragi Mudde', 'Mysore Masala Dosa', 'Neer Dosa', 'Akki Rotti', 'Jolada Rotti'],
    image: 'https://images.pexels.com/photos/20422121/pexels-photo-20422121.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    color: 'terracotta',
  },
  {
    name: 'Tamil Nadu',
    tagline: 'The Soul of Spice',
    description: 'Bold, vibrant, and unapologetically flavorful. Tamil Nadu cuisine is built on rice, lentils, and a masterful use of curry leaves, mustard seeds, and fiery chutneys.',
    dishes: ['Chettinad Chicken', 'Pongal', 'Kothu Parotta', 'Sambar Rice', 'Atho', 'Rasam'],
    image: 'https://images.pexels.com/photos/20422133/pexels-photo-20422133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    color: 'turmeric',
  },
  {
    name: 'Kerala',
    tagline: 'God\'s Own Kitchen',
    description: 'Coconut-kissed, subtly spiced, and beautifully layered. Kerala cuisine celebrates the bounty of the coast with fresh seafood, coconut milk, and aromatic spice gardens.',
    dishes: ['Appam & Stew', 'Kerala Fish Curry', 'Puttu & Kadala', 'Avial', 'Kerala Porotta', 'Payasam'],
    image: 'https://images.pexels.com/photos/20422129/pexels-photo-20422129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    color: 'leaf',
  },
  {
    name: 'Andhra',
    tagline: 'Fire & Flavor',
    description: 'Known for its bold heat and tangy complexity, Andhra cuisine brings a fiery intensity balanced with cooling accompaniments, pickles, and rice-based dishes.',
    dishes: ['Hyderabadi Biryani', 'Gongura Chicken', 'Pesarattu', 'Gutti Vankaya', 'Pulihora', 'Mirchi Bajji'],
    image: 'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    color: 'terracotta',
  },
  {
    name: 'Telangana',
    tagline: 'Royal Heritage',
    description: 'A rich blend of Nizami traditions and rustic Telugu cooking. Telangana cuisine features slow-cooked gravies, millet breads, and deeply spiced comfort food.',
    dishes: ['Jonna Rotte', 'Sarva Pindi', 'Sakinalu', 'Garijalu', 'Pachi Pulusu', 'Malidalu'],
    image: 'https://images.pexels.com/photos/20408455/pexels-photo-20408455.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    color: 'brass',
  },
];

export function RegionalSpecialties() {
  const [activeRegion, setActiveRegion] = useState(0);
  const region = regions[activeRegion];

  return (
    <SectionWrapper id="menu" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-subtitle">Regional Cuisines</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Five States, One <span className="italic text-terracotta">Table</span>
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto leading-relaxed">
            Each region of South India has its own culinary identity. 
            We honor every tradition with authenticity and respect.
          </p>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {regions.map((r, i) => (
            <button
              key={r.name}
              onClick={() => setActiveRegion(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                i === activeRegion
                  ? 'bg-terracotta text-warm-white shadow-md'
                  : 'bg-warm-white text-brown hover:bg-ivory-dark border border-brass/15'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Active Region Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={region.image}
              alt={`${region.name} cuisine`}
              className="w-full h-[340px] md:h-[420px] object-cover transition-all duration-500"
              loading="lazy"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-terracotta">
                {region.tagline}
              </span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-brown-dark font-medium mb-4">
              {region.name} Cuisine
            </h3>
            <KolamDivider className="justify-start mb-5" />
            <p className="text-warm-gray leading-relaxed mb-8">
              {region.description}
            </p>

            <h4 className="text-sm font-semibold text-brown-dark tracking-wide uppercase mb-4">
              Signature Dishes
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {region.dishes.map((dish) => (
                <div
                  key={dish}
                  className="flex items-center gap-2 bg-warm-white rounded-xl px-4 py-3 border border-brass/10"
                >
                  <span className="w-2 h-2 rounded-full bg-turmeric flex-shrink-0" />
                  <span className="text-sm text-brown font-medium">{dish}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
