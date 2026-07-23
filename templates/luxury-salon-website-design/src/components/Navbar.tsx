import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { getLenis, scrollToId } from "../lib/lenis";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Maison", href: "#maison" },
  { label: "Artists", href: "#artists" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled
            ? "glass border-b hairline shadow-[0_8px_32px_-16px_rgba(43,43,43,0.12)]"
            : "bg-transparent"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-all duration-700 md:px-10",
            scrolled ? "py-4" : "py-6 md:py-7"
          )}
        >
          {/* Brand */}
          <button
            onClick={() => go("#top")}
            className="group flex flex-col items-start text-left"
            aria-label="Lumière home"
          >
            <span className="font-serif text-[22px] font-medium tracking-[0.22em] text-charcoal">
              LUMIÈRE
            </span>
            <span className="text-[8.5px] font-medium tracking-[0.5em] text-taupe uppercase">
              Hair Atelier
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className="link-lux text-[12.5px] font-medium tracking-[0.16em] text-charcoal/80 uppercase transition-colors duration-300 hover:text-charcoal"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="tel:+12125550184"
              className="hidden items-center gap-2 text-[12px] font-medium tracking-[0.14em] text-charcoal/70 transition-colors hover:text-metallic xl:flex"
            >
              <Phone size={13} strokeWidth={1.5} />
              +1 212 555 0184
            </a>
            <button
              onClick={() => go("#booking")}
              className="group relative hidden items-center gap-2 overflow-hidden rounded-[18px] bg-charcoal px-6 py-3 text-[12px] font-medium tracking-[0.18em] text-ivory uppercase transition-all duration-500 hover:shadow-btn sm:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-full bg-metallic transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Book Appointment</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="relative transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border hairline text-charcoal transition-colors hover:bg-blush lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ivory/95 backdrop-blur-2xl"
          >
            <div className="texture-linen pointer-events-none absolute inset-0" />
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-serif text-xl tracking-[0.22em] text-charcoal">
                LUMIÈRE
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border hairline text-charcoal"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {[...LINKS, { label: "Book Appointment", href: "#booking" }].map(
                (l, i) => (
                  <motion.button
                    key={l.href + l.label}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => go(l.href)}
                    className="group flex items-baseline gap-4 py-2 text-left"
                  >
                    <span className="text-[11px] tracking-[0.3em] text-rosegold">
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-serif font-medium text-charcoal transition-colors duration-300 group-hover:text-metallic",
                        l.href === "#booking"
                          ? "text-4xl italic md:text-5xl"
                          : "text-4xl md:text-5xl"
                      )}
                    >
                      {l.label}
                    </span>
                  </motion.button>
                )
              )}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="border-t hairline px-8 py-6"
            >
              <p className="text-[11px] tracking-[0.3em] text-taupe uppercase">
                128 Greene Street · SoHo, New York
              </p>
              <a
                href="tel:+12125550184"
                className="mt-2 block font-serif text-2xl text-charcoal"
              >
                +1 212 555 0184
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
