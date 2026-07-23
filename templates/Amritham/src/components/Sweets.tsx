import { SectionWrapper } from './SectionWrapper';

const sweets = [
  {
    name: 'Mysore Pak',
    desc: 'Ghee-rich gram flour fudge, Mysore\'s signature sweet',
    price: '₹60',
    image: 'https://images.pexels.com/photos/37294501/pexels-photo-37294501.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
  },
  {
    name: 'Payasam',
    desc: 'Creamy vermicelli or rice kheer simmered in milk with cardamom',
    price: '₹80',
    image: 'https://images.pexels.com/photos/36672621/pexels-photo-36672621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
  },
  {
    name: 'Gulab Jamun',
    desc: 'Soft milk dumplings soaked in cardamom-scented rose syrup',
    price: '₹70',
    image: 'https://images.pexels.com/photos/37294501/pexels-photo-37294501.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
  },
  {
    name: 'Kesari Bath',
    desc: 'Saffron-infused semolina pudding with ghee and cashews',
    price: '₹70',
    image: 'https://images.pexels.com/photos/36672621/pexels-photo-36672621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=300',
  },
];

export function Sweets() {
  return (
    <SectionWrapper className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-subtitle">Sweet Endings</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            Handmade <span className="italic text-turmeric">Sweets</span> & Desserts
          </h2>
          <p className="text-warm-gray max-w-xl mx-auto leading-relaxed">
            Every sweet is handcrafted in our kitchen using pure ghee, 
            fresh milk, and time-honored techniques
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <div
              key={sweet.name}
              className="bg-warm-white rounded-2xl overflow-hidden card-hover border border-brass/8"
            >
              <div className="overflow-hidden">
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  className="w-full h-44 object-cover img-hover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-lg text-brown-dark font-semibold">{sweet.name}</h3>
                  <span className="text-turmeric font-serif font-semibold">{sweet.price}</span>
                </div>
                <p className="text-warm-gray text-sm leading-relaxed">{sweet.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
