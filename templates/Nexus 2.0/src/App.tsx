import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustedBy } from "./components/TrustedBy";
import { DashboardPreview } from "./components/DashboardPreview";
import { Features } from "./components/Features";
import { ProductShowcase } from "./components/ProductShowcase";
import { Benefits } from "./components/Benefits";
import { AICapabilities } from "./components/AICapabilities";
import { Integrations } from "./components/Integrations";
import { Testimonials } from "./components/Testimonials";
import { Metrics } from "./components/Metrics";
import { Pricing } from "./components/Pricing";
import { FAQs } from "./components/FAQs";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal text-offwhite">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <DashboardPreview />
        <Features />
        <ProductShowcase />
        <Benefits />
        <AICapabilities />
        <Integrations />
        <Testimonials />
        <Metrics />
        <Pricing />
        <FAQs />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
