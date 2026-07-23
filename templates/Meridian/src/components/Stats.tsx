import { useReveal, useCountUp } from "../hooks/useReveal";
import { stats } from "../data";

function StatCard({
  stat,
  index,
  start,
}: {
  stat: (typeof stats)[number];
  index: number;
  start: boolean;
}) {
  const v = useCountUp(stat.value, start, 1800);
  return (
    <div
      className="group relative flex flex-col justify-between rounded-[20px] border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/10"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between">
        <div className="font-display text-[52px] md:text-[64px] font-semibold leading-none tracking-[-0.03em] text-white tabular-nums">
          {v.toLocaleString("en-IN")}
          <span className="text-emerald-300">{stat.suffix}</span>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-white/60">
          {stat.label}
        </span>
      </div>
    </div>
  );
}

export default function Stats() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <section className="relative isolate overflow-hidden bg-navy-700 py-24 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-600/15 blur-3xl" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              By the numbers
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-white">
              A decade of craft, measured{" "}
              <span className="italic font-medium text-emerald-300">in outcomes.</span>
            </h2>
          </div>
          <p className="text-[15.5px] leading-[1.7] text-white/65 lg:col-span-5">
            The numbers below are not vanity — they are the result of a
            consistent, partner-led process that puts clients first. We
            benchmark every quarter against ICAI, NASSCOM and the Big 4.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} start={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
