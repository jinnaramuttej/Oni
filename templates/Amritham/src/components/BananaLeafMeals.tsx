import { SectionWrapper } from './SectionWrapper';
import { KolamDivider } from './KolamDivider';

const mealIncludes = [
  'Steamed rice', 'Sambar', 'Rasam', 'Kootu', 'Poriyal (seasonal vegetable)',
  'Mor Kuzhambu', 'Appalam', 'Pickle', 'Buttermilk', 'Payasam (dessert)',
  'Banana', 'Curd rice',
];

export function BananaLeafMeals() {
  return (
    <SectionWrapper className="py-20 md:py-28 px-6" bg="ivory-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          {/* Content - takes 3 columns */}
          <div className="lg:col-span-3">
            <span className="section-subtitle">Served with Love</span>
            <h2 className="section-title text-3xl md:text-4xl mt-3 mb-3">
              Traditional Banana Leaf <span className="italic text-leaf">Meals</span>
            </h2>
            <KolamDivider className="justify-start mb-6" />

            <p className="text-warm-gray leading-relaxed mb-4">
              In South India, a meal served on a banana leaf is more than food—it's a 
              ceremony of hospitality. The leaf adds a subtle, earthy flavor, the food 
              is served in a specific order, and every item has its place.
            </p>
            <p className="text-warm-gray leading-relaxed mb-8">
              Our unlimited meals include the full traditional experience: start with 
              papad and pickle, move through the curries and rice, and finish with curd 
              rice and payasam. Refills are always served with a smile.
            </p>

            <h4 className="text-sm font-semibold text-brown-dark tracking-wide uppercase mb-4">
              Your Meal Includes
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
              {mealIncludes.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf flex-shrink-0" />
                  <span className="text-sm text-brown">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="bg-leaf/10 rounded-xl px-6 py-4 border border-leaf/20">
                <span className="block text-xs text-leaf font-semibold tracking-wide uppercase">
                  Unlimited Veg Meals
                </span>
                <span className="font-serif text-3xl text-leaf-dark font-semibold">₹280</span>
              </div>
              <div className="bg-terracotta/10 rounded-xl px-6 py-4 border border-terracotta/20">
                <span className="block text-xs text-terracotta font-semibold tracking-wide uppercase">
                  Non-Veg Meals
                </span>
                <span className="font-serif text-3xl text-terracotta-dark font-semibold">₹380</span>
              </div>
            </div>

            <p className="text-xs text-warm-gray-light mt-4 italic">
              * Meals served 12:00 PM – 3:30 PM (Lunch) & 7:00 PM – 10:00 PM (Dinner)
            </p>
          </div>

          {/* Image - takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src="https://images.pexels.com/photos/8818667/pexels-photo-8818667.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=600"
                alt="Traditional South Indian meal served on banana leaf"
                className="w-full h-[400px] lg:h-[560px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <p className="font-serif text-xl italic">
                  "A meal on a banana leaf feeds both body and soul"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
