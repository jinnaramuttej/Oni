import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------------------------------- Icons --------------------------------- */
type IconProps = { className?: string };

const base = "h-full w-full";
export const Icons = {
  arrowRight: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  arrowUpRight: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  scale: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M12 3v18M7 21h10M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0L5 7Zm14 0-2.5 6a3 3 0 0 0 5 0L19 7Z" />
    </svg>
  ),
  building: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M3 21h18M6 21V6l7-3v18M13 21V9l5 2v10M9 8h.01M9 12h.01M9 16h.01" />
    </svg>
  ),
  briefcase: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  ),
  home: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M3 11 12 3l9 8M5 10v10h14V10M9 20v-6h6v6" />
    </svg>
  ),
  users: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <circle cx="9" cy="8" r="3.2" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.5a3.2 3.2 0 0 1 0 6.2M17 14.5A6.5 6.5 0 0 1 21.5 20" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  globe: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  ),
  chart: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6M20 16v-9" />
    </svg>
  ),
  gavel: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="m14 4 6 6-3 3-6-6 3-3ZM11 7 4 14M13 13l-7 7M3 21h8" />
    </svg>
  ),
  award: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <circle cx="12" cy="9" r="6" /><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
    </svg>
  ),
  quote: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn(base, p.className)}>
      <path d="M9 7H5a3 3 0 0 0-3 3v7h7v-7H5a1 1 0 0 1 1-1h3V7Zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-4a1 1 0 0 1 1-1h3V7Z" />
    </svg>
  ),
  plus: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className={cn(base, p.className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  phone: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
    </svg>
  ),
  pin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  clock: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cn(base, p.className)}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className={cn(base, p.className)}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className={cn(base, p.className)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
};

/* --------------------------------- Button --------------------------------- */
type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "light";
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  icon,
  onClick,
  type = "button",
}: ButtonProps) {
  const styles: Record<string, string> = {
    primary:
      "bg-gold text-ink shadow-[0_10px_28px_-12px_rgba(176,141,87,0.65)] hover:bg-gold-soft hover:shadow-[0_16px_36px_-14px_rgba(176,141,87,0.8)]",
    outline:
      "border border-ink/25 text-ink hover:border-gold hover:text-bronze bg-transparent",
    light:
      "border border-white/35 text-white hover:bg-white hover:text-ink bg-transparent",
    ghost: "text-ink hover:text-bronze bg-transparent",
  };

  const cls = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-btn)] px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
    styles[variant],
    className
  );

  const inner = (
    <>
      {children}
      {icon && (
        <span className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ------------------------------ Section label ----------------------------- */
export function Eyebrow({
  children,
  className,
  dark,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-luxe",
        dark ? "text-gold-soft" : "text-bronze",
        className
      )}
    >
      <span className={cn("h-px w-8", dark ? "bg-gold-soft/60" : "bg-bronze/50")} />
      {children}
    </span>
  );
}

/* ----------------------------- Section heading ---------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "reveal max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Eyebrow dark={dark} className={align === "center" ? "justify-center" : ""}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          "mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl text-balance",
          dark ? "text-ivory" : "text-ink"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-ivory/70" : "text-slate-warm"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
