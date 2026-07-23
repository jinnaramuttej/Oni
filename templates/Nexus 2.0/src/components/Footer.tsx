import { Layers, MessageCircle, GitBranch, Building2 } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
  Solutions: ["Startups", "Enterprise", "Finance", "Operations", "Customer Success"],
  Resources: ["Documentation", "API Reference", "Blog", "Community", "Support"],
  Company: ["About", "Careers", "Legal", "Privacy", "Terms"],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5" aria-label="Nexus home">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-cyan">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-offwhite">Nexus</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The intelligence layer for modern operations. Unify data, workflows, and AI in one
              beautifully simple platform.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="text-muted hover:text-offwhite transition-colors" aria-label="Twitter">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-offwhite transition-colors" aria-label="GitHub">
                <GitBranch className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-offwhite transition-colors" aria-label="LinkedIn">
                <Building2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-offwhite">{category}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-offwhite transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-muted">© {new Date().getFullYear()} Nexus, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted hover:text-offwhite transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted hover:text-offwhite transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
