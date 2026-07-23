import {
  IconLinkedin,
  IconTwitter,
  IconInstagram,
  IconArrowUpRight,
} from "./icons";

const cols = [
  {
    title: "Services",
    links: [
      "Accounting & Bookkeeping",
      "Tax Planning",
      "GST & Indirect Tax",
      "Audit & Assurance",
      "Payroll Management",
      "Business Registration",
      "Fractional CFO",
      "Global Expansion",
    ],
  },
  {
    title: "Industries",
    links: [
      "SaaS & Technology",
      "D2C & E-commerce",
      "Manufacturing",
      "Healthcare",
      "Real Estate",
      "Fintech",
      "Hospitality",
      "Professional Services",
    ],
  },
  {
    title: "Firm",
    links: [
      "About Meridian",
      "Our team",
      "Careers",
      "Insights",
      "Press",
      "Client stories",
      "Partners",
      "Contact",
    ],
  },
  {
    title: "Resources",
    links: [
      "Tax calendar 2026",
      "Compliance checklists",
      "Founder's library",
      "Newsletter",
      "Webinars",
      "Help centre",
      "Status",
      "Security",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-700 text-white">
      <div className="absolute inset-0 bg-grid-light opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top CTA strip */}
        <div className="grid grid-cols-1 items-center gap-8 border-b border-white/10 py-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="font-display text-[28px] sm:text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
              Ready for finance that{" "}
              <span className="italic font-medium text-emerald-300">works for you?</span>
            </h3>
            <p className="mt-3 text-[14.5px] text-white/65">
              A 30-minute conversation with a partner. No sales pitch, no
              obligation. Just a sharper view of your numbers.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <a
              href="#book-call"
              className="group inline-flex items-center gap-2 rounded-[16px] bg-emerald-600 px-5.5 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(21,128,61,0.55)] transition hover:bg-emerald-700"
            >
              Schedule a consultation
              <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand col */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-navy-700">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 20h18" />
                  <path d="M6 20V9l6-5 6 5v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight text-white">
                  Meridian
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                  Advisors · CA
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-[13.5px] leading-[1.7] text-white/65">
              A partner-led chartered accountancy firm helping ambitious
              businesses make smarter financial decisions — from first
              invoice to first fundraise and beyond.
            </p>

            <div className="mt-7 flex items-center gap-2">
              {[IconLinkedin, IconTwitter, IconInstagram].map((I, idx) => {
                const Icon = I;
                return (
                  <a
                    key={idx}
                    href="#"
                    aria-label="Social link"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-emerald-300/40 hover:text-emerald-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">
                {c.title}
              </div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13.5px] text-white/75 transition hover:text-emerald-300"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-7 text-[12.5px] text-white/55 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© 2026 Meridian Advisors LLP. All rights reserved.</span>
            <span className="hidden md:inline text-white/20">·</span>
            <span>ICAI Firm Reg. No. 030145N / N500043</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Cookies
            </a>
            <a href="#" className="hover:text-white">
              Accessibility
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
