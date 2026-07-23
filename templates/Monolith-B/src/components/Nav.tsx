import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Berlin",
      };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d) + " CET");
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/15">
            <span className="h-2 w-2 rounded-full bg-[#C6FF3D] transition-transform duration-700 group-hover:scale-[3]" />
          </span>
          <span className="font-display text-2xl tracking-tight">
            Monolith<span className="text-[#C6FF3D]">.</span>
          </span>
        </a>

        {/* Center links */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] px-2 py-2 backdrop-blur md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-[#FAFAFA]/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] lg:inline">
            Berlin · {time}
          </span>
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-[18px] bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:bg-[#C6FF3D] hover:shadow-[0_10px_40px_-10px_rgba(198,255,61,0.6)] md:inline-flex"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 md:hidden"
            aria-label="Menu"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-white transition-transform ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-full bg-white transition-transform ${
                  open ? "-translate-y-1 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden border-t border-white/5 bg-[#0A0A0A]/95 backdrop-blur-xl md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } transition-[grid-template-rows] duration-500`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-white/90"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-max items-center gap-2 rounded-[18px] bg-white px-5 py-3 text-sm font-medium text-[#0A0A0A]"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
