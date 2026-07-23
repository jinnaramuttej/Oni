import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { EASE, Logo } from "./ui";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Copilot", href: "#copilot" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
          scrolled ? "py-3" : "py-5"
        )}
      >
        {/* glass shell */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 border-b transition-all duration-500",
            scrolled
              ? "border-line bg-charcoal/80 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
          aria-hidden
        />

        <a
          href="#top"
          className="relative flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
          aria-label="Pulse — home"
        >
          <Logo />
        </a>

        {/* desktop links */}
        <ul className="relative hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-mute transition-colors duration-200 hover:bg-white/[0.05] hover:text-mist focus-visible:outline-2 focus-visible:outline-accent-soft"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative hidden items-center gap-2.5 md:flex">
          <a
            href="#pricing"
            className="rounded-full px-3.5 py-2 text-sm font-medium text-mute transition-colors hover:text-mist focus-visible:outline-2 focus-visible:outline-accent-soft"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="btn-sheen group inline-flex h-9 items-center gap-1.5 rounded-full bg-mist px-4 text-sm font-semibold text-charcoal shadow-[0_4px_20px_-6px_rgb(124_58_237/0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft"
          >
            Start Free
            <ArrowRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>

        {/* mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative inline-flex size-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-mist md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-4 rounded-[20px] border border-line bg-graphite/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-[15px] font-medium text-mute transition-colors hover:bg-white/[0.05] hover:text-mist"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-line pt-4">
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-[16px] bg-mist text-[15px] font-semibold text-charcoal"
              >
                Start Free
              </a>
              <a
                href="#hero"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-[16px] border border-line text-[15px] font-medium text-mist"
              >
                Book Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
