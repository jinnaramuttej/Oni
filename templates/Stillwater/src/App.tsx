import { useEffect } from "react";
import { initSmoothScroll } from "./lib/scroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Philosophy from "./components/Philosophy";
import Classes from "./components/Classes";
import Practice from "./components/Practice";
import Retreats from "./components/Retreats";
import Instructors from "./components/Instructors";
import Schedule from "./components/Schedule";
import Membership from "./components/Membership";
import BreathPause from "./components/BreathPause";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Classes />
        <Practice />
        <Retreats />
        <Instructors />
        <Schedule />
        <Membership />
        <BreathPause />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
