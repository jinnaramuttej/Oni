import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 32,
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
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: EASE },
  },
};

export function Eyebrow({ index, children, tone = "light" }: { index?: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`h-px w-10 ${tone === "light" ? "bg-eucalyptus/60" : "bg-ivory/40"}`} />
      <span
        className={`font-sans text-[11px] font-medium uppercase tracking-[0.32em] ${
          tone === "light" ? "text-eucalyptus-deep" : "text-sage"
        }`}
      >
        {index ? `${index} — ` : ""}
        {children}
      </span>
    </div>
  );
}
