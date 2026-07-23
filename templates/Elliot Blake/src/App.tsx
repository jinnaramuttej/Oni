import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Mail,
  Menu,
  MonitorSmartphone,
  PenTool,
  Quote,
  X,
} from "lucide-react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
];

type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  result: string;
  challenge: string;
  solution: string;
};

const projects: Project[] = [
  {
    id: "fathom",
    number: "01",
    name: "Fathom",
    category: "Fintech / Product design / Development",
    description:
      "A clearer command center for modern finance teams, bringing forecasts, spend, and runway into one calm workspace.",
    technologies: ["Next.js", "TypeScript", "Figma", "Postgres"],
    result: "38% faster monthly reporting",
    challenge:
      "Finance teams were losing days reconciling fragmented spreadsheets and tools before they could make a decision.",
    solution:
      "I led the product language, interaction model, and frontend build for a single workspace that makes financial health legible at a glance.",
  },
  {
    id: "aster",
    number: "02",
    name: "Aster AI",
    category: "AI / Product strategy / Design system",
    description:
      "A human-centered clinical operations platform that turns dense patient signals into confident next actions.",
    technologies: ["React", "Python", "Framer", "AWS"],
    result: "2.4x faster care reviews",
    challenge:
      "Clinical teams needed AI assistance without adding uncertainty, noise, or another opaque workflow to their day.",
    solution:
      "I shaped an explainable interface system with transparent recommendations, focused review states, and accessible clinical patterns.",
  },
  {
    id: "serein",
    number: "03",
    name: "Serein",
    category: "Travel / Brand experience / Commerce",
    description:
      "A slow-travel platform pairing considered stays with editorial storytelling and a beautifully simple booking journey.",
    technologies: ["Next.js", "Sanity", "Stripe", "GSAP"],
    result: "61% lift in qualified enquiries",
    challenge:
      "A boutique travel collective had a distinctive point of view, but its digital experience felt like every other booking site.",
    solution:
      "I created a restrained identity and cinematic commerce experience that lets each destination lead without sacrificing speed or conversion.",
  },
];

const experience = [
  {
    period: "2022 - Now",
    role: "Independent Product Designer & Developer",
    company: "Elliot Blake Studio",
    detail: "Partnering with ambitious teams from first sketch to shipped product.",
  },
  {
    period: "2020 - 2022",
    role: "Lead Product Designer",
    company: "North & Co.",
    detail: "Led product design and design systems across a portfolio of early-stage ventures.",
  },
  {
    period: "2017 - 2020",
    role: "Senior Experience Designer",
    company: "Studio Parallel",
    detail: "Designed digital products for clients in finance, culture, and climate technology.",
  },
];

const testimonials = [
  {
    quote:
      "Elliot brought rare clarity to an extremely complex product. He challenged the right things, moved with speed, and raised the quality bar for our entire team.",
    name: "Maya Chen",
    role: "Co-founder, Fathom",
  },
  {
    quote:
      "The work is beautiful, but more importantly it works. Elliot understood our customers quickly and turned that understanding into a product people genuinely trust.",
    name: "Daniel Rowe",
    role: "VP Product, Aster AI",
  },
  {
    quote:
      "Working with Elliot felt like adding a senior design partner and principal engineer at once. Thoughtful, direct, reliable, and exceptional at the details.",
    name: "Sofia Marin",
    role: "Founder, Serein",
  },
];

