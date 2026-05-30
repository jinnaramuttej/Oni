import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Footer } from "@/components/ui/footer-section";
import { Navbar } from "@/components/ui/navbar";

export default function Home() {
  return (
    <div className="dark bg-background min-h-screen text-foreground">
      <Navbar />
      <HeroGeometric
        badge="Oni Platform"
        title1="Agentic AI Software"
        title2="Development Platform"
      />
      <Footer />
    </div>
  );
}
