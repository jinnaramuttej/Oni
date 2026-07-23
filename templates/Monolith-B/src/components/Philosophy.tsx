export default function Philosophy() {
  return (
    <section id="studio" className="relative overflow-hidden bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-40">
      {/* Ambient */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.25),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                <span className="h-px w-10 bg-[#A3A3A3]" />
                [ 03 ] Philosophy
              </div>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-[#A3A3A3]">
                A short manifesto
              </p>
              <div className="mt-10 hidden md:block">
                <img
                  src="https://images.pexels.com/photos/6727764/pexels-photo-6727764.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
                  alt=""
                  loading="lazy"
                  className="float-slow aspect-[3/4] w-full max-w-xs rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <h2 className="reveal font-display text-[11vw] leading-[0.92] tracking-tight md:text-[6.5vw]">
              We treat every brand as a{" "}
              <em className="italic text-white/70">living object</em> —{" "}
              shaped by hand,{" "}
              <span className="text-[#C6FF3D]">sharpened by taste</span>, and
              built to age with grace.
            </h2>

            <div className="mt-16 grid gap-10 md:grid-cols-2 md:mt-24">
              {[
                {
                  n: "i.",
                  t: "Slow work, faster than most",
                  d: "We ship in weeks, not quarters — because obsession scales when the team is small enough to fit in one room.",
                },
                {
                  n: "ii.",
                  t: "Every pixel is a decision",
                  d: "There are no defaults, no templates, no filler. Each detail earns its place or it disappears entirely.",
                },
                {
                  n: "iii.",
                  t: "Craft is a form of respect",
                  d: "For the user, for the client, for the medium. We'd rather rebuild something twice than ship it once and half-right.",
                },
                {
                  n: "iv.",
                  t: "Beauty is a business asset",
                  d: "Well-designed brands convert, retain and outlast. We can prove it — with numbers and with time.",
                },
              ].map((it, i) => (
                <div
                  key={i}
                  className="reveal border-t border-white/10 pt-6"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl italic text-[#C6FF3D]">
                      {it.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                      Principle
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
                    {it.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {it.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
