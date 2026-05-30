import Link from "next/link";
import { Hexagon } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Hexagon className="size-6 text-foreground" />
          <span className="text-xl font-bold tracking-tight text-foreground">Oni</span>
        </Link>
        
        {/* Links and CTA Section */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>
          <NeonButton neon={true}>
            Try Oni
          </NeonButton>
        </div>
      </div>
    </nav>
  );
}
