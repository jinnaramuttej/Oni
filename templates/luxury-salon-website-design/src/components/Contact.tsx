import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";

const HOURS = [
  { day: "Monday", time: "By appointment" },
  { day: "Tuesday — Friday", time: "9:00 — 19:00" },
  { day: "Saturday", time: "9:00 — 18:00" },
  { day: "Sunday", time: "10:00 — 16:00" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-ivory py-28 md:py-40">
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-6 md:px-10 lg:grid-cols-12">
        {/* Info */}
        <div className="lg:col-span-5">
          <Reveal y={24}>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-rosegold/70" />
              <span className="text-[11px] font-medium tracking-[0.42em] text-taupe uppercase">
                Visit
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.08] font-medium text-charcoal md:text-5xl">
              Find us in <span className="italic">SoHo</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed font-light text-taupe">
              Discreetly tucked above a flower shop on Greene Street — look for
              the brass door with the linen curtain. We keep the kettle on.
            </p>
          </Reveal>

          <div className="mt-10 space-y-1">
            <Reveal delay={0.22}>
              <a
                href="https://maps.google.com/?q=128+Greene+St+New+York"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 border-b hairline py-5"
              >
                <MapPin size={18} strokeWidth={1.25} className="mt-0.5 text-metallic" />
                <span className="flex-1">
                  <span className="block text-[10.5px] tracking-[0.28em] text-taupe uppercase">
                    Address
                  </span>
                  <span className="mt-1 block text-[15px] font-light text-charcoal">
                    128 Greene Street, 2nd Floor · New York, NY 10012
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 text-taupe transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-metallic"
                />
              </a>
            </Reveal>
            <Reveal delay={0.28}>
              <a href="tel:+12125550184" className="group flex items-start gap-4 border-b hairline py-5">
                <Phone size={18} strokeWidth={1.25} className="mt-0.5 text-metallic" />
                <span className="flex-1">
                  <span className="block text-[10.5px] tracking-[0.28em] text-taupe uppercase">
                    Telephone
                  </span>
                  <span className="mt-1 block text-[15px] font-light text-charcoal transition-colors group-hover:text-metallic">
                    +1 212 555 0184
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.34}>
              <a href="mailto:concierge@lumiere.salon" className="group flex items-start gap-4 border-b hairline py-5">
                <Mail size={18} strokeWidth={1.25} className="mt-0.5 text-metallic" />
                <span className="flex-1">
                  <span className="block text-[10.5px] tracking-[0.28em] text-taupe uppercase">
                    Email
                  </span>
                  <span className="mt-1 block text-[15px] font-light text-charcoal transition-colors group-hover:text-metallic">
                    concierge@lumiere.salon
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="mt-10 rounded-[24px] border hairline bg-cream/80 p-7">
              <div className="flex items-center gap-3">
                <Clock size={16} strokeWidth={1.5} className="text-metallic" />
                <h3 className="font-serif text-xl font-medium text-charcoal">Atelier hours</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-baseline justify-between gap-4">
                    <span className="text-[13px] font-light text-taupe">{h.day}</span>
                    <span className="flex-1 border-b border-dotted border-charcoal/15" />
                    <span className="text-[13px] font-normal text-charcoal">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Image with frosted card */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal y={56}>
            <div className="relative">
              <div
                className="absolute -right-6 -bottom-6 hidden h-full w-full rounded-[28px] border border-rosegold/30 md:block"
                aria-hidden
              />
              <div className="group relative overflow-hidden rounded-[28px] shadow-lift">
                <img
                  src="https://images.pexels.com/photos/7750124/pexels-photo-7750124.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="The Lumière interior — arched mirrors and blush chairs"
                  loading="lazy"
                  className="img-editorial aspect-[4/3] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="glass absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 rounded-[20px] border hairline px-6 py-4">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-taupe uppercase">
                      Nearest station
                    </p>
                    <p className="mt-1 font-serif text-lg text-charcoal">
                      Spring St · Prince St — 3 min walk
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=128+Greene+St+New+York"
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn inline-flex shrink-0 items-center gap-2 rounded-[14px] bg-charcoal px-5 py-3 text-[10.5px] font-medium tracking-[0.2em] text-ivory uppercase transition-all duration-500 hover:bg-metallic"
                  >
                    Directions
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
