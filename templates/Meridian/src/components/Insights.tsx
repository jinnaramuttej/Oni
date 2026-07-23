import { useReveal } from "../hooks/useReveal";
import { insights } from "../data";
import { IconArrowUpRight, IconClock } from "./icons";

export default function Insights() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="insights" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className={["reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between", visible ? "is-visible" : ""].join(" ")}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Insights & resources
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
              Thinking,{" "}
              <span className="italic font-medium text-emerald-700">distilled.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-slate-500">
              Plain-English playbooks on tax, compliance and growth — written
              by the partners who advise on these decisions every day.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-navy-700 transition hover:border-navy-700"
          >
            All insights
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {insights.map((post) => (
            <article
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.16)]"
            >
              <a href="#" className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-navy-700 backdrop-blur">
                    {post.category}
                  </div>
                </div>
              </a>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-[12px] text-slate-500">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="inline-flex items-center gap-1">
                    <IconClock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-navy-700">
                  <a href="#" className="hover:text-emerald-700 transition-colors">
                    {post.title}
                  </a>
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-slate-500">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-700 transition-colors group-hover:text-emerald-700"
                >
                  Read article
                  <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
