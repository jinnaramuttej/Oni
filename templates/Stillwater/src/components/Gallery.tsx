import { Reveal, Eyebrow } from "./Reveal";
import { GALLERY } from "../data";

export default function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-ivory py-28 lg:py-36">
      <div className="pointer-events-none absolute -right-40 top-16 h-[360px] w-[360px] rounded-full bg-mist/45 blur-2xl animate-drift-slow" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow index="09">The studio</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-serif text-4xl font-light leading-[1.14] text-ink sm:text-5xl">
                Quiet moments, <em className="font-normal italic text-eucalyptus-deep">kept</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-xs text-[13.5px] font-light leading-[1.9] text-charcoal/70">
              Photographed slowly, mostly in the first hour of the day, when the
              light does half the work for us.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[170px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-4 lg:gap-5">
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src}
              delay={i * 0.06}
              className={
                g.span === "tall"
                  ? "row-span-2"
                  : g.span === "wide"
                    ? "md:col-span-2"
                    : ""
              }
            >
              <figure className="group img-frame h-full w-full rounded-[20px] shadow-soft transition-shadow duration-700 hover:shadow-lift">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-3 bottom-3 translate-y-3 rounded-2xl bg-ivory/85 px-4 py-2.5 text-[11.5px] font-light tracking-wide text-charcoal/80 opacity-0 backdrop-blur-sm transition-all duration-600 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
