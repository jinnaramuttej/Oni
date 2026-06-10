import { Footer } from "@/components/ui/footer-section";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Navbar } from "@/components/ui/navbar";

export function LandingPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-16" />
      <HeroGeometric badge="Oni Platform" title1="Agentic AI Software" title2="Development Platform" />
      <Footer />
    </div>
  );
}