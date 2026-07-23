import { useReveal } from "./hooks/useReveal";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
import { PracticeAreas } from "./components/PracticeAreas";
import { Attorneys } from "./components/Attorneys";
import { Results } from "./components/Results";
import { Testimonials } from "./components/Testimonials";
import { Insights } from "./components/Insights";
import { Consultation } from "./components/Consultation";
import { Offices } from "./components/Offices";
import { Footer } from "./components/Footer";

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-ivory text-ink antialiased">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <PracticeAreas />
        <Attorneys />
        <Results />
        <Testimonials />
        <Insights />
        <Consultation />
        <Offices />
      </main>
      <Footer />
    </div>
  );
}
