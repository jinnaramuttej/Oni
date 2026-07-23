import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { NAV_LINKS } from "../data";
import { scrollToId } from "../lib/scroll";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // allow the overlay to close before scrolling on mobile
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-pebble/40 bg-ivory/75 shadow-[0_8px_32px_-16px_rgb(64_64_64/0.12)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3"
            aria-label="Stillwater — back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-eucalyptus text-ivory transition-transform duration-700 group-hover:rotate-[20deg]">
              <Leaf size={16} strokeWidth={1.5} />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-serif text-xl tracking-wide text-ink">Stillwater</span>
              <span className="text-[9px] font-medium uppercase tracking-[0.34em] text-eucalyptus-deep">
                Yoga · Meditation
              </span>
            </span>
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="link-quiet text-[13px] font-medium uppercase tracking-[0.18em] text-charcoal/80 transition-colors duration-500 hover:text-ink"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("booking")}
              className="hidden rounded-[20px] bg-eucalyptus px-6 py-3 text-[13px] font-medium uppercase tracking-[0.16em] text-ivory shadow-[0_10px_24px_-10px_rgb(127_145_114/0.6)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-eucalyptus-deep sm:inline-flex"
            >
              Book a Class
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-pebble/60 bg-ivory/60 text-ink backdrop-blur-md lg:hidden"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-ivory/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-18 items-center justify-between px-6">
              <span className="font-serif text-xl text-ink">Stillwater</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pebble/60 text-ink"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className="py-2 font-serif text-4xl font-light text-ink transition-colors hover:text-eucalyptus-deep"
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="px-8 pb-12"
            >
              <button
                onClick={() => go("booking")}
                className="w-full rounded-[20px] bg-eucalyptus py-4 text-[13px] font-medium uppercase tracking-[0.16em] text-ivory"
              >
                Book Your First Class
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
