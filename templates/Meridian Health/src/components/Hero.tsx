import { motion } from 'framer-motion';
import { ArrowRight, Search, ShieldCheck, Clock3, Building2, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-navy-dark">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="A compassionate doctor consulting with a patient in a bright, modern clinic room"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/70 to-navy-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-navy-dark/40" />
      </div>

      {/* Subtle geometric accent */}
      <div className="pointer-events-none absolute -right-24 top-1/4 hidden h-96 w-96 rounded-full border border-white/10 lg:block" />
      <div className="pointer-events-none absolute -right-10 top-1/3 hidden h-64 w-64 rounded-full border border-teal/20 lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm ring-1 ring-white/20"
          >
            <span className="h-2 w-2 rounded-full bg-teal-light" />
            <span className="text-sm font-medium text-white/90">Accepting new patients today</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-medium leading-[1.08] text-white sm:text-6xl lg:text-[68px]"
          >
            Quality healthcare, delivered with genuine care.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/80"
          >
            Meridian Health brings together board-certified physicians, modern diagnostics, and a
            patient-first philosophy — so every visit feels reassuring, unhurried, and expertly guided.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#appointment"
              className="group flex items-center gap-2 rounded-2xl bg-teal px-7 py-4 text-base font-semibold text-white shadow-lg shadow-teal/20 transition-all duration-300 hover:bg-teal-light hover:shadow-xl hover:-translate-y-0.5"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#doctors"
              className="flex items-center gap-2 rounded-2xl bg-white/10 px-7 py-4 text-base font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
            >
              <Search className="h-4 w-4" />
              Find a Doctor
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 gap-4 border-t border-white/15 pt-8 sm:grid-cols-3"
          >
            {[
              { icon: ShieldCheck, label: 'Licensed Doctors', sub: '150+ specialists' },
              { icon: Clock3, label: 'Same-Day Appointments', sub: 'Booked in minutes' },
              { icon: Building2, label: 'Modern Facilities', sub: 'State-of-the-art care' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <item.icon className="h-5 w-5 text-mint" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-white/60">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#overview"
        aria-label="Scroll to next section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/70 hover:text-white lg:flex"
      >
        <span className="text-xs font-medium tracking-wide">Scroll</span>
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
