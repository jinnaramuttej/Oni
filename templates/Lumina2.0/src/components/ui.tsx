import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../hooks/useReveal";

/* ------------------------------------------------------------------ */
/* Reveal — fade-up entrance on scroll                                 */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "article" | "li" | "figure" | "span";
}) {
  const { ref, visible } = useReveal();
  const Component = Tag as "div";
  return (
    <Component
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("reveal", visible && "reveal-visible", className)}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading — eyebrow + title + lede                             */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
            tone === "light" ? "text-teal-600" : "text-aqua-400",
          )}
        >
          <span className={cn("h-px w-6", tone === "light" ? "bg-teal-500" : "bg-aqua-400")} aria-hidden="true" />
          {eyebrow}
          {align === "center" && (
            <span className={cn("h-px w-6", tone === "light" ? "bg-teal-500" : "bg-aqua-400")} aria-hidden="true" />
          )}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={cn(
            "mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]",
            tone === "light" ? "text-navy-800" : "text-white",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={180}>
          <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-slate-500" : "text-navy-100/80")}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Button — primary / secondary / ghost                                */
/* ------------------------------------------------------------------ */
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "md" | "lg";
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const base = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-tight transition-all duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500",
    "active:scale-[0.98]",
    size === "md" ? "px-6 py-3 text-[0.9rem]" : "px-8 py-4 text-base",
    variant === "primary" &&
      "bg-teal-500 text-white shadow-lg shadow-teal-500/25 hover:bg-teal-600 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5",
    variant === "secondary" &&
      "bg-white text-navy-800 shadow-sm ring-1 ring-slate-200 hover:ring-teal-300 hover:text-navy-900 hover:-translate-y-0.5 hover:shadow-md",
    variant === "glass" &&
      "bg-white/10 text-white ring-1 ring-white/30 backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5",
    variant === "outline" &&
      "bg-transparent text-teal-600 ring-1 ring-teal-200 hover:bg-teal-50 hover:-translate-y-0.5",
    className,
  );

  if (href) {
    return (
      <a href={href} className={base} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={base} onClick={onClick}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Img — lazy image with loading skeleton shimmer                      */
/* ------------------------------------------------------------------ */
export const Img = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { containerClassName?: string; eager?: boolean }
>(function Img({ className, containerClassName, alt = "", eager = false, ...props }, ref) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={cn("relative block overflow-hidden bg-slate-100", containerClassName)}>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 shimmer transition-opacity duration-700",
          loaded && "opacity-0",
        )}
      />
      <img
        ref={ref}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-700",
          loaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
          className,
        )}
        {...props}
      />
    </span>
  );
});
