import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { SignatureTreatments } from "./components/SignatureTreatments";
import { Treatments } from "./components/Treatments";
import { SpaPackages } from "./components/SpaPackages";
import { Skincare } from "./components/Skincare";
import { Interlude } from "./components/Interlude";
import { Therapists } from "./components/Therapists";
import { Testimonials } from "./components/Testimonials";
import { Memberships } from "./components/Memberships";
import { Booking } from "./components/Booking";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <div className="min-h-screen bg-cream text-charcoal antialiased">
      {/* Slim scroll-progress accent */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold/60"
      />

      <Navbar />

      <main>
        <Hero />
        <Philosophy />
        <SignatureTreatments />
        <Treatments />
        <SpaPackages />
        <Skincare />
        <Interlude />
        <Therapists />
        <Testimonials />
        <Memberships />
        <Booking />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
