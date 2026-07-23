import { ArrowRight, BadgeCheck, CalendarCheck, ChevronDown, HeartHandshake, ScanLine, Star } from "lucide-react";
import { Button, Img } from "./ui";
import { IMAGES } from "../lib/data";

const badges = [
  { icon: BadgeCheck, label: "Certified Dentists", detail: "Board-certified team" },
  { icon: ScanLine, label: "Modern Equipment", detail: "Digital 3D imaging" },
  { icon: HeartHandshake, label: "Pain-Free Care", detail: "Gentle-first promise" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="A Lumina dentist warmly consulting a smiling patient in a bright, modern treatment room"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full scale-105 object-cover animate-[hero-zoom_14s_ease-out_forwards]"
        />
        <style>{`@keyframes hero-zoom { from { transform: scale(1.1); } to { transform: scale(1.02); } }`}</style>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-900/55 to-navy-900/20" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-950/50 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-28 pt-32 sm:px-8 lg:pb-32">
        <div className="max-w-2xl">
          <p
            className="inline-flex animate-fade-up items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white ring-1 ring-white/25 backdrop-blur-md"
            style={{ animationDelay: "100ms" }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua-400" />
            </span>
            Accepting new patients · Beverly Hills, CA
          </p>

          <h1
            className="mt-7 animate-fade-up font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white text-balance sm:text-6xl lg:text-[4.4rem]"
            style={{ animationDelay: "220ms" }}
          >
            Healthy smiles,
            <br />
            <span className="bg-gradient-to-r from-aqua-300 via-teal-300 to-aqua-400 bg-clip-text text-transparent">
              crafted with precision.
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-navy-100/85 sm:text-lg"
            style={{ animationDelay: "340ms" }}
          >
            Modern dentistry built around your comfort — digital-first diagnostics,
            gentle pain-free techniques, and a team that treats you like family.
            Welcome to a calmer kind of dental care.
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3.5" style={{ animationDelay: "460ms" }}>
            <Button href="#booking" size="lg">
              <CalendarCheck className="h-4.5 w-4.5 transition-transform duration-300 group-hover/btn:rotate-6" aria-hidden="true" />
              Book Appointment
            </Button>
            <Button href="#treatments" size="lg" variant="glass">
              Explore Treatments
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Button>
          </div>

          {/* Trust badges */}
          <ul
            className="mt-12 flex animate-fade-up flex-wrap gap-x-8 gap-y-4"
            style={{ animationDelay: "580ms" }}
            aria-label="Why patients trust Lumina"
          >
            {badges.map(({ icon: Icon, label, detail }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                  <Icon className="h-4.5 w-4.5 text-aqua-300" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{label}</span>
                  <span className="block text-xs text-navy-100/60">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating review card */}
      <aside
        className="absolute bottom-24 right-8 z-10 hidden animate-fade-up lg:block"
        style={{ animationDelay: "720ms" }}
        aria-label="Patient rating"
      >
        <div className="w-72 animate-float rounded-2xl border border-white/40 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
          <div className="flex items-center gap-1" aria-label="Rated 4.9 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
          </div>
          <p className="mt-2.5 font-display text-2xl font-bold text-navy-800">
            4.9 <span className="text-sm font-medium text-slate-500">/ 5.0</span>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            from 1,200+ verified patient reviews across Google &amp; Healthgrades
          </p>
          <div className="mt-4 flex items-center border-t border-slate-100 pt-4">
            <div className="flex -space-x-2.5">
              {[IMAGES.smileA, IMAGES.smileB, IMAGES.smileC].map((src, i) => (
                <Img
                  key={src}
                  src={src.replace("w=900&h=640", "w=80&h=80")}
                  alt=""
                  eager
                  containerClassName="h-8 w-8 rounded-full ring-2 ring-white"
                  className="rounded-full"
                  style={{ zIndex: 3 - i } as React.CSSProperties}
                />
              ))}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-800 text-[0.6rem] font-bold text-white ring-2 ring-white">
                +2k
              </span>
            </div>
            <p className="ml-3 text-[0.7rem] font-medium leading-tight text-slate-500">
              Smiles transformed
              <br /> this year alone
            </p>
          </div>
        </div>
      </aside>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-fade-up flex-col items-center gap-2 text-navy-700 transition-colors hover:text-teal-600 sm:flex"
        style={{ animationDelay: "900ms" }}
        aria-label="Scroll to learn about the clinic"
      >
        <span className="flex h-9 w-5.5 items-start justify-center rounded-full border-2 border-navy-300 pt-1.5">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-teal-500" aria-hidden="true" />
        </span>
        <span className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em]">
          Scroll <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
