import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Testimonials from './components/Testimonials';
import Appointment from './components/Appointment';
import Insurance from './components/Insurance';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import Emergency from './components/Emergency';
import CTABanner from './components/CTABanner';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-teal focus:text-white focus:rounded-[var(--radius-btn)] focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        <Hero />
        <About />
        <WhyChooseUs />
        <Services />
        <Doctors />
        <Testimonials />
        <Appointment />
        <Insurance />
        <Blog />
        <FAQ />
        <CTABanner />
        <Emergency />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
