import { SectionWrapper } from './SectionWrapper';
import { Coffee } from 'lucide-react';

const breakfastItems = [
  { name: 'Soft Idli (4 pcs)', price: '₹80', desc: 'Fluffy steamed rice cakes with sambar & chutneys' },
  { name: 'Ghee Pongal', price: '₹120', desc: 'Creamy rice & lentil porridge tempered with pepper & cumin' },
  { name: 'Medu Vada (3 pcs)', price: '₹90', desc: 'Crispy urad dal fritters with coconut chutney' },
  { name: 'Set Dosa', price: '₹110', desc: 'Soft, spongy dosas served in a set of three' },
  { name: 'Pesarattu', price: '₹130', desc: 'Green moong dal dosa, an Andhra morning specialty' },
  { name: 'Puttu & Kadala', price: '₹140', desc: 'Steamed rice cylinders with spiced black chickpeas' },
];

export function BreakfastAndCoffee() {
  return (
    <SectionWrapper className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Breakfast Section */}
          <div>
            <span className="section-subtitle">Early Morning Rituals</span>
            <h2 className="section-title text-3xl md:text-4xl mt-3 mb-3">
              Breakfast <span className="italic text-terracotta">Specialties</span>
            </h2>
            <p className="text-warm-gray leading-relaxed mb-8">
              Our day begins before dawn—grinding fresh batter, tempering spices, and preparing 
              for the morning rush. Breakfast at Amritham is a sacred ritual.
            </p>

            <div className="space-y-4">
              {breakfastItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between gap-4 bg-warm-white/70 rounded-xl px-5 py-4 border border-brass/8 card-hover"
                >
                  <div>
                    <h4 className="font-serif text-base text-brown-dark font-semibold">{item.name}</h4>
                    <p className="text-warm-gray text-sm mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-terracotta font-serif font-semibold whitespace-nowrap">{item.price}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-warm-gray-light mt-4 italic">
              * Breakfast served 6:30 AM – 11:00 AM daily. Batter freshly ground each morning.
            </p>
          </div>

          {/* Filter Coffee Section */}
          <div>
            <div className="bg-brown-dark rounded-2xl p-8 md:p-10 text-ivory relative overflow-hidden">
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-32 h-32 border border-brass rounded-full" />
                <div className="absolute bottom-8 left-8 w-24 h-24 border border-brass rounded-full" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-turmeric/20 flex items-center justify-center mb-6">
                  <Coffee size={28} className="text-turmeric" strokeWidth={1.5} />
                </div>

                <span className="text-turmeric text-xs tracking-[0.2em] uppercase font-semibold">
                  The Filter Coffee Experience
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-ivory mt-2 mb-4 font-medium">
                  Brewed the <span className="italic text-turmeric-light">Traditional</span> Way
                </h3>

                <p className="text-ivory/70 leading-relaxed mb-6">
                  Our filter coffee begins with a proprietary blend of Arabica and robusta beans, 
                  freshly roasted and ground. Brewed slowly through a traditional brass filter, 
                  mixed with farm-fresh boiled milk and served in the iconic stainless steel 
                  tumbler and davara.
                </p>

                <p className="text-ivory/70 leading-relaxed mb-8">
                  The ritual of pouring between tumbler and davara isn't just for show—it cools 
                  the coffee to the perfect temperature and creates the signature frothy top.
                </p>

                <img
                  src="https://images.pexels.com/photos/8818625/pexels-photo-8818625.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                  alt="Filter coffee being poured"
                  className="w-full h-48 object-cover rounded-xl mb-6"
                  loading="lazy"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-warm-white/10 rounded-xl p-4 text-center">
                    <span className="font-serif text-2xl text-turmeric font-semibold">₹50</span>
                    <span className="block text-xs text-ivory/60 mt-1">Single Tumbler</span>
                  </div>
                  <div className="bg-warm-white/10 rounded-xl p-4 text-center">
                    <span className="font-serif text-2xl text-turmeric font-semibold">₹80</span>
                    <span className="block text-xs text-ivory/60 mt-1">Special Degree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
