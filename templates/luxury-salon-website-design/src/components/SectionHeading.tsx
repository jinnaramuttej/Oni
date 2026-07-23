import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "../utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal y={24}>
        <div
          className={cn(
            "flex items-center gap-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-10 bg-rosegold/70" aria-hidden />
          <span
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.42em]",
              dark ? "text-champagne" : "text-taupe"
            )}
          >
            {eyebrow}
          </span>
          <span className="h-px w-10 bg-rosegold/70" aria-hidden />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={cn(
            "mt-6 font-serif text-4xl leading-[1.08] font-medium text-balance md:text-5xl lg:text-[3.4rem]",
            dark ? "text-ivory" : "text-charcoal"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-6 text-[15px] leading-relaxed font-light tracking-wide md:text-base",
              dark ? "text-ivory/70" : "text-taupe"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
