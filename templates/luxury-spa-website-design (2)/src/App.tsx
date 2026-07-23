import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Treatments from './components/Treatments';
import Experience from './components/Experience';
import Rituals from './components/Rituals';
import Products from './components/Products';
import Therapists from './components/Therapists';
import Testimonials from './components/Testimonials';
import Packages from './components/Packages';
import Membership from './components/Membership';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <Treatments />
        <Experience />
        <Rituals />
        <Products />
        <Packages />
        <Therapists />
        <Testimonials />
        <Membership />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
