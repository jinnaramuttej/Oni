import type { ReactNode } from "react";

type ButtonVariant = "primary" | "gold" | "outline" | "light" | "ghost";

const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-btn px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-charcoal text-ivory hover:bg-ink hover:-translate-y-0.5 hover:shadow-lift",
  gold: "bg-gold text-ivory hover:bg-gold-deep hover:-translate-y-0.5 hover:shadow-lift",
  outline:
    "border border-charcoal/25 text-charcoal hover:border-charcoal/50 hover:bg-charcoal hover:text-ivory",
  light:
    "border border-ivory/40 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-charcoal",
  ghost: "text-charcoal hover:text-gold px-2 py-2",
};

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/** Premium button with graceful micro-interactions. Renders as <a> when href is set. */
export function Button({
  variant = "primary",
  href,
  type = "button",
  onClick,
  className = "",
  children,
  ariaLabel,
}: ButtonProps) {
  const cls = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
  tone?: "gold" | "light";
}

/** Small eyebrow label with a hairline rule. */
export function SectionLabel({
  children,
  className = "",
  align = "left",
  tone = "gold",
}: SectionLabelProps) {
  const color = tone === "light" ? "text-ivory/80" : "text-gold";
  const rule = tone === "light" ? "bg-ivory/40" : "bg-gold/50";
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] ${color} ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span className={`h-px w-8 ${rule}`} />
      {children}
      {align === "center" && <span className={`h-px w-8 ${rule}`} />}
    </span>
  );
}
