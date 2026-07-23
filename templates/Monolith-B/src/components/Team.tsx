const team = [
  {
    name: "Iris Vogel",
    role: "Founder / ECD",
    location: "Berlin",
    image:
      "https://images.pexels.com/photos/14008893/pexels-photo-14008893.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  },
  {
    name: "Kenji Aoki",
    role: "Design Director",
    location: "Kyoto",
    image:
      "https://images.pexels.com/photos/15792394/pexels-photo-15792394.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  },
  {
    name: "Noor El-Amin",
    role: "Head of Motion",
    location: "Amsterdam",
    image:
      "https://images.pexels.com/photos/30492648/pexels-photo-30492648.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  },
  {
    name: "Léa Marchetti",
    role: "Strategy Lead",
    location: "Paris",
    image:
      "https://images.pexels.com/photos/6748147/pexels-photo-6748147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  },
];

export default function Team() {
  return (
    <section className="relative border-t border-white/10 bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid grid-cols-12 items-end gap-6 md:mb-20">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              <span className="h-px w-10 bg-[#A3A3A3]" />
              [ 07 ] The people
            </div>
            <h2 className="mt-6 font-display text-[13vw] leading-[0.9] tracking-tight md:text-[7vw]">
              Twelve humans.
              <br />
              <em className="italic">No middle layer.</em>
            </h2>
          </div>
          <div className="col-span-12 max-w-md md:col-span-4 md:col-start-9">
            <p className="text-base leading-relaxed text-white/70">
              The people you meet in the pitch are the people who make the
              work. We are deliberately small — and hire slower than most.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {team.map((p, i) => (
            <figure
              key={p.name}
              className="reveal group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="zoom-media relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#161616]">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/80">
                    {p.location}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF3D]" />
                </div>
              </div>
              <figcaption className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <div className="font-display text-2xl leading-none tracking-tight">
                    {p.name}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                    {p.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
