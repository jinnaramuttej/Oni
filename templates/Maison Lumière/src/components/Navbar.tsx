import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Cuisine", href: "#cuisine" },
  { label: "Menu", href: "#menu" },
  { label: "Cellar", href: "#cellar" },
  { label: "The House", href: "#house" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-charcoal/80 backdrop-blur-xl border-b border-ivory/5 py-4"
          : "bg-transparent py-7"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="display text-2xl tracking-wide text-ivory">
            Maison{" "}
            <em className="text-gold not-italic font-serif italic">Lumière</em>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="gold-link text-[0.6875rem] font-light uppercase tracking-[0.28em] text-ivory-dim transition-colors duration-500 hover:text-ivory"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            className="ml-2 border border-gold/60 px-6 py-2.5 text-[0.6875rem] uppercase tracking-[0.28em] text-gold transition-all duration-500 hover:bg-gold hover:text-charcoal hover:shadow-[0_0_28px_-6px_rgba(200,162,76,0.5)]"
          >
            Reserve
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-ivory lg:hidden"
        >
          {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-charcoal/95 backdrop-blur-xl transition-all duration-700 lg:hidden ${
          open ? "max-h-[28rem] border-b border-ivory/5" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-xs uppercase tracking-[0.3em] text-ivory-dim transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block w-fit border border-gold/60 px-6 py-2.5 text-xs uppercase tracking-[0.3em] text-gold"
          >
            Reserve a Table
          </a>
        </nav>
      </div>
    </header>
  );
}
