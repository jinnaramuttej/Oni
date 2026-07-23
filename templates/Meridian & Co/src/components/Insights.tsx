import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Reveal, SectionHeading, LazyImage } from "../lib/ui";

type Post = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
};

const POSTS: Post[] = [
  {
    category: "Tax Briefing",
    title: "Budget 2025: seven takeaways every SME owner should note",
    excerpt: "Revised slabs, presumptive schemes and what the new compliance calendar means for your cash flow.",
    date: "Feb 2025",
    readTime: "6 min read",
    image:
      "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
  },
  {
    category: "GST & Indirect Tax",
    title: "E-invoicing: your practical compliance checklist for this year",
    excerpt: "Thresholds, IRN workflows and the five errors that trigger the most department queries.",
    date: "Jan 2025",
    readTime: "8 min read",
    image:
      "https://images.pexels.com/photos/7947638/pexels-photo-7947638.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
  },
  {
    category: "CFO Insights",
    title: "The founder's playbook for audit-ready books",
    excerpt: "A monthly close routine that keeps diligence painless — whether or not you ever fundraise.",
    date: "Dec 2024",
    readTime: "5 min read",
    image:
      "https://images.pexels.com/photos/6248959/pexels-photo-6248959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=560&w=840",
  },
];

export default function Insights() {
  return (
    <section id="insights" className="bg-white py-24 md:py-32" aria-label="Insights and resources">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Insights & resources"
            title={
              <>
                Sharper reading for <span className="text-green-700">sharper decisions.</span>
              </>
            }
            description="Plain-language briefings our team publishes after every budget, circular and regulatory shift — written for decision-makers, not file cabinets."
          />
          <Reveal delay={220}>
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-navy-800 transition-colors hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 rounded-lg"
            >
              View all insights
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 120} className="h-full">
              <li className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200/90 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-green-700/25 hover:shadow-lift">
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={post.image}
                      alt={`${post.category} — article cover`}
                      className="h-52"
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-700 shadow-card backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-lg font-extrabold leading-snug tracking-tight text-navy-800 transition-colors group-hover:text-green-800">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readTime} · {post.date}
                      </p>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-navy-700 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
