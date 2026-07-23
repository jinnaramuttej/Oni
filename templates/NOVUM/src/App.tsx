import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedWork from "./components/FeaturedWork";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import Clients from "./components/Clients";
import Awards from "./components/Awards";
import Process from "./components/Process";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink">
      <div className="noise-overlay" aria-hidden="true" />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to main content
      </a>
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <Philosophy />
        <Services />
        <Clients />
        <Awards />
        <Process />
        <Team />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
