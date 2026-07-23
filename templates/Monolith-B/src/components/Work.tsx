import { ArrowUpRight } from "lucide-react";

type Project = {
  n: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  image: string;
  span: "wide" | "tall" | "half";
  accent?: string;
};

const projects: Project[] = [
  {
    n: "01",
    title: "The Silent Room",
    client: "Herz Berlin",
    category: "Brand Identity · Digital",
    year: "2026",
    description:
      "A cinematic rebrand for Berlin's most secretive listening bar — from wordmark to sound-reactive digital pieces.",
    image:
      "https://images.pexels.com/photos/6727762/pexels-photo-6727762.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000",
    span: "wide",
    accent: "#C6FF3D",
  },
  {
    n: "02",
    title: "Objekt Studies",
    client: "Formaform",
    category: "Product · Art Direction",
    year: "2025",
    description:
      "An editorial campaign for a small-batch ceramics house rooted in Bauhaus rigor.",
    image:
      "https://images.pexels.com/photos/14608171/pexels-photo-14608171.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=1200",
    span: "tall",
  },
  {
    n: "03",
    title: "After Hours",
    client: "Nocta Labs",
    category: "Film · Motion",
    year: "2025",
    description:
      "A five-part film series following the world's most obsessive nocturnal creators.",
    image:
      "https://images.pexels.com/photos/11808090/pexels-photo-11808090.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1800",
    span: "half",
  },
  {
    n: "04",
    title: "Concrete Poetry",
    client: "Institut Brut",
    category: "Editorial · Web",
    year: "2025",
    description:
      "An interactive photobook celebrating overlooked brutalist architecture across the former GDR.",
    image:
      "https://images.pexels.com/photos/32466569/pexels-photo-32466569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1800",
    span: "half",
  },
  {
    n: "05",
    title: "Chapter 07",
    client: "Maison Renard",
    category: "Fashion · Digital",
    year: "2024",
    description:
      "A season launch built as a scrollable film — every garment shot as portrait, styled as sculpture.",
    image:
      "https://images.pexels.com/photos/31168037/pexels-photo-31168037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    span: "tall",
  },
  {
    n: "06",
    title: "Signal / Noise",
    client: "Kaiku Records",
    category: "Identity · Packaging",
    year: "2024",
    description:
      "Vinyl-first identity system for an experimental label based between Helsinki and Kyoto.",
    image:
      "https://images.pexels.com/photos/6727765/pexels-photo-6727765.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000",
    span: "wide",
  },
];

function Card({ p, index }: { p: Project; index: number }) {
  const heightClass =
    p.span === "wide"
      ? "aspect-[16/9]"
      : p.span === "tall"
      ? "aspect-[3/4]"
      : "aspect-[4/3]";

  return (
    <a
      href="#"
      className="group reveal block"
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div
        className={`zoom-media relative overflow-hidden rounded-2xl bg-[#161616] ${heightClass}`}
      >
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {/* Number */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-white/90 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF3D]" />
          Case {p.n}
        </div>
        {/* Bottom info */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
              {p.category} — {p.year}
            </div>
            <div className="mt-2 font-display text-3xl leading-none tracking-tight md:text-4xl">
              {p.title}
            </div>
          </div>
          <div className="hidden translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0A0A0A]">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>

      {/* Meta below */}
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
            {p.client}
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
            {p.description}
          </p>
        </div>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3] sm:inline">
          → View case
        </span>
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative bg-[#0A0A0A] px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-12 items-end gap-6 md:mb-24">
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A3A3A3]">
              <span className="h-px w-10 bg-[#A3A3A3]" />
              [ 02 ] Selected Work
            </div>
            <h2 className="mt-6 font-display text-[13vw] leading-[0.9] tracking-tight md:text-[8vw]">
              Work that <em className="italic text-[#C6FF3D]">outlives</em> the brief.
            </h2>
          </div>
          <div className="col-span-12 max-w-md md:col-span-5 md:col-start-8">
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              A tight edit from the last two years. Every project is co-authored with
              founders, artists and cultural institutions we believe in — no exceptions.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-white link-underline"
            >
              Full archive (48)
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Project grid — asymmetric */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12">
            <Card p={projects[0]} index={0} />
          </div>
          <div className="col-span-12 md:col-span-5">
            <Card p={projects[1]} index={1} />
          </div>
          <div className="col-span-12 md:col-span-7 md:mt-24">
            <Card p={projects[2]} index={2} />
          </div>
          <div className="col-span-12 md:col-span-7">
            <Card p={projects[3]} index={3} />
          </div>
          <div className="col-span-12 md:col-span-5 md:mt-16">
            <Card p={projects[4]} index={4} />
          </div>
          <div className="col-span-12">
            <Card p={projects[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
