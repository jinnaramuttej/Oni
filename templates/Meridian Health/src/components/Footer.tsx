import { Stethoscope, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const columns = [
  {
    title: 'Specialties',
    links: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Internal Medicine'],
  },
  {
    title: 'Patients',
    links: ['Book Appointment', 'Patient Portal', 'Insurance', 'Billing & Payments', 'Medical Records'],
  },
  {
    title: 'About',
    links: ['Our Story', 'Meet the Doctors', 'Careers', 'Locations', 'Press'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 pb-16 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Stethoscope className="h-5 w-5 text-mint" strokeWidth={1.75} />
              </span>
              <span className="font-display text-xl font-semibold text-white">Meridian Health</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Premium, patient-first healthcare — combining clinical excellence with genuine
              compassion at every step of your journey.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-300 hover:bg-teal hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="text-sm text-white/70 transition-colors hover:text-mint">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Meridian Health. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-mint">Privacy Policy</a>
            <a href="#top" className="hover:text-mint">Terms of Service</a>
            <a href="#top" className="hover:text-mint">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
