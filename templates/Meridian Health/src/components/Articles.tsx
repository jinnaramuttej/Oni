import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const articles = [
  {
    image: '/images/article-1.jpg',
    tag: 'Nutrition',
    title: 'Small dietary changes with lasting impact',
    excerpt: 'Our nutritionists share practical, evidence-based tips for sustainable healthy eating.',
    read: '5 min read',
  },
  {
    image: '/images/article-2.jpg',
    tag: 'Heart Health',
    title: 'Understanding your annual cardiac screening',
    excerpt: 'What each number on your cardiac panel actually means for your long-term health.',
    read: '7 min read',
  },
  {
    image: '/images/article-3.jpg',
    tag: 'Mental Wellness',
    title: 'Managing stress in a demanding world',
    excerpt: 'Simple, clinically-backed practices to protect your mental health day to day.',
    read: '4 min read',
  },
];

export default function Articles() {
  return (
    <section id="articles" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-sm font-semibold text-teal">
                Health Articles
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-navy-dark sm:text-[44px]">
                Insights from our care team
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.title} delay={0.07 * i}>
              <article className="group cursor-pointer overflow-hidden rounded-[20px] border border-navy/8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="bg-white p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-teal">
                    <span>{a.tag}</span>
                    <span className="h-1 w-1 rounded-full bg-slate/40" />
                    <span className="text-slate/60 normal-case tracking-normal">{a.read}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-navy-dark">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-slate">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-dark group-hover:text-teal">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
