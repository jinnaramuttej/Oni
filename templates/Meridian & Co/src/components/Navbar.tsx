import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Experts", href: "#experts" },
  { label: "Insights", href: "#insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/90 shadow-card backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[76px] items-center justify-between" aria-label="Primary">
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 rounded-xl">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-navy-700 text-lg font-extrabold text-white shadow-card transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
            M
            <span aria-hidden="true" className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-gold-400" />
          </span>
          <span className={`leading-tight transition-colors duration-300 ${scrolled ? "text-navy-800" : "text-white"}`}>
            <span className="block text-[1.02rem] font-extrabold tracking-tight">
              Meridian <span className="text-gold-500">&amp;</span> Co.
            </span>
            <span
              className={`block text-[0.6rem] font-bold uppercase tracking-[0.28em] transition-colors duration-300 ${
                scrolled ? "text-navy-500/70" : "text-blue-100/70"
              }`}
            >
              Chartered Accountants
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 ${
                  scrolled ? "text-navy-700 hover:bg-mist hover:text-navy-900" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-bold text-white shadow-glow-emerald transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 lg:inline-flex"
          >
            Schedule a Consultation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 lg:hidden ${
              scrolled || open ? "border-slate-200 bg-white text-navy-800" : "border-white/20 bg-white/10 text-white backdrop-blur"
            }`}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Scroll progress */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-green-700 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
      />

      {/* Mobile panel */}
      <div
        className={`container-x overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "max-h-[420px] pb-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lift">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[0.95rem] font-bold text-navy-800 transition-colors hover:bg-mist"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-800"
          >
            Schedule a Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
