import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../utils/cn";

export const CONTAINER = "mx-auto w-full max-w-[1340px] px-6 sm:px-8 lg:px-12";

/* ————————————————— Scroll reveal ————————————————— */
export function Reveal({
  children,
  className,
  delay = 0,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(scale ? "reveal-scale" : "reveal", inView && "is-in", className)}
    >
      {children}
    </div>
  );
}

/* ————————————————— Overline label ————————————————— */
export function Overline({
  children,
  tone = "dark",
  center = false,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  center?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-gold",
        center && "justify-center",
        tone === "light" && "text-gold"
      )}
    >
      <span aria-hidden className="h-px w-10 bg-gold/80" />
      {children}
      {center && <span aria-hidden className="h-px w-10 bg-gold/80" />}
    </p>
  );
}

/* ————————————————— Section heading ————————————————— */
export function SectionHead({
  overline,
  title,
  copy,
  tone = "dark",
  center = false,
  className,
}: {
  overline: string;
  title: ReactNode;
  copy?: string;
  tone?: "dark" | "light";
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <Reveal>
        <Overline tone={tone} center={center}>
          {overline}
        </Overline>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className={cn(
            "mt-6 font-serif text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.01em]",
            tone === "dark" ? "text-ink" : "text-ivory"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={200}>
          <p
            className={cn(
              "mt-6 text-[15px] leading-[1.9] font-normal md:text-base",
              tone === "dark" ? "text-slate-600" : "text-ivory/65"
            )}
          >
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ————————————————— Buttons ————————————————— */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline-light" | "outline-dark";
  className?: string;
  arrow?: boolean;
};

export function LuxButton({ href, children, variant = "solid", className, arrow = true }: BtnProps) {
  return (
    <a
      href={href}
      className={cn(
        "group/btn inline-flex items-center justify-center gap-3 rounded-[16px] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0",
        variant === "solid" &&
          "bg-gold text-ink shadow-gold hover:bg-gold-deep hover:text-ivory",
        variant === "outline-light" &&
          "border border-ivory/35 text-ivory hover:border-gold hover:text-gold",
        variant === "outline-dark" &&
          "border border-ink/25 text-ink hover:border-gold-deep hover:text-gold-deep",
        className
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          strokeWidth={2.2}
          className="transition-transform duration-500 group-hover/btn:translate-x-1.5"
        />
      )}
    </a>
  );
}

/* ————————————————— Editorial arrow link ————————————————— */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group/lnk inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.22em]",
        tone === "dark" ? "text-ink" : "text-ivory",
        className
      )}
    >
      <span className="relative pb-1">
        {children}
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-current transition-transform duration-500 group-hover/lnk:scale-x-0" />
        <span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-gold transition-transform duration-500 delay-100 group-hover/lnk:scale-x-100" />
      </span>
      <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover/lnk:translate-x-1.5" />
    </a>
  );
}

/* ————————————————— Diamond divider ————————————————— */
export function Diamond({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-[7px] rotate-45 border border-gold", className)}
    />
  );
}
