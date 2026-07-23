import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "../utils/cn";
import { navLinks, site } from "../data/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-38% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-ink/[0.06] bg-paper/80 shadow-[0_1px_24px_-12px_rgba(17,17,17,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 md:h-20 lg:px-8"
        aria-label="Primary"
      >
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="Adrian Cole — back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-display text-[13px] font-bold tracking-tight text-paper transition-colors duration-300 group-hover:bg-accent">
            AC
          </span>
          <span className="hidden font-display text-[15px] font-semibold tracking-tight text-ink sm:block">
            Adrian Cole
            <span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  active === link.href ? "text-ink" : "text-slate-500 hover:text-ink",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-px h-px origin-left bg-ink transition-transform duration-300",
                    active === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-btn bg-ink px-5 py-2.5 text-sm font-semibold text-paper shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lift sm:inline-flex"
          >
            Hire Me
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white/70 text-ink backdrop-blur-sm transition-colors hover:border-ink/30 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          "fixed inset-0 -z-10 flex flex-col bg-paper transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex flex-1 flex-col justify-center gap-1 px-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={cn(
                "group flex items-center justify-between border-b border-ink/[0.06] py-4 font-display text-4xl font-semibold tracking-tight text-ink transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              {link.label}
              <ArrowUpRight className="h-6 w-6 text-slate-300 transition-all duration-300 group-hover:text-accent" />
            </a>
          ))}
        </div>
        <div
          className={cn(
            "flex flex-col gap-2 px-8 pb-12 transition-all delay-500 duration-500",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Get in touch
          </p>
          <a href={`mailto:${site.email}`} className="text-lg font-semibold text-ink">
            {site.email}
          </a>
          <p className="text-sm text-slate-500">{site.location}</p>
        </div>
      </div>
    </header>
  );
}
