import { useEffect, useState } from "react";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { cn } from "../utils/cn";
import { CONTACT, NAV_LINKS } from "../lib/data";

function Logo({ dark }: { dark: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Lumina Dental Studio — home">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-teal-500 shadow-lg shadow-teal-500/25 transition-transform duration-300 hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
          <path d="M12 5.5c-2 0-2.6.9-4 .9C5.9 6.4 4.6 8.2 4.6 10c0 3 2 9 3.4 9 1.2 0 1.1-3.4 4-3.4s2.8 3.4 4 3.4c1.4 0 3.4-6 3.4-9 0-1.8-1.3-3.6-3.4-3.6-1.4 0-2-.9-4-.9Z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-lg font-bold tracking-tight transition-colors",
            dark ? "text-navy-800" : "text-white",
          )}
        >
          Lumina
        </span>
        <span
          className={cn(
            "block text-[0.6rem] font-semibold uppercase tracking-[0.32em] transition-colors",
            dark ? "text-teal-600" : "text-aqua-300",
          )}
        >
          Dental Studio
        </span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dark = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-slate-900/5 bg-white/85 shadow-[0_8px_32px_-16px_rgb(30_58_95/0.15)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
          scrolled ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24",
        )}
      >
        <Logo dark={dark} />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors",
                  dark
                    ? "text-slate-600 hover:bg-teal-50 hover:text-navy-800"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href={CONTACT.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors xl:flex",
              dark ? "text-slate-600 hover:text-teal-600" : "text-white/85 hover:text-white",
            )}
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.phone}
          </a>

          <a
            href="#booking"
            className={cn(
              "hidden items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 sm:inline-flex",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400",
              "bg-teal-500 text-white shadow-lg shadow-teal-500/25 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-xl hover:shadow-teal-600/30 active:scale-[0.98]",
            )}
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Book Appointment
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-xl transition-colors lg:hidden",
              dark ? "text-navy-800 hover:bg-slate-100" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white lg:hidden",
          scrolled ? "top-16" : "top-20",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                className={cn(
                  "transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-xl font-semibold text-navy-800 transition-colors hover:bg-teal-50"
                >
                  {link.label}
                  <span className="text-teal-500" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-3 pt-10">
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-500 px-6 py-4 font-semibold text-white shadow-lg shadow-teal-500/25"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book Appointment
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 font-semibold text-navy-800"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <p className="pt-2 text-center text-sm text-slate-400">
              Open today until 19:00 · Accepting new patients
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
