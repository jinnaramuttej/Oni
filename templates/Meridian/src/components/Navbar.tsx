import { useEffect, useState } from "react";
import { nav } from "../data";
import { IconArrowRight, IconMenu, IconClose, IconChevronDown } from "./icons";

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
    <>
      {/* Transparent top bar */}
      <div className="absolute top-0 left-0 right-0 z-40 hidden md:block">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-10 items-center justify-between text-[12.5px] tracking-wide text-white/70">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Now accepting Q1 2026 clients
              </span>
              <span className="text-white/30">·</span>
              <span>Mumbai · Bengaluru · Singapore</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="tel:+912200000000" className="hover:text-white transition">
                +91 22 0000 0000
              </a>
              <a href="mailto:hello@meridianca.in" className="hover:text-white transition">
                hello@meridianca.in
              </a>
              <a href="#login" className="hover:text-white transition">
                Client portal
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={[
          "fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-0 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
            : "top-0 md:top-10 bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-10">
          <div
            className={[
              "flex items-center justify-between transition-all",
              scrolled ? "h-16" : "h-20",
            ].join(" ")}
          >
            {/* Logo */}
            <a
              href="#top"
              className="group flex items-center gap-2.5"
              aria-label="Meridian Advisors"
            >
              <span
                className={[
                  "relative grid h-9 w-9 place-items-center rounded-xl transition-all",
                  scrolled
                    ? "bg-navy-700 text-white"
                    : "bg-white text-navy-700 ring-1 ring-white/30",
                ].join(" ")}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 20h18" />
                  <path d="M6 20V9l6-5 6 5v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold-400 ring-2 ring-white" />
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className={[
                    "text-[15px] font-semibold tracking-tight transition-colors",
                    scrolled ? "text-navy-700" : "text-white",
                  ].join(" ")}
                >
                  Meridian
                </span>
                <span
                  className={[
                    "text-[10.5px] uppercase tracking-[0.18em] transition-colors",
                    scrolled ? "text-slate-500" : "text-white/60",
                  ].join(" ")}
                >
                  Advisors · CA
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={[
                    "group relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors",
                    scrolled
                      ? "text-slate-600 hover:text-navy-700"
                      : "text-white/80 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                  {item.label === "Services" && (
                    <IconChevronDown className="h-3.5 w-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                  )}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2.5">
              <a
                href="#login"
                className={[
                  "hidden sm:inline-flex items-center text-[14px] font-medium transition-colors",
                  scrolled
                    ? "text-slate-700 hover:text-navy-700"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                Sign in
              </a>
              <a
                href="#book-call"
                className={[
                  "group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-all",
                  scrolled
                    ? "bg-navy-700 text-white hover:bg-navy-800 shadow-sm"
                    : "bg-white text-navy-700 hover:bg-slate-100",
                ].join(" ")}
              >
                Book consultation
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                className={[
                  "lg:hidden grid h-10 w-10 place-items-center rounded-full transition",
                  scrolled ? "text-navy-700 hover:bg-slate-100" : "text-white hover:bg-white/10",
                ].join(" ")}
                onClick={() => setOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="lg:hidden pb-6 pt-2 border-t border-slate-200/40">
              <div className="flex flex-col gap-1 pt-3">
                {nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#login"
                  className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
                >
                  Sign in
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
