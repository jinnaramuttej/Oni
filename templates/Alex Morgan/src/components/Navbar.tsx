import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-white/85 backdrop-blur-lg shadow-premium-sm border-b border-gray-100/80"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12" role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <a
          href="#"
          className="relative flex items-center gap-2.5 group"
          aria-label="Alex Morgan - Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-matte-black transition-transform duration-300 group-hover:scale-105">
            <span className="text-xs font-bold tracking-tight text-white">A</span>
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-matte-black sm:block">
            Alex Morgan
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-xl px-4 py-2 text-sm font-medium text-slate-custom/80 transition-all duration-200 hover:bg-light-gray hover:text-matte-black"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-[18px] bg-matte-black px-5 py-2.5 text-sm font-medium text-white shadow-premium-button transition-all duration-300 hover:bg-neutral-800 hover:shadow-premium-button-hover hover:-translate-y-0.5 active:translate-y-0"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl text-matte-black transition-colors hover:bg-light-gray md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/98 backdrop-blur-xl transition-all duration-500 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-2">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ animationDelay: `${i * 80}ms` }}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-8 py-3 text-2xl font-medium tracking-tight text-matte-black transition-all duration-300 hover:text-slate-custom/60",
                  mobileOpen && "animate-fade-up"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-6">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-[18px] bg-matte-black px-8 py-3.5 text-base font-medium text-white shadow-premium-button transition-all duration-300 hover:bg-neutral-800 hover:shadow-premium-button-hover"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
