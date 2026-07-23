import {
  Code2,
  MessageCircle,
  UserSquare,
  Palette,
  ArrowUp,
} from "lucide-react";
import Reveal from "./Reveal";

const socialLinks = [
  { label: "Code", icon: Code2, href: "#" },
  { label: "Chat", icon: MessageCircle, href: "#" },
  { label: "Profile", icon: UserSquare, href: "#" },
  { label: "Design", icon: Palette, href: "#" },
];

const footerLinks = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gray-100 bg-matte-black px-6 py-16 sm:px-8 lg:px-12">
      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]" aria-hidden="true">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeXk9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <span className="text-sm font-bold text-white">A</span>
                </div>
                <span className="text-lg font-semibold text-white">
                  Alex Morgan
                </span>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
                Designing and building digital products that make a difference.
                Based in San Francisco, working worldwide.
              </p>

              {/* Social links */}
              <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all duration-300 hover:bg-white/10 hover:text-white/80"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center gap-8 lg:items-end">
              {/* Nav links */}
              <ul className="flex flex-wrap items-center justify-center gap-6">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors duration-300 hover:text-white/80"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={scrollToTop}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all duration-300 hover:bg-white/10 hover:text-white/80"
                    aria-label="Scroll to top"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </li>
              </ul>

              <p className="text-xs text-white/30">
                &copy; {new Date().getFullYear()} Alex Morgan. All rights
                reserved. Crafted with care.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Thin divider */}
        <div className="mx-auto mt-12 h-px w-20 bg-white/10" />
      </div>
    </footer>
  );
}
