import { ArrowUpRight, Plus } from "lucide-react";
import { GALLERY, PRODUCTS } from "../data";
import { ArrowLink, CONTAINER, Reveal, Section, SectionHead } from "./ui";

/* ------------------------------ GALLERY ------------------------------ */
function Gallery() {
  return (
    <Section id="gallery" className="relative bg-ink py-24 md:py-36">
      <div className={CONTAINER}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            index="07"
            kicker="The Work"
            title={
              <>
                Proof, not
                <span className="font-editorial font-medium lowercase italic tracking-normal text-brass">
                  {" "}
                  promises.
                </span>
              </>
            }
          />
          <Reveal delay={0.15} className="lg:pb-2">
            <p className="max-w-xs text-[14px] leading-relaxed text-bone/45 lg:text-right">
              Every cut documented, every blend earned. A running archive from the shop
              floor — no filters, no stock smiles.
            </p>
          </Reveal>
        </div>

        {/* editorial mosaic */}
        <div className="mt-16 grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[180px] lg:grid-cols-4 lg:auto-rows-[200px]">
          {GALLERY.map((g, i) => {
            const spans: Record<string, string> = {
              tall: "row-span-2",
              wide: "col-span-2",
              square: "",
            };
            return (
              <Reveal key={g.title} delay={(i % 4) * 0.07} className={`${spans[g.span]} h-full`}>
                <figure className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[18px] border border-bone/[0.07]">
                  <img
                    src={g.img}
                    alt={`${g.title} — ${g.tag}`}
                    loading="lazy"
                    className="h-full w-full object-cover img-bw-hover img-duotone transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.32em] text-brass">
                        {g.tag}
                      </p>
                      <p className="mt-1.5 font-display text-lg font-medium uppercase tracking-[0.08em] text-bone">
                        {g.title}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-bone/20 bg-ink/40 text-bone opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                      <Plus size={15} strokeWidth={1.8} />
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <ArrowLink href="#booking">Your chair is next</ArrowLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------ PRODUCTS ----------------------------- */
function Products() {
  return (
    <Section id="products" className="relative bg-bone py-24 md:py-36">
      <div className={CONTAINER}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            light
            index="08"
            kicker="The Shelf"
            title={
              <span className="text-ink">
                Take the craft
                <span className="font-editorial font-medium lowercase italic tracking-normal text-leather">
                  {" "}
                  home.
                </span>
              </span>
            }
            sub="The same house blends and artisan labels we use in the chair — measured, recommended and applied by hand before a single jar hits the shelf."
          />
          <Reveal delay={0.15} className="lg:pb-2">
            <ArrowLink href="#visit" light>
              Shop in person
            </ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-ink/[0.08] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(42,26,16,0.35)]">
                <div className="relative overflow-hidden bg-[#ebe7e0]">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-[5/6] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3.5 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.24em] text-bone">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[17px] font-semibold uppercase leading-tight tracking-[0.05em] text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-ink/50">{p.note}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/[0.08] pt-5">
                    <span className="font-display text-2xl font-semibold text-ink">${p.price}</span>
                    <button
                      aria-label={`Reserve ${p.name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-ink text-bone transition-all duration-400 hover:scale-[1.06] hover:bg-leather"
                    >
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-[11.5px] uppercase tracking-[0.26em] text-ink/40">
            All products sampled in the chair before they earn shelf space
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

export default function Showcase() {
  return (
    <>
      <Gallery />
      <Products />
    </>
  );
}
