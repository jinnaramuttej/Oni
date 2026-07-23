import AISection from "./components/AISection";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Integrations from "./components/Integrations";
import Logos from "./components/Logos";
import Metrics from "./components/Metrics";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

/* Hairline section divider — elegant editorial rhythm */
function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8" aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-clip bg-charcoal text-mist">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Divider />
        <Features />
        <Divider />
        <AISection />
        <Metrics />
        <Divider />
        <Integrations />
        <Divider />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
