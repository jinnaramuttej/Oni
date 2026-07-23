import { useInView } from '../hooks/useInView';
import { Scale, Users, Briefcase, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Scale, value: '2,500+', label: 'Cases Won' },
  { icon: Users, value: '45+', label: 'Attorneys' },
  { icon: Briefcase, value: '98%', label: 'Success Rate' },
  { icon: TrendingUp, value: '$2.8B', label: 'Recovered' },
];

export default function About() {
  const { ref: imageRef, isInView: imageInView } = useInView();
  const { ref: contentRef, isInView: contentInView } = useInView();
  const { ref: statsRef, isInView: statsInView } = useInView();

  return (
    <section id="about" className="py-24 lg:py-32 bg-ivory" aria-label="About the firm">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className={`relative ${imageInView ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="relative overflow-hidden rounded-[18px]">
              <img
                src="https://images.pexels.com/photos/7648226/pexels-photo-7648226.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700"
                alt="Sterling & Associates team in a collaborative strategy session"
                className="h-[500px] lg:h-[600px] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-2 lg:-right-8 rounded-[16px] bg-midnight p-6 shadow-2xl shadow-black/20">
              <span className="block font-serif text-3xl font-bold text-gold">20+</span>
              <span className="mt-1 block text-[13px] font-medium tracking-wide text-ivory/60 uppercase">Years of<br/>Excellence</span>
            </div>
            {/* Gold accent */}
            <div className="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-gold/40 rounded-tl-[18px]" />
          </div>

          {/* Content */}
          <div ref={contentRef} className={contentInView ? 'animate-fade-up delay-200' : 'opacity-0'}>
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-line" />
              <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-gold">Our Firm</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight text-midnight">
              A Legacy of Legal <br className="hidden lg:block" />
              <span className="text-gold">Excellence & Integrity</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-custom">
              Founded in 2003, Sterling & Associates has grown from a boutique practice 
              into one of the most respected full-service law firms in the nation. Our 
              unwavering commitment to client advocacy, meticulous case preparation, and 
              strategic counsel has established us as the trusted advisors to industry leaders.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-custom">
              We believe in building enduring relationships founded on transparency, 
              expertise, and results. Every case we undertake receives the full depth 
              of our resources and the personal attention of our senior partners.
            </p>

            {/* Values */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {['Strategic Counsel', 'Client-First Approach', 'Ethical Excellence', 'Proven Results'].map((value) => (
                <div key={value} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-[14px] font-medium text-charcoal">{value}</span>
                </div>
              ))}
            </div>

            <a
              href="#practice-areas"
              className="mt-10 inline-flex items-center gap-2 rounded-[14px] border border-gold bg-gold/5 px-7 py-3.5 text-[13px] font-semibold tracking-[0.06em] uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-midnight"
            >
              Discover Our Expertise
            </a>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 ${statsInView ? 'animate-fade-up' : 'opacity-0'}`}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group rounded-[16px] border border-warm-gray bg-white p-8 text-center transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <stat.icon size={28} className="mx-auto text-gold/70 mb-4" strokeWidth={1.5} />
              <span className="block font-serif text-3xl lg:text-4xl font-bold text-midnight">{stat.value}</span>
              <span className="mt-2 block text-[13px] font-medium tracking-[0.1em] uppercase text-slate-custom">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
