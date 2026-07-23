import { ArrowUp, AtSign, Briefcase, Camera, Globe2 } from "lucide-react";

const SITEMAP = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", icon: Camera },
  { label: "Twitter", href: "#", icon: AtSign },
  { label: "LinkedIn", href: "#", icon: Briefcase },
  { label: "Dribbble", href: "#", icon: Globe2 },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink pt-20">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" className="font-display text-3xl font-bold tracking-tight text-paper">
              NOVUM<span className="text-violet-light">.</span>
            </a>
            <p className="mt-6 max-w-sm text-balance text-base leading-relaxed text-mist">
              An independent creative agency crafting bold brands, cinematic
              digital experiences, and unforgettable design.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition-all duration-300 hover:border-white/40 hover:text-paper"
                >
                  <social.icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-mist">
              Sitemap
            </p>
            <ul className="space-y-3">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-base text-mist transition-colors duration-300 hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-mist">
              Studio
            </p>
            <address className="space-y-2 text-base not-italic leading-relaxed text-mist">
              <p>21 Rue de l'Atelier</p>
              <p>Paris, France 75011</p>
              <p className="pt-3">
                <a href="mailto:hello@novum.studio" className="text-paper transition-colors hover:text-violet-light">
                  hello@novum.studio
                </a>
              </p>
              <p>+33 1 42 68 53 00</p>
            </address>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-sm text-mist/70">
            © {new Date().getFullYear()} Novum Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-mist/70 transition-colors hover:text-paper">
              Privacy
            </a>
            <a href="#" className="text-sm text-mist/70 transition-colors hover:text-paper">
              Terms
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist transition-all duration-300 hover:border-white/40 hover:text-paper"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
