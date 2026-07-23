import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, MoveDown } from "lucide-react";
import { cn } from "./utils/cn";

const navItems = ["Work", "Services", "Philosophy", "Clients", "Contact"];

const heroImage =
  "https://images.pexels.com/photos/8088371/pexels-photo-8088371.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2200";

const projects = [
  {
    title: "Atlas Signal",
    category: "Immersive identity",
    description:
      "A kinetic brand world for a spatial computing launch, built from film, product UI, and live installation language.",
    year: "2026",
    image:
      "https://images.pexels.com/photos/6727765/pexels-photo-6727765.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
    alt: "Geometric neon light installation in a dark gallery.",
  },
  {
    title: "Northstar OS",
    category: "Product experience",
    description:
      "A cinematic interface system that turns complex color, data, and workflow into an editorial command surface.",
    year: "2025",
    image:
      "https://images.pexels.com/photos/17279854/pexels-photo-17279854.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
    alt: "Laptop screen showing a vibrant color grading interface.",
  },
  {
    title: "Nocturne Lab",
    category: "Art direction",
    description:
      "A tactile launch campaign for a fragrance house, balancing luxury still life with speculative night architecture.",
    year: "2025",
    image:
      "https://images.pexels.com/photos/36834223/pexels-photo-36834223.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
    alt: "Luxury perfume bottle lit with a cool blue cinematic hue.",
  },
  {
    title: "Frame Works",
    category: "Motion campaign",
    description:
      "A modular content engine for an entertainment platform, designed to feel hand-directed at global scale.",
    year: "2024",
    image:
      "https://images.pexels.com/photos/8089662/pexels-photo-8089662.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
    alt: "Film crew arranging a cinematic studio set with lighting equipment.",
  },
];

const services = [
  {
    name: "Brand systems",
    copy: "Positioning, identity, type, motion rules, launch worlds, and design systems built to travel.",
  },
  {
    name: "Interactive products",
    copy: "Web platforms, spatial interfaces, commerce, editorial systems, and prototypes with narrative depth.",
  },
  {
    name: "Motion identities",
    copy: "Kinetic language, title systems, social engines, 3D direction, sound-led moments, and campaign films.",
  },
  {
    name: "Cultural campaigns",
    copy: "Launch strategy, concept development, experiential installations, photographic worlds, and content arcs.",
  },
];

const clients = [
  "Nike",
  "Apple Music",
  "Rimowa",
  "MoMA",
  "Spotify",
  "Netflix",
  "Sonos",
  "Leica",
  "Acne Studios",
  "Google Arts",
  "Bang & Olufsen",
  "OpenAI",
];

const awards = [
  ["Awwwards", "Site of the Day", "2026"],
  ["The FWA", "FWA of the Day", "2026"],
  ["D&AD", "Graphite Pencil", "2025"],
  ["CSS Design Awards", "UX, UI, Innovation", "2025"],
  ["ADC Awards", "Gold Cube", "2024"],
];

const process = [
  ["01", "Find the tension", "We map the cultural, commercial, and emotional forces that make the work worth remembering."],
  ["02", "Prototype the myth", "We build fast cinematic studies so strategy becomes something teams can see, feel, and debate."],
  ["03", "Craft the system", "We turn the strongest direction into a precise visual, interactive, and motion operating system."],
  ["04", "Launch the signal", "We ship the work with performance, accessibility, content logic, and launch choreography intact."],
];

const team = [
  {
    name: "Mara Voss",
    role: "Executive Creative Director",
    image:
      "https://images.pexels.com/photos/36991336/pexels-photo-36991336.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Moody editorial portrait with red and blue lighting.",
  },
  {
    name: "Eli Kade",
    role: "Design Technology Lead",
    image:
      "https://images.pexels.com/photos/38399044/pexels-photo-38399044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Artistic portrait of a designer with a red halo effect.",
  },
  {
    name: "Inez Rowe",
    role: "Strategy and Narrative",
    image:
      "https://images.pexels.com/photos/20249614/pexels-photo-20249614.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Dramatic studio portrait of a creative director in dark lighting.",
  },
];

