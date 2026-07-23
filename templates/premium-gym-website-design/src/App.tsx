import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, animate } from 'framer-motion';
import {
  Menu, X, Check, ArrowRight, ArrowUpRight, ArrowUp, MapPin, Phone, Mail,
  Clock, Shield, Zap, Dumbbell, HeartPulse, Apple, Users, TrendingUp,
  Target, Move, Plus, Award, Sparkles, Star, Activity
} from 'lucide-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/*  SHARED PRIMITIVES                                                   */
/* ------------------------------------------------------------------ */

/** Line-by-line masked headline reveal */
function Reveal({
  children,
  delay = 0,
  className = '',
  ready,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** When provided, reveal is driven externally (hero). Otherwise it triggers on scroll. */
  ready?: boolean;
}) {
  const inner =
    ready === undefined
      ? {
          initial: { y: '115%' },
          whileInView: { y: '0%' },
          viewport: { once: true, margin: '-40px' },
        }
      : {
          initial: { y: '115%' },
          animate: ready ? { y: '0%' } : { y: '115%' },
        };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div {...(inner as object)} transition={{ duration: 1, delay, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Scroll-triggered fade-up */
function FadeUp({
  children,
  delay = 0,
  y = 44,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Editorial section tag — ( 01 ) —— LABEL */
function SectionTag({ index, label, className = '' }: { index: string; label: string; className?: string }) {
  return (
    <FadeUp className={`flex items-center gap-4 ${className}`} y={20}>
      <span className="font-mono text-[11px] tracking-[0.2em] text-electric">( {index} )</span>
      <span className="h-px w-12 bg-electric/30" />
      <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-light">{label}</span>
    </FadeUp>
  );
}

/** Primary CTA — sweep fill on hover */
function BtnPrimary({ children, href, dark = false }: { children: React.ReactNode; href: string; dark?: boolean }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[16px] bg-electric px-9 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-void transition-transform duration-300 hover:scale-[1.03] shadow-[0_8px_40px_rgba(100,255,78,0.25)]"
    >
      <span
        className={`absolute inset-0 translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0 ${
          dark ? 'bg-cream' : 'bg-void'
        }`}
      />
      <span className={`relative z-10 transition-colors duration-500 ${dark ? '' : 'group-hover:text-electric'}`}>
        {children}
      </span>
      <ArrowRight
        className={`relative z-10 h-4 w-4 transition-all duration-500 group-hover:translate-x-1 ${
          dark ? '' : 'group-hover:text-electric'
        }`}
      />
    </a>
  );
}

/** Ghost CTA — border, sweep on hover */
function BtnGhost({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[16px] border border-white/15 px-9 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:border-electric/60"
    >
      <span className="absolute inset-0 translate-y-[101%] bg-electric/[0.07] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-electric">{children}</span>
    </a>
  );
}

/** Parallax image wrapper */
function useParallax<T extends HTMLElement = HTMLDivElement>(range = 46) {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  return { ref, y };
}

/** Animated number counter */
function Counter({ to, suffix = '', prefix = '', duration = 1.8 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  PRELOADER                                                           */
/* ------------------------------------------------------------------ */
function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.7,
      ease: 'easeInOut',
      onUpdate: (v) => setCount(Math.round(v)),
    });
    const t = setTimeout(onDone, 2050);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-void"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric shadow-[0_0_30px_rgba(100,255,78,0.4)]">
          <Dumbbell className="h-5 w-5 text-void" strokeWidth={2.5} />
        </div>
        <span className="font-heading text-3xl tracking-[0.25em] text-cream">FORGE</span>
      </div>
      <div className="h-px w-56 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-electric"
          style={{ width: `${count}%` }}
        />
      </div>
      <div className="mt-6 font-mono text-xs tracking-[0.3em] text-slate-light">
        LOADING — <span className="text-electric">{count}%</span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SCROLL PROGRESS                                                     */
/* ------------------------------------------------------------------ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-electric"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                          */
/* ------------------------------------------------------------------ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const links = [
    { n: '01', label: 'Philosophy', href: '#philosophy' },
    { n: '02', label: 'Membership', href: '#membership' },
    { n: '03', label: 'Facilities', href: '#facilities' },
    { n: '04', label: 'Transformations', href: '#transformations' },
    { n: '05', label: 'Coaches', href: '#trainers' },
    { n: '06', label: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[60] transition-all duration-700 ${
          scrolled ? 'border-b border-white/5 bg-void/80 backdrop-blur-2xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <a href="#hero" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric shadow-[0_0_22px_rgba(100,255,78,0.35)] transition-shadow duration-500 group-hover:shadow-[0_0_34px_rgba(100,255,78,0.55)]">
              <Dumbbell className="h-[18px] w-[18px] text-void" strokeWidth={2.5} />
            </div>
            <span className="font-heading text-xl tracking-[0.22em] text-cream">FORGE</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-300 hover:text-cream"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-electric transition-transform duration-400 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="group relative hidden items-center gap-2 overflow-hidden rounded-[14px] bg-electric px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-void transition-transform duration-300 hover:scale-[1.04] shadow-[0_0_24px_rgba(100,255,78,0.25)] lg:inline-flex"
            >
              <span className="absolute inset-0 translate-y-[101%] bg-void transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-electric">Join Now</span>
              <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-colors duration-500 group-hover:text-electric" />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-cream transition-colors hover:border-electric/50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col bg-void"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-heading text-xl tracking-[0.22em] text-cream">FORGE</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-cream"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                  className="group flex items-baseline gap-4 border-b border-white/5 py-4"
                >
                  <span className="font-mono text-[10px] text-electric">({l.n})</span>
                  <span className="font-heading text-4xl tracking-[0.08em] text-cream transition-colors group-hover:text-electric">
                    {l.label}
                  </span>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-steel transition-all group-hover:text-electric" />
                </motion.a>
              ))}
              <motion.a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 inline-flex items-center justify-center gap-3 rounded-[16px] bg-electric px-8 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-void"
              >
                Start Membership <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero({ ready }: { ready: boolean }) {
  const { ref, y } = useParallax(60);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div style={{ y }} className="absolute -inset-y-16 inset-x-0">
          <img src="/hero-athlete.jpg" alt="Athlete mid-lift under dramatic light" className="h-full w-full object-cover opacity-[0.42]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/75 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_45%,rgba(100,255,78,0.07),transparent_55%)]" />
      </div>

      {/* Corner ticks */}
      <div className="pointer-events-none absolute left-6 top-24 hidden h-6 w-6 border-l border-t border-white/20 lg:block" />
      <div className="pointer-events-none absolute right-6 top-24 hidden h-6 w-6 border-r border-t border-white/20 lg:block" />

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 mx-auto mt-28 flex w-full max-w-[1440px] items-center justify-between px-6 lg:px-12"
      >
        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-slate-light">
          <span className="hidden sm:inline">EST. 2016</span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>NEW YORK CITY</span>
        </div>
        <div className="hidden items-center gap-2.5 rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 backdrop-blur-md md:flex">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-electric" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-electric">Q1 INTAKE OPEN</span>
        </div>
      </motion.div>

      {/* Headline block */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 py-16 lg:px-12">
        <h1 className="font-heading text-[clamp(4.2rem,13.5vw,12.5rem)] leading-[0.84] tracking-[0.01em] text-cream">
          <Reveal ready={ready} delay={0.35}>
            <span className="block">FORGE YOUR</span>
          </Reveal>
          <Reveal ready={ready} delay={0.47}>
            <span className="block">
              <span className="font-accent italic tracking-normal text-electric" style={{ fontSize: '0.92em' }}>
                strongest
              </span>{' '}
              SELF.
            </span>
          </Reveal>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:max-w-2xl lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="max-w-md text-base font-light leading-relaxed text-ash lg:text-lg"
          >
            15,000 sq ft of engineered intensity. Pro-grade equipment, elite coaching, and a culture that turns
            discipline into identity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <BtnPrimary href="#pricing">Start Your Membership</BtnPrimary>
            <BtnGhost href="#contact">Book Free Trial</BtnGhost>
          </motion.div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.1, ease: EASE }}
        className="relative z-10 border-t border-white/[0.07] bg-void/40 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-white/[0.06] px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-12">
          {[
            { icon: Award, title: 'Certified Trainers', sub: 'NSCA · ISSA · Precision Nutrition' },
            { icon: Clock, title: 'Open 24 / 7', sub: 'Secure member access, every hour' },
            { icon: Shield, title: 'Pro-Grade Equipment', sub: 'Calibrated & maintained weekly' },
          ].map((b, i) => (
            <div key={b.title} className="flex items-center gap-4 py-5 sm:px-6 first:sm:pl-0 last:sm:pr-0">
              <span className="font-mono text-[10px] text-steel">0{i + 1}</span>
              <b.icon className="h-4 w-4 shrink-0 text-electric" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-cream">{b.title}</div>
                <div className="text-[10px] font-light text-steel">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-28 right-8 z-10 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.35em] text-steel [writing-mode:vertical-rl]">SCROLL</span>
        <span className="h-14 w-px animate-scroll-line bg-electric/70" />
      </motion.div>

      {/* Rotating badge */}
      <motion.a
        href="#contact"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
        className="group absolute bottom-48 right-16 z-10 hidden h-32 w-32 items-center justify-center xl:flex"
        aria-label="Book a free trial"
      >
        <svg viewBox="0 0 120 120" className="animate-spin-slower absolute inset-0 h-full w-full">
          <defs>
            <path id="circlePath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text className="fill-ash font-mono text-[9.5px] uppercase" style={{ letterSpacing: '0.32em' }}>
            <textPath href="#circlePath">Free Trial · No Commitment · Free Trial ·</textPath>
          </text>
        </svg>
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-electric/30 bg-void/60 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-electric">
          <ArrowUpRight className="h-5 w-5 text-electric transition-colors duration-500 group-hover:text-void" />
        </span>
      </motion.a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MARQUEE                                                             */
/* ------------------------------------------------------------------ */
function Marquee() {
  const words = ['Strength', 'Discipline', 'Transformation', 'Community', 'Precision', 'Resilience'];
  const Row = () => (
    <>
      {words.map((w) => (
        <span key={w} className="flex items-center gap-10">
          <span className="font-heading text-3xl tracking-[0.25em] text-cream/80 md:text-4xl">{w.toUpperCase()}</span>
          <Zap className="h-4 w-4 fill-electric text-electric" />
        </span>
      ))}
    </>
  );
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-white/[0.06] bg-carbon py-7">
      <div className="animate-marquee flex w-max items-center gap-10">
        <Row />
        <Row />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS BAND                                                          */
/* ------------------------------------------------------------------ */
function Stats() {
  const stats = [
    { value: 15, suffix: 'K', label: 'Sq Ft of Training Floor' },
    { value: 40, suffix: '+', label: 'Weekly Coached Sessions' },
    { value: 92, suffix: '%', label: 'See Results in 90 Days' },
    { value: 24, suffix: '/7', label: 'Secure Member Access' },
  ];
  return (
    <section className="relative border-b border-white/[0.06] bg-void">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-white/[0.06] px-6 lg:grid-cols-4 lg:divide-x lg:px-12">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.1} className="group px-2 py-12 lg:px-10 lg:py-16">
            <div className="font-heading text-5xl text-cream transition-colors duration-500 group-hover:text-electric md:text-6xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-steel">{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PHILOSOPHY                                                          */
/* ------------------------------------------------------------------ */
function Philosophy() {
  const { ref, y } = useParallax(34);

  return (
    <section id="philosophy" ref={ref} className="relative overflow-hidden py-28 lg:py-40">
      <span
        aria-hidden
        className="text-stroke-ghost pointer-events-none absolute -right-8 top-10 select-none font-heading text-[22vw] leading-none"
      >
        01
      </span>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionTag index="01" label="Philosophy" />

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Sticky heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] tracking-[0.01em] text-cream">
                  DISCIPLINE IS
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] tracking-[0.01em] text-cream">
                  THE{' '}
                  <span className="font-accent italic tracking-normal text-electric">architecture</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] tracking-[0.01em] text-cream">
                  OF CHANGE.
                </h2>
              </Reveal>

              <FadeUp delay={0.3} className="mt-10">
                <a href="#training" className="group inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cream">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-electric group-hover:bg-electric">
                    <Move className="h-4 w-4 transition-colors duration-500 group-hover:text-void" />
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-electric">How we coach</span>
                </a>
              </FadeUp>
            </div>
          </div>

          {/* Copy + image */}
          <div className="lg:col-span-7">
            <FadeUp className="grid gap-10 sm:grid-cols-2">
              <p className="text-base font-light leading-[1.9] text-ash">
                We reject the obsession with aesthetics alone. Strength is capability — the ability to carry your
                life without negotiation. Every program here is built on progressive overload, measured recovery,
                and honest coaching.
              </p>
              <p className="text-base font-light leading-[1.9] text-ash sm:pt-14">
                No mirrors for posing. No machines for the sake of machines. Just calibrated iron, intelligent
                programming, and a environment engineered to remove every excuse between you and your potential.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="mt-14">
              <div className="group relative overflow-hidden rounded-[20px]">
                <motion.div style={{ y }} className="absolute -inset-y-8 inset-x-0">
                  <img
                    src="/strength-zone.jpg"
                    alt="Athlete performing a heavy deadlift in the strength zone"
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </motion.div>
                <div className="relative h-[420px] lg:h-[520px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <p className="max-w-xs font-accent text-lg italic leading-snug text-cream/90">
                    "Showing up when nobody is watching — that is where the body is rebuilt."
                  </p>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-electric">/ THE CREED</span>
                </div>
              </div>
            </FadeUp>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                'Evidence-based programming, never guesswork',
                'Coaches with competition backgrounds',
                'Recovery treated as training, not rest',
                'A culture of accountability, not ego',
              ].map((item, i) => (
                <FadeUp key={item} delay={0.1 + i * 0.07}>
                  <div className="flex items-center gap-3 rounded-[14px] border border-white/[0.06] bg-graphite/60 px-5 py-4 transition-colors duration-300 hover:border-electric/25">
                    <Check className="h-4 w-4 shrink-0 text-electric" />
                    <span className="text-sm font-light text-cream/85">{item}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MEMBERSHIP                                                          */
/* ------------------------------------------------------------------ */
function Membership() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'Foundation',
      monthly: 89,
      yearly: 74,
      desc: 'Everything required to build a serious, sustainable routine.',
      features: ['Unlimited gym floor access', 'All group classes included', 'Locker room & towel service', 'Foundation nutrition guide'],
    },
    {
      name: 'Elite',
      monthly: 149,
      yearly: 124,
      desc: 'The complete system — coaching, recovery, and measurement.',
      features: [
        'Everything in Foundation',
        '2 personal training sessions / mo',
        'Priority class reservations',
        'Recovery suite: sauna & cold plunge',
        'Quarterly body composition scans',
      ],
      featured: true,
    },
    {
      name: 'Forge Pro',
      monthly: 249,
      yearly: 207,
      desc: 'For athletes who demand maximum support and precision.',
      features: [
        'Everything in Elite',
        'Weekly 1-on-1 coaching',
        'Custom macro & supplement protocol',
        'Competition prep support',
        'Recovery suite: private access',
        'Guest passes — 4 / month',
      ],
    },
  ];

  return (
    <section id="membership" className="relative overflow-hidden border-t border-white/[0.06] bg-carbon py-28 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(100,255,78,0.05),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionTag index="02" label="Membership" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] text-cream">
                CHOOSE YOUR <span className="font-accent italic tracking-normal text-electric">commitment.</span>
              </h2>
            </Reveal>
          </div>

          {/* Billing toggle */}
          <FadeUp delay={0.2} className="flex items-center gap-4">
            <button
              onClick={() => setAnnual(false)}
              className={`relative rounded-full px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.15em] transition-colors ${
                !annual ? 'text-void' : 'text-ash hover:text-cream'
              }`}
            >
              {!annual && <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full bg-electric" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative rounded-full px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.15em] transition-colors ${
                annual ? 'text-void' : 'text-ash hover:text-cream'
              }`}
            >
              {annual && <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full bg-electric" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
              <span className="relative z-10">Annual −17%</span>
            </button>
          </FadeUp>
        </div>

        <div className="mt-16 grid items-stretch gap-5 md:grid-cols-3 lg:gap-7">
          {plans.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.12} className="h-full">
              <article
                className={`group relative flex h-full flex-col rounded-[20px] border p-8 transition-all duration-500 hover:-translate-y-2 lg:p-10 ${
                  plan.featured
                    ? 'z-10 border-electric/25 bg-void shadow-[0_0_60px_rgba(100,255,78,0.07)]'
                    : 'border-white/[0.07] bg-graphite/70 hover:border-electric/20 shadow-xl shadow-black/20'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-[13px] left-8 flex items-center gap-1.5 rounded-full bg-electric px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-void shadow-[0_0_24px_rgba(100,255,78,0.4)]">
                    <Star className="h-3 w-3 fill-void" /> Recommended
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-3xl tracking-[0.06em] text-cream">{plan.name}</h3>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-steel">0{i + 1}</span>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={annual ? 'a' : 'm'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`font-heading text-6xl leading-none ${plan.featured ? 'text-electric' : 'text-cream'}`}
                    >
                      ${annual ? plan.yearly : plan.monthly}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-xs font-light text-steel">/ month{annual ? ', billed yearly' : ''}</span>
                </div>

                <p className="mt-4 text-sm font-light leading-relaxed text-slate-light">{plan.desc}</p>

                <div className="my-8 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                <ul className="mb-10 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm font-light text-ash">
                      <span className={`mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${plan.featured ? 'bg-electric/15' : 'bg-white/[0.06]'}`}>
                        <Check className={`h-2.5 w-2.5 ${plan.featured ? 'text-electric' : 'text-ash'}`} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#pricing"
                  className={`group/btn relative block overflow-hidden rounded-[16px] py-4 text-center text-[11px] font-extrabold uppercase tracking-[0.2em] transition-transform duration-300 hover:scale-[1.02] ${
                    plan.featured
                      ? 'bg-electric text-void shadow-[0_0_28px_rgba(100,255,78,0.3)]'
                      : 'border border-white/12 text-cream'
                  }`}
                >
                  <span className={`absolute inset-0 translate-y-[101%] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/btn:translate-y-0 ${plan.featured ? 'bg-void' : 'bg-electric'}`} />
                  <span className={`relative z-10 transition-colors duration-500 ${plan.featured ? 'group-hover/btn:text-electric' : 'group-hover/btn:text-void'}`}>
                    Select {plan.name}
                  </span>
                </a>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          {['No contracts', 'Cancel anytime', 'No joining fees', 'First week free'].map((t) => (
            <span key={t} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-steel">
              <span className="h-1 w-1 rounded-full bg-electric" /> {t}
            </span>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FACILITIES                                                          */
/* ------------------------------------------------------------------ */
function FacilityCard({
  num, title, desc, img, icon: Icon, className = '', tall = false, delay = 0,
}: {
  num: string;
  title: string;
  desc: string;
  img: string;
  icon: React.ElementType;
  className?: string;
  tall?: boolean;
  delay?: number;
}) {
  const { ref, y } = useParallax<HTMLAnchorElement>(30);
  return (
    <FadeUp delay={delay} className={className}>
      <a
        href="#contact"
        ref={ref}
        className={`group relative block w-full overflow-hidden rounded-[20px] shadow-2xl shadow-black/40 ${
          tall ? 'h-[440px] lg:h-[560px]' : 'h-[440px] lg:h-[460px]'
        }`}
      >
        <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[45%] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-void/10 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_60%,rgba(100,255,78,0.06)_100%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute left-6 top-6 flex items-center gap-3 lg:left-8 lg:top-8">
          <span className="font-mono text-[11px] tracking-[0.25em] text-electric">/{num}</span>
          <span className="h-px w-8 bg-white/30" />
        </div>
        <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-void/50 backdrop-blur-md lg:right-8 lg:top-8">
          <Icon className="h-4 w-4 text-electric" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
          <h3 className="font-heading text-3xl tracking-[0.06em] text-cream lg:text-4xl">{title}</h3>
          <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-ash/80 transition-colors duration-500 group-hover:text-cream/90">
            {desc}
          </p>
          <div className="mt-5 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-steel transition-colors duration-500 group-hover:text-electric">
            Explore the zone
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </a>
    </FadeUp>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="relative overflow-hidden py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionTag index="03" label="Facilities" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] text-cream">
                EVERY ZONE, <span className="font-accent italic tracking-normal text-electric">engineered.</span>
              </h2>
            </Reveal>
          </div>
          <FadeUp delay={0.2} className="max-w-sm lg:text-right">
            <p className="text-sm font-light leading-relaxed text-slate-light">
              A training floor mapped for flow — no waiting, no bottlenecks. Each zone is acoustically and
              physically conditioned for its purpose.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <FacilityCard
            num="01"
            title="Strength Zone"
            desc="Competition barbells, calibrated plates, eight monolift stations, and lifting platforms built to IPF spec."
            img="/strength-zone.jpg"
            icon={Dumbbell}
            className="lg:col-span-7"
            tall
          />
          <FacilityCard
            num="02"
            title="Cardio Zone"
            desc="Curved treadmills, Concept2 rowers and air bikes — all synced to live heart-rate screens."
            img="/cardio-zone.jpg"
            icon={HeartPulse}
            className="lg:col-span-5"
            tall
            delay={0.15}
          />
          <FacilityCard
            num="03"
            title="Functional Arena"
            desc="60 ft of sled turf, battle ropes, KB circuits, and open rig space for high-intensity work."
            img="/group-class.jpg"
            icon={Zap}
            className="lg:col-span-5"
            delay={0.1}
          />
          <FacilityCard
            num="04"
            title="Coaching Floor"
            desc="Dedicated 1-on-1 bays with movement screening, force plates, and form-review stations."
            img="/trainer-coach.jpg"
            icon={Activity}
            className="lg:col-span-7"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PERSONAL TRAINING                                                   */
/* ------------------------------------------------------------------ */
function Training() {
  const { ref, y } = useParallax(30);
  return (
    <section id="training" ref={ref} className="relative overflow-hidden border-t border-white/[0.06] bg-carbon py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <FadeUp>
              <div className="group relative overflow-hidden rounded-[20px]">
                <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
                  <img
                    src="/trainer-coach.jpg"
                    alt="Coach guiding a member through a barbell lift"
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 group-hover:grayscale-0"
                  />
                </motion.div>
                <div className="relative h-[440px] lg:h-[580px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/10" />
                <div className="absolute bottom-6 left-6 rounded-[16px] border border-white/10 bg-void/70 px-6 py-5 backdrop-blur-xl lg:bottom-8 lg:left-8">
                  <div className="font-heading text-3xl text-cream">
                    <Counter to={500} suffix="+" />
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-light">
                    Athletes coached to PRs
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <SectionTag index="04" label="Personal Training" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[0.9] text-cream">
                ONE COACH.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[0.9] text-cream">
                ONE <span className="font-accent italic tracking-normal text-electric">mission.</span>
              </h2>
            </Reveal>
            <FadeUp delay={0.2} className="mt-8 max-w-lg">
              <p className="text-base font-light leading-[1.9] text-ash">
                Our coaches are competitors, researchers, and practitioners. Every session is programmed around your
                biomechanics, recovery capacity, and long-range performance targets — then measured, week by week.
              </p>
            </FadeUp>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { icon: TrendingUp, title: 'Progress Tracking', text: 'Weekly assessments, logged and reviewed' },
                { icon: Target, title: 'Goal Programming', text: 'Strength, physique, or engine — mapped out' },
                { icon: Move, title: 'Movement Screening', text: 'Identify imbalances before injuries start' },
                { icon: Award, title: 'Form Refinement', text: 'Real-time cueing on every working set' },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={0.25 + i * 0.08}>
                  <div className="group h-full rounded-[16px] border border-white/[0.06] bg-graphite/70 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-electric/20">
                    <item.icon className="h-5 w-5 text-electric transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                    <h4 className="mt-4 text-sm font-bold tracking-wide text-cream">{item.title}</h4>
                    <p className="mt-1.5 text-xs font-light leading-relaxed text-slate-light">{item.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GROUP CLASSES — timetable                                           */
/* ------------------------------------------------------------------ */
function Classes() {
  const rows = [
    { time: '06:00', name: 'Forge HIIT', focus: 'Conditioning', dur: '45 MIN', level: 4, coach: 'A. Okonkwo' },
    { time: '07:30', name: 'Olympic Lifting', focus: 'Technique', dur: '60 MIN', level: 3, coach: 'M. Chen' },
    { time: '12:15', name: 'Strength Endurance', focus: 'Hypertrophy', dur: '50 MIN', level: 3, coach: 'E. Voss' },
    { time: '18:00', name: 'Metcon Engine', focus: 'Capacity', dur: '45 MIN', level: 4, coach: 'A. Okonkwo' },
    { time: '19:30', name: 'Mobility & Recovery', focus: 'Restoration', dur: '40 MIN', level: 1, coach: 'M. Chen' },
  ];

  return (
    <section id="classes" className="relative overflow-hidden py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionTag index="05" label="Group Classes" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] text-cream">
                TRAIN <span className="font-accent italic tracking-normal text-electric">together.</span>
              </h2>
            </Reveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-slate-light lg:text-right">
              Forty coached sessions weekly. Every class capped at fourteen athletes so the coach's eye never leaves
              your movement.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="mt-16">
          <div className="overflow-hidden rounded-[20px] border border-white/[0.07]">
            {/* Header row */}
            <div className="hidden grid-cols-12 gap-4 border-b border-white/[0.07] bg-graphite/60 px-6 py-4 font-mono text-[9px] uppercase tracking-[0.3em] text-steel md:grid lg:px-10">
              <span className="col-span-2">Time</span>
              <span className="col-span-4">Session</span>
              <span className="col-span-2">Focus</span>
              <span className="col-span-2">Intensity</span>
              <span className="col-span-1">Coach</span>
              <span className="col-span-1 text-right">Book</span>
            </div>
            {rows.map((r) => (
              <a
                key={r.name}
                href="#contact"
                className="group relative grid grid-cols-2 items-center gap-x-4 gap-y-2 border-b border-white/[0.05] bg-void/60 px-6 py-6 transition-colors duration-300 last:border-0 hover:bg-white/[0.025] md:grid-cols-12 lg:px-10"
              >
                <span className="absolute left-0 top-0 h-full w-[3px] origin-bottom scale-y-0 bg-electric transition-transform duration-400 ease-out group-hover:scale-y-100" />
                <span className="col-span-1 font-mono text-sm text-electric md:col-span-2">{r.time}</span>
                <span className="col-span-1 flex items-center gap-3 md:col-span-4">
                  <span className="font-heading text-2xl tracking-[0.05em] text-cream transition-transform duration-400 group-hover:translate-x-1.5">
                    {r.name}
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.15em] text-slate-light">
                    {r.dur}
                  </span>
                </span>
                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.15em] text-ash md:col-span-2 md:block">{r.focus}</span>
                <span className="hidden items-center gap-1 md:col-span-2 md:flex" aria-label={`Intensity ${r.level} of 4`}>
                  {[1, 2, 3, 4].map((b) => (
                    <span
                      key={b}
                      className={`h-3.5 w-1 rounded-sm transition-colors duration-300 ${
                        b <= r.level ? 'bg-electric' : 'bg-white/10'
                      } ${b <= r.level ? 'group-hover:shadow-[0_0_8px_rgba(100,255,78,0.5)]' : ''}`}
                      style={{ height: `${6 + b * 3}px` }}
                    />
                  ))}
                </span>
                <span className="hidden text-[11px] font-light text-slate-light md:col-span-1 md:block">{r.coach}</span>
                <span className="col-span-2 flex justify-end md:col-span-1">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 transition-all duration-400 group-hover:border-electric group-hover:bg-electric">
                    <ArrowUpRight className="h-4 w-4 text-cream transition-colors duration-400 group-hover:text-void" />
                  </span>
                </span>
              </a>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.25} className="mt-8 flex justify-center">
          <BtnGhost href="#contact">View Full Schedule</BtnGhost>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NUTRITION                                                           */
/* ------------------------------------------------------------------ */
function Nutrition() {
  const { ref, y } = useParallax(26);
  return (
    <section id="nutrition" ref={ref} className="relative overflow-hidden border-t border-white/[0.06] bg-carbon py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionTag index="06" label="Nutrition Coaching" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[0.9] text-cream">
                FUEL THE
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading text-[clamp(2.8rem,5.5vw,4.8rem)] leading-[0.9] text-cream">
                <span className="font-accent italic tracking-normal text-electric">transformation.</span>
              </h2>
            </Reveal>
            <FadeUp delay={0.2} className="mt-8 max-w-lg">
              <p className="text-base font-light leading-[1.9] text-ash">
                Training pushes the boundary. Nutrition holds it. Our certified coaches build macro plans, meal
                timing, and supplementation around your body-composition data — reviewed every four weeks.
              </p>
            </FadeUp>

            <div className="mt-10 space-y-2">
              {[
                { n: '01', title: 'Body Composition Analysis', text: 'InBody scans every four weeks' },
                { n: '02', title: 'Macro Programming', text: 'Calibrated to training load & goals' },
                { n: '03', title: 'Supplement Strategy', text: 'Evidence-backed, blood-work aware' },
                { n: '04', title: 'Meal Architecture', text: 'Timing windows that fit your life' },
              ].map((item, i) => (
                <FadeUp key={item.n} delay={0.2 + i * 0.07}>
                  <div className="group flex items-center gap-5 border-b border-white/[0.06] px-2 py-5 transition-all duration-400 hover:border-electric/30 hover:bg-white/[0.02] hover:pl-4">
                    <span className="font-mono text-[10px] text-electric">{item.n}</span>
                    <Apple className="h-4 w-4 text-steel transition-colors duration-400 group-hover:text-electric" />
                    <div>
                      <h4 className="text-sm font-bold text-cream">{item.title}</h4>
                      <p className="text-xs font-light text-slate-light">{item.text}</p>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-steel opacity-0 transition-all duration-400 group-hover:text-electric group-hover:opacity-100" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <FadeUp>
              <div className="group relative overflow-hidden rounded-[20px]">
                <motion.div style={{ y }} className="absolute -inset-y-8 inset-x-0">
                  <img
                    src="/nutrition.jpg"
                    alt="Performance nutrition plate with protein and greens"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </motion.div>
                <div className="relative h-[420px] lg:h-[560px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-void/60 px-4 py-2 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-electric" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">Built by PN-2 Coach</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TRANSFORMATIONS                                                     */
/* ------------------------------------------------------------------ */
function Transformations() {
  const { ref, y } = useParallax(30);
  return (
    <section id="transformations" ref={ref} className="relative overflow-hidden py-28 lg:py-40">
      <span
        aria-hidden
        className="text-stroke-ghost pointer-events-none absolute -left-6 top-8 select-none font-heading text-[20vw] leading-none"
      >
        07
      </span>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionTag index="07" label="Proof of Work" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] text-cream">
                BODIES <span className="font-accent italic tracking-normal text-electric">rewritten.</span>
              </h2>
            </Reveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-slate-light lg:text-right">
              Real members, tracked for real time. Every metric below is verified by InBody scans and logged
              training data.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Hero transformation */}
          <FadeUp className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <a href="#contact" className="group relative block h-full overflow-hidden rounded-[20px] shadow-2xl shadow-black/40">
              <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
                <img
                  src="/transformation.jpg"
                  alt="Member showing physical transformation results"
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </motion.div>
              <div className="relative min-h-[520px] lg:min-h-[640px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/15 to-transparent" />
              <div className="absolute left-6 top-6 rounded-full border border-electric/25 bg-void/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-electric backdrop-blur-md">
                6-month protocol
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-heading text-4xl text-cream">Marcus D.</h3>
                <p className="mt-2 text-sm font-light text-ash">−28 lb body fat · +15 lb lean mass</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-cream">Strength +22%</span>
                  <span className="rounded-full border border-electric/20 bg-electric/[0.06] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-electric">Body Fat −8%</span>
                </div>
              </div>
            </a>
          </FadeUp>

          {[
            { name: 'Sarah M.', metric: '−18 LB', sub: 'Deadlift: 95 → 210 lb in 9 months', tag: 'Body Fat −6%' },
            { name: 'David K.', metric: '+12 LB', sub: 'Lean mass gained · Bench +55 lb', tag: 'Strength +18%' },
          ].map((t, i) => (
            <FadeUp key={t.name} delay={0.15 + i * 0.12}>
              <article className="group flex h-full flex-col justify-between rounded-[20px] border border-white/[0.07] bg-graphite/70 p-8 shadow-xl shadow-black/20 transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/20 lg:p-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-2xl tracking-[0.06em] text-cream">{t.name}</h3>
                    <p className="mt-1 text-xs font-light text-slate-light">{t.sub}</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-electric" />
                </div>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <span className="font-heading text-6xl leading-none text-electric transition-transform duration-500 group-hover:-translate-y-1">{t.metric}</span>
                  <span className="rounded-full border border-electric/20 bg-electric/[0.06] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-electric">{t.tag}</span>
                </div>
              </article>
            </FadeUp>
          ))}

          <FadeUp delay={0.35}>
            <a
              href="#pricing"
              className="group relative flex h-full min-h-[220px] flex-col items-start justify-between overflow-hidden rounded-[20px] border border-electric/15 bg-gradient-to-br from-void to-graphite p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/40 lg:p-10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(100,255,78,0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-electric">Your name here</span>
              <div>
                <span className="relative z-10 font-heading text-4xl leading-[0.95] text-cream">
                  START YOUR<br />OWN CASE STUDY.
                </span>
                <span className="relative z-10 mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-electric">
                  Begin now <ArrowRight className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TRAINERS                                                            */
/* ------------------------------------------------------------------ */
function Trainers() {
  const trainers = [
    { name: 'Elena Voss', role: 'Head Strength Coach', bio: 'Former national powerlifter. 14 years coaching athletes from rehab to podium.', cert: 'NSCA-CSCS' },
    { name: 'Marcus Chen', role: 'Performance Director', bio: 'Olympic lifting specialist and sports nutritionist for competitive rosters.', cert: 'CSCS · PN-2' },
    { name: 'Amara Okonkwo', role: 'Functional Lead', bio: 'Movement-screening certified. Builds engines that survive real life.', cert: 'FMS · NASM-PES' },
  ];

  return (
    <section id="trainers" className="relative overflow-hidden border-t border-white/[0.06] bg-carbon py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionTag index="08" label="The Coaches" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(3rem,6.5vw,5.6rem)] leading-[0.88] text-cream">
                LED BY <span className="font-accent italic tracking-normal text-electric">practitioners.</span>
              </h2>
            </Reveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-slate-light lg:text-right">
              No influencers. No weekend certifications. Every coach on our floor has competed, studied, and earned
              it.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {trainers.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.12}>
              <article className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-graphite shadow-xl shadow-black/20 transition-all duration-500 hover:-translate-y-2 hover:border-electric/20">
                <div className="relative h-[380px] overflow-hidden">
                  <img
                    src="/trainer-coach.jpg"
                    alt={`${t.name}, ${t.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.05] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-void/20 to-transparent" />
                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-void/50 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-electric" />
                  </div>
                  <span className="absolute bottom-4 left-6 font-mono text-[10px] tracking-[0.25em] text-electric">0{i + 1}</span>
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-2xl tracking-[0.06em] text-cream">{t.name}</h3>
                    <span className="whitespace-nowrap rounded-full border border-electric/15 bg-electric/[0.05] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-electric">{t.cert}</span>
                  </div>
                  <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-light">{t.role}</p>
                  <p className="mt-4 text-sm font-light leading-relaxed text-ash/80">{t.bio}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS — carousel                                             */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const quotes = [
    {
      text: 'The most professional environment I have ever trained in. Every detail — equipment, programming, coaching — reflects elite standards.',
      name: 'James R.',
      role: 'Elite Member — 2 years',
    },
    {
      text: 'I went from barely deadlifting my bodyweight to two and a half times it in eight months. The programming here is precise and the coaches actually watch you move.',
      name: 'Lena M.',
      role: 'Forge Pro Member — 1 year',
    },
    {
      text: 'It stopped feeling like a gym and started feeling like a practice. Twenty-four hour access killed every excuse I had left.',
      name: 'David P.',
      role: 'Foundation Member — 1 year',
    },
  ];
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx((p) => (p + 1) % quotes.length);
    }, 6500);
    return () => clearInterval(t);
  }, [quotes.length]);

  const go = (d: number) => {
    setDir(d);
    setIdx((p) => (p + d + quotes.length) % quotes.length);
  };

  const q = quotes[idx];

  return (
    <section id="testimonials" className="relative overflow-hidden py-28 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,78,0.04),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        <SectionTag index="09" label="Member Voices" className="justify-center" />

        <div className="mt-14 flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-4 w-4 fill-electric text-electric" />
          ))}
        </div>

        <div className="relative mt-8 min-h-[200px] md:min-h-[170px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <blockquote className="font-accent text-2xl italic leading-[1.5] text-cream/90 md:text-[2rem]">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-8">
                <span className="font-heading text-xl tracking-[0.1em] text-cream">{q.name}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-steel">{q.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-cream transition-all duration-300 hover:border-electric hover:bg-electric hover:text-void"
          >
            <ArrowUp className="-rotate-90 h-4 w-4" />
          </button>
          <span className="font-mono text-xs tracking-[0.3em] text-steel">
            <span className="text-electric">0{idx + 1}</span> / 0{quotes.length}
          </span>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-cream transition-all duration-300 hover:border-electric hover:bg-electric hover:text-void"
          >
            <ArrowUp className="rotate-90 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRICING + FAQ                                                       */
/* ------------------------------------------------------------------ */
function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);

  const tiers = [
    { name: 'Foundation', price: 89, note: 'Unlimited access', featured: false },
    { name: 'Elite', price: 149, note: 'Coaching + recovery suite', featured: true },
    { name: 'Forge Pro', price: 249, note: 'Unlimited 1-on-1 support', featured: false },
  ];

  const faqs = [
    { q: 'Can I really cancel anytime?', a: 'Yes. Every membership is month-to-month. Thirty days notice, no exit interviews, no fees. We earn your membership every single month.' },
    { q: 'Is there a joining fee or contract?', a: 'Neither. Your first week is a full-access trial — every zone, every class, every coach. You only start paying when you decide this is home.' },
    { q: 'How does personal training work?', a: 'We begin with a movement screen and goal-setting session, then build a program around your biomechanics. Sessions are booked through the app; your coach tracks every metric between them.' },
    { q: 'Do you offer corporate memberships?', a: 'Team rates apply from five employees onward, including quarterly wellness workshops. Speak to our membership team for a tailored proposal.' },
    { q: 'I am a beginner. Is this gym for me?', a: 'Absolutely. The Foundation onboarding includes three coach-led orientation sessions. Intensity is scaled, discipline is not.' },
  ];

  return (
    <section id="pricing" className="relative overflow-hidden border-t border-white/[0.06] bg-carbon py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Pricing column */}
          <div className="lg:col-span-5">
            <SectionTag index="10" label="Pricing" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(3rem,5.5vw,4.8rem)] leading-[0.88] text-cream">
                START YOUR
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading text-[clamp(3rem,5.5vw,4.8rem)] leading-[0.88] text-cream">
                <span className="font-accent italic tracking-normal text-electric">journey.</span>
              </h2>
            </Reveal>
            <FadeUp delay={0.2} className="mt-6 max-w-md">
              <p className="text-sm font-light leading-relaxed text-slate-light">
                Transparent, month-to-month, no joining fees. The first week is on us — walk any zone, take any
                class, meet every coach.
              </p>
            </FadeUp>

            <div className="mt-10 space-y-4">
              {tiers.map((t, i) => (
                <FadeUp key={t.name} delay={0.25 + i * 0.1}>
                  <a
                    href="#contact"
                    className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-[18px] border p-6 transition-all duration-400 hover:-translate-y-1 lg:p-7 ${
                      t.featured
                        ? 'border-electric/25 bg-void shadow-[0_0_50px_rgba(100,255,78,0.08)]'
                        : 'border-white/[0.07] bg-graphite/60 hover:border-electric/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading text-2xl tracking-[0.06em] text-cream">{t.name}</h3>
                        {t.featured && (
                          <span className="rounded-full bg-electric px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.15em] text-void">
                            Best value
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs font-light text-slate-light">{t.note}</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className={`font-heading text-4xl leading-none ${t.featured ? 'text-electric' : 'text-cream'}`}>
                        ${t.price}
                        <span className="font-body text-[11px] font-light text-steel">/mo</span>
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 transition-all duration-400 group-hover:border-electric group-hover:bg-electric">
                        <ArrowUpRight className="h-4 w-4 text-cream transition-colors duration-400 group-hover:text-void" />
                      </span>
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* FAQ column */}
          <div className="lg:col-span-7 lg:pl-10 lg:pt-2">
            <FadeUp className="mb-8 flex items-center gap-4">
              <span className="font-heading text-3xl tracking-[0.05em] text-cream">Common questions</span>
              <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            </FadeUp>
            <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {faqs.map((f, i) => (
                <FadeUp key={f.q} delay={i * 0.06}>
                  <div>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="group flex w-full items-center gap-6 py-6 text-left"
                      aria-expanded={open === i}
                    >
                      <span className={`font-mono text-[10px] transition-colors duration-300 ${open === i ? 'text-electric' : 'text-steel'}`}>
                        0{i + 1}
                      </span>
                      <span className={`flex-1 text-base font-semibold transition-colors duration-300 md:text-lg ${
                        open === i ? 'text-cream' : 'text-ash group-hover:text-cream'
                      }`}>
                        {f.q}
                      </span>
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                        open === i ? 'rotate-45 border-electric bg-electric text-void' : 'border-white/12 text-cream group-hover:border-electric/50'
                      }`}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 pl-12 pr-8 text-sm font-light leading-[1.9] text-ash/85">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                             */
/* ------------------------------------------------------------------ */
function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(100,255,78,0.05),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-12">
          {/* Info */}
          <div className="lg:col-span-6">
            <SectionTag index="11" label="Contact & Location" />
            <Reveal className="mt-8">
              <h2 className="font-heading text-[clamp(3rem,6.5vw,5.2rem)] leading-[0.88] text-cream">
                FIND YOUR
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading text-[clamp(3rem,6.5vw,5.2rem)] leading-[0.88] text-cream">
                <span className="font-accent italic tracking-normal text-electric">forge.</span>
              </h2>
            </Reveal>
            <FadeUp delay={0.2} className="mt-6 max-w-md">
              <p className="text-sm font-light leading-relaxed text-slate-light">
                Fifteen thousand square feet in the Performance Quarter — staffed 5 AM to 10 PM, open to members
                around the clock.
              </p>
            </FadeUp>

            {/* Stylized map block */}
            <FadeUp delay={0.25} className="mt-10">
              <div className="relative h-44 overflow-hidden rounded-[20px] border border-white/[0.07] bg-graphite">
                <div
                  className="absolute inset-0 opacity-[0.16]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute -inset-6 animate-ping rounded-full bg-electric/15" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-electric shadow-[0_0_30px_rgba(100,255,78,0.5)]">
                    <MapPin className="h-5 w-5 text-void" />
                  </span>
                </div>
                <div className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.25em] text-slate-light">
                  40.7128° N — 74.0060° W
                </div>
                <div className="absolute right-5 top-4 font-mono text-[10px] tracking-[0.25em] text-electric">
                  PERFORMANCE QUARTER
                </div>
              </div>
            </FadeUp>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                { icon: MapPin, label: 'Address', lines: ['440 Industrial Boulevard', 'Performance Quarter, NY 10013'] },
                { icon: Clock, label: 'Hours', lines: ['Members: 24 / 7', 'Staffed: 5:00 AM — 10:00 PM'] },
                { icon: Phone, label: 'Phone', lines: ['+1 (212) 884-7700'] },
                { icon: Mail, label: 'Email', lines: ['hello@forgefit.com'] },
              ].map((c) => (
                <FadeUp key={c.label} delay={0.3}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-white/[0.08] bg-graphite">
                      <c.icon className="h-4 w-4 text-electric" />
                    </span>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-steel">{c.label}</div>
                      {c.lines.map((l) => (
                        <div key={l} className="mt-1.5 text-sm font-light leading-snug text-cream/85">{l}</div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.15} className="h-full">
              <div className="relative h-full overflow-hidden rounded-[20px] border border-white/[0.07] bg-graphite/70 p-8 shadow-2xl shadow-black/30 lg:p-12">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric">( Book a visit )</span>
                <h3 className="mt-4 font-heading text-4xl tracking-[0.04em] text-cream">WALK THE FLOOR FREE.</h3>
                <p className="mt-3 text-sm font-light text-slate-light">
                  Seven days of full access. A coach will call within two hours.
                </p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 flex flex-col items-center gap-5 rounded-[16px] border border-electric/20 bg-electric/[0.05] px-8 py-14 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-electric">
                      <Check className="h-6 w-6 text-void" strokeWidth={3} />
                    </span>
                    <div>
                      <div className="font-heading text-2xl tracking-[0.06em] text-cream">REQUEST RECEIVED.</div>
                      <p className="mt-2 text-sm font-light text-slate-light">We will reach out shortly. Bring shoes.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    className="mt-10 space-y-7"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="grid gap-7 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-[0.3em] text-steel">Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Alex Carter"
                          className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-sm font-light text-cream placeholder:text-steel/70 focus:border-electric focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-[0.3em] text-steel">Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="alex@example.com"
                          className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-sm font-light text-cream placeholder:text-steel/70 focus:border-electric focus:outline-none transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="goal" className="font-mono text-[9px] uppercase tracking-[0.3em] text-steel">Primary goal</label>
                      <select
                        id="goal"
                        className="mt-2 w-full appearance-none border-b border-white/15 bg-transparent py-3 text-sm font-light text-cream focus:border-electric focus:outline-none transition-colors duration-300 [&>option]:bg-graphite"
                      >
                        <option>Build strength</option>
                        <option>Lose body fat</option>
                        <option>Athletic performance</option>
                        <option>General health</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="msg" className="font-mono text-[9px] uppercase tracking-[0.3em] text-steel">Message — optional</label>
                      <textarea
                        id="msg"
                        rows={3}
                        placeholder="Tell us where you are starting from…"
                        className="mt-2 w-full resize-none border-b border-white/15 bg-transparent py-3 text-sm font-light text-cream placeholder:text-steel/70 focus:border-electric focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[16px] bg-electric px-9 py-5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-void transition-transform duration-300 hover:scale-[1.02] shadow-[0_8px_40px_rgba(100,255,78,0.25)] sm:w-auto"
                    >
                      <span className="absolute inset-0 translate-y-[101%] bg-void transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0" />
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-electric">Request Free Trial</span>
                      <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-electric" />
                    </button>
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-void">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 lg:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#hero" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric shadow-[0_0_22px_rgba(100,255,78,0.35)]">
                <Dumbbell className="h-[18px] w-[18px] text-void" strokeWidth={2.5} />
              </div>
              <span className="font-heading text-xl tracking-[0.22em] text-cream">FORGE</span>
            </a>
            <p className="mt-6 max-w-sm text-sm font-light leading-[1.9] text-steel">
              For athletes who treat their body as their most valuable asset. Precision. Discipline. Results.
            </p>
            <div className="mt-8 flex gap-3">
              {['IG', 'YT', 'TT', 'X'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 font-mono text-[10px] tracking-widest text-ash transition-all duration-400 hover:border-electric hover:bg-electric hover:text-void"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric">Navigate</h4>
            <ul className="mt-6 space-y-3">
              {[
                { l: 'Philosophy', h: '#philosophy' },
                { l: 'Membership', h: '#membership' },
                { l: 'Facilities', h: '#facilities' },
                { l: 'Transformations', h: '#transformations' },
                { l: 'Pricing', h: '#pricing' },
              ].map((x) => (
                <li key={x.l}>
                  <a href={x.h} className="group inline-flex items-center gap-2 text-sm font-light text-steel transition-colors hover:text-electric">
                    <span className="h-px w-0 bg-electric transition-all duration-300 group-hover:w-4" />
                    {x.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric">Visit</h4>
            <p className="mt-6 text-sm font-light leading-[1.9] text-steel">
              440 Industrial Boulevard
              <br />
              Performance Quarter, NY 10013
              <br />
              Open 24 / 7 — Staffed 5 AM to 10 PM
            </p>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group mt-8 inline-flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.25em] text-ash transition-colors hover:text-electric"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition-all duration-400 group-hover:border-electric group-hover:bg-electric">
                <ArrowUp className="h-4 w-4 transition-colors duration-400 group-hover:text-void" />
              </span>
              Back to top
            </a>
          </div>
        </div>

        {/* Giant wordmark */}
        <div aria-hidden className="select-none overflow-hidden pt-16">
          <motion.div
            initial={{ y: '40%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="text-stroke-ghost text-center font-heading leading-[0.72]"
            style={{ fontSize: 'clamp(7rem, 23vw, 26rem)' }}
          >
            FORGE
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-6 text-center font-mono text-[10px] tracking-[0.2em] text-steel md:flex-row md:text-left lg:px-12">
          <span>© 2026 FORGE PERFORMANCE. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-2">
            <Users className="h-3 w-3 text-electric" /> BUILT FOR ATHLETES — DESIGNED WITH DISCIPLINE
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-void font-body text-cream">
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <Stats />
        <Philosophy />
        <Membership />
        <Facilities />
        <Training />
        <Classes />
        <Nutrition />
        <Transformations />
        <Trainers />
        <Testimonials />
        <PricingFaq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
