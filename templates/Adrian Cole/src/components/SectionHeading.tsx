import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  dark?: boolean;
  className?: string;
}

/**
 * Editorial section header — index number + thin divider + eyebrow,
 * display title, optional description and right-aligned action slot.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold tabular-nums tracking-[0.25em] text-accent">
              {index}
            </span>
            <span className={cn("h-px w-10", dark ? "bg-white/25" : "bg-ink/20")} aria-hidden="true" />
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.25em]",
                dark ? "text-slate-400" : "text-slate-500",
              )}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <h2
            className={cn(
              "mt-6 font-display text-4xl font-semibold tracking-[-0.02em] text-balance md:text-5xl",
              dark ? "text-paper" : "text-ink",
            )}
          >
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={180}>
            <p className={cn("mt-5 max-w-xl text-lg leading-relaxed", dark ? "text-slate-400" : "text-slate-600")}>
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={220} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}
