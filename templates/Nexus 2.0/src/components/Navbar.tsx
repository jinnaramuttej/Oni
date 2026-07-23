import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Layers } from "lucide-react";
import { cn } from "../utils/cn";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-charcoal/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Nexus home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-cyan shadow-lg shadow-purple/20">
            <Layers className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-offwhite">Nexus</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-offwhite transition-colors rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="px-4 py-2 text-sm font-medium text-muted hover:text-offwhite transition-colors"
          >
            Log in
          </a>
          <a
            href="#cta"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-[18px] bg-offwhite px-5 py-2.5 text-sm font-semibold text-charcoal shadow-sm hover:shadow-md transition-all"
          >
            <span className="relative z-10">Start Free</span>
          </a>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-offwhite hover:bg-white/[0.06]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-b border-white/[0.06] bg-charcoal/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-muted hover:text-offwhite hover:bg-white/[0.04]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                className="mt-4 block rounded-[18px] bg-offwhite px-4 py-3 text-center text-base font-semibold text-charcoal"
                onClick={() => setMobileOpen(false)}
              >
                Start Free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
