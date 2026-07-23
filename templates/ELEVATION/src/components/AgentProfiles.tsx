import { agents } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { Mail, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function AgentProfiles() {
  const { ref, isInView } = useInView();

  return (
    <section id="team" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Our Advisors"
          title="Meet the Team"
          description="Our agents combine deep market knowledge with an unwavering commitment to exceptional client experiences."
        />

        <div
          ref={ref}
          className="mt-16 md:mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {agents.map((agent, i) => (
            <div
              key={agent.id}
              className={cn(
                'group text-center transition-all duration-700',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden rounded-[20px] aspect-[3/4] mb-6">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                  <button className="bg-white/90 backdrop-blur-sm text-charcoal p-3 rounded-full hover:bg-gold hover:text-white transition-colors" aria-label={`Email ${agent.name}`}>
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm text-charcoal p-3 rounded-full hover:bg-gold hover:text-white transition-colors" aria-label={`View ${agent.name}'s profile`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-serif text-xl md:text-[22px] font-medium text-charcoal">
                {agent.name}
              </h3>
              <p className="mt-1 text-[12px] text-gold font-semibold tracking-[0.1em] uppercase">
                {agent.title}
              </p>
              <p className="mt-2 text-[13px] text-slate font-light">
                {agent.specialization}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-forest font-medium">
                <span className="font-serif text-lg">{agent.sales}</span>
                <span className="text-slate font-light ml-1">in sales</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
