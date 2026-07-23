import { IMAGES } from '../data/content';
import RevealSection from './RevealSection';

export default function Booking() {
  return (
    <section id="booking" className="relative bg-charcoal py-28 lg:py-40 overflow-hidden">
      {/* Subtle background image overlay */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={IMAGES.lakeMeditation}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 text-center">
        <RevealSection>
          <p className="text-[11px] font-light tracking-[0.35em] uppercase text-sage-light mb-4">Begin Your Journey</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
            Your First Class<br />
            <span className="italic text-white/80">Is Complimentary</span>
          </h2>
          <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-white/50 mb-12">
            We believe the best way to experience Sōl is to feel it for yourself. 
            Book your complimentary introductory class and discover the practice that's 
            been waiting for you.
          </p>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="mx-auto max-w-lg rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-2xl bg-white/8 border border-white/10 px-6 py-4 text-sm font-light text-white placeholder:text-white/30 outline-none focus:border-sage/50 transition-colors"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-2xl bg-white/8 border border-white/10 px-6 py-4 text-sm font-light text-white placeholder:text-white/30 outline-none focus:border-sage/50 transition-colors"
              />
              <select className="w-full rounded-2xl bg-white/8 border border-white/10 px-6 py-4 text-sm font-light text-white/50 outline-none focus:border-sage/50 transition-colors appearance-none cursor-pointer">
                <option value="">Choose a class</option>
                <option value="vinyasa">Gentle Vinyasa Flow</option>
                <option value="yin">Restorative Yin</option>
                <option value="meditation">Morning Meditation</option>
                <option value="power">Power Flow</option>
                <option value="breathwork">Breathwork Journey</option>
                <option value="soundbath">Sunset Sound Bath</option>
              </select>
              <button className="w-full rounded-2xl bg-eucalyptus py-4 text-[13px] font-light tracking-widest uppercase text-white shadow-lg shadow-eucalyptus/20 transition-all hover:bg-eucalyptus-dark hover:shadow-xl hover:scale-[1.01]">
                Book Your Free Class
              </button>
            </div>
            <p className="mt-5 text-[11px] font-light text-white/25">
              No credit card required. Cancel anytime with 4 hours notice.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