const revealClass =
  "opacity-0 translate-y-8 blur-[2px] transition-all duration-1000 ease-out data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 data-[shown=true]:blur-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  ariaLabel?: string;
};

function MagneticLink({ href, children, variant = "solid", className, ariaLabel }: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const element = linkRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.16;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.2;
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function resetPosition() {
    const element = linkRef.current;
    if (element) element.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <a
      ref={linkRef}
      href={href}
      aria-label={ariaLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-[18px] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] shadow-2xl transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FAFAFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] motion-reduce:transition-none",
        variant === "solid"
          ? "bg-[#FAFAFA] text-[#0A0A0A] shadow-black/40 hover:bg-white hover:shadow-[#2563EB]/20"
          : "border border-white/25 bg-white/0 text-[#FAFAFA] shadow-black/20 hover:border-[#FAFAFA] hover:bg-white/10",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
    </a>
  );
}

function SectionIntro({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div data-reveal className={cn(revealClass, "mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8")}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#A3A3A3]">{kicker}</p>
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <h2 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.86] tracking-[-0.08em] text-[#FAFAFA]">
          {title}
        </h2>
        {copy ? <p className="max-w-xl text-lg leading-8 text-[#A3A3A3] md:pb-3">{copy}</p> : null}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0A0A0A]/25 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="#top" className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <span className="h-3 w-3 rounded-full bg-[#FAFAFA] transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
          <span className="font-display text-xl tracking-[-0.08em] text-[#FAFAFA]">MONOLITH</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A3A3A3] transition-colors duration-300 hover:text-[#FAFAFA] focus:outline-none focus-visible:text-[#FAFAFA]"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-[18px] border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAFAFA] transition-colors duration-300 hover:bg-white hover:text-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Start
        </a>
      </nav>
    </header>
  );
}

