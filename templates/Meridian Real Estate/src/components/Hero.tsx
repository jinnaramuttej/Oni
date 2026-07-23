import { useEffect, useRef, useState } from "react";
import { Award, ChevronDown, Gem, Globe2, MapPin, Search } from "lucide-react";
import { HERO_IMG } from "../data";
import { cn } from "../utils/cn";
import { CONTAINER, LuxButton } from "./ui";

const TRUST = [
  { icon: Gem, title: "Luxury Specialists", sub: "Est. 2002 · Prime only" },
  { icon: Globe2, title: "Global Network", sub: "40+ countries, one office" },
  { icon: Award, title: "Award Winning", sub: "Brokerage of the Year '25" },
];

function SearchBar() {
  const [location, setLocation] = useState("");

  return (
    <form
      action="#properties"
      aria-label="Search properties"
      className="w-full max-w-4xl rounded-[20px] border border-ivory/15 bg-ink/35 p-5 shadow-glass backdrop-blur-xl md:rounded-[24px] md:p-4"
    >
      <div className="grid gap-5 md:grid-cols-[1.25fr_1fr_1fr_auto] md:gap-0 md:divide-x md:divide-ivory/10">
        <label className="group flex flex-col gap-1.5 px-1 text-left md:px-5">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-gold">Location</span>
          <span className="flex items-center gap-2.5">
            <MapPin size={15} className="shrink-0 text-ivory/50" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, neighborhood, address"
              className="w-full bg-transparent pb-1 text-[15px] font-medium text-ivory placeholder:text-ivory/45 focus:outline-none"
            />
          </span>
        </label>

        <label className="relative flex flex-col gap-1.5 px-1 text-left md:px-5">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-gold">Property Type</span>
          <span className="flex items-center gap-2.5">
            <select className="lux-select w-full cursor-pointer bg-transparent pb-1 text-[15px] font-medium text-ivory focus:outline-none [&>option]:text-ink">
              <option>Any type</option>
              <option>Villa</option>
              <option>Penthouse</option>
              <option>Estate</option>
              <option>Waterfront</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-1 bottom-2 text-ivory/50 md:right-6" />
          </span>
        </label>

        <label className="relative flex flex-col gap-1.5 px-1 text-left md:px-5">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-gold">Price Range</span>
          <span className="flex items-center gap-2.5">
            <select className="lux-select w-full cursor-pointer bg-transparent pb-1 text-[15px] font-medium text-ivory focus:outline-none [&>option]:text-ink">
              <option>Any price</option>
              <option>$2M — $5M</option>
              <option>$5M — $10M</option>
              <option>$10M — $25M</option>
              <option>$25M+</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-1 bottom-2 text-ivory/50 md:right-6" />
          </span>
        </label>

        <div className="flex items-center md:pl-4">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-3 rounded-[16px] bg-gold px-7 py-4 text-[11.5px] font-bold uppercase tracking-[0.2em] text-ink shadow-gold transition-all duration-500 hover:-translate-y-0.5 hover:bg-ivory md:w-auto"
          >
            <Search size={15} strokeWidth={2.4} />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  /* subtle parallax */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (imgRef.current && window.scrollY < window.innerHeight * 1.2) {
          imgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.22}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-svh flex-col overflow-hidden bg-ink">
      {/* ——— Cinematic backdrop ——— */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <img
          src={HERO_IMG}
          alt="Architectural masterpiece villa with pool and terraces photographed at golden hour"
          fetchPriority="high"
          className="kenburns h-[115%] w-full object-cover"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/85" />
      <div aria-hidden className="absolute inset-0 bg-ink/15" />

      {/* ——— Centerpiece ——— */}
      <div className={cn(CONTAINER, "relative z-10 flex flex-1 flex-col items-center justify-center pb-16 pt-32 text-center md:pt-36")}>
        <p
          className="reveal is-in flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.42em] text-gold md:text-[11px]"
          style={{ transitionDelay: "200ms" }}
        >
          <span aria-hidden className="h-px w-12 bg-gold/70" />
          International Fine Estates — Est. 2002
          <span aria-hidden className="h-px w-12 bg-gold/70" />
        </p>

        <h1
          className="reveal is-in mt-8 max-w-5xl font-serif text-[clamp(3.2rem,8.5vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.015em] text-ivory"
          style={{ transitionDelay: "350ms" }}
        >
          Live beyond
          <br />
          <em className="font-normal italic text-gold">the extraordinary.</em>
        </h1>

        <p
          className="reveal is-in mt-8 max-w-xl text-[15px] leading-[1.9] text-ivory/70 md:text-base"
          style={{ transitionDelay: "500ms" }}
        >
          For over two decades, Meridian has represented the world's most exceptional
          residences — quietly, precisely, and always in confidence.
        </p>

        <div className="reveal is-in mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ transitionDelay: "650ms" }}>
          <LuxButton href="#properties">Browse Properties</LuxButton>
          <LuxButton href="#consultation" variant="outline-light">
            Book a Consultation
          </LuxButton>
        </div>

        <div className="reveal is-in mt-12 flex w-full justify-center" style={{ transitionDelay: "800ms" }}>
          <SearchBar />
        </div>
      </div>

      {/* ——— Scroll cue ——— */}
      <div aria-hidden className="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <span className="scroll-dot absolute left-0 top-0 h-4 w-px bg-gold" />
        </span>
      </div>

      {/* ——— Trust band ——— */}
      <div className="relative z-10 border-t border-ivory/10 bg-ink/30 backdrop-blur-md">
        <div className={cn(CONTAINER, "grid grid-cols-3 divide-x divide-ivory/10")}>
          {TRUST.map((t) => (
            <div key={t.title} className="flex flex-col items-center gap-1.5 px-2 py-5 text-center md:flex-row md:justify-center md:gap-4 md:py-6 md:text-left">
              <t.icon size={20} strokeWidth={1.6} className="shrink-0 text-gold" />
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-ivory md:text-[11px]">
                  {t.title}
                </span>
                <span className="mt-0.5 hidden text-[11px] tracking-wide text-ivory/50 md:block">{t.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
