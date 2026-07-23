import { Icons } from "./ui";

const cols = [
  {
    title: "Practice",
    links: ["Corporate & M&A", "Litigation", "Real Estate", "Private Client", "International"],
  },
  {
    title: "Firm",
    links: ["About Us", "Our Attorneys", "Case Results", "Insights", "Careers"],
  },
  {
    title: "Connect",
    links: ["Consultation", "Contact", "Offices", "Media Enquiries", "Client Portal"],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      {/* CTA strip */}
      <div className="border-y border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 text-center md:flex-row md:text-left lg:px-10">
          <h3 className="font-serif text-3xl leading-tight text-ivory sm:text-4xl">
            Ready to discuss your matter?
          </h3>
          <a
            href="#consultation"
            className="group inline-flex items-center gap-3 rounded-[var(--radius-btn)] bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-all duration-300 hover:bg-gold-soft"
          >
            Schedule a Consultation
            <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <Icons.arrowRight />
            </span>
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 font-serif text-lg text-gold">
                A
              </span>
              <span className="font-serif text-xl font-semibold tracking-wide text-ivory">
                Ashcroft <span className="text-gold">&amp;</span> Vale
              </span>
            </div>
            <p className="mt-5 max-w-xs leading-relaxed text-ivory/60">
              Distinguished legal counsel delivering trusted, discreet representation
              to a select clientele worldwide since 2003.
            </p>
            <div className="mt-6 flex gap-3">
              {["in", "X", "f"].map((s) => (
                <a
                  key={s}
                  href="#top"
                  aria-label={`Social ${s}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm text-ivory/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-luxe text-gold-soft">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-sm text-ivory/60 transition-colors hover:text-ivory"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-ivory/45 sm:flex-row sm:text-left">
          <p>© 2026 Ashcroft &amp; Vale LLP. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#top" className="transition-colors hover:text-ivory">Privacy Policy</a>
            <a href="#top" className="transition-colors hover:text-ivory">Terms of Engagement</a>
            <a href="#top" className="transition-colors hover:text-ivory">Legal Notices</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
