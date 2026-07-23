import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, Scissors, X } from "lucide-react";
import { CONTACT, HOURS, NAV_LINKS } from "../data";
import { Btn, EASE } from "./ui";

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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-bone/[0.06] bg-ink/85 py-3 backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* logo */}
          <a href="#top" className="group flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-brass/50 bg-brass/[0.06] transition-colors duration-500 group-hover:bg-brass/15">
              <Scissors size={17} className="text-brass" strokeWidth={1.6} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold uppercase tracking-[0.22em] text-bone">
                Vanguard
              </span>
              <span className="mt-1 block text-[9.5px] font-medium uppercase tracking-[0.42em] text-steel">
                Barber Co. · Est. 1997
              </span>
            </span>
          </a>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-[12px] font-semibold uppercase tracking-[0.2em] text-bone/70 transition-colors duration-300 hover:text-bone"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-7 lg:flex">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2.5 text-[12.5px] font-semibold tracking-wider text-bone/70 transition-colors duration-300 hover:text-brass"
            >
              <Phone size={14} strokeWidth={1.8} className="text-brass" />
              {CONTACT.phone}
            </a>
            <Btn href="#booking" className="px-6 py-3">
              Book Appointment
            </Btn>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-bone/10 text-bone transition-colors hover:border-brass/50 lg:hidden"
          >
            <Menu size={20} strokeWidth={1.6} />
          </button>
        </div>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/[0.97] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className="font-display text-base font-semibold uppercase tracking-[0.25em] text-bone">
                Vanguard
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-bone/10 text-bone hover:border-brass/50"
              >
                <X size={20} strokeWidth={1.6} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: EASE }}
                  className="group flex items-baseline gap-4 border-b border-bone/[0.06] py-4"
                >
                  <span className="font-editorial text-sm italic text-brass">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl font-medium uppercase tracking-wide text-bone transition-colors group-hover:text-brass">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="px-8 pb-10"
            >
              <Btn href="#booking" onClick={() => setOpen(false)} className="w-full">
                Book Appointment
              </Btn>
              <p className="mt-6 text-center text-[11px] uppercase tracking-[0.3em] text-steel">
                Open today · {HOURS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.time}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
