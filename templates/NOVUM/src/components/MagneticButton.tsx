import type { ReactNode } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import { cn } from "../utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-[18px] px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-light";

const variants: Record<string, string> = {
  primary:
    "bg-paper text-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(109,40,217,0.35)] hover:-translate-y-0.5",
  secondary:
    "border border-white/20 text-paper hover:border-white/60 hover:-translate-y-0.5",
  ghost: "text-paper/80 hover:text-paper",
};

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className,
  type = "button",
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement | HTMLButtonElement>(0.25);

  const content = (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(base, variants[variant], className)}
    >
      {content}
    </button>
  );
}
