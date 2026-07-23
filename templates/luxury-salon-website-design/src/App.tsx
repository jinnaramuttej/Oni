import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Story from "./components/Story";
import Stylists from "./components/Stylists";
import Services from "./components/Services";
import Transformations from "./components/Transformations";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Instagram from "./components/Instagram";
import Booking from "./components/Booking";
import Membership from "./components/Membership";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { destroyLenis, initLenis } from "./lib/lenis";

export default function App() {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <main className="bg-ivory text-charcoal antialiased">
      <Navbar />
      <Hero />
      <Marquee />
      <Story />
      <Stylists />
      <Services />
      <Transformations />
      <Products />
      <Testimonials />
      <Instagram />
      <Booking />
      <Membership />
      <Contact />
      <Footer />
    </main>
  );
}
