import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Treatments } from './components/Treatments';
import { Dentists } from './components/Dentists';
import { Gallery } from './components/Gallery';
import { CTABanner } from './components/CTABanner';
import { Testimonials } from './components/Testimonials';
import { Insurance } from './components/Insurance';
import { Booking } from './components/Booking';
import { FAQs } from './components/FAQs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Treatments />
        <CTABanner />
        <Dentists />
        <Gallery />
        <Testimonials />
        <Insurance />
        <Booking />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
