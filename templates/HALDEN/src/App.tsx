import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  Mail,
  Menu,
  X,
} from "lucide-react";

const images = {
  hero: "https://images.pexels.com/photos/14010095/pexels-photo-14010095.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200",
  wedding: "https://images.pexels.com/photos/19369012/pexels-photo-19369012.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600",
  fashion: "https://images.pexels.com/photos/25208549/pexels-photo-25208549.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  elephant: "https://images.pexels.com/photos/20852267/pexels-photo-20852267.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500",
  portrait: "https://images.pexels.com/photos/7404731/pexels-photo-7404731.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  architecture: "https://images.pexels.com/photos/29797868/pexels-photo-29797868.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  mountain: "https://images.pexels.com/photos/28575769/pexels-photo-28575769.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500",
  desert: "https://images.pexels.com/photos/29538371/pexels-photo-29538371.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500",
  perfume: "https://images.pexels.com/photos/11216321/pexels-photo-11216321.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  coast: "https://images.pexels.com/photos/7539677/pexels-photo-7539677.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500",
  photographer: "https://images.pexels.com/photos/36580588/pexels-photo-36580588.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1000",
  behindScenes: "https://images.pexels.com/photos/7130237/pexels-photo-7130237.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
};

const navItems = [
  { label: "Featured", href: "#featured" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

const portfolioItems = [
  {
    image: images.portrait,
    category: "Portrait / Documentary",
    title: "Faces of Mazandaran",
    location: "Iran, 2024",
    className: "md:col-span-5",
    ratio: "aspect-[4/5]",
    alt: "Black and white portrait of an elderly man",
  },
  {
    image: images.mountain,
    category: "Landscape",
    title: "Where the Earth Breathes",
    location: "Soca Valley, 2025",
    className: "md:col-span-7 md:pt-24",
    ratio: "aspect-[4/3]",
    alt: "Misty mountain peaks in a dramatic valley",
  },
  {
    image: images.architecture,
    category: "Architecture",
    title: "Monuments to Silence",
    location: "Tbilisi, 2024",
    className: "md:col-span-4 md:pt-8",
    ratio: "aspect-[4/5]",
    alt: "Brutalist concrete architecture in dramatic light",
  },
  {
    image: images.desert,
    category: "Travel",
    title: "Across the Quiet",
    location: "Merzouga, 2025",
    className: "md:col-span-8",
    ratio: "aspect-[16/10]",
    alt: "A solitary figure crossing warm desert dunes",
  },
  {
    image: images.perfume,
    category: "Product / Still Life",
    title: "Nocturne No. 7",
    location: "Studio commission, 2025",
    className: "md:col-span-5",
    ratio: "aspect-[4/5]",
    alt: "Black perfume bottle reflected on a dark surface",
  },
  {
    image: images.coast,
    category: "Lifestyle / Motion",
    title: "To Meet the Weather",
    location: "Atlantic Coast, 2023",
    className: "md:col-span-7 md:pt-24",
    ratio: "aspect-[4/3]",
    alt: "Woman moving in the wind on a rocky coastline",
  },
];

const services = [
  {
    number: "01",
    title: "Portrait & Editorial",
    copy: "Intimate, art-directed portraiture for people, publications, and enduring personal archives.",
  },
  {
    number: "02",
    title: "Weddings & Celebrations",
    copy: "Honest observation and elegant composition, preserving the energy between the expected moments.",
  },
  {
    number: "03",
    title: "Brand & Campaign",
    copy: "Distinctive visual worlds for fashion, hospitality, architecture, and considered products.",
  },
  {
    number: "04",
    title: "Travel & Documentary",
    copy: "Long-form stories shaped by place, culture, and the quiet details that make them unforgettable.",
  },
];

const testimonials = [
  {
    quote:
      "Elena did more than document our story. She found the moments inside it that we had not yet learned to see.",
    name: "Amelia & Julien",
    detail: "Lake Como wedding",
  },
  {
    quote:
      "A rare balance of precision and instinct. Every frame felt art-directed, yet completely alive and true to us.",
    name: "Mara Voss",
    detail: "Creative Director, Forme",
  },
  {
    quote:
      "The final series has a permanence that transcends campaign imagery. It has become part of our visual history.",
    name: "Theo Laurent",
    detail: "Founder, Maison Laurent",
  },
];

const publications = [
  ["LensCulture", "Portrait Awards / Finalist", "2025"],
  ["Vogue Italia", "PhotoVogue Selection", "2024"],
  ["International Photography Awards", "Editorial / Gold", "2024"],
  ["Kinfolk", "New Perspectives, Issue 51", "2023"],
  ["British Journal of Photography", "Ones to Watch", "2023"],
];

const sectionPadding = "px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40";
const maxWidth = "mx-auto max-w-[1440px]";
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] ${light ? "text-white/55" : "text-warm-gray"}`}
    >
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

function PrimaryLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.98 }}
      className={`${focusRing} group inline-flex min-h-12 items-center justify-center gap-3 rounded-[18px] px-6 text-[12px] font-semibold uppercase tracking-[0.16em] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-0.5 ${
        light
          ? "bg-white text-ink hover:bg-off-white"
          : "bg-ink text-white hover:bg-charcoal"
      }`}
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </motion.a>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={`${focusRing} group inline-flex min-h-12 items-center gap-3 rounded-md text-[12px] font-semibold uppercase tracking-[0.16em] text-current`}
    >
      <span className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:origin-left group-hover:scale-x-100">
        {children}
      </span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 h-20 border-b transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-white/10 bg-ink/90 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className={`${maxWidth} flex h-full items-center justify-between px-5 sm:px-8 lg:px-12`}>
        <a
          href="#top"
          className={`${focusRing} relative z-50 rounded-md text-[15px] font-semibold tracking-[0.24em] text-white`}
          aria-label="Halden Studio home"
        >
          HALDEN<span className="text-gold">.</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${focusRing} rounded-md py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/75 transition-colors duration-300 hover:text-white`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#booking"
          className={`${focusRing} hidden min-h-11 items-center rounded-[18px] border border-white/35 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink sm:inline-flex`}
        >
          Book a session
        </a>

        <button
          type="button"
          className={`${focusRing} relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white lg:hidden`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex min-h-svh flex-col justify-center bg-ink px-8 pt-20"
          >
            <div className="flex flex-col border-t border-white/15">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/15 py-6 font-serif text-4xl text-white"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <a
              href="#booking"
              onClick={() => setMenuOpen(false)}
              className="mt-10 inline-flex min-h-14 items-center justify-center rounded-[18px] bg-white px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Book a session
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.25], [0, 90]);
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" aria-labelledby="hero-title" className="relative -mt-20 min-h-[100svh] overflow-hidden bg-ink text-white">
      <motion.div
        className="absolute -inset-y-24 inset-x-0"
        style={{ y: reduceMotion ? 0 : imageY }}
        initial={reduceMotion ? false : { scale: 1.04, opacity: 0.65 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={images.hero}
          alt="Signature black and white portrait with light and shadow across a woman's face"
          className="h-full w-full object-cover object-[57%_42%] sm:object-[center_42%]"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/35" aria-hidden="true" />

      <div className={`${maxWidth} relative flex min-h-[100svh] flex-col justify-end px-5 pb-8 pt-32 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12`}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <h1 id="hero-title" className="text-[clamp(4.25rem,13vw,11rem)] font-medium leading-[0.75] tracking-[-0.065em]">
            HALDEN<span className="text-gold">.</span>
          </h1>
          <div className="mt-7 grid items-end gap-8 border-t border-white/35 pt-6 md:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <p className="font-serif text-[clamp(2rem,4vw,4rem)] leading-[0.95] tracking-[-0.025em]">
                Stories, held in light.
              </p>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/70 sm:text-base">
                Cinematic photography of people, places, and the moments that stay with us.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryLink href="#portfolio" light>
                View portfolio
              </PrimaryLink>
              <a
                href="#booking"
                className={`${focusRing} inline-flex min-h-12 items-center justify-center rounded-[18px] border border-white/45 px-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-500 hover:bg-white hover:text-ink`}
              >
                Book a session
              </a>
            </div>
          </div>
        </motion.div>

        <a
          href="#introduction"
          aria-label="Scroll to introduction"
          className={`${focusRing} absolute bottom-9 right-5 hidden h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white/75 transition-colors hover:border-white hover:text-white sm:flex sm:right-8 lg:right-12`}
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </motion.span>
        </a>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section id="introduction" aria-labelledby="intro-heading" className={`${sectionPadding} bg-off-white text-ink`}>
      <div className={`${maxWidth} grid gap-12 lg:grid-cols-12 lg:gap-8`}>
        <Reveal className="lg:col-span-3">
          <Eyebrow>Independent studio / London</Eyebrow>
        </Reveal>
        <Reveal className="lg:col-span-8 lg:col-start-5" delay={0.1}>
          <h2 id="intro-heading" className="font-serif text-[clamp(2.75rem,5.6vw,6rem)] leading-[0.98] tracking-[-0.03em]">
            Photographs should not just show how it looked.
            <span className="text-warm-gray"> They should return you to how it felt.</span>
          </h2>
          <div className="mt-10 flex flex-col gap-8 border-t border-ink/15 pt-8 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-xl text-base leading-7 text-warm-gray">
              Halden is the studio of photographer Elena Halden. With a quiet eye and a tactile approach, she creates honest, artful imagery for private clients and global brands.
            </p>
            <TextLink href="#about">Our philosophy</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const collections = [
    {
      image: images.wedding,
      number: "01",
      category: "Wedding stories",
      title: "The shape of devotion",
      alt: "Newlyweds embracing beside a lake and mountains",
      className: "lg:col-span-8",
      ratio: "aspect-[4/3] lg:aspect-[16/10]",
    },
    {
      image: images.fashion,
      number: "02",
      category: "Fashion editorial",
      title: "In bloom",
      alt: "Woman in a sculptural red dress holding flowers",
      className: "lg:col-span-4 lg:mt-32",
      ratio: "aspect-[4/5]",
    },
    {
      image: images.elephant,
      number: "03",
      category: "Wildlife study",
      title: "Close enough to listen",
      alt: "Detailed black and white portrait of an elephant",
      className: "lg:col-span-9 lg:col-start-4 lg:mt-8",
      ratio: "aspect-[16/10]",
    },
  ];

  return (
    <section id="featured" aria-labelledby="featured-heading" className={`${sectionPadding} bg-ink text-white`}>
      <div className={maxWidth}>
        <Reveal className="mb-16 flex flex-col justify-between gap-8 border-b border-white/15 pb-10 sm:mb-24 md:flex-row md:items-end">
          <div>
            <Eyebrow light>Selected stories / 2023-2025</Eyebrow>
            <h2 id="featured-heading" className="max-w-3xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[0.9] tracking-[-0.035em]">
              Featured collections
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/55">
            Long-form narratives from celebrations, commissions, and journeys into the wild.
          </p>
        </Reveal>

        <div className="grid gap-x-8 gap-y-20 lg:grid-cols-12 lg:gap-y-28">
          {collections.map((collection, index) => (
            <Reveal key={collection.title} className={collection.className} delay={index * 0.06}>
              <a href="#portfolio" className={`${focusRing} group block rounded-[18px]`}>
                <figure>
                  <div className={`relative overflow-hidden rounded-[18px] bg-charcoal ${collection.ratio}`}>
                    <img
                      src={collection.image}
                      alt={collection.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.02] group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" aria-hidden="true" />
                    <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/10 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 sm:bottom-6 sm:right-6">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                  <figcaption className="mt-5 flex items-start justify-between gap-6 border-t border-white/15 pt-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{collection.category}</p>
                      <h3 className="mt-2 font-serif text-3xl tracking-[-0.02em] sm:text-4xl">{collection.title}</h3>
                    </div>
                    <span className="font-serif text-lg text-white/35">{collection.number}</span>
                  </figcaption>
                </figure>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, index }: { item: (typeof portfolioItems)[number]; index: number }) {
  return (
    <Reveal className={item.className} delay={(index % 2) * 0.08}>
      <a href="#booking" className={`${focusRing} group block rounded-[18px]`}>
        <figure>
          <div className={`relative overflow-hidden rounded-[18px] bg-stone-200 ${item.ratio}`}>
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            <span className="absolute bottom-5 left-5 translate-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              View story
            </span>
          </div>
          <figcaption className="mt-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">{item.category}</p>
              <h3 className="mt-2 font-serif text-2xl leading-none tracking-[-0.02em] sm:text-3xl">{item.title}</h3>
            </div>
            <span className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-warm-gray">{item.location}</span>
          </figcaption>
        </figure>
      </a>
    </Reveal>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className={`${sectionPadding} bg-off-white text-ink`}>
      <div className={maxWidth}>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>The portfolio</Eyebrow>
            <h2 id="portfolio-heading" className="font-serif text-[clamp(3rem,7vw,7.5rem)] leading-[0.88] tracking-[-0.045em]">
              One world.<br />Many ways of seeing.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-warm-gray lg:col-span-3 lg:col-start-10 lg:pb-2">
            Portrait, landscape, architecture, travel, and still life, connected by curiosity and a devotion to natural emotion.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:mt-28 md:grid-cols-12 md:gap-y-28">
          {portfolioItems.map((item, index) => (
            <GalleryCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <Reveal className="mt-20 flex justify-center md:mt-28">
          <TextLink href="#booking">Request the full portfolio</TextLink>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" aria-labelledby="services-heading" className={`${sectionPadding} overflow-hidden bg-charcoal text-white`}>
      <div className={maxWidth}>
        <Reveal className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow light>Ways to work together</Eyebrow>
            <h2 id="services-heading" className="max-w-xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.92] tracking-[-0.035em]">
              Considered from first conversation to final print.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-6 text-white/55 lg:col-span-4 lg:col-start-9 lg:pb-2">
            Each commission is shaped around your story. We work with a trusted creative network and a deliberately limited annual calendar.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-white/15 sm:mt-24">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.04}>
              <button
                type="button"
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                aria-expanded={activeService === index}
                className={`${focusRing} group grid w-full gap-4 border-b border-white/15 py-8 text-left transition-colors duration-500 hover:text-gold sm:grid-cols-[72px_1fr_1fr_auto] sm:items-start sm:gap-8`}
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gold">{service.number}</span>
                <span className="font-serif text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl">{service.title}</span>
                <span
                  className={`max-w-md text-sm leading-6 transition-all duration-500 ${
                    activeService === index ? "text-white/65 opacity-100" : "text-white/45 sm:opacity-0"
                  }`}
                >
                  {service.copy}
                </span>
                <ArrowUpRight
                  className={`h-5 w-5 transition-transform duration-500 ${activeService === index ? "rotate-45 text-gold" : "text-white/40"}`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <PrimaryLink href="#booking" light>Start a conversation</PrimaryLink>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className={`${sectionPadding} bg-off-white text-ink`}>
      <div className={`${maxWidth} grid gap-16 lg:grid-cols-12 lg:items-start`}>
        <Reveal className="lg:col-span-5">
          <figure>
            <div className="aspect-[4/5] overflow-hidden rounded-[18px] bg-stone-200">
              <img
                src={images.photographer}
                alt="Elena Halden holding her camera in the studio"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition duration-1000 hover:scale-[1.02] hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-4 flex justify-between border-t border-ink/15 pt-4 text-[10px] uppercase tracking-[0.18em] text-warm-gray">
              <span>Elena Halden</span>
              <span>London, 2025</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-20">
          <Reveal>
            <Eyebrow>Behind the lens</Eyebrow>
            <h2 id="about-heading" className="font-serif text-[clamp(3rem,5.6vw,5.75rem)] leading-[0.92] tracking-[-0.035em]">
              Presence before perfection.
            </h2>
          </Reveal>
          <Reveal className="mt-10 space-y-6 text-base leading-7 text-warm-gray" delay={0.08}>
            <p>
              Elena Halden is a London-based photographer known for emotionally precise imagery and a painterly command of natural light. Her work moves between intimate portraiture, documentary storytelling, and art-led commercial commissions.
            </p>
            <p>
              Working with both digital and medium format film, Elena approaches every story with patience. The result is imagery that feels composed but never constrained, refined but always human.
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3" delay={0.12}>
            <TextLink href="#contact">Meet the studio</TextLink>
            <a
              href="mailto:studio@halden.photo"
              className={`${focusRing} inline-flex min-h-12 items-center gap-2 rounded-md text-[12px] font-semibold uppercase tracking-[0.16em] text-warm-gray transition-colors hover:text-ink`}
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Email Elena
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);

  const previous = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((current) => (current + 1) % testimonials.length);

  return (
    <section aria-labelledby="testimonial-heading" className={`${sectionPadding} bg-ink text-white`}>
      <div className={maxWidth}>
        <Reveal>
          <Eyebrow light>Words from our clients</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <h2 id="testimonial-heading" className="sr-only">Client testimonials</h2>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-serif text-[clamp(2.5rem,5.5vw,6rem)] leading-[0.96] tracking-[-0.035em]">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <footer className="mt-10 flex flex-col gap-1 border-l border-gold pl-5 text-xs uppercase tracking-[0.16em]">
                  <cite className="not-italic text-white">{testimonials[active].name}</cite>
                  <span className="text-white/45">{testimonials[active].detail}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="flex items-end gap-3 lg:col-span-3 lg:justify-end">
            <button
              type="button"
              onClick={previous}
              className={`${focusRing} flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:border-white hover:bg-white hover:text-ink`}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              className={`${focusRing} flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-all hover:border-white hover:bg-white hover:text-ink`}
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="ml-3 pb-4 text-[10px] tracking-[0.18em] text-white/45" aria-live="polite">
              0{active + 1} / 0{testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <section aria-labelledby="recognition-heading" className={`${sectionPadding} bg-off-white text-ink`}>
      <div className={maxWidth}>
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Awards & publications</Eyebrow>
            <h2 id="recognition-heading" className="font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.035em]">
              Recognized for a distinct point of view.
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-6 text-warm-gray lg:col-span-4 lg:col-start-9">
            Selected recognition from the international photography and editorial community.
          </p>
        </Reveal>

        <div className="mt-16 border-t border-ink/15 sm:mt-24">
          {publications.map(([name, honor, year], index) => (
            <Reveal key={name} delay={index * 0.035}>
              <div className="grid gap-2 border-b border-ink/15 py-6 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-8">
                <h3 className="font-serif text-2xl sm:text-3xl">{name}</h3>
                <p className="text-xs uppercase tracking-[0.14em] text-warm-gray">{honor}</p>
                <time className="text-xs tabular-nums text-warm-gray">{year}</time>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BehindTheScenes() {
  return (
    <section aria-labelledby="process-heading" className="bg-ink pb-24 text-white sm:pb-32 lg:pb-40">
      <Reveal>
        <figure className="relative min-h-[72svh] overflow-hidden">
          <img
            src={images.behindScenes}
            alt="Creative team working together during a studio photo shoot"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/10" aria-hidden="true" />
          <figcaption className={`${maxWidth} relative flex min-h-[72svh] items-end px-5 py-16 sm:px-8 sm:py-20 lg:px-12`}>
            <div className="max-w-2xl">
              <Eyebrow light>The process / Behind the scenes</Eyebrow>
              <h2 id="process-heading" className="font-serif text-[clamp(3rem,6vw,6.25rem)] leading-[0.9] tracking-[-0.035em]">
                Craft is what happens before the shutter.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-6 text-white/65">
                Research, light studies, patient observation, and an experienced crew create the freedom for something honest to happen.
              </p>
            </div>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

function Booking() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "min-h-12 w-full border-b border-ink/25 bg-transparent px-0 py-3 text-sm text-ink outline-none transition-colors placeholder:text-warm-gray/70 focus:border-gold";

  return (
    <section id="booking" aria-labelledby="booking-heading" className={`${sectionPadding} bg-[#e9e4dc] text-ink`}>
      <div className={`${maxWidth} grid gap-16 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-5">
          <Eyebrow>Commissions / Worldwide</Eyebrow>
          <h2 id="booking-heading" className="font-serif text-[clamp(3.25rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.04em]">
            Let&apos;s make something that lasts.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-6 text-warm-gray">
            Tell us a little about what you are imagining. The studio responds personally within two working days.
          </p>
          <div className="mt-12 border-t border-ink/15 pt-6 text-xs uppercase tracking-[0.14em] text-warm-gray">
            <p>Currently booking</p>
            <p className="mt-2 font-semibold text-ink">2026 private & commercial commissions</p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <div className="rounded-[18px] bg-off-white p-6 shadow-[0_24px_80px_rgba(13,13,13,0.10)] sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[460px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white">
                    <Check className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 font-serif text-4xl">Your story starts here.</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-warm-gray">
                    Thank you for reaching out. Elena or a member of the studio will be in touch within two working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] underline underline-offset-8"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit}>
                  <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gray">
                      Your name
                      <input className={inputClass} type="text" name="name" autoComplete="name" placeholder="Full name" required />
                    </label>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gray">
                      Email address
                      <input className={inputClass} type="email" name="email" autoComplete="email" placeholder="you@email.com" required />
                    </label>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gray">
                      Type of project
                      <select className={inputClass} name="project" defaultValue="" required>
                        <option value="" disabled>Choose one</option>
                        <option>Portrait / Editorial</option>
                        <option>Wedding / Celebration</option>
                        <option>Brand / Campaign</option>
                        <option>Travel / Documentary</option>
                      </select>
                    </label>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gray">
                      Project date
                      <input className={inputClass} type="text" name="date" placeholder="Season / Year" required />
                    </label>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gray sm:col-span-2">
                      Tell us about your story
                      <textarea className={`${inputClass} min-h-28 resize-y`} name="message" placeholder="A few details, your location, and what matters most..." required />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={`${focusRing} group mt-10 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[18px] bg-ink px-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-charcoal sm:w-auto`}
                  >
                    Send inquiry
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-ink px-5 pb-8 pt-24 text-white sm:px-8 sm:pt-32 lg:px-12">
      <div className={maxWidth}>
        <div className="grid gap-16 border-b border-white/15 pb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow light>London / Available worldwide</Eyebrow>
            <p className="font-serif text-[clamp(3rem,7vw,7.5rem)] leading-[0.88] tracking-[-0.045em]">
              Have a story in mind?
            </p>
            <a
              href="mailto:studio@halden.photo"
              className={`${focusRing} mt-8 inline-block rounded-md border-b border-gold pb-2 text-lg text-white/70 transition-colors hover:text-white sm:text-2xl`}
            >
              studio@halden.photo
            </a>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-10">
            <address className="not-italic text-sm leading-6 text-white/55">
              16 Willow Street<br />London EC2A 4BH<br />United Kingdom
            </address>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className={`${focusRing} inline-flex w-fit items-center gap-3 rounded-md text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:text-gold`}
            >
              <Camera className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8 py-8 sm:flex-row sm:items-end sm:justify-between">
          <a href="#top" className={`${focusRing} rounded-md text-[clamp(4rem,12vw,10rem)] font-medium leading-[0.72] tracking-[-0.065em]`}>
            HALDEN<span className="text-gold">.</span>
          </a>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.14em] text-white/40">
            <span>&copy; 2026 Halden Studio</span>
            <a href="#top" className="transition-colors hover:text-white">Privacy</a>
            <a href="#top" className="transition-colors hover:text-white">Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Grain() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.025] mix-blend-soft-light" aria-hidden="true">
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen overflow-x-clip bg-ink font-sans antialiased"
    >
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-md bg-white px-4 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Introduction />
        <FeaturedCollections />
        <Portfolio />
        <Services />
        <About />
        <Testimonials />
        <Recognition />
        <BehindTheScenes />
        <Booking />
      </main>
      <Footer />
      <Grain />
    </motion.div>
  );
}