import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Treatments from './components/Treatments';
import SmileGallery from './components/SmileGallery';
import Dentists from './components/Dentists';
import Testimonials from './components/Testimonials';
import Insurance from './components/Insurance';
import CtaBanner from './components/CtaBanner';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Treatments />
      <SmileGallery />
      <CtaBanner />
      <Dentists />
      <Testimonials />
      <Insurance />
      <Booking />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
