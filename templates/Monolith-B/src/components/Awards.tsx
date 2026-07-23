const rows = [
  { year: "2026", title: "Site of the Year — Nominee", org: "Awwwards", cat: "Digital" },
  { year: "2026", title: "Editorial Rebrand of the Year", org: "Brand New", cat: "Brand" },
  { year: "2025", title: "FWA of the Day × 4", org: "The FWA", cat: "Interactive" },
  { year: "2025", title: "European Design Awards — Gold", org: "ED-Awards", cat: "Editorial" },
  { year: "2025", title: "Type Directors Club — Certificate", org: "TDC", cat: "Typography" },
  { year: "2024", title: "D&AD Wood Pencil × 2", org: "D&AD", cat: "Craft" },
  { year: "2024", title: "Red Dot — Best of the Best", org: "Red Dot", cat: "Product" },
  { year: "2024", title: "CSS Design Awards — Site of the Day", org: "CSSDA", cat: "Digital" },
];

const clients = [
  "Aesop",
  "Loewe",
  "MUBI",
  "Nike ACG",
  "Kinfolk",
  "Ace Hotel",
  "A24",
  "Bang & Olufsen",
  "Ssense",
  "Off-White",
  "Le Labo",
  "Rimowa",
];

export default function Awards() {
  return (
    <section className="relative border-t border-white/10 bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-10">
          {/* Left — Awards */}
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              <span className="h-px w-10 bg-[#A3A3A3]" />
              [ 05 ] Recognition
            </div>
            <h2 className="mt-6 font-display text-[13vw] leading-[0.9] tracking-tight md:text-[6.5vw]">
              A shelf we <em className="italic text-[#C6FF3D]">dust</em>{" "}
              occasionally.
            </h2>

            <ul className="mt-16 divide-y divide-white/10 border-y border-white/10">
              {rows.map((r, i) => (
                <li
                  key={i}
                  className="reveal group grid grid-cols-12 items-center gap-4 py-5 transition-colors hover:bg-white/[0.03] md:py-6"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="col-span-2 font-mono text-xs uppercase tracking-[0.24em] text-[#A3A3A3] md:col-span-1">
                    {r.year}
                  </span>
                  <span className="col-span-10 font-display text-xl leading-tight tracking-tight md:col-span-7 md:text-2xl">
                    {r.title}
                  </span>
                  <span className="col-span-6 mt-1 text-sm text-white/70 md:col-span-2 md:mt-0">
                    {r.org}
                  </span>
                  <span className="col-span-6 mt-1 text-right font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3] md:col-span-2 md:mt-0">
                    {r.cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Clients */}
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                <span className="h-px w-10 bg-[#A3A3A3]" />
                Selected clients
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/60">
                A small sample of the founders and creative directors we've
                been lucky enough to partner with.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {clients.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 font-display text-lg tracking-tight transition-all hover:border-[#C6FF3D] hover:text-[#C6FF3D]"
                  >
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {[
                  { k: "48", l: "Projects shipped" },
                  { k: "17", l: "Countries" },
                  { k: "9.4", l: "NPS score" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display text-4xl leading-none">
                      {s.k}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
