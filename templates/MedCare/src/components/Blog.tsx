import { useInView } from '../hooks/useInView';
import { ArrowRight, Clock } from 'lucide-react';

const articles = [
  {
    title: 'Understanding Heart Health: Prevention Tips for Every Age',
    excerpt: 'Learn essential heart-healthy habits from our cardiologists that can significantly reduce your risk of cardiovascular disease.',
    category: 'Cardiology',
    readTime: '5 min read',
    date: 'Dec 15, 2025',
    image: 'https://images.pexels.com/photos/7653108/pexels-photo-7653108.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    title: 'The Importance of Regular Health Screenings',
    excerpt: 'Discover which health screenings you should prioritize based on your age, gender, and family history.',
    category: 'Preventive Care',
    readTime: '4 min read',
    date: 'Dec 10, 2025',
    image: 'https://images.pexels.com/photos/8413162/pexels-photo-8413162.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
  {
    title: 'Managing Childhood Allergies: A Parent\'s Guide',
    excerpt: 'Expert advice from our pediatric team on identifying, managing, and treating common childhood allergies effectively.',
    category: 'Pediatrics',
    readTime: '6 min read',
    date: 'Dec 5, 2025',
    image: 'https://images.pexels.com/photos/5996651/pexels-photo-5996651.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
  },
];

export default function Blog() {
  const [ref, inView] = useInView();

  return (
    <section id="blog" className="py-20 lg:py-28 bg-white" aria-labelledby="blog-heading">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="inline-flex items-center gap-2 text-teal text-sm font-semibold tracking-wider uppercase mb-4">
              <span className="w-8 h-px bg-teal" />
              Health Blog
            </span>
            <h2 id="blog-heading" className="text-3xl sm:text-4xl font-bold text-navy leading-tight font-heading">
              Latest Health{' '}
              <span className="text-teal">Articles</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-teal transition-colors mt-4 sm:mt-0"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <article
              key={article.title}
              className={`group bg-white rounded-[var(--radius-card)] border border-border-light overflow-hidden hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}
            >
              <div className="overflow-hidden aspect-[16/10]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-light-blue text-navy text-xs font-semibold rounded-pill">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-text/60">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy font-heading mb-2 group-hover:text-teal transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-text leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-text/50">{article.date}</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-teal group-hover:gap-2 transition-all duration-300">
                    Read More
                    <ArrowRight className="w-3.5 h-3.5" />
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
