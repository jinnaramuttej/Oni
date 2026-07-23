import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Intersection observer hook — one-shot reveal                        */
/* ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  rootMargin = "0px 0px -6% 0px"
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/* Scroll reveal wrapper                                               */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow label                                                       */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  dark = false,
  center = false,
}: {
  children: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  const line = <span aria-hidden="true" className={`h-px w-7 ${dark ? "bg-gold-400/60" : "bg-green-700/50"}`} />;
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.24em] md:text-xs ${
        dark ? "text-gold-300" : "text-green-700"
      }`}
    >
      {line}
      {children}
      {center ? line : null}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading with staggered reveal                               */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <Reveal>
        <Eyebrow dark={dark} center={centered}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`mt-4 text-balance text-3xl font-extrabold leading-[1.12] tracking-[-0.02em] md:text-[2.6rem] ${
            dark ? "text-white" : "text-navy-800"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={180}>
          <p className={`mt-5 text-base leading-7 md:text-lg md:leading-8 ${dark ? "text-navy-100/80" : "text-slate-600"}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter (runs once when in view)                           */
/* ------------------------------------------------------------------ */
export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1900,
  className = "",
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Lazy image with loading skeleton                                    */
/* ------------------------------------------------------------------ */
export function LazyImage({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-navy-50 ${className}`}>
      {!loaded && <div aria-hidden="true" className="skeleton-bg absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