function Hero({ ready, scrollY }: { ready: boolean; scrollY: number }) {
  const parallax = Math.min(scrollY * 0.12, 88);
  const titleLift = Math.min(scrollY * -0.05, 0);

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#0A0A0A]" aria-labelledby="hero-title">
      <img
        src={heroImage}
        alt="Creative professionals directing a cinematic studio environment with vivid lighting."
        width="2200"
        height="1200"
        decoding="async"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover opacity-70 saturate-[0.9] transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.08)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(109,40,217,0.28),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(37,99,235,0.22),transparent_25%),linear-gradient(90deg,rgba(10,10,10,0.92),rgba(10,10,10,0.26)_48%,rgba(10,10,10,0.84))]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-end px-4 pb-8 pt-24 sm:px-6 lg:px-8 lg:pb-12">
        <div
          className={cn(
            "transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100",
            ready ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <p className="mb-5 max-w-2xl text-base font-medium leading-7 text-[#FAFAFA]/85 sm:text-lg">
            An independent creative agency shaping identities, products, films, and interactive worlds for brands that refuse to disappear.
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(4.8rem,18vw,19rem)] leading-[0.74] tracking-[-0.12em] text-[#FAFAFA]"
            style={{ transform: `translate3d(0, ${titleLift}px, 0)` }}
          >
            MONOLITH
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,0.75fr)_auto] md:items-end">
            <p className="max-w-2xl text-[clamp(1.6rem,4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#FAFAFA]">
              Originality engineered at cinematic scale.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <MagneticLink href="#contact">Start a Project</MagneticLink>
              <MagneticLink href="#work" variant="outline">
                View Our Work
              </MagneticLink>
            </div>
          </div>
        </div>
        <a
          href="#work"
          className="mt-10 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#A3A3A3] transition-colors duration-300 hover:text-[#FAFAFA] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 motion-safe:animate-[bounce_2.4s_infinite]">
            <MoveDown className="h-4 w-4" aria-hidden="true" />
          </span>
          Scroll
        </a>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section id="work" className="relative bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="work-title">
      <SectionIntro
        kicker="Featured projects"
        title="Work that behaves like culture."
        copy="Each commission is treated as a world: strategy, image, interface, motion, and detail moving as one authored signal."
      />
      <div className="mt-16 sm:mt-24">
        {projects.map((project, index) => (
          <article
            key={project.title}
            data-reveal
            className={cn(
              revealClass,
              "group relative isolate min-h-[72svh] overflow-hidden border-t border-white/10 bg-[#161616] last:border-b md:min-h-[88vh]",
            )}
            style={{ transitionDelay: `${index * 90}ms` } as CSSProperties}
          >
            <img
              src={project.image}
              alt={project.alt}
              width="1800"
              height="1000"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.68] transition duration-700 ease-out group-hover:scale-[1.045] group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.15),rgba(10,10,10,0.92)),linear-gradient(90deg,rgba(10,10,10,0.78),rgba(10,10,10,0.16)_55%,rgba(10,10,10,0.76))]" aria-hidden="true" />
            <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-[1440px] flex-col justify-between px-4 py-8 sm:px-6 md:min-h-[88vh] lg:px-8 lg:py-12">
              <div className="flex items-start justify-between gap-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#FAFAFA]/80">
                <p>{project.category}</p>
                <p>{project.year}</p>
              </div>
              <div className="grid gap-8 md:grid-cols-[1fr_0.56fr] md:items-end">
                <h3 className="font-display text-[clamp(3.5rem,11vw,12rem)] leading-[0.78] tracking-[-0.1em] text-[#FAFAFA]">
                  {project.title}
                </h3>
                <div className="max-w-xl md:pb-2">
                  <p className="text-lg leading-8 text-[#FAFAFA]/82">{project.description}</p>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#FAFAFA] transition-colors duration-300 hover:text-[#A3A3A3] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Request case study
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="philosophy-title">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-[#6D28D9]/20 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div data-reveal className={cn(revealClass, "relative min-h-[520px] overflow-hidden bg-[#161616]")}>
          <img
            src="https://images.pexels.com/photos/7256197/pexels-photo-7256197.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900"
            alt="Dark contemporary art studio with an easel and textured canvas divider."
            width="900"
            height="1200"
            loading="lazy"
            decoding="async"
            className="h-full min-h-[520px] w-full object-cover opacity-[0.82] transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" aria-hidden="true" />
        </div>
        <div data-reveal className={cn(revealClass, "relative flex flex-col justify-center")} style={{ transitionDelay: "120ms" }}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#A3A3A3]">Studio philosophy</p>
          <h2 id="philosophy-title" className="font-display text-[clamp(3.5rem,9vw,10rem)] leading-[0.82] tracking-[-0.1em] text-[#FAFAFA]">
            We design the thing people cannot stop describing.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#A3A3A3]">
            Our work lives between cinema and systems. We make brands feel inevitable, interfaces feel authored, and launches feel like events. The method is precise. The outcome should feel dangerous.
          </p>
          <p className="pointer-events-none absolute -bottom-16 right-0 max-w-3xl font-display text-[clamp(4rem,12vw,13rem)] leading-[0.75] tracking-[-0.12em] text-white/[0.035]" aria-hidden="true">
            UNKNOWN
          </p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="services-title">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.72fr_1fr] lg:px-8">
        <div data-reveal className={cn(revealClass, "lg:sticky lg:top-28 lg:h-fit")}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#A3A3A3]">Services</p>
          <h2 id="services-title" className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.86] tracking-[-0.09em] text-[#FAFAFA]">
            Systems for brave launches.
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-8 text-[#A3A3A3]">
            We assemble senior creative teams around the precise shape of the problem, then build the work with obsessive craft from first line to final frame.
          </p>
        </div>
        <div className="border-t border-white/12">
          {services.map((service, index) => (
            <div
              key={service.name}
              data-reveal
              className={cn(
                revealClass,
                "group grid gap-6 border-b border-white/12 py-8 transition-colors duration-300 hover:border-[#FAFAFA]/55 md:grid-cols-[0.7fr_1fr] md:py-12",
              )}
              style={{ transitionDelay: `${index * 80}ms` } as CSSProperties}
            >
              <h3 className="text-3xl font-semibold tracking-[-0.06em] text-[#FAFAFA] transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                {service.name}
              </h3>
              <p className="max-w-2xl text-base leading-8 text-[#A3A3A3] sm:text-lg">{service.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section id="clients" className="overflow-hidden bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="clients-title">
      <SectionIntro
        kicker="Selected clients"
        title="Trusted by teams with something at stake."
        copy="Global brands, cultural institutions, artists, and founders come to us when the safe answer is no longer useful."
      />
      <div data-reveal className={cn(revealClass, "mx-auto mt-16 max-w-[1440px] px-4 sm:px-6 lg:px-8")}>
        <ul className="grid border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((client, index) => (
            <li
              key={client}
              className="border-b border-white/12 py-7 text-2xl font-semibold tracking-[-0.06em] text-[#FAFAFA] transition-colors duration-300 hover:text-[#2563EB] sm:py-9 sm:text-4xl"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section className="relative bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="awards-title">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div data-reveal className={cn(revealClass, "grid gap-10 md:grid-cols-[0.75fr_1fr]")}>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#A3A3A3]">Awards and recognition</p>
            <h2 id="awards-title" className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.84] tracking-[-0.09em] text-[#FAFAFA]">
              The work has receipts.
            </h2>
          </div>
          <div className="border-t border-white/12">
            {awards.map(([source, honor, year], index) => (
              <div
                key={`${source}-${honor}`}
                data-reveal
                className={cn(revealClass, "grid grid-cols-[1fr_auto] gap-6 border-b border-white/12 py-6 sm:grid-cols-[0.7fr_1fr_auto] sm:py-8")}
                style={{ transitionDelay: `${index * 70}ms` } as CSSProperties}
              >
                <p className="text-lg font-semibold text-[#FAFAFA]">{source}</p>
                <p className="text-[#A3A3A3] sm:text-lg">{honor}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FAFAFA]/70">{year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="process-title">
      <SectionIntro
        kicker="Process"
        title="A disciplined route to the unexpected."
        copy="The work feels wild because the process is exact. Every phase reduces uncertainty while keeping the original spark alive."
      />
      <div className="mx-auto mt-16 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-px overflow-hidden bg-white/12 md:grid-cols-4">
          {process.map(([number, title, copy], index) => (
            <article
              key={title}
              data-reveal
              className={cn(revealClass, "min-h-80 bg-[#0A0A0A] p-6 transition-colors duration-300 hover:bg-[#161616] sm:p-8")}
              style={{ transitionDelay: `${index * 90}ms` } as CSSProperties}
            >
              <p className="mb-20 text-xs font-semibold uppercase tracking-[0.35em] text-[#6D28D9]">{number}</p>
              <h3 className="text-3xl font-semibold tracking-[-0.06em] text-[#FAFAFA]">{title}</h3>
              <p className="mt-5 leading-7 text-[#A3A3A3]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="team-title">
      <SectionIntro
        kicker="Team"
        title="Small by design. Senior by default."
        copy="A tight studio of directors, designers, strategists, engineers, filmmakers, and producers, extended by a global bench of specialists."
      />
      <div className="mx-auto mt-16 grid max-w-[1440px] gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {team.map((member, index) => (
          <figure
            key={member.name}
            data-reveal
            className={cn(revealClass, index === 1 ? "md:mt-24" : index === 2 ? "md:mt-8" : "")}
            style={{ transitionDelay: `${index * 110}ms` } as CSSProperties}
          >
            <div className="overflow-hidden bg-[#161616]">
              <img
                src={member.image}
                alt={member.alt}
                width="800"
                height="1200"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-5 border-t border-white/12 pt-4">
              <p className="text-2xl font-semibold tracking-[-0.06em] text-[#FAFAFA]">{member.name}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.22em] text-[#A3A3A3]">{member.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="testimonial-title">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#2563EB]/15 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div data-reveal className={cn(revealClass, "relative min-h-[420px] overflow-hidden bg-[#161616]")}>
          <img
            src="https://images.pexels.com/photos/10220276/pexels-photo-10220276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900"
            alt="Modern sculpture installation in a dim gallery corridor."
            width="900"
            height="1100"
            loading="lazy"
            decoding="async"
            className="h-full min-h-[420px] w-full object-cover opacity-[0.85]"
          />
        </div>
        <blockquote data-reveal className={cn(revealClass, "flex flex-col justify-center")} style={{ transitionDelay: "120ms" }}>
          <p id="testimonial-title" className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#A3A3A3]">Testimonials</p>
          <p className="text-[clamp(2.25rem,6vw,6.6rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-[#FAFAFA]">
            "Monolith made the launch feel less like a website and more like an event people wanted to enter twice."
          </p>
          <footer className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-[#A3A3A3]">
            Ren Ito, Chief Brand Officer
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#0A0A0A] py-24 sm:py-32" aria-labelledby="contact-title">
      <img
        src="https://images.pexels.com/photos/10294783/pexels-photo-10294783.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800"
        alt="Silhouetted person inside a modern illuminated architectural space."
        width="1800"
        height="1100"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-28"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(37,99,235,0.22),transparent_30%),linear-gradient(90deg,rgba(10,10,10,0.96),rgba(10,10,10,0.72)_55%,rgba(10,10,10,0.94))]" aria-hidden="true" />
      <div data-reveal className={cn(revealClass, "relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8")}>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#A3A3A3]">Contact</p>
        <h2 id="contact-title" className="max-w-6xl font-display text-[clamp(4rem,13vw,14rem)] leading-[0.76] tracking-[-0.12em] text-[#FAFAFA]">
          Make the work impossible to ignore.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-[0.8fr_auto] md:items-end">
          <p className="max-w-2xl text-lg leading-8 text-[#A3A3A3]">
            Tell us what you are launching, changing, or refusing to compromise. We will reply with a sharp point of view, not a sales deck.
          </p>
          <MagneticLink href="mailto:studio@monolith.example?subject=Start%20a%20Project" className="md:justify-self-end">
            Start a Project
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/12 bg-[#0A0A0A] px-4 py-10 sm:px-6 lg:px-8" aria-label="Footer">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <a href="#top" className="font-display text-4xl tracking-[-0.09em] text-[#FAFAFA] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            MONOLITH
          </a>
          <p className="mt-4 max-w-sm leading-7 text-[#A3A3A3]">Original identities, cinematic products, and interactive systems from a dark room full of bright obsessions.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#FAFAFA]">Studios</p>
            <p className="leading-7 text-[#A3A3A3]">New York<br />Amsterdam<br />Remote worldwide</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#FAFAFA]">Contact</p>
            <a className="leading-7 text-[#A3A3A3] transition-colors hover:text-[#FAFAFA]" href="mailto:studio@monolith.example">studio@monolith.example</a>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#FAFAFA]">Social</p>
            <div className="flex flex-col gap-2">
              {['Instagram', 'LinkedIn', 'Vimeo'].map((item) => (
                <a key={item} href="#top" className="w-fit text-[#A3A3A3] transition-colors hover:text-[#FAFAFA] focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-4 border-t border-white/12 pt-6 text-xs uppercase tracking-[0.22em] text-[#A3A3A3] sm:flex-row sm:items-center sm:justify-between">
        <p>2026 Monolith Studio</p>
        <p>Crafted for fearless briefs</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.dataset.shown = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.dataset.shown = "true";
            observer.unobserve(element);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let frame = 0;
    const update = () => {
      setScrollY(window.scrollY);
      frame = 0;
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-[#FAFAFA] antialiased selection:bg-[#6D28D9] selection:text-white">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[18px] focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#0A0A0A]"
      >
        Skip to featured work
      </a>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.045] mix-blend-screen [background-image:radial-gradient(circle_at_1px_1px,rgba(250,250,250,0.65)_1px,transparent_0)] [background-size:4px_4px]"
      />
      <Header />
      <main>
        <Hero ready={ready} scrollY={scrollY} />
        <FeaturedProjects />
        <Philosophy />
        <Services />
        <Clients />
        <Awards />
        <Process />
        <Team />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}