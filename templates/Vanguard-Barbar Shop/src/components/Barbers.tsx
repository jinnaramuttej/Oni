import { BARBERS } from "../data";
import { ArrowLink, CONTAINER, Reveal, Section, SectionHead } from "./ui";

export default function Barbers() {
  return (
    <Section id="barbers" className="relative overflow-hidden bg-coal py-24 md:py-36">
      <div className={`${CONTAINER} relative z-[2]`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            index="02"
            kicker="Meet the Barbers"
            title={
              <>
                The hands behind
                <span className="block">the craft</span>
              </>
            }
          />
          <Reveal delay={0.2} className="lg:pb-2">
            <p className="max-w-xs text-[14px] leading-relaxed text-bone/45 lg:text-right">
              Sixteen chairs, six craftsmen. Every barber at Vanguard apprenticed a minimum
              of two years before touching a client's head.
            </p>
            <div className="mt-5 lg:flex lg:justify-end">
              <ArrowLink href="#booking">Request a barber</ArrowLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {BARBERS.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1}>
              <article className="group">
                <div className="relative overflow-hidden rounded-[20px] border border-bone/[0.08]">
                  <img
                    src={b.img}
                    alt={`${b.name} — ${b.role} at Vanguard Barber Co.`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover img-bw-hover img-duotone transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-40" />
                  <span className="absolute left-4 top-4 rounded-full border border-bone/15 bg-ink/50 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/80 backdrop-blur-md">
                    {b.years}
                  </span>
                  <span className="absolute bottom-4 right-5 font-editorial text-3xl italic text-brass/90 opacity-0 transition-all duration-700 group-hover:bottom-5 group-hover:opacity-100">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold uppercase tracking-[0.08em] text-bone transition-colors duration-300 group-hover:text-brass">
                  {b.name}
                </h3>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-brass">
                  {b.role}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {b.specs.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-bone/10 px-3 py-1 text-[10.5px] font-medium tracking-wide text-bone/50 transition-colors duration-300 group-hover:border-brass/25"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
