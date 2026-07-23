import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/* ------------------------------ EASING ------------------------------- */
export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------- REVEAL ------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------- GRAIN ------------------------------ */
export const Grain = ({ opacity = 0.05 }: { opacity?: number }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-[1] bg-noise"
    style={{ opacity }}
  />
);

/* ------------------------------- KICKER ------------------------------ */
export function Kicker({
  index,
  label,
  light = false,
}: {
  index?: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-brass/70" />
      {index && (
        <span className="font-editorial text-lg italic text-brass">{index}</span>
      )}
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.42em] ${
          light ? "text-leather" : "text-brass"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ---------------------------- SECTION HEAD --------------------------- */
export function SectionHead({
  index,
  kicker,
  title,
  sub,
  light = false,
  className = "",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  sub?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <Kicker index={index} label={kicker} light={light} />
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-6 font-display text-4xl font-semibold uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.6rem] ${
            light ? "text-ink" : "text-bone"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 max-w-xl text-[15px] leading-relaxed ${
              light ? "text-ink/60" : "text-bone/55"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------- BUTTON ------------------------------ */
type BtnVariant = "brass" | "ghost" | "dark" | "bone";

export function Btn({
  href,
  children,
  variant = "brass",
  className = "",
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex cursor-pointer items-center justify-center gap-3 rounded-[16px] px-7 py-4 text-[12.5px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 will-change-transform";
  const variants: Record<BtnVariant, string> = {
    brass:
      "bg-brass text-ink shadow-[0_10px_30px_-10px_rgba(179,138,77,0.5)] hover:-translate-y-0.5 hover:bg-[#c89b5f] hover:shadow-[0_20px_44px_-12px_rgba(179,138,77,0.65)]",
    ghost:
      "border border-bone/[0.14] text-bone hover:-translate-y-0.5 hover:border-brass/60 hover:text-brass",
    dark: "bg-ink text-bone hover:-translate-y-0.5 hover:bg-graphite hover:shadow-[0_18px_40px_-14px_rgba(17,17,17,0.7)]",
    bone: "bg-bone text-ink hover:-translate-y-0.5 hover:bg-white",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight
        size={15}
        strokeWidth={2}
        className="transition-transform duration-500 group-hover:translate-x-1"
      />
    </>
  );
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <button type="submit" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

/* ------------------------------ ARROW LINK --------------------------- */
export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
        light ? "text-ink hover:text-leather" : "text-bone hover:text-brass"
      }`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-500 group-hover:scale-x-100" />
      </span>
      <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1.5" />
    </a>
  );
}

/* ------------------------------ DIVIDER ------------------------------ */
export function Divider() {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 sm:px-8 lg:px-12" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bone/10" />
      <span className="diamond" />
      <span className="h-px w-16 bg-bone/10" />
      <span className="diamond opacity-40" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bone/10" />
    </div>
  );
}

/* ----------------------------- SECTION SHELL -------------------------- */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}

export const CONTAINER = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12";
