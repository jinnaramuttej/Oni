import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Treatments } from "./components/Treatments";
import { Gallery } from "./components/Gallery";
import { Dentists } from "./components/Dentists";
import { Testimonials } from "./components/Testimonials";
import { Insurance } from "./components/Insurance";
import { Booking } from "./components/Booking";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#booking"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-teal-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to booking
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Treatments />
        <Gallery />
        <Dentists />
        <Testimonials />
        <Insurance />
        <Booking />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
