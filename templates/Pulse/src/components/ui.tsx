import { animate, motion, useInView } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../utils/cn";

/* ── Motion presets ─────────────────────────────────────────── */
export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading ────────────────────────────────────────── */
export function Eyebrow({
  icon,
  children,
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5",
        "font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-mute",
        className
      )}
    >
      {icon && <span className="text-accent-soft">{icon}</span>}
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  icon,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      <Reveal>
        <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-mist sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-xl text-base leading-7 text-mute sm:text-lg sm:leading-8",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ── Buttons ────────────────────────────────────────────────── */
export function PrimaryButton({
  children,
  href = "#",
  className,
  withArrow = true,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "btn-sheen group inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-mist px-6",
        "text-[15px] font-semibold tracking-[-0.01em] text-charcoal",
        "shadow-[0_8px_32px_-8px_rgb(124_58_237/0.45),inset_0_1px_0_rgb(255_255_255/0.9)]",
        "transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_40px_-10px_rgb(124_58_237/0.5)]",
        "active:translate-y-0 active:scale-[0.985]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft",
        className
      )}
    >
      {children}
      {withArrow && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </a>
  );
}

export function SecondaryButton({
  children,
  href = "#",
  className,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-[18px] border border-line bg-white/[0.03] px-6",
        "text-[15px] font-medium tracking-[-0.01em] text-mist",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]",
        "active:translate-y-0 active:scale-[0.985]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft",
        className
      )}
    >
      {children}
    </a>
  );
}

/* ── Card shell ─────────────────────────────────────────────── */
export function GlowCard({
  children,
  className,
  innerClassName,
  style,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("ring-grad card-lift rounded-[20px]", className)}
      style={style}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[19px] bg-graphite",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Count-up number ────────────────────────────────────────── */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ── Brand mark ─────────────────────────────────────────────── */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="url(#logobg)" />
      <path
        d="M5.5 19.5 L11 19.5 L14 10 L18 24 L21 15 L26.5 15"
        stroke="url(#logoln)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logobg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#1d1e22" />
          <stop offset="1" stopColor="#101012" />
        </linearGradient>
        <linearGradient id="logoln" x1="6" y1="12" x2="26" y2="22">
          <stop stopColor="#a78bfa" />
          <stop offset="0.55" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-7" />
      <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-mist">
        Pulse
      </span>
    </span>
  );
}

/* ── Live pulse dot ─────────────────────────────────────────── */
export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2", className)} aria-hidden>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-cyan" />
    </span>
  );
}

export { Activity };
