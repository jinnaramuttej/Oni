import { useReveal } from "../hooks/useReveal";
import { industries } from "../data";
import { IconArrowUpRight } from "./icons";

export default function Industries() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="industries" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className={["reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between", visible ? "is-visible" : ""].join(" ")}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-paper px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Industries we serve
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
              Sector specialists,{" "}
              <span className="italic font-medium text-emerald-700">not generalists.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-slate-500">
              Each industry has its own tax quirks, compliance cadence and
              investor expectations. We work in the trenches of eight — and
              bring that depth to every engagement.
            </p>
          </div>
          <a
            href="#book-call"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-navy-700 transition hover:border-navy-700"
          >
            See sector case studies
            <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-slate-200/80 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <a
                key={ind.name}
                href="#book-call"
                className="group relative flex flex-col gap-4 bg-white p-6 transition-all hover:bg-paper"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700 ring-1 ring-navy-100 transition-colors group-hover:bg-navy-700 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <IconArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-700" />
                </div>
                <div>
                  <div className="text-[15.5px] font-semibold text-navy-700">
                    {ind.name}
                  </div>
                  <div className="mt-1 text-[12.5px] font-medium text-slate-500">
                    {ind.count}
                  </div>
                </div>
                <div className="h-px w-full bg-slate-100" />
                <div className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Sector practice
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
