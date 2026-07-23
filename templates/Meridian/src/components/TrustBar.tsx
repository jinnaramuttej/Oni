import { trustLogos } from "../data";

export default function TrustBar() {
  return (
    <section className="border-y border-slate-200/70 bg-paper">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-[12px] uppercase tracking-[0.2em] text-slate-500">
              Trusted by ambitious teams
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
              From bootstrapped studios to publicly listed enterprises — across 14 sectors.
            </p>
          </div>
          <div className="lg:col-span-9">
            <div className="grid grid-cols-3 gap-y-6 sm:grid-cols-6">
              {trustLogos.map((l) => (
                <div
                  key={l}
                  className="group flex h-12 items-center justify-center"
                >
                  <span className="font-display text-[18px] font-semibold tracking-tight text-slate-400 transition-colors group-hover:text-navy-700">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
