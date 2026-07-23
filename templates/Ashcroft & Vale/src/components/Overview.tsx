import { img } from "../data";
import { Eyebrow, Icons } from "./ui";

const pillars = [
  { icon: Icons.shield, title: "Uncompromising Discretion", desc: "Every matter is handled with absolute confidentiality and care." },
  { icon: Icons.scale, title: "Strategic Precision", desc: "Counsel grounded in decades of experience and rigorous analysis." },
  { icon: Icons.users, title: "Client Devotion", desc: "Partner-led attention on every engagement, without exception." },
];

export function Overview() {
  return (
    <section id="firm" className="relative overflow-hidden bg-ivory paper-texture py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Images */}
          <div className="reveal relative">
            <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
              <img
                src={img.consult}
                alt="Attorneys consulting with clients in a modern office"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] hover:scale-[1.03]"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-56 overflow-hidden rounded-[var(--radius-card)] border-4 border-ivory shadow-[var(--shadow-lift)] sm:block lg:-right-10">
              <img
                src={img.courthouse}
                alt="Neoclassical courthouse architecture"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -left-4 top-8 flex flex-col items-center rounded-[var(--radius-card)] border border-gold/30 bg-ink px-7 py-6 text-center shadow-[var(--shadow-lift)] lg:-left-10">
              <span className="font-serif text-5xl font-semibold text-gold">23</span>
              <span className="mt-1 max-w-[6rem] text-[0.65rem] font-medium uppercase tracking-wider text-ivory/70">
                Years of Trusted Counsel
              </span>
            </div>
          </div>

          {/* Copy */}
          <div>
            <Eyebrow>The Firm</Eyebrow>
            <h2 className="reveal mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl" data-delay="60">
              A tradition of excellence, defined by outcomes and trust.
            </h2>
            <p className="reveal mt-6 text-lg leading-relaxed text-slate-warm" data-delay="120">
              Ashcroft &amp; Vale was founded on a singular conviction: that the finest
              legal representation is built on judgment, integrity, and enduring
              relationships. We advise a select clientele on their most consequential
              matters — bringing the resources of a global firm with the intimacy of a
              trusted advisor.
            </p>
            <p className="reveal mt-4 leading-relaxed text-slate-warm" data-delay="180">
              Our partners do not delegate what matters most. From boardrooms to
              courtrooms, we stand beside our clients with clarity, resolve, and an
              unwavering commitment to their success.
            </p>

            <div className="mt-10 space-y-5">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="reveal flex items-start gap-4"
                  data-delay={220 + i * 90}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ivory-200 text-bronze">
                    <span className="h-5 w-5">
                      <p.icon />
                    </span>
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-ink">{p.title}</h3>
                    <p className="mt-1 text-slate-warm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
