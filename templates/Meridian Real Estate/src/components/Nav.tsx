import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "../utils/cn";
import { CONTAINER } from "./ui";

const LINKS = [
  { label: "Properties", href: "#properties" },
  { label: "Collections", href: "#collections" },
  { label: "Neighborhoods", href: "#neighborhoods" },
  { label: "Advisors", href: "#advisors" },
  { label: "Insights", href: "#insights" },
];

function Monogram({ dark }: { dark: boolean }) {
  return (
    <a href="#top" aria-label="Meridian Fine Estates — home" className="group flex items-center gap-3.5">
      <span
        className={cn(
          "grid size-10 rotate-45 place-items-center border transition-colors duration-500",
          dark ? "border-ink/30 group-hover:border-gold" : "border-ivory/40 group-hover:border-gold"
        )}
      >
        <span
          className={cn(
            "-rotate-45 font-serif text-lg font-semibold leading-none",
            dark ? "text-ink" : "text-ivory"
          )}
        >
          M
        </span>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-serif text-[17px] font-semibold tracking-[0.28em]",
            dark ? "text-ink" : "text-ivory"
          )}
        >
          MERIDIAN
        </span>
        <span className="mt-1.5 block text-[8px] font-bold uppercase tracking-[0.52em] text-gold">
          Fine Estates
        </span>
      </span>
    </a>
  );
}

export default function Nav() {
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled
            ? "border-b border-ink/[0.06] bg-ivory/85 shadow-[0_8px_40px_-16px_rgb(28_28_28/0.15)] backdrop-blur-xl"
            : "border-b border-ivory/10 bg-gradient-to-b from-ink/50 to-transparent"
        )}
      >
        <nav aria-label="Primary" className={cn(CONTAINER, "flex items-center justify-between gap-8 transition-all duration-700", scrolled ? "h-16 md:h-[76px]" : "h-20 md:h-24")}>
          <Monogram dark={scrolled} />

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "group relative py-2 text-[11.5px] font-bold uppercase tracking-[0.2em] transition-colors duration-400",
                    scrolled ? "text-ink/75 hover:text-ink" : "text-ivory/85 hover:text-ivory"
                  )}
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-7 lg:flex">
            <a
              href="tel:+12125550184"
              className={cn(
                "flex items-center gap-2.5 text-[12px] font-semibold tracking-wider transition-colors",
                scrolled ? "text-ink/70 hover:text-gold-deep" : "text-ivory/80 hover:text-gold"
              )}
            >
              <Phone size={14} className="text-gold" />
              +1 212 555 0184
            </a>
            <a
              href="#consultation"
              className={cn(
                "rounded-[14px] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5",
                scrolled
                  ? "bg-ink text-ivory shadow-soft hover:bg-gold-deep"
                  : "bg-gold text-ink shadow-gold hover:bg-ivory"
              )}
            >
              Book Consultation
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn(
              "grid size-11 place-items-center rounded-full border lg:hidden",
              scrolled ? "border-ink/20 text-ink" : "border-ivory/30 text-ivory"
            )}
          >
            <Menu size={19} />
          </button>
        </nav>
      </header>

      {/* ——— Fullscreen mobile menu ——— */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-ink transition-all duration-700 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className={cn(CONTAINER, "flex h-20 items-center justify-between")}>
          <Monogram dark={false} />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full border border-ivory/25 text-ivory"
          >
            <X size={19} />
          </button>
        </div>
        <nav aria-label="Mobile" className={cn(CONTAINER, "flex flex-1 flex-col justify-center")}>
          <ul className="space-y-2">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                style={{ transitionDelay: `${150 + i * 70}ms` }}
                className={cn(
                  "transition-all duration-700",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5 py-2"
                >
                  <span className="font-serif text-sm italic text-gold">0{i + 1}</span>
                  <span className="font-serif text-[2.6rem] font-medium leading-tight text-ivory transition-colors group-hover:text-gold">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div
            style={{ transitionDelay: "550ms" }}
            className={cn(
              "mt-12 flex flex-col gap-4 transition-all duration-700",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            <a
              href="#consultation"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-[16px] bg-gold px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ink"
            >
              Book Consultation
            </a>
            <p className="text-center text-xs tracking-widest text-ivory/50">+1 212 555 0184 · New York — London — Monaco</p>
          </div>
        </nav>
      </div>
    </>
  );
}
