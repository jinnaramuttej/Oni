import { marketInsights } from '../data';
import { useInView } from '../hooks/useInView';
import { cn } from '../utils/cn';
import { ArrowRight, Clock } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function MarketInsights() {
  const { ref, isInView } = useInView();

  return (
    <section id="insights" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Market Intelligence"
          title="Insights & Analysis"
          description="Expert perspectives on luxury real estate trends, architectural innovation, and investment strategy."
        />

        <div
          ref={ref}
          className="mt-16 md:mt-20 grid lg:grid-cols-3 gap-6 md:gap-8"
        >
          {marketInsights.map((insight, i) => (
            <article
              key={insight.id}
              className={cn(
                'group bg-ivory rounded-[20px] overflow-hidden transition-all duration-700 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 text-[11px] tracking-[0.1em] uppercase">
                  <span className="text-gold font-semibold">{insight.category}</span>
                  <span className="w-1 h-1 rounded-full bg-stone" />
                  <span className="text-slate flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {insight.readTime}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl md:text-[22px] font-medium text-charcoal leading-tight group-hover:text-forest transition-colors">
                  {insight.title}
                </h3>
                <p className="mt-3 text-[14px] text-slate font-light leading-relaxed line-clamp-2">
                  {insight.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[12px] text-slate/60">{insight.date}</span>
                  <span className="flex items-center gap-2 text-[12px] font-semibold text-charcoal group-hover:text-gold tracking-[0.05em] uppercase transition-colors">
                    Read More
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
