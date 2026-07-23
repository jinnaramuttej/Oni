import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { Button, Icons } from "./ui";

const links = [
  { label: "Firm", href: "#firm" },
  { label: "Practice Areas", href: "#practice" },
  { label: "Attorneys", href: "#attorneys" },
  { label: "Results", href: "#results" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ink/95 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold">
            <span className="font-serif text-lg leading-none">A</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide text-ivory">
              Ashcroft <span className="text-gold">&amp;</span> Vale
            </span>
            <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-luxe text-ivory/50">
              Attorneys at Law
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[0.82rem] font-medium tracking-wide text-ivory/80 transition-colors hover:text-ivory"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#consultation" variant="primary" icon={<Icons.arrowRight />}>
            Book Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory lg:hidden"
        >
          <span className="h-5 w-5">{open ? <Icons.close /> : <Icons.menu />}</span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden bg-ink/98 backdrop-blur-md transition-all duration-500 lg:hidden",
          open ? "max-h-[26rem] border-t border-white/10" : "max-h-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-3.5 font-serif text-xl text-ivory/85 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <Button
              href="#consultation"
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
              icon={<Icons.arrowRight />}
            >
              Book Consultation
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
