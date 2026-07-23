import { KolamDividerWide } from './KolamDivider';
import { SectionWrapper } from './SectionWrapper';

export function Story() {
  return (
    <SectionWrapper id="story" className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-subtitle">Our Heritage</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mt-3 mb-4">
            A Story Written in <span className="italic text-terracotta">Flavors</span>
          </h2>
          <KolamDividerWide className="mb-6" />
          <p className="text-warm-gray max-w-2xl mx-auto leading-relaxed">
            Three generations of culinary passion, rooted in the rich traditions of South India
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/37330104/pexels-photo-37330104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700"
                alt="Traditional cooking in our kitchen"
                className="w-full h-[400px] md:h-[520px] object-cover img-hover"
                loading="lazy"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brass/20 rounded-2xl -z-10" />
            {/* Year badge */}
            <div className="absolute -bottom-6 -left-4 md:-left-6 bg-terracotta text-warm-white px-6 py-3 rounded-xl shadow-lg">
              <span className="font-serif text-2xl font-semibold">1987</span>
              <span className="block text-[10px] tracking-widest uppercase opacity-80">Since</span>
            </div>
          </div>

          {/* Story Text */}
          <div className="space-y-6">
            <p className="text-lg text-brown leading-relaxed">
              In 1987, <strong className="text-brown-dark">Padma Lakshmi Rao</strong>, a home cook 
              from a small village near Udupi, opened a tiny eatery in Bengaluru with nothing 
              but her grandmother's recipes and an unwavering belief that food made with love 
              nourishes more than just the body.
            </p>
            <p className="text-warm-gray leading-relaxed">
              What began as a modest eight-table restaurant serving filter coffee and steaming 
              idlis at dawn has grown into a beloved institution. But the heart of Amritham 
              remains unchanged—every recipe is still prepared the way Padma's grandmother 
              taught her, grinding fresh batter before sunrise, tempering spices by hand, and 
              serving meals on banana leaves with genuine warmth.
            </p>
            <p className="text-warm-gray leading-relaxed">
              Today, her son <strong className="text-brown-dark">Chef Karthik Rao</strong> and 
              daughter-in-law <strong className="text-brown-dark">Meena</strong> continue this legacy, 
              bringing together the diverse culinary traditions of Karnataka, Tamil Nadu, Kerala, 
              Andhra Pradesh, and Telangana under one roof.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brass/15">
              <div className="text-center">
                <span className="font-serif text-3xl text-terracotta font-semibold">37+</span>
                <span className="block text-xs text-warm-gray mt-1 tracking-wide uppercase">Years of Legacy</span>
              </div>
              <div className="text-center">
                <span className="font-serif text-3xl text-terracotta font-semibold">150+</span>
                <span className="block text-xs text-warm-gray mt-1 tracking-wide uppercase">Authentic Dishes</span>
              </div>
              <div className="text-center">
                <span className="font-serif text-3xl text-terracotta font-semibold">5</span>
                <span className="block text-xs text-warm-gray mt-1 tracking-wide uppercase">Regional Cuisines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
