import { insights } from "../data";
import { Icons, SectionHeading } from "./ui";

export function Insights() {
  return (
    <section id="insights" className="bg-ivory-200 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Legal Insights"
            title="Perspectives from our practice"
            intro="Considered analysis on the developments shaping law, business, and private wealth."
          />
          <a
            href="#insights"
            className="reveal group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-bronze transition-colors hover:text-gold"
          >
            All Insights
            <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <Icons.arrowRight />
            </span>
          </a>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {insights.map((post, i) => (
            <article
              key={post.title}
              className="reveal group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink/5 bg-white shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              data-delay={i * 90}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-gold-soft backdrop-blur-sm">
                  {post.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-xs uppercase tracking-wider text-slate-warm">
                  {post.date}
                </span>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-bronze">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-slate-warm">
                  {post.excerpt}
                </p>
                <a
                  href="#insights"
                  className="mt-6 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-widest text-bronze transition-colors group-hover:text-gold"
                >
                  Read Article
                  <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <Icons.arrowUpRight />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
