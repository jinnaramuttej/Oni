import { useInView } from '../hooks/useInView';
import SectionHeader from './SectionHeader';
import { ArrowRight, Clock } from 'lucide-react';

const articles = [
  {
    category: 'Corporate Law',
    title: 'Navigating Cross-Border M&A in an Era of Heightened Regulatory Scrutiny',
    excerpt: 'Recent regulatory developments have created new complexities for international transactions. Our analysis examines strategic approaches for deal execution.',
    date: 'March 12, 2025',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/6950031/pexels-photo-6950031.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    category: 'Intellectual Property',
    title: 'AI-Generated Content and the Evolving Landscape of Copyright Protection',
    excerpt: 'As generative AI reshapes content creation, intellectual property frameworks face unprecedented challenges requiring strategic legal positioning.',
    date: 'February 28, 2025',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/8112110/pexels-photo-8112110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    category: 'Litigation',
    title: 'Supreme Court Ruling Reshapes Securities Class Action Standards',
    excerpt: 'The Court\'s landmark decision introduces new requirements for class certification in securities fraud cases with significant implications for corporate defendants.',
    date: 'February 15, 2025',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/20185389/pexels-photo-20185389.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
];

export default function Insights() {
  const { ref, isInView } = useInView();

  return (
    <section id="insights" className="py-24 lg:py-32 bg-ivory" aria-label="Legal insights">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <SectionHeader
          tag="Insights"
          title="Legal Intelligence"
          description="Thought leadership and analysis from our attorneys on the legal developments shaping business strategy and corporate governance."
        />

        <div ref={ref} className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, i) => (
            <article
              key={i}
              className={`group rounded-[18px] overflow-hidden border border-warm-gray bg-white transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="overflow-hidden aspect-[3/2]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-gold">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-custom/50">
                    <Clock size={12} />
                    <span className="text-[11px]">{article.readTime}</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-semibold text-midnight leading-snug group-hover:text-gold transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-custom line-clamp-3">{article.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px] text-slate-custom/50">{article.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-[14px] border border-gold bg-gold/5 px-7 py-3.5 text-[13px] font-semibold tracking-[0.06em] uppercase text-gold transition-all duration-300 hover:bg-gold hover:text-midnight"
          >
            View All Insights
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
