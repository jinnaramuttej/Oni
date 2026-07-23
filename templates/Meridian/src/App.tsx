import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import GrowthSection from "./components/GrowthSection";
import Approach from "./components/Approach";
import Stats from "./components/Stats";
import Industries from "./components/Industries";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Insights from "./components/Insights";
import Consultation from "./components/Consultation";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-600 antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <GrowthSection />
        <Approach />
        <Stats />
        <Industries />
        <Team />
        <Testimonials />
        <Insights />
        <Consultation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
