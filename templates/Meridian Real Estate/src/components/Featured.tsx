import { useState } from "react";
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Maximize } from "lucide-react";
import { CATEGORIES, PRESS, PROPERTIES, img, type Property } from "../data";
import { cn } from "../utils/cn";
import { ArrowLink, CONTAINER, Reveal, SectionHead } from "./ui";

/* ——— Editorial rhythm: spans + image aspect per slot ——— */
const LAYOUT = [
  { span: "lg:col-span-7", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-5 lg:mt-28", aspect: "aspect-[4/3.3]" },
  { span: "lg:col-span-5 lg:mt-28", aspect: "aspect-[4/3.3]" },
  { span: "lg:col-span-7", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-7", aspect: "aspect-[16/10]" },
  { span: "lg:col-span-5 lg:mt-28", aspect: "aspect-[4/3.3]" },
];

function PropertyCard({ p, i }: { p: Property; i: number }) {
  const l = LAYOUT[i % LAYOUT.length];
  return (
    <Reveal delay={(i % 2) * 120} className={cn("lg:col-span-6", l.span)}>
      <article className="group">
        <div className={cn("relative overflow-hidden rounded-[20px] shadow-soft transition-shadow duration-700 group-hover:shadow-lift", l.aspect)}>
          <a href="#consultation" aria-label={`${p.name}, ${p.location} — ${p.price}`} className="absolute inset-0 block">
            <img
              src={img(p.photo, 1600, 1050)}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10 opacity-80" />
            <span className="absolute left-5 top-5 rounded-full bg-ivory/90 px-4 py-2 text-[9.5px] font-bold uppercase tracking-[0.22em] text-ink backdrop-blur">
              {p.tag}
            </span>
            <span className="absolute bottom-5 left-6 font-serif text-[26px] font-medium tracking-wide text-ivory md:text-[30px]">
              {p.price}
            </span>
          </a>
          <button
            aria-label={`Save ${p.name}`}
            className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full border border-ivory/30 bg-ink/25 text-ivory backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink"
          >
            <Heart size={16} strokeWidth={1.8} />
          </button>
        </div>

        <a href="#consultation" aria-label={`View ${p.name}`}>
          <div className="mt-6 flex items-start justify-between gap-6">
            <div>
              <h3 className="font-serif text-[26px] font-medium leading-tight text-ink transition-colors duration-500 group-hover:text-gold-deep md:text-[28px]">
                {p.name}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-[13px] font-medium tracking-wide text-slate-500">
                <MapPin size={13.5} className="text-gold" />
                {p.location}
              </p>
            </div>
            <span className="mt-1 grid size-12 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-gold">
              <ArrowUpRight size={17} strokeWidth={1.8} className="transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-5 text-[12.5px] font-semibold tracking-wide text-slate-600">
            <span className="flex items-center gap-2.5">
              <BedDouble size={15} strokeWidth={1.7} className="text-gold-deep" />
              {p.beds} Beds
            </span>
            <span className="flex items-center gap-2.5">
              <Bath size={15} strokeWidth={1.7} className="text-gold-deep" />
              {p.baths} Baths
            </span>
            <span className="flex items-center gap-2.5">
              <Maximize size={15} strokeWidth={1.7} className="text-gold-deep" />
              {p.area} sq ft
            </span>
            <span className="ml-auto hidden text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-deep md:inline">
              View Residence
            </span>
          </div>
        </a>
      </article>
    </Reveal>
  );
}

export default function Featured() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]["key"]>("all");
  const list = cat === "all" ? PROPERTIES : PROPERTIES.filter((p) => p.cat === cat);
  const shown = list.slice(0, 6);

  return (
    <section id="properties" aria-label="Featured properties" className="relative overflow-hidden py-24 md:py-36">
      {/* ——— Press strip ——— */}
      <Reveal>
        <p className={cn(CONTAINER, "flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-b border-ink/[0.07] pb-12 text-center")}>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">As featured in</span>
          {PRESS.map((name) => (
            <span key={name} className="font-serif text-lg italic text-slate-400/90 md:text-xl">
              {name}
            </span>
          ))}
        </p>
      </Reveal>

      <div className={cn(CONTAINER, "pt-20 md:pt-24")}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            overline="The Collection"
            title={
              <>
                Residences of
                <br />
                <em className="font-normal italic text-gold-deep">rare distinction</em>
              </>
            }
            copy="Each residence in our portfolio is visited, vetted and understood — its light, its proportions, its story. This is a curated selection, never a catalogue."
          />
          <Reveal delay={250} className="shrink-0">
            <ArrowLink href="#consultation">View all 240+ residences</ArrowLink>
          </Reveal>
        </div>

        {/* ——— Filters ——— */}
        <Reveal delay={200}>
          <div role="tablist" aria-label="Filter by property type" className="mt-12 flex flex-wrap gap-2.5 border-b border-ink/[0.07] pb-8">
            {CATEGORIES.map((c) => {
              const active = cat === c.key;
              const count = c.key === "all" ? PROPERTIES.length : PROPERTIES.filter((p) => p.cat === c.key).length;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.key)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-500",
                    active
                      ? "border-ink bg-ink text-ivory shadow-soft"
                      : "border-ink/15 bg-transparent text-slate-500 hover:border-gold-deep hover:text-gold-deep"
                  )}
                >
                  {c.label}
                  <span className={cn("font-serif text-xs italic", active ? "text-gold" : "text-slate-400")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ——— Editorial grid ——— */}
        <div key={cat} className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:gap-y-20 lg:grid-cols-12 lg:items-start">
          {shown.map((p, i) => (
            <PropertyCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
