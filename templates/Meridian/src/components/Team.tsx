import { useReveal } from "../hooks/useReveal";
import { team } from "../data";
import { IconLinkedin, IconAward } from "./icons";

export default function Team() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="team" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={ref}
          className={["reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between", visible ? "is-visible" : ""].join(" ")}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Meet the experts
            </div>
            <h2 className="mt-5 font-display text-[40px] md:text-[52px] font-semibold leading-[1.04] tracking-[-0.022em] text-navy-700">
              Partners who pick up{" "}
              <span className="italic font-medium text-emerald-700">the phone.</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.7] text-slate-500">
              Senior chartered accountants, ex-Big 4 operators and fintech
              builders. You'll know your partner by name — and they'll know
              your business.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <article
              key={m.name}
              className="group relative overflow-hidden rounded-[20px] border border-slate-200/80 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-navy-700 backdrop-blur">
                  <IconAward className="h-3 w-3 text-gold-500" />
                  {m.credentials.split(",")[0]}
                </div>
                <a
                  href="#"
                  aria-label={`${m.name} on LinkedIn`}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-navy-700 backdrop-blur transition hover:bg-white"
                >
                  <IconLinkedin className="h-4 w-4" />
                </a>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-display text-[18px] font-semibold leading-tight">
                    {m.name}
                  </div>
                  <div className="text-[12.5px] text-white/80">{m.role}</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[13px] leading-[1.65] text-slate-500">
                  {m.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
