import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import Editorial from "./components/Editorial";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import Awards from "./components/Awards";
import Process from "./components/Process";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useReveal();

  useEffect(() => {
    document.documentElement.classList.add("grain");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0A0A0A] text-[#FAFAFA]">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Editorial />
        <Philosophy />
        <Services />
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
