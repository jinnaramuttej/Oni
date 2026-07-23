import { services } from "../data";
import { useReveal } from "../hooks/useReveal";
import { IconArrowUpRight } from "./icons";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Icon = service.icon;
  return (
    <div
      ref={ref}
      className={[
        "group relative flex flex-col rounded-[20px] border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-navy-700/30 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]",
        "reveal",
        visible ? "is-visible" : "",
      ].join(" ")}
      style={{ transitionDelay: `${Math.min(index * 0.05, 0.4)}s` }}
    >
      {/* subtle hover gradient */}
      <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-br from-navy-50/0 via-transparent to-emerald-50/0 opacity-0 transition-opacity duration-500 group-hover:from-navy-50/40 group-hover:to-emerald-50/30 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-50 text-navy-700 ring-1 ring-navy-100 transition-colors group-hover:bg-navy-700 group-hover:text-white">
          <Icon className="h-5.5 w-5.5" />
        </div>
        <span className="font-display text-[13px] font-medium text-slate-300 transition-colors group-hover:text-slate-400">
          0{index + 1}
        </span>
      </div>

      <h3 className="relative mt-6 text-[20px] font-semibold tracking-tight text-navy-700">
        {service.title}
      </h3>
      <p className="relative mt-2.5 text-[14.5px] leading-[1.65] text-slate-500">
        {service.description}
      </p>

      <ul className="relative mt-5 space-y-1.5 border-t border-slate-100 pt-5">
        {service.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-[13px] text-slate-600"
          >
            <span className="h-1 w-1 rounded-full bg-emerald-600" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={service.href}
        className="relative mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-700 transition-colors group-hover:text-emerald-700"
      >
        Book a consultation
        <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

export default function Services() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div
          ref={ref}
          className={["reveal", visible ? "is-visible" : ""].join(" ")}
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-paper px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Our services
              </div>
              <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
                Everything finance,{" "}
                <span className="italic font-medium text-emerald-700">under one roof.</span>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-slate-500">
                From daily bookkeeping to annual audit, from GST to global
                expansion — partner-led pods that know your business and ship
                work, not just advice.
              </p>
            </div>
            <a
              href="#book-call"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] font-semibold text-navy-700 transition hover:border-navy-700"
            >
              View all capabilities
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