const achievements = [
  { year: "2025", title: "Awwwards Honorable Mention", project: "Serein" },
  { year: "2024", title: "CSS Design Awards, Special Kudos", project: "Aster AI" },
  { year: "2024", title: "Featured Site of the Day", project: "Land-book" },
  { year: "2023", title: "Independent of the Year, Finalist", project: "ADC Europe" },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  number,
  label,
  title,
  intro,
}: {
  number: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="grid gap-8 border-t border-black/10 pt-6 md:grid-cols-12 md:gap-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 md:col-span-3">
        {number} / {label}
      </p>
      <div className="md:col-span-9">
        <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#111111]">
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function PrimaryLink({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-14 items-center justify-center gap-3 rounded-[18px] px-6 text-sm font-semibold tracking-tight shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 active:scale-[0.98] ${
        inverse
          ? "bg-[#fafafa] text-[#111111] hover:bg-white hover:shadow-lg"
          : "bg-[#111111] text-white hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/15"
      }`}
    >
      {children}
      <ArrowUpRight
        size={17}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-black/5 bg-[#fafafa]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16"
      >
        <a
          href="#top"
          className="relative z-10 text-base font-bold tracking-[-0.03em] text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          onClick={() => setOpen(false)}
        >
          EB<span className="text-blue-600">.</span>
          <span className="sr-only">Elliot Blake, back to top</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:hello@elliotblake.design?subject=Project%20enquiry"
            className="inline-flex h-11 items-center gap-2 rounded-[14px] bg-[#111111] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Hire me
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-10 grid size-11 place-items-center rounded-[14px] border border-black/10 bg-white/70 text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="border-t border-black/5 bg-[#fafafa] px-6 pb-8 pt-4 md:hidden"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="border-b border-black/10 py-5 text-2xl font-semibold tracking-tight text-[#111111]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="mailto:hello@elliotblake.design?subject=Project%20enquiry"
                className="mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] bg-[#111111] px-6 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Start a project
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const transition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[760px] items-end overflow-hidden pb-16 pt-32 sm:min-h-[800px] md:h-[min(920px,100svh)] md:items-center md:pb-0"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 left-[18%] sm:left-[28%] md:left-auto md:w-[58%]"
      >
        <img
          src="/images/elliot-portrait.jpg"
          alt="Elliot Blake, independent product designer and developer"
          className="h-full w-full object-cover object-[58%_center] md:object-center"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/40 to-[#fafafa]/5 md:bg-gradient-to-r md:from-[#fafafa] md:via-[#fafafa]/95 md:to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,0.035)_1px,transparent_1px)] bg-[size:16.66%_100%] opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.15 }}
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
          >
            <span className="size-2 rounded-full bg-blue-600" aria-hidden="true" />
            Independent product designer + developer
          </motion.p>

          <h1
            id="hero-title"
            className="text-[clamp(4.5rem,12vw,10.5rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-[#111111]"
          >
            <motion.span
              className="block"
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.22 }}
            >
              Elliot
            </motion.span>
            <motion.span
              className="block"
              initial={reduceMotion ? false : { opacity: 0, y: 50 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.32 }}
            >
              Blake<span className="text-blue-600">.</span>
            </motion.span>
          </h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.48 }}
            className="mt-8 max-w-xl md:ml-2 md:mt-10"
          >
            <p className="max-w-lg text-lg leading-8 text-slate-700 md:text-xl md:leading-8">
              I turn ambitious ideas into clear, useful digital products that people remember and businesses can grow on.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <PrimaryLink href="mailto:hello@elliotblake.design?subject=Project%20enquiry">
                Hire me
              </PrimaryLink>
              <a
                href="#work"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-[18px] border border-black/15 bg-white/60 px-6 text-sm font-semibold text-[#111111] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:bg-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 active:scale-[0.98]"
              >
                View projects
                <ArrowDown
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to selected work"
        className="absolute bottom-7 right-6 z-10 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:flex md:right-10 lg:right-16"
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll to work
        <span className="grid size-10 place-items-center rounded-full border border-black/15 bg-white/50 backdrop-blur-sm">
          <ArrowDown size={16} aria-hidden="true" />
        </span>
      </motion.a>
    </section>
  );
}

function FathomVisual() {
  const bars = [42, 58, 48, 72, 65, 88, 78, 94];

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden bg-[#e7ebf1] p-5 sm:p-8 lg:min-h-[540px]">
      <div className="absolute -right-16 -top-16 size-64 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-7 left-7 right-7 top-16 overflow-hidden rounded-xl border border-white/80 bg-white shadow-2xl shadow-slate-400/20 transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:bottom-10 sm:left-10 sm:right-10">
        <div className="flex h-10 items-center gap-1.5 border-b border-slate-200 px-4">
          <span className="size-2 rounded-full bg-slate-300" />
          <span className="size-2 rounded-full bg-slate-300" />
          <span className="size-2 rounded-full bg-slate-300" />
          <span className="ml-3 h-4 w-28 rounded bg-slate-100" />
        </div>
        <div className="grid h-[calc(100%-2.5rem)] grid-cols-[52px_1fr] sm:grid-cols-[100px_1fr]">
          <div className="border-r border-slate-200 bg-[#f8f9fb] p-3">
            <div className="mb-8 flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-[#111111] text-[8px] font-bold text-white">F</span>
              <span className="hidden text-[8px] font-bold text-slate-700 sm:block">FATHOM</span>
            </div>
            <div className="space-y-3">
              {[75, 58, 68, 48].map((width, index) => (
                <div key={width} className="flex items-center gap-2">
                  <span className={`size-2 rounded-sm ${index === 0 ? "bg-blue-600" : "bg-slate-200"}`} />
                  <span className="hidden h-1.5 rounded bg-slate-200 sm:block" style={{ width: `${width}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-widest text-slate-400">Overview</p>
                <p className="mt-1 text-sm font-bold tracking-tight text-slate-800 sm:text-lg">Good morning, Maya</p>
              </div>
              <div className="size-7 rounded-full bg-slate-200" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              {[
                ["Runway", "18.4 mo"],
                ["Cash flow", "+ $84k"],
                ["Net burn", "$112k"],
              ].map(([label, value], index) => (
                <div key={label} className={`rounded-lg border border-slate-200 p-3 ${index === 2 ? "hidden sm:block" : ""}`}>
                  <p className="text-[7px] text-slate-400">{label}</p>
                  <p className="mt-1 text-xs font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-slate-200 p-3 sm:mt-4 sm:p-4">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-semibold text-slate-600">Cash overview</p>
                <p className="text-[7px] text-slate-400">Last 8 months</p>
              </div>
              <div className="mt-4 flex h-20 items-end gap-2 sm:h-28 sm:gap-3">
                {bars.map((height, index) => (
                  <div key={index} className="flex h-full flex-1 items-end rounded-sm bg-slate-100">
                    <span
                      className={`w-full rounded-sm ${index > 5 ? "bg-blue-600" : "bg-slate-300"}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute left-7 top-7 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 sm:left-10 sm:top-9">
        Financial clarity, at a glance
      </p>
    </div>
  );
}

function AsterVisual() {
  return (
    <div className="group relative h-full min-h-[440px] overflow-hidden bg-[#151515] p-6 sm:p-8">
      <div className="absolute left-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[90px]" />
      <div className="relative z-10 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide">
          <span className="grid size-7 place-items-center rounded-full border border-white/20">A</span>
          ASTER
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Clinical intelligence</span>
      </div>
      <div className="absolute inset-x-6 bottom-0 top-24 transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:inset-x-10">
        <div className="absolute bottom-[-12%] left-0 top-6 w-[72%] overflow-hidden rounded-t-2xl border border-white/10 bg-[#f8f8f6] shadow-2xl">
          <div className="flex h-10 items-center gap-2 border-b border-black/10 px-3">
            <span className="size-2 rounded-full bg-violet-600" />
            <span className="text-[8px] font-semibold text-slate-600">Patient review / RM-284</span>
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">RM</div>
              <div>
                <p className="text-xs font-bold text-slate-900">Rachel Morgan</p>
                <p className="text-[8px] text-slate-400">Care plan review</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["Signals", "Timeline", "Care plan"].map((item, index) => (
                <div key={item} className={`rounded-lg border p-2 ${index === 0 ? "border-violet-200 bg-violet-50" : "border-slate-200"}`}>
                  <div className={`mb-3 size-2 rounded-full ${index === 0 ? "bg-violet-600" : "bg-slate-300"}`} />
                  <span className="text-[7px] font-semibold text-slate-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-2 rounded-lg border border-slate-200 p-3">
              <div className="h-1.5 w-1/2 rounded bg-slate-200" />
              <div className="h-1.5 w-full rounded bg-slate-100" />
              <div className="h-1.5 w-4/5 rounded bg-slate-100" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[8%] right-0 w-[44%] rounded-xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-white">Aster insight</span>
            <span className="size-2 rounded-full bg-violet-400" />
          </div>
          <p className="text-[9px] leading-4 text-white/80 sm:text-[10px]">
            Two changes may need review before the next care check-in.
          </p>
          <div className="mt-4 flex items-center gap-1 text-[8px] font-semibold text-violet-300">
            Review evidence
            <ArrowRight size={9} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SereinVisual() {
  return (
    <div className="group relative h-full min-h-[440px] overflow-hidden bg-[#e8e3dc] p-6 sm:p-8">
      <div className="flex items-center justify-between text-[#2a2826]">
        <span className="font-serif text-xl italic tracking-tight">Serein</span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Places with a point of view</span>
      </div>
      <div className="absolute bottom-0 left-8 right-0 top-24 overflow-hidden rounded-tl-2xl bg-[#f7f4ef] shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:left-14">
        <div className="relative h-[62%] overflow-hidden bg-[#b4c6c9]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#beced0] via-[#9db3b6] to-[#586e72]" />
          <div className="absolute -bottom-[38%] left-[10%] h-[92%] w-[78%] rounded-t-[50%] border-[18px] border-[#d6c3a8] bg-[#6f898d] sm:border-[28px]" />
          <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-[#536a6e]/80" />
          <div className="absolute left-5 top-5 text-[8px] font-semibold uppercase tracking-[0.2em] text-white">Aegean / 36.3932 N</div>
          <div className="absolute bottom-5 right-5 grid size-10 place-items-center rounded-full border border-white/50 text-white">
            <ArrowDown size={13} />
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-4 p-5 sm:p-7">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-500">Santorini, Greece</p>
            <p className="mt-2 font-serif text-2xl tracking-tight text-[#2a2826] sm:text-3xl">The quiet side of blue.</p>
          </div>
          <div className="hidden size-12 place-items-center rounded-full bg-[#2a2826] text-white sm:grid">
            <ArrowUpRight size={15} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ id }: { id: string }) {
  if (id === "fathom") return <FathomVisual />;
  if (id === "aster") return <AsterVisual />;
  return <SereinVisual />;
}

function ProjectCard({
  project,
  featured = false,
  onOpen,
}: {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
}) {
  return (
    <Reveal className={featured ? "col-span-12" : "col-span-12 lg:col-span-6"}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-black/[0.08] bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,23,42,0.11)]">
        <div className={featured ? "lg:min-h-[540px]" : ""}>
          <ProjectVisual id={project.id} />
        </div>
        <div className={`flex flex-1 flex-col p-6 sm:p-8 ${featured ? "lg:grid lg:grid-cols-12 lg:gap-8 lg:p-10" : ""}`}>
          <div className={featured ? "lg:col-span-4" : ""}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {project.number} / {project.category}
            </p>
            <h3 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-5xl">
              {project.name}
            </h3>
          </div>
          <div className={`mt-5 flex flex-1 flex-col ${featured ? "lg:col-span-8 lg:mt-0" : ""}`}>
            <p className="max-w-2xl text-base leading-7 text-slate-600">{project.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">
              {project.technologies.map((technology, index) => (
                <span key={technology} className="flex items-center gap-3">
                  {technology}
                  {index !== project.technologies.length - 1 && <span className="text-slate-300">/</span>}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="mt-8 inline-flex w-fit items-center gap-2 border-b border-black/25 pb-1 text-sm font-semibold text-[#111111] transition-colors hover:border-blue-600 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
            >
              View case study
              <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[20px] bg-[#fafafa] shadow-2xl sm:rounded-[20px]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-[#fafafa]/90 px-6 py-4 backdrop-blur-xl sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Case study / {project.number}
              </p>
              <button
                type="button"
                onClick={onClose}
                autoFocus
                aria-label="Close case study"
                className="grid size-11 place-items-center rounded-full border border-black/10 bg-white transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{project.category}</p>
                  <h2 id="case-study-title" className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-[#111111] sm:text-7xl">
                    {project.name}
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-slate-600">{project.description}</p>
                </div>
                <div className="border-t border-black/10 pt-5 lg:col-span-4 lg:col-start-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Measured outcome</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-[#111111]">{project.result}</p>
                </div>
              </div>
              <div className="mt-10 overflow-hidden rounded-[20px]">
                <ProjectVisual id={project.id} />
              </div>
              <div className="mt-10 grid gap-10 border-t border-black/10 pt-8 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-[#111111]">The challenge</h3>
                  <p className="mt-3 leading-7 text-slate-600">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111111]">The response</h3>
                  <p className="mt-3 leading-7 text-slate-600">{project.solution}</p>
                </div>
              </div>
              <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center">
                <p className="max-w-md text-sm leading-6 text-slate-500">
                  Interested in the process, constraints, and full outcome? I can walk you through the complete case study.
                </p>
                <PrimaryLink href={`mailto:hello@elliotblake.design?subject=${encodeURIComponent(`Tell me about ${project.name}`)}`}>
                  Ask about this project
                </PrimaryLink>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WorkSection({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <div id="work-title">
          <SectionHeader
            number="01"
            label="Selected work"
            title="Built to earn attention. Designed to keep it."
            intro="A selection of product, brand, and engineering work shaped around real customer needs and measurable outcomes."
          />
        </div>
        <div className="mt-14 grid grid-cols-12 gap-6 md:mt-20 md:gap-8">
          <ProjectCard project={projects[0]} featured onOpen={onOpen} />
          <ProjectCard project={projects[1]} onOpen={onOpen} />
          <ProjectCard project={projects[2]} onOpen={onOpen} />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 bg-[#f3f4f6] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <div id="about-title">
          <SectionHeader number="02" label="About" title="I make complex things feel obvious." />
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[20px]">
              <img
                src="/images/elliot-workspace.jpg"
                alt="A product design workspace with interface wireframes and a sketchbook"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02] lg:aspect-[4/5]"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-2xl font-medium leading-[1.35] tracking-[-0.03em] text-[#111111] sm:text-3xl">
                I am Elliot, a product designer who codes. For eight years, I have helped early-stage teams and established companies find clarity, move faster, and ship work they are proud of.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 grid gap-6 text-base leading-7 text-slate-600 sm:grid-cols-2">
              <p>
                My process connects strategy, design, and engineering from day one. That means fewer handoffs, better decisions, and a final product that holds onto the original idea.
              </p>
              <p>
                I care about the small things because they shape how a product feels. But polish is never decoration. Every choice should make the experience clearer, faster, or more human.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/10 pt-6 text-sm font-semibold text-slate-700">
              <span>Based in Amsterdam</span>
              <span>Working worldwide</span>
              <span>English + Dutch</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const groups = [
    {
      icon: PenTool,
      number: "01",
      title: "Design",
      items: ["Product strategy", "UX & interaction", "Visual systems", "Prototyping"],
    },
    {
      icon: Code2,
      number: "02",
      title: "Build",
      items: ["React / Next.js", "TypeScript", "Motion systems", "Design engineering"],
    },
    {
      icon: Layers3,
      number: "03",
      title: "Ship",
      items: ["Design systems", "Accessibility", "Performance", "Product iteration"],
    },
  ];

  return (
    <section aria-labelledby="skills-title" className="px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <div id="skills-title">
          <SectionHeader
            number="03"
            label="Capabilities"
            title="One partner from first principle to final pixel."
            intro="The range to think strategically, make deliberately, and carry quality all the way into production."
          />
        </div>

        <div className="mt-14 grid md:mt-20 md:grid-cols-3">
          {groups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal
                key={group.title}
                delay={index * 0.08}
                className="border-t border-black/10 py-8 md:border-l md:border-t-0 md:px-8 md:py-0 first:md:border-l-0 first:md:pl-0 last:md:pr-0"
              >
                <div className="flex items-center justify-between">
                  <Icon size={22} strokeWidth={1.6} className="text-blue-600" aria-hidden="true" />
                  <span className="text-xs font-semibold text-slate-400">{group.number}</span>
                </div>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-[#111111]">{group.title}</h3>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="h-px w-4 bg-black/25" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-5 border-y border-black/10 py-6 md:mt-24">
          <p className="mr-auto text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Daily toolkit</p>
          {[
            [PenTool, "Figma"],
            [Code2, "TypeScript"],
            [MonitorSmartphone, "Next.js"],
            [Layers3, "Framer"],
          ].map(([Icon, label]) => {
            const ToolIcon = Icon as typeof PenTool;
            return (
              <span key={label as string} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <ToolIcon size={17} strokeWidth={1.7} aria-hidden="true" />
                {label as string}
              </span>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 bg-[#111111] px-6 py-24 text-white md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <Reveal className="grid gap-8 border-t border-white/15 pt-6 md:grid-cols-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45 md:col-span-3">04 / Experience</p>
          <div className="md:col-span-9">
            <h2 id="experience-title" className="max-w-4xl text-[clamp(2.4rem,5vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
              Eight years of turning uncertainty into shipped work.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          {experience.map((item, index) => (
            <Reveal key={item.company} delay={index * 0.07}>
              <article className="grid gap-4 border-t border-white/15 py-8 transition-colors hover:border-white/35 md:grid-cols-12 md:gap-8 md:py-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45 md:col-span-3">{item.period}</p>
                <div className="md:col-span-5">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{item.role}</h3>
                  <p className="mt-1 text-sm text-blue-400">{item.company}</p>
                </div>
                <p className="max-w-md text-sm leading-6 text-white/55 md:col-span-4">{item.detail}</p>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-white/15" />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      number: "01",
      title: "Product definition",
      description: "For teams turning a promising idea into a focused product direction worth investing in.",
      deliverables: ["Discovery sprint", "Product strategy", "Prototype & validation"],
    },
    {
      number: "02",
      title: "Design & systems",
      description: "For products that need a more coherent experience, stronger identity, or scalable foundation.",
      deliverables: ["UX and UI design", "Visual direction", "Design system"],
    },
    {
      number: "03",
      title: "Design engineering",
      description: "For teams that value a seamless path from approved design to polished, production-ready interface.",
      deliverables: ["React development", "Motion & interaction", "Quality and accessibility"],
    },
  ];

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <div id="services-title">
          <SectionHeader
            number="05"
            label="Services"
            title="Flexible support. Senior attention throughout."
            intro="Focused engagements designed around the stage, team, and outcome rather than a fixed playbook."
          />
        </div>

        <div className="mt-14 grid md:mt-20 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.number}
              delay={index * 0.08}
              className="border-t border-black/10 py-8 lg:border-l lg:border-t-0 lg:px-8 lg:py-0 first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0"
            >
              <span className="text-xs font-semibold text-blue-600">{service.number}</span>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-[#111111] sm:text-3xl">{service.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">{service.description}</p>
              <ul className="mt-8 space-y-3 border-t border-black/10 pt-6">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Check size={15} strokeWidth={1.8} className="text-blue-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  const goPrevious = () => setActive((active - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActive((active + 1) % testimonials.length);

  return (
    <section aria-labelledby="testimonials-title" className="bg-[#f3f4f6] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <Reveal className="grid gap-8 border-t border-black/10 pt-6 md:grid-cols-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 md:col-span-3">06 / Kind words</p>
          <div className="md:col-span-9">
            <Quote size={28} strokeWidth={1.4} className="mb-8 text-violet-600" aria-hidden="true" />
            <h2 id="testimonials-title" className="sr-only">Client testimonials</h2>
            <div className="min-h-[330px] sm:min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <blockquote className="max-w-5xl text-[clamp(2rem,4.4vw,4.75rem)] font-medium leading-[1.08] tracking-[-0.05em] text-[#111111]">
                    "{testimonial.quote}"
                  </blockquote>
                  <figcaption className="mt-8">
                    <p className="font-semibold text-[#111111]">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5">
              <p className="text-xs font-semibold tracking-[0.15em] text-slate-500">
                0{active + 1} / 0{testimonials.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={goPrevious}
                  aria-label="Previous testimonial"
                  className="grid size-12 place-items-center rounded-full border border-black/15 transition-all hover:border-black hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="grid size-12 place-items-center rounded-full border border-black/15 transition-all hover:border-black hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section aria-labelledby="achievements-title" className="px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <div id="achievements-title">
          <SectionHeader number="07" label="Recognition" title="Selected achievements, quietly appreciated." />
        </div>
        <ol className="mt-14 border-b border-black/10 md:mt-20">
          {achievements.map((achievement, index) => (
            <Reveal key={`${achievement.year}-${achievement.title}`} delay={index * 0.05}>
              <li className="group grid gap-2 border-t border-black/10 py-6 transition-colors hover:border-black/30 sm:grid-cols-12 sm:items-center sm:gap-8 sm:py-7">
                <span className="text-xs font-semibold text-slate-400 sm:col-span-2">{achievement.year}</span>
                <span className="text-lg font-semibold tracking-tight text-[#111111] sm:col-span-6 sm:text-xl">{achievement.title}</span>
                <span className="text-sm text-slate-500 sm:col-span-3">{achievement.project}</span>
                <ArrowUpRight
                  size={17}
                  className="hidden justify-self-end text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
                  aria-hidden="true"
                />
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-[#111111] px-6 py-24 text-white md:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1312px]">
        <Reveal className="grid gap-10 border-t border-white/15 pt-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">08 / Contact</p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/65">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Available from June 2026
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 id="contact-title" className="max-w-5xl text-[clamp(3.2rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              Have a project in mind?
              <span className="block text-white/35">Let's make it count.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/55 md:text-lg">
              Tell me what you are building, where you are stuck, and what a meaningful outcome looks like. I usually reply within two business days.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <PrimaryLink href="mailto:hello@elliotblake.design?subject=Project%20enquiry" inverse>
                Start a project
              </PrimaryLink>
              <a
                href="mailto:hello@elliotblake.design"
                className="group inline-flex items-center gap-3 border-b border-white/25 pb-1 text-sm font-semibold text-white transition-colors hover:border-blue-400 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
                hello@elliotblake.design
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] px-6 py-8 text-white md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#top" className="text-2xl font-bold tracking-[-0.04em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            EB<span className="text-blue-500">.</span>
          </a>
          <p className="mt-3 text-xs leading-5 text-white/40">Designed and built with care in Amsterdam.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Layers3 size={18} strokeWidth={1.7} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <Code2 size={18} strokeWidth={1.7} />
          </a>
          <a
            href="#top"
            className="group ml-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Back to top
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1312px] justify-between border-t border-white/10 pt-6 text-[11px] text-white/30">
        <p>Copyright 2026 Elliot Blake</p>
        <p>Independent / Available worldwide</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fafafa] text-[#111111]">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[120] -translate-y-20 rounded-lg bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="noise fixed inset-0 z-[90] opacity-[0.025]" aria-hidden="true" />
      <Navigation />
      <main id="main-content">
        <Hero />
        <WorkSection onOpen={setSelectedProject} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <TestimonialsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}