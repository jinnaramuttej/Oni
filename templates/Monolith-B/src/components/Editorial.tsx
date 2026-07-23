export default function Editorial() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-12 items-center gap-6">
          {/* Left image */}
          <div className="reveal col-span-12 md:col-span-5">
            <div className="zoom-media relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#161616]">
              <img
                src="https://images.pexels.com/photos/10220276/pexels-photo-10220276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=1200"
                alt="Studio interior"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
                    Studio · Berlin Mitte
                  </div>
                  <div className="mt-2 font-display text-2xl">
                    Est. 2014
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right editorial text */}
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              <span className="h-px w-10 bg-[#A3A3A3]" />
              A brief interlude
            </div>
            <p className="reveal mt-8 font-display text-3xl leading-[1.2] tracking-tight md:text-5xl md:leading-[1.15]">
              We opened the studio because we were{" "}
              <em className="italic text-white/60">tired</em> of watching great
              ideas die in agency slide-decks. So we built something smaller,
              slower, sharper — a place where{" "}
              <span className="text-[#C6FF3D]">craft is the deliverable</span>{" "}
              and every project is signed by a human hand.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <img
                src="https://images.pexels.com/photos/8837270/pexels-photo-8837270.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120"
                alt=""
                className="h-14 w-14 rounded-full object-cover grayscale"
                loading="lazy"
              />
              <div>
                <div className="font-display text-xl">Iris Vogel</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
                  Founder / ECD — Berlin
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
