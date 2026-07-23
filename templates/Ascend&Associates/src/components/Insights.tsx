import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

const articles = [
  {
    category: 'Tax Planning',
    title: 'New Income Tax Regime 2025: What Businesses Need to Know',
    excerpt: 'A comprehensive breakdown of the latest tax reforms and how they impact corporate planning strategies for the upcoming fiscal year.',
    date: 'Dec 15, 2025',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/7821543/pexels-photo-7821543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    category: 'GST',
    title: 'GST Compliance Simplified: A Guide for E-Commerce Sellers',
    excerpt: 'Navigate the complex world of GST for online businesses with practical steps for registration, filing, and input tax credit claims.',
    date: 'Nov 28, 2025',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    category: 'Business Growth',
    title: 'Financial KPIs Every Startup Founder Must Track',
    excerpt: 'Beyond revenue and profit—discover the critical financial metrics that separate high-growth startups from the rest.',
    date: 'Nov 10, 2025',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/7413910/pexels-photo-7413910.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
];

export default function Insights() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="insights" className="py-24 lg:py-32 bg-surface">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 mb-6 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-xs font-semibold text-navy tracking-wider uppercase">Insights & Resources</span>
            </div>
            <h2
              className={`text-3xl lg:text-[2.75rem] font-bold text-navy leading-tight tracking-tight transition-all duration-600 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Expert Financial
              <br />
              Perspectives
            </h2>
          </div>
          <a
            href="#"
            className={`inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-emerald transition-all duration-600 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            View All Articles
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <article
              key={i}
              className={`group rounded-[20px] bg-white border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${250 + i * 100}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-navy">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-semibold text-navy leading-snug mb-3 group-hover:text-emerald transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-text leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-text">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
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
